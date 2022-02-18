
const createItemReducer = (state, action) => {
    switch (action.key) {
        case "LOADING":
            return { ...state, isLoading: true };
        case "ADD_BLANK_STOCK":
            const absStock = state.stock;
            if (absStock.length)
                absStock.push({ stockName: "", stockQuantity: 0, defaultDiscount: 0, isDefault: false, price: [] })
            else
                absStock.push({ stockName: "", stockQuantity: 0, defaultDiscount: 0, isDefault: true, price: [] })
            return { ...state, showMessage: false, stock: absStock }
        case "ADD_NEW_STOCK_PRICE":
            const stockIndex = action.value.stockIndex;
            const anspStocks = state.stock.map((stock, index) => {
                if (index === stockIndex) {
                    const anspPrice = stock.price;
                    anspPrice.push({ priceCategory: "single", quantity: 0, retailPrice: 0, wholesalePrice: 0 });
                    return { ...stock, price: anspPrice }
                }
                return stock;
            })
            return { ...state, showMessage: false, stock: anspStocks }
        default:
            return state;
    }
}

export default createItemReducer;
