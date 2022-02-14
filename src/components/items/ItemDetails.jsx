import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import ItemStock from "./ItemStock";

function ItemDetails({ data }) {

    return (
        <>
            {data &&
                <>
                    <Grid item xs={3} sx={{ height: "100%" }}>
                        <Card sx={{ height: "100%", width: "100%", overflowY: "auto" }}>
                            <CardContent sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                <Box sx={{ boxShadow: 2, p: 1, minWidth: "100%" }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Short Name
                                    </Typography>
                                    <Typography variant="subtitle" component="div" fontWeight="bold">
                                        {data.shortName}
                                    </Typography>
                                </Box>
                                <Box sx={{ boxShadow: 2, p: 1, minWidth: "100%" }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Long Name
                                    </Typography>
                                    <Typography variant="subtitle" component="div" fontWeight="bold">
                                        {data.longName}
                                    </Typography>
                                </Box>
                                <Box sx={{ boxShadow: 2, p: 1, minWidth: "100%" }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Product Category
                                    </Typography>
                                    <Typography variant="subtitle" component="div" fontWeight="bold">
                                        {data.category}
                                    </Typography>
                                </Box>
                                <Box sx={{ boxShadow: 2, p: 1, minWidth: "100%" }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Tax Rate
                                    </Typography>
                                    <Typography variant="subtitle" component="div" fontWeight="bold">
                                        {data.tax}%
                                    </Typography>
                                </Box>
                                <Box sx={{ boxShadow: 2, p: 1, minWidth: "100%" }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Description
                                    </Typography>
                                    <Typography variant="subtitle" component="div" fontWeight="bold">
                                        {data.description}
                                    </Typography>
                                </Box>
                                <Box sx={{ boxShadow: 2, p: 1, minWidth: "100%" }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Total Quantity
                                    </Typography>
                                    <Typography variant="subtitle" component="div" fontWeight="bold">
                                        {data.stock.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.quantity), 0)}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={0.1} />
                    <Grid item xs={8.9} columnGap={1} sx={{ height: "100%", overflowY: "auto" }} >
                        {
                            data.stock.map((individualStock, index) => {
                                return (
                                    <Card key={`stock_${index}`} sx={{ mb: 1 }}>
                                        <CardContent>
                                            <ItemStock stock={individualStock} />
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </Grid>
                </>
            }
        </>
    );
}

export default ItemDetails;
