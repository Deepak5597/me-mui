import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

function ItemStock({ stock }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", gap: 1 }}>
            <Box>
                <Typography variant="h6" textTransform="uppercase" sx={{ fontWeight: "bold", fontSize: "medium", width: "max-content", borderRadius: 1 }} >
                    {stock.stockName} &nbsp;|&nbsp; {stock.quantity}
                </Typography>
            </Box>

            {stock?.price.map((pc, index) =>
            (
                <Card sx={{ width: "100%", ":hover": { bgcolor: "grey.100" } }} key={`${stock.stockName}_${index}`} >
                    <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1, m: 0 }}>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" component="h6">
                                Cateogry
                            </Typography>
                            <Typography variant="subtitle2" component="h6" fontWeight="bold" textTransform="uppercase">
                                {pc.priceCategory}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" component="h6">
                                Quantity
                            </Typography>
                            <Typography variant="subtitle2" component="h6" fontWeight="bold">
                                {pc.quantity}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" component="h6">
                                Retail Price
                            </Typography>
                            <Typography variant="subtitle2" component="h6" fontWeight="bold">
                                {pc.retailPrice}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" component="h6">
                                Wholesale Price
                            </Typography>
                            <Typography variant="subtitle2" component="h6" fontWeight="bold">
                                {pc.wholesalePrice}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            )
            )}
        </Box>
    );
}

export default ItemStock;
