import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

function PartyDetails({ data }) {
    console.log(data)
    return (
        <Box>
            {data && (
                <>
                    <Typography>
                        {data.id} | {data.name} | {data.partyType}
                    </Typography>

                    {
                        data.billingLocation.map((location, index) => (
                            <Typography key={index}> {location.billingName} | {location.billingAddress} | {location.billingContactNumber}</Typography>
                        ))
                    }
                </>
            )
            }
        </Box>
    );
}

export default PartyDetails;
