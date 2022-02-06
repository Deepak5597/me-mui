import { Box, Card, CardContent, Typography } from "@mui/material";

function ItemDetails({ data }) {

    return (
        <>
            {data &&
                <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ flex: 1 }}>
                        <Card sx={{ height: "100%", width: "100%" }}>
                            <CardContent sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                <Box sx={{ boxShadow: 2, p: 1, borderRadius: 3, minWidth: 200 }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Short Name
                                    </Typography>
                                    <Typography variant="h6" component="div" fontSize="large">
                                        {data.shortName}
                                    </Typography>
                                </Box>
                                <Box sx={{ boxShadow: 2, p: 1, borderRadius: 3, minWidth: 200, maxWidth: 350 }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Company
                                    </Typography>
                                    <Typography variant="h6" component="div" fontSize="large">
                                        {data.company}
                                    </Typography>
                                </Box>
                                <Box sx={{ boxShadow: 2, p: 1, borderRadius: 3, minWidth: 200, maxWidth: 350 }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Long Name
                                    </Typography>
                                    <Typography variant="h6" component="div" fontSize="large">
                                        {data.longName}
                                    </Typography>
                                </Box>
                                <Box sx={{ boxShadow: 2, p: 1, borderRadius: 3, minWidth: 200, maxWidth: 350 }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Category
                                    </Typography>
                                    <Typography variant="h6" component="div" fontSize="large">
                                        {data.category}
                                    </Typography>
                                </Box>
                                <Box sx={{ boxShadow: 2, p: 1, borderRadius: 3, minWidth: 200, maxWidth: 350 }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Tax Rate
                                    </Typography>
                                    <Typography variant="h6" component="div" fontSize="large">
                                        {data.tax}
                                    </Typography>
                                </Box>
                                <Box sx={{ boxShadow: 2, p: 1, borderRadius: 3, minWidth: 200, maxWidth: 350 }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Description
                                    </Typography>
                                    <Typography variant="h6" component="div" fontSize="large">
                                        {data.description}
                                    </Typography>
                                </Box>
                                <Box sx={{ boxShadow: 2, p: 1, borderRadius: 3, minWidth: 200 }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Total Quantity
                                    </Typography>
                                    <Typography variant="h6" component="div" fontSize="large">
                                        {data.stock.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.quantity), 0)}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{ bgcolor: "pink", flex: 3 }}>

                    </Box>
                </Box>
            }
        </>
    );
}

export default ItemDetails;
