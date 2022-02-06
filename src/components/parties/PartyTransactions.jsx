import { useEffect, useState } from 'react';

import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';

import PartyDataTable from './PartyDataTable';
import transactionData from './transactionData';

function PartyTransactions({ data }) {

    const [transactions, setTransactions] = useState([]);
    const [isRemotelyFetched, setIsRemotelyFetched] = useState(false);

    useEffect(() => {
        if (data) {
            let ts = [];
            transactionData.forEach(item => {
                if (item.party.partyId === data.id) {
                    ts.push(item)
                }
            })
            setTransactions(ts);
        }
    }, [data])

    const refreshTransaction = () => {
        !isRemotelyFetched && setIsRemotelyFetched(true)
    }
    return (
        <>
            <Grid item xs={1.7} >
                <Box variant="div" sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "100%", pr: 2 }}>
                    {isRemotelyFetched ? <Button variant="contained" onClick={refreshTransaction}> Refresh Transactions</Button>
                        : <Button variant="contained" onClick={refreshTransaction}>Load Transactions</Button>
                    }
                </Box>
            </Grid>
            <Grid item xs>
                {
                    transactions &&
                    <PartyDataTable data={transactions} />
                }
            </Grid>
        </>
    );
}

export default PartyTransactions;
