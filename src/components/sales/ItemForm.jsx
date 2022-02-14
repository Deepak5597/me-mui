import { useCallback, useMemo, useState, useEffect, useReducer } from 'react';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteRounded } from '@mui/icons-material';
import { Box } from '@mui/system';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import saleItemReducer from '../../reducers/saleItemReducer';

const initialValue = {
    rows: [],
    uniqueRowIdentifier: 1
}

function ItemForm({ itemData, saleDispatcher, billingType }) {

    const [itemForm, itemFormDispatcher] = useReducer(saleItemReducer, initialValue);
    const [itemListDropdown, setItemListDropdown] = useState([]);
    useEffect(() => {
        if (itemData.length) {
            const items = ["none"];
            itemData.forEach(item => items.push(item.shortName));
            setItemListDropdown(items);
        }
    }, [itemData]);

    useEffect(() => {
        itemFormDispatcher({ key: "CHANGE_BILLING_TYPE", value: billingType })
    }, [billingType])

    const deleteItem = useCallback(
        (id) => () => {
            itemFormDispatcher({ key: "DELETE_ITEM_ROW", value: id });
        },
        [],
    );
    const columns = useMemo(() => [
        {
            field: 'item',
            headerName: 'Item',
            editable: true,
            type: 'singleSelect',
            valueOptions: itemListDropdown.length > 0 ? itemListDropdown : [],
            width: 150
        },
        {
            field: 'company',
            headerName: 'Company',
            width: 100
        },
        {
            field: 'stock',
            headerName: 'Stock',
            editable: true,
            type: 'singleSelect',
            width: 150,
            valueOptions: ({ row }) => {
                if (row === undefined) {
                    return ["none"];
                }
                const options = ["none"];
                row.stockDropdown.map((stk) => options.push(stk.stockName));
                return options;
            }
        },
        {
            field: 'unit',
            headerName: 'Unit',
            type: 'singleSelect',
            editable: true,
            width: 70,
            valueOptions: ({ row }) => {
                if (row === undefined) {
                    return ["none"];
                }
                const options = ["none"];
                row.unitDropdown.map((ud) => options.push(ud.priceCategory));
                return options;
            }
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            editable: true,
            type: "number"
        },
        {
            field: 'price',
            headerName: 'Price',
            type: "number",
            width: 70
        },
        {
            field: 'tax',
            headerName: 'Tax(%)',
            width: 70,
            type: "number",
            editable: true
        },
        {
            field: 'discount',
            headerName: 'Discount',
            type: "number",
            editable: true
        },
        {
            field: 'totalQuantity',
            headerName: 'Total Quantity',
            type: "number"
        },
        {
            field: 'total',
            headerName: 'Total',
            width: 70,
            type: "number"
        },
        {
            field: 'actions',
            headerName: 'Action',
            type: 'actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem icon={<DeleteRounded />} label="Delete" onClick={deleteItem(params.id)} />
            ]
        }
    ], [deleteItem, itemListDropdown]);

    const handleFinish = (e) => {
        e.preventDefault();
        saleDispatcher({ key: "SALE_FINISH", value: itemForm.rows });
    }

    const getItemUsingItemName = (itemName) => {
        return itemData.filter((item) => item.shortName === itemName);
    }

    const handleEditRowsModelChange = (e) => {
        console.log(e)
        const rowKeys = Object.keys(e);
        if (rowKeys.length) {
            const fieldKeys = Object.keys(e[rowKeys[0]]);
            if (fieldKeys.length) {
                const rowId = rowKeys[0];
                const changedField = fieldKeys[0];
                const changedValue = e[rowKeys[0]][fieldKeys[0]].value;
                if (changedValue === "none")
                    return;
                switch (changedField) {
                    case "item":
                        console.log(changedValue)
                        const changedItem = getItemUsingItemName(changedValue);
                        itemFormDispatcher({ key: "ROW_ITEM_CHANGED", value: { rowId, selectedItem: changedItem[0], billingType: billingType } });
                        break;
                    case "stock":
                        itemFormDispatcher({ key: "ROW_STOCK_CHANGED", value: { rowId, changedValue } });
                        break;
                    case "unit":
                        itemFormDispatcher({ key: "ROW_UNIT_CHANGED", value: { rowId, changedValue } });
                        break;
                    case "discount":
                        itemFormDispatcher({ key: "ROW_DISCOUNT_CHANGED", value: { rowId, changedValue } });
                        break;
                    case "quantity":
                        itemFormDispatcher({ key: "ROW_QUANTITY_CHANGED", value: { rowId, changedValue } });
                        break;
                    case "tax":
                        itemFormDispatcher({ key: "ROW_TAX_CHANGED", value: { rowId, changedValue } });
                        break;
                    default:
                        break;
                }
            }
        }
    }
    const handleItemSelection = (e) => {
        itemFormDispatcher({ key: "ADD_NEW_ITEM_ROW", value: { item: getItemUsingItemName(e.target.value) } });
    }
    return (
        <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ mb: 1 }}>
                <FormControl sx={{ my: 1, mr: 3, minWidth: "25%" }}>
                    <InputLabel id="item-select-helper-label">Item</InputLabel>
                    <Select
                        size="small"
                        labelId="item-select-helper-label"
                        id="item-select-helper"
                        label="Item"
                        onChange={handleItemSelection}
                        value="none"
                    >
                        <MenuItem value="none">
                            <em>None</em>
                        </MenuItem>
                        {
                            itemData.map((item) => (
                                <MenuItem key={item.id} value={item.shortName}>{item.shortName}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ flex: 1 }}>
                <DataGrid rows={itemForm.rows ? itemForm.rows : []} columns={columns} onEditRowsModelChange={handleEditRowsModelChange} />
            </Box>
            <Box>
                <Button variant="contained" sx={{ my: 2 }} onClick={handleFinish}> Finish </Button>
            </Box>
        </Box>
    )
}

export default ItemForm