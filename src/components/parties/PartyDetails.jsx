import { Card, CardContent, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';

function PartyDetails({ data }) {
    return (
        <Box sx={{ height: "100%", p: 2 }}>
            {
                data ? (
                    <Box sx={{ display: "flex", height: "100%", width: "100%" }} >
                        <Card sx={{ minWidth: 275, height: "100%" }}>
                            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                <Box sx={{ alignSelf: "center" }}>
                                    <Typography variant="h6" component="div">
                                        {data.name}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {data.partyType}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={[data.currentBalance > 0 ? { color: "success.main" } : { color: "error.main" }, { fontWeight: "bold" }]}>
                                    {data.currentBalance}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Box sx={{ ml: 2, flex: 1, }}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    {
                                        data.billingLocation.map((location, index) => (
                                            <Box component="div" key={index}>
                                                {
                                                    index > 0 && <Divider sx={{ my: 1 }} />
                                                }
                                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                                        <Typography color="text.primary" variant="body2" sx={[location.isDefault && { fontWeight: "bold" }]}>
                                                            {location.billingName}
                                                        </Typography>
                                                        <Typography color="text.primary" variant="body2" sx={[{ textTransform: "uppercase" }, location.isDefault && { fontWeight: "bold" }]}>
                                                            {location.billingType}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                                        <Typography color="text.primary" variant="body2" sx={[location.isDefault && { fontWeight: "bold" }]}>
                                                            {location.billingAddress}
                                                        </Typography>
                                                        <Typography color="text.primary" variant="body2" sx={[location.isDefault && { fontWeight: "bold" }]}>
                                                            {location.billingContactNumber}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </CardContent>
                            </Card>

                        </Box>
                    </Box >
                ) :
                    (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            <Typography fontWeight="bold">
                                No Item Selected, Please Select Some To See Content
                            </Typography>
                        </Box>
                    )
            }
        </Box >
    );
}

export default PartyDetails;
