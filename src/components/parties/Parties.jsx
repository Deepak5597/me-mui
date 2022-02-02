import { useState } from 'react';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import ScrollableWrapper from '../utility/ScrollableWrapper';
import data from './partyData';
import AutoCompleteList from '../utility/AutoCompleteList';
import PartyTabView from './PartyTabView';

function Parties() {
    // const [filterCount, setFilterCount] = useState(data.length);
    const [selectedParty, setSelectedParty] = useState(null);

    const filterContent = (data, searchText) => {
        const dataToReturn = [];
        const uniqueMap = [];
        data.forEach((individualParty) => {
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
        return dataToReturn;
    }

    const selectionEventHandler = (selectedOption) => {
        setSelectedParty(selectedOption);
    }
    return (
        <ScrollableWrapper>
            <Grid container flex-wrap="no-wrap" p={2} height="100%">
                <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                    <Box>
                        <Grid container rowSpacing={5} >
                            <Grid item xs={12} md={4} >
                                <AutoCompleteList data={data} filterContent={filterContent} dataKey="name" label="Search Party Here" selectionEventHandler={selectionEventHandler} category="party" />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", height: "100%", gap: 3 }}>
                                    <Button variant="contained" >Create</Button>
                                    <Button variant="contained" color="secondary">Export</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                        <Grid container mt={3}>
                            <PartyTabView data={selectedParty}></PartyTabView>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </ScrollableWrapper>
    );
}

export default Parties; 
