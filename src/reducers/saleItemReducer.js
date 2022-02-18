const saleItemReducer = (state, action) => {

    const getValidStocks = (stocks) => {
        if (stocks === undefined) return [];
        return stocks.filter(stock => Number(stock.defaultQuantity) > 0);
    }
    const getDefaultStocks = (stocks) => {
        if (stocks === undefined) return "none";
        const defaultStockArr = stocks.filter(stock => stock.isDefault === true);
        return defaultStockArr.length ? defaultStockArr[0] : "none";
    }
    const getValidPriceCategory = (stock) => {
        if (stock === undefined || stock === "none") return "none";
        return stock.price.filter((pc) => Number(stock.defaultQuantity) >= Number(pc.quantity));
    }
    const getDefaultPrice = (priceCategory, billingType) => {
        if (priceCategory === undefined) return 0;
        return billingType === "wholesale" ? priceCategory["wholesalePrice"] : priceCategory["retailPrice"];
    }

    const getTotal = (baseQuantity, basePrice, quantity, tax, discount) => {
        const perItemPrice = basePrice / baseQuantity;
        const totalItemPrice = perItemPrice * (quantity * baseQuantity);
        const totalTax = (totalItemPrice * tax) / 100;
        const total = totalItemPrice + totalTax - discount;
        return {
            perItemPrice: perItemPrice,
            totalItemPrice: totalItemPrice,
            totalTax: totalTax,
            discount: discount,
            total: total,
            baseQuantity: baseQuantity,
            basePrice: basePrice,
            saleQuantity: quantity,
            totalQuantity: quantity * baseQuantity
        };
    }

    const getDefaultRow = (itemSelected, billingType) => {
        const defaultStock = getDefaultStocks(itemSelected.stock);
        const validStocks = getValidStocks(itemSelected.stock);
        const validPriceCategories = getValidPriceCategory(defaultStock);
        const defaultPriceCategory = validPriceCategories.length ? validPriceCategories[0] : "none";
        const defaultPrice = getDefaultPrice(defaultPriceCategory, billingType);
        const itemTotal = getTotal(defaultPriceCategory.quantity, defaultPrice, 1, itemSelected.tax, defaultStock.defaultDiscount);
        return {
            id: state.uniqueRowIdentifier,
            item: itemSelected.shortName,
            company: itemSelected.company,
            tax: itemSelected.tax,
            quantity: 1,
            discount: defaultStock.defaultDiscount,
            stock: defaultStock.stockName,
            unit: defaultPriceCategory !== "none" ? defaultPriceCategory.priceCategory : "none",
            price: defaultPrice,
            stockDropdown: validStocks,
            unitDropdown: validPriceCategories,
            totalQuantity: defaultPriceCategory === "none" ? 1 : 1 * Number(defaultPriceCategory.quantity),
            total: itemTotal.total,
            details: itemSelected,
            validPriceCategories: validPriceCategories,
            defaultPriceCategory: defaultPriceCategory,
            defaultPrice: defaultPrice,
            itemTotal: itemTotal
        }
    }

    switch (action.key) {
        case "INCREMENT_ROW_IDENTIFIER":
            return state;
        case "ADD_NEW_ITEM_ROW":
            const itemSelected = action.value.item[0];
            const billingType = state.billingType === undefined ? "retail" : state.billingType;
            const rowToAdd = getDefaultRow(itemSelected, billingType);
            return { ...state, rows: [...state.rows].concat([rowToAdd]), uniqueRowIdentifier: Number(state.uniqueRowIdentifier) + Number(1) };
        case "DELETE_ITEM_ROW":
            const deletedRowId = action.value;
            return { ...state, rows: state.rows.filter((row) => row.id !== deletedRowId) };
        case "ROW_ITEM_CHANGED":
            const rowId = action.value.rowId;
            const selectedItem = action.value.selectedItem;
            const bt = state.billingType === undefined ? "retail" : state.billingType;
            const rowStateToReturn = state.rows.map((row) => {
                if (Number(row.id) === Number(rowId)) {
                    return getDefaultRow(selectedItem, bt)
                } else {
                    return row;
                }
            })
            return { ...state, rows: rowStateToReturn }
        case "ROW_STOCK_CHANGED":
            const rsId = action.value.rowId;
            const rsChangedValue = action.value.changedValue;
            const rsRowStateToReturn = state.rows.map((row) => {
                if (Number(row.id) === Number(rsId)) {
                    const newStck = row.stockDropdown.filter(stock => stock.stockName === rsChangedValue)[0];
                    const newRsValidPriceCategories = getValidPriceCategory(newStck);
                    const newRsDefaultPriceCategory = newRsValidPriceCategories.length ? newRsValidPriceCategories[0] : "none";
                    const newRsDefaultPrice = getDefaultPrice(newRsDefaultPriceCategory, state.billingType);
                    const newRsTotal = getTotal(newRsDefaultPriceCategory.quantity, newRsDefaultPrice, row.quantity, row.tax, newStck.defaultDiscount);
                    return { ...row, discount: newStck.defaultDiscount, unit: newRsDefaultPriceCategory.priceCategory, price: newRsDefaultPrice, totalQuantity: (row.quantity * newRsDefaultPriceCategory.quantity), total: newRsTotal.total, defaultPrice: newRsDefaultPrice, defaultPriceCategory: newRsDefaultPriceCategory, itemTotal: newRsTotal }
                } else {
                    return row;
                }
            })
            return { ...state, rows: rsRowStateToReturn };
        case "ROW_UNIT_CHANGED":
            const ruId = action.value.rowId;
            const ruChangedValue = action.value.changedValue;
            const ruRowStateToReturn = state.rows.map((row) => {
                if (Number(row.id) === Number(ruId)) {
                    const newPriceCategory = row.unitDropdown.filter(unit => unit.priceCategory === ruChangedValue)[0];
                    const newDefaultPrice = getDefaultPrice(newPriceCategory, state.billingType);
                    const newRuTotal = getTotal(newPriceCategory.quantity, newDefaultPrice, row.quantity, row.tax, row.discount);
                    return { ...row, unit: newPriceCategory.priceCategory, price: newDefaultPrice, totalQuantity: (row.quantity * newPriceCategory.quantity), total: newRuTotal.total, defaultPrice: newDefaultPrice, defaultPriceCategory: newPriceCategory, itemTotal: newRuTotal }
                } else {
                    return row;
                }
            })
            return { ...state, rows: ruRowStateToReturn }
        case "ROW_DISCOUNT_CHANGED":
            const rdId = action.value.rowId;
            const newDiscount = action.value.changedValue;
            const rdRowStateToReturn = state.rows.map((row) => {
                if (Number(row.id) === Number(rdId)) {
                    const newRdTotal = getTotal(row.defaultPriceCategory.quantity, row.defaultPrice, row.quantity, row.tax, newDiscount);
                    return { ...row, discount: newDiscount, total: newRdTotal.total, itemTotal: newRdTotal }
                } else {
                    return row;
                }
            })
            return { ...state, rows: rdRowStateToReturn }
        case "ROW_QUANTITY_CHANGED":
            const rqId = action.value.rowId;
            const newQuantity = action.value.changedValue;
            const rqRowStateToReturn = state.rows.map((row) => {
                if (Number(row.id) === Number(rqId)) {
                    const newRqTotal = getTotal(row.defaultPriceCategory.quantity, row.defaultPrice, newQuantity, row.tax, row.discount);
                    return { ...row, quantity: newQuantity, total: newRqTotal.total, itemTotal: newRqTotal }
                } else {
                    return row;
                }
            })
            return { ...state, rows: rqRowStateToReturn }
        case "ROW_TAX_CHANGED":
            const rtId = action.value.rowId;
            const newTax = action.value.changedValue;
            const rtRowStateToReturn = state.rows.map((row) => {
                if (Number(row.id) === Number(rtId)) {
                    const newTxTotal = getTotal(row.defaultPriceCategory.quantity, row.defaultPrice, row.quantity, newTax, row.discount);
                    return { ...row, tax: newTax, total: newTxTotal.total, itemTotal: newTxTotal }
                } else {
                    return row;
                }
            })
            return { ...state, rows: rtRowStateToReturn };
        case "CHANGE_BILLING_TYPE":
            const newCbBillingType = action.value;
            const newCbRows = state.rows.map((row) => {
                const defaultPrice = getDefaultPrice(row.defaultPriceCategory, newCbBillingType);
                const newCbTotal = getTotal(row.defaultPriceCategory.quantity, defaultPrice, row.quantity, row.tax, row.discount);
                return { ...row, defaultPrice, price: defaultPrice, total: newCbTotal.total, itemTotal: newCbTotal }
            })
            return { ...state, rows: newCbRows };
        default:
            return state;
    }
}

export default saleItemReducer;