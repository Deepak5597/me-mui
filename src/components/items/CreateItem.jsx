import { useReducer } from 'react';

import { Alert, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

import createItemReducer from '../../reducers/createItemReducer';
import useGlobal from '../../hooks/useGlobal';

const initialValue = {
    isLoading: false,
    showMessage: false,
    isSuccess: true,
    message: "",
    shortName: "",
    longName: "",
    description: "",
    company: "none",
    tax: 0,
    category: "none",
    stock: []
}

function CreateParty() {
    const [itemForm, itemFormDispatcher] = useReducer(createItemReducer, initialValue);
    const { companies, dynamicConfig: { categories, units } } = useGlobal();

    const handleItemFieldChange = (e) => itemFormDispatcher({ key: "ITEM_FIELD_VALUE_CHANGE", value: { field: e.target.name, newValue: e.target.value } })
    const handleStockFieldChange = (index, e) => itemFormDispatcher({ key: "ITEM_STOCK_FIELD_CHANGE", value: { stockIndex: index, field: e.target.name, newValue: e.target.value } })
    const handleDefaultStockChange = (index, e) => itemFormDispatcher({ key: "ITEM_DEFAULT_STOCK_CHANGE", value: { stockIndex: index, field: e.target.name } })
    const handleStockPriceFieldChange = (stockIndex, priceIndex, e) => itemFormDispatcher({ key: "ITEM_STOCK_PRICE_FIELD_CHANGE", value: { stockIndex, priceIndex, field: e.target.name, newValue: e.target.value } })
    const handleDeleteStock = (stockIndex, e) => itemFormDispatcher({ key: "DELETE_STOCK", value: { stockIndex } })
    const handleAddPriceCategory = (stockIndex, e) => itemFormDispatcher({ key: "ADD_NEW_STOCK_PRICE", value: { stockIndex } })
    const handleDeleteStockPrice = (stockIndex, priceIndex, e) => itemFormDispatcher({ key: "DELETE_STOCK_PRICE", value: { stockIndex, priceIndex } })
    return (
        <Box sx={{ backgroundColor: "primary.contrastText", minHeight: "40vh", p: 3, display: "flex", flexDirection: "column", rowGap: 1 }}>

            {itemForm.showMessage &&
                <Box>
                    <Alert severity={itemForm.isSuccess ? "success" : "error"}>{itemForm.message}</Alert>
                </Box>
            }
            <Box sx={{ mb: 1 }}>
                <Typography variant="h6">Add New Item</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, flexWrap: "wrap" }}>
                <FormControl sx={{ minWidth: "25%" }}>
                    <TextField size="small" id="outlined-required" label="Short Name" name="shortName" value={itemForm?.shortName} onChange={handleItemFieldChange} />
                </FormControl>
                <FormControl sx={{ minWidth: "20%" }}>
                    <TextField size="small" id="outlined-required" label="Long Name" name="longName" value={itemForm?.longName} onChange={handleItemFieldChange} />
                </FormControl>
                <FormControl sx={{ minWidth: "40%" }}>
                    <TextField size="small" id="outlined-required" label="Description" name="description" value={itemForm?.description} onChange={handleItemFieldChange} />
                </FormControl>
                <FormControl sx={{ minWidth: "25%" }}>
                    <InputLabel id="comapny-select-helper-label">Comapny</InputLabel>
                    <Select
                        size="small"
                        labelId="comapny-select-helper-label"
                        id="comapny-select-helper"
                        label="Comapny"
                        onChange={(e) => handleItemFieldChange}
                        value={itemForm.company}
                        name="company">
                        <MenuItem key="ic_none" value="none">None</MenuItem>
                        {
                            companies.map((company, index) => (
                                <MenuItem key={`ic_${index}_${company}`} value={company}>{company}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: "20%" }}>
                    <TextField size="small" id="outlined-required" type="number" label="Tax" name="tax" value={itemForm?.tax} onChange={handleItemFieldChange} />
                </FormControl>
                <FormControl sx={{ minWidth: "20%" }}>
                    <InputLabel id="category-select-helper-label">Item Category</InputLabel>
                    <Select
                        size="small"
                        labelId="category-select-helper-label"
                        id="category-select-helper"
                        label="Item Category"
                        onChange={(e) => handleItemFieldChange}
                        value={itemForm.category}
                        name="category">
                        <MenuItem key="ictgry_none" value="none">None</MenuItem>
                        {
                            categories.map((category, index) => (
                                <MenuItem key={`ictgry_${index}_${category}`} value={category}>{category}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Button variant="contained" color="secondary" sx={{ mr: 2 }} onClick={() => itemFormDispatcher({ key: "ADD_BLANK_STOCK" })}> {itemForm?.stock.length > 0 ? 'Add More Stock' : 'Add Stock'}</Button>
                <Button variant="contained" disabled={itemForm.isLoading}> {itemForm.isLoading ? "Saving ..." : "Save"} </Button>
            </Box>
            {
                itemForm?.stock.length > 0 &&
                <Typography variant="h6" sx={{ my: 1 }}>
                    Stocks
                </Typography>
            }
            <Box sx={{ display: "flex", gap: 2, flexDirection: "column", maxHeight: "180px", overflowY: "auto" }}>
                {
                    itemForm?.stock &&
                    itemForm.stock.map((stock, index) => {
                        return (
                            <Box key={`item_stock_${index}`} sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <FormControl>
                                        <TextField size="small" id="outlined-required" label="Stock Name" name="stockName" value={itemForm?.stockName} onChange={(e) => handleStockFieldChange(index, e)} />
                                    </FormControl>
                                    <FormControl sx={{ width: "15ch" }}>
                                        <TextField size="small" type="number" id="outlined-required" label="Stock Quantity" name="stockQuantity" value={itemForm?.stockQuantity} onChange={(e) => handleStockFieldChange(index, e)} />
                                    </FormControl>
                                    <FormControl sx={{ width: "15ch" }}>
                                        <TextField size="small" type="number" id="outlined-required" label="Default Discount" name="defaultDiscount" value={itemForm?.defaultDiscount} onChange={(e) => handleStockFieldChange(index, e)} />
                                    </FormControl>
                                    {
                                        !Boolean(stock.isDefault) ? <Button variant="outlined" bgcolor="primary.main" name="isDefault" onClick={(e) => handleDefaultStockChange(index, e)}>Mark Default</Button > : <Button variant="contained" color="success" startIcon={<DoneIcon />}>Default</Button>
                                    }
                                    <Button variant="contained" color="info" onClick={(e) => handleAddPriceCategory(index, e)}>Add Category</Button>
                                    <Button variant="contained" color="error" onClick={(e) => handleDeleteStock(index, e)}>Delete</Button>
                                </Box>
                                <Box sx={{ borderLeft: 1, borderColor: "grey.500", ml: 2.5 }}>
                                    {
                                        stock?.price &&
                                        stock.price.map((stockPrice, pIndex) => {
                                            return (
                                                <Box key={`item_stock_${index}_price_${pIndex}`} sx={{ display: "flex", gap: 2, pl: 5, mt: 1.5, position: "relative", '&::before': { content: `""`, position: "absolute", height: "1px", width: "40px", bgcolor: "grey.500", left: 0, top: "50%" } }}>

                                                    <FormControl sx={{ minWidth: "20%" }}>
                                                        <InputLabel id="stock-price-category-select-helper-label">Price Category</InputLabel>
                                                        <Select
                                                            size="small"
                                                            labelId="stock-price-category-select-helper-label"
                                                            id="stock-price-category-select-helper"
                                                            label="Price Category"
                                                            onChange={(e) => handleStockPriceFieldChange(index, pIndex)}
                                                            value={stockPrice.priceCategory}
                                                            name="priceCategory">
                                                            <MenuItem key="ispu_none" value="none">None</MenuItem>
                                                            {
                                                                units.map((unit, index) => (
                                                                    <MenuItem key={`ispu_${index}_${unit}`} value={unit}>{unit}</MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl sx={{ width: "15ch" }}>
                                                        <TextField size="small" type="number" id="outlined-required" label="Quantity" name="quantity" value={itemForm?.quantity} onChange={(e) => handleStockPriceFieldChange(index, pIndex, e)} />
                                                    </FormControl>
                                                    <FormControl sx={{ width: "15ch" }}>
                                                        <TextField size="small" type="number" id="outlined-required" label="Retail Price" name="retailPrice" value={itemForm?.retailPrice} onChange={(e) => handleStockPriceFieldChange(index, pIndex, e)} />
                                                    </FormControl>
                                                    <FormControl sx={{ width: "20ch" }}>
                                                        <TextField size="small" type="number" id="outlined-required" label="Wholesale Price" name="wholesalePrice" value={itemForm?.wholesalePrice} onChange={(e) => handleStockPriceFieldChange(index, pIndex, e)} />
                                                    </FormControl>
                                                    <IconButton aria-label="Delete Price Category" onClick={(e) => handleDeleteStockPrice(index, pIndex, e)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}
export default CreateParty;
