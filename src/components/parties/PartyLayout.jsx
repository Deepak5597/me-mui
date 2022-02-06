import { useRef, useState, useEffect } from "react";
import { Button, Divider, Grid, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';

import PartyListItem from './PartyListItem';
import partyData from './partyData';
import PartyDetails from "./PartyDetails";
import CreateParty from "./CreateParty";
import PartyTransactions from "./PartyTransactions";

function PartyLayout() {

    const [selectedParty, setSelectedParty] = useState(null);
    const [filteredParties, setFilteredParties] = useState(partyData);
    const [open, setOpen] = useState(false);
    const searchBarRef = useRef();

    // Add Party Dialog State and functions starts
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        //if party exist than select first one by default
        if (partyData.length) {
            setSelectedParty(partyData[0]);
        }
    }, [])

    //Change Selected Party
    const changeSelectedParty = (party) => {
        setSelectedParty(party);
    }

    //Filter Parties Data
    const filterParties = (e) => {
        const searchText = e.target.value;
        const dataToReturn = [];
        const uniqueMap = [];
        if (searchText === "" || searchText === undefined) {
            setFilteredParties(partyData);
            return;
        }

        partyData.forEach((individualParty) => {
            if (individualParty.name.toLowerCase().includes(searchText.toLowerCase()) && uniqueMap.indexOf(individualParty.name) === -1) {
                dataToReturn.push(individualParty);
                uniqueMap.push(individualParty.name);
            } else {
                individualParty.billingLocation.forEach((ibl) => {
                    if (ibl.billingContactNumber.includes(searchText) && uniqueMap.indexOf(individualParty.name) === -1) {
                        dataToReturn.push(individualParty);
                        uniqueMap.push(individualParty.name);
                        return;
                    }
                })
            }
        })
        setFilteredParties(dataToReturn);
    }

    return (
        <Box sx={{ position: "relative" }}>
            <Grid container m="auto" sx={{ position: 'relative' }} >
                <Grid item container direction="column" xs={3} sx={{ height: "89vh", boxShadow: 3, backgroundColor: "primary.contrastText" }}>
                    <Grid item sx={{ width: "100%" }}>
                        <Box sx={{ p: 2, width: "100%", m: "auto" }}>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{ width: "100%", mb: 2 }} onClick={handleOpen}>Add Party</Button>
                            <TextField name="search-field" label="Search Parties" variant="outlined" sx={{ width: "100%" }} ref={searchBarRef} onChange={filterParties} />
                        </Box>
                        <Divider />
                    </Grid>
                    <Grid item xs sx={{ backgroundColor: "white", overflowY: "auto" }}>
                        <Box>
                            {
                                filteredParties.map((party, index) => <PartyListItem key={index} data={party} changeSelectedParty={changeSelectedParty} isActive={(selectedParty && selectedParty.id === party.id) ? true : false} />)
                            }
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={0.1} />
                <Grid item container direction="column" xs={8.9}>
                    <Grid item sx={{ boxShadow: 3, backgroundColor: "primary.contrastText" }}>
                        <PartyDetails data={selectedParty} />
                    </Grid>
                    <Grid item xs={0.2} sx={{}} />
                    <Grid item container direction="column" xs sx={{ boxShadow: 3, backgroundColor: "primary.contrastText" }}>
                        <PartyTransactions data={selectedParty} />
                    </Grid>
                </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: "60%", boxShadow: 24, p: 4, zIndex: 10 }}>
                    <CreateParty />
                </Box>
            </Modal>
        </Box>
    );
}

export default PartyLayout;
