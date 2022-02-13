import { useRef, useState, useEffect } from "react";
import { Button, Divider, Grid, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';

import itemData from './itemData';
import ItemListItem from './ItemListItem';
import ItemDetails from "./ItemDetails";

function ItemLayout() {

    const [selectedItem, setSelectedItem] = useState(null);
    const [filteredItems, setFilteredItems] = useState(itemData);
    const [open, setOpen] = useState(false);
    const searchBarRef = useRef();

    // Add Party Dialog State and functions starts
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        //if item exist than select first one by default
        if (itemData.length) {
            setSelectedItem(itemData[0]);
        }
    }, [])

    //Change Selected Item
    const changeSelectedItem = (item) => {
        setSelectedItem(item);
    }

    //Filter Items Data
    const filterItems = (e) => {
        const searchText = e.target.value;
        const dataToReturn = [];
        const uniqueMap = [];
        if (searchText === "" || searchText === undefined) {
            setFilteredItems(itemData);
            return;
        }
        itemData.forEach((individualItem) => {
            if ((individualItem.shortName.toLowerCase().includes(searchText.toLowerCase()) || individualItem.longName.toLowerCase().includes(searchText.toLowerCase()) || individualItem.company.toLowerCase().includes(searchText.toLowerCase()) || individualItem.description.toLowerCase().includes(searchText.toLowerCase()) || individualItem.category.toLowerCase().includes(searchText.toLowerCase())) && uniqueMap.indexOf(individualItem.id) === -1) {
                dataToReturn.push(individualItem);
                uniqueMap.push(individualItem.id);
            }
        })
        setFilteredItems(dataToReturn);
    }

    return (
        <Box sx={{ position: "relative" }}>
            <Grid container m="auto" sx={{ position: 'relative' }} >
                <Grid item container direction="column" xs={3} sx={{ height: "87vh", boxShadow: 3, backgroundColor: "primary.contrastText" }}>
                    <Grid item sx={{ width: "100%" }}>
                        <Box sx={{ p: 2, width: "100%", m: "auto" }}>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{ width: "100%", mb: 2 }} onClick={handleOpen}>Add Item</Button>
                            <TextField name="search-field" label="Search Items" variant="outlined" sx={{ width: "100%" }} ref={searchBarRef} onChange={filterItems} />
                        </Box>
                        <Divider />
                    </Grid>
                    <Grid item xs sx={{ backgroundColor: "white", overflowY: "auto" }}>
                        <Box>
                            {
                                filteredItems.map((item, index) => <ItemListItem key={index} data={item} changeSelectedItem={changeSelectedItem} isActive={(selectedItem && selectedItem.id === item.id) ? true : false} />)
                            }
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={0.1} />
                <Grid container item xs={8.9} sx={{ height: "87vh", width: "100%" }}>
                    <ItemDetails data={selectedItem} />
                </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: "60%", boxShadow: 24, p: 4, zIndex: 10 }}>

                </Box>
            </Modal>
        </Box>
    );
}

export default ItemLayout;
