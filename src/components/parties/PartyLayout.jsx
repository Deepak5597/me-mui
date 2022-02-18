import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';

import PartyListItem from './PartyListItem';
import PartyDetails from "./PartyDetails";
import PartyTransactions from "./PartyTransactions";
import useGlobal from '../../hooks/useGlobal';

function PartyLayout() {
    const [selectedParty, setSelectedParty] = useState(null);
    const [filteredParties, setFilteredParties] = useState([]);
    const searchBarRef = useRef();
    const { parties } = useGlobal();

    const navigate = useNavigate();

    useEffect(() => {
        //if party exist than select first one by default
        if (parties.length) {
            setSelectedParty(parties[0]);
            setFilteredParties(parties);
        }
    }, [parties])

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
            setFilteredParties(parties);
            return;
        }

        parties.forEach((individualParty) => {
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

    const handleAddParty = () => {
        navigate("/parties/create", { state: { from: "/parties" } });
    }
    return (
        <Box sx={{ position: "relative" }}>
            <Grid container m="auto" sx={{ position: 'relative' }} >
                <Grid item container direction="column" xs={3} sx={{ height: "87vh", boxShadow: 3, backgroundColor: "primary.contrastText" }}>
                    <Grid item sx={{ width: "100%" }}>
                        <Box sx={{ p: 2, width: "100%", m: "auto" }}>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{ width: "100%", mb: 2 }} onClick={handleAddParty}>Add Party</Button>
                            <TextField size="small" name="search-field" label="Search Parties" variant="outlined" sx={{ width: "100%" }} ref={searchBarRef} onChange={filterParties} />
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
        </Box>
    );
}

export default PartyLayout;
