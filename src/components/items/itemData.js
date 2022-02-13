const data = [
    {
        "id": "1",
        "shortName": "Heater",
        "longName": "2 Coil Heater",
        "description": "2 Coil Heater with controllable flow",
        "company": "Bajaj",
        "tax": "3",
        "category": "Heater : predefined list",
        "stock": [
            {
                "stockName": "stock-old",
                "quantity": "10",
                "price": [
                    {
                        "priceCategory": "single",
                        "quantity": "1",
                        "retailPrice": "1050",
                        "wholesalePrice": "1000"
                    },
                    {
                        "priceCategory": "box",
                        "quantity": "5",
                        "retailPrice": "5100",
                        "wholesalePrice": "4900"
                    }
                ],
                "isDefault": true,
                "defaultDiscount": 100
            },
            {
                "stockName": "stock-2022",
                "quantity": "10",
                "price": [
                    {
                        "priceCategory": "single",
                        "quantity": "1",
                        "retailPrice": "1000",
                        "wholesalePrice": "900"
                    },
                    {
                        "priceCategory": "box",
                        "quantity": "5",
                        "retailPrice": "4900",
                        "wholesalePrice": "4300"
                    }
                ],
                "isDefault": false,
                "defaultDiscount": 0
            },
            {
                "stockName": "stock-new",
                "quantity": "20",
                "price": [
                    {
                        "priceCategory": "single",
                        "quantity": "1",
                        "retailPrice": "1000",
                        "wholesalePrice": "950"
                    },
                    {
                        "priceCategory": "box",
                        "quantity": "5",
                        "retailPrice": "5100",
                        "wholesalePrice": "4700"
                    }
                ],
                "isDefault": false,
                "defaultDiscount": 50
            }
        ]
    },
    {
        "id": "2",
        "shortName": "Blower",
        "longName": "2 Coil Blower",
        "description": "2 Coil Blower with controllable flow",
        "company": "Bajaj",
        "tax": "3",
        "category": "Blower : predefined list",
        "stock": [
            {
                "stockName": "stock-old",
                "quantity": "10",
                "price": [
                    {
                        "priceCategory": "single",
                        "quantity": "1",
                        "retailPrice": "1200",
                        "wholesalePrice": "1100"
                    },
                    {
                        "priceCategory": "box",
                        "quantity": "5",
                        "retailPrice": "5800",
                        "wholesalePrice": "4300"
                    }
                ],
                "isDefault": true,
                "defaultDiscount": 10
            },
            {
                "stockName": "stock-new",
                "quantity": "20",
                "price": [
                    {
                        "priceCategory": "single",
                        "quantity": "1",
                        "retailPrice": "1250",
                        "wholesalePrice": "1200"
                    },
                    {
                        "priceCategory": "box",
                        "quantity": "5",
                        "retailPrice": "6200",
                        "wholesalePrice": "6000"
                    }
                ],
                "isDefault": false,
                "defaultDiscount": 0
            }
        ]
    },
    {
        "id": "3",
        "shortName": "Table Fan",
        "longName": "Table Fan",
        "description": "Table Fan with customizable speed modes",
        "company": "Usha",
        "tax": "3",
        "category": "Fan : predefined list",
        "stock": [
            {
                "stockName": "stock-old",
                "quantity": "5",
                "price": [
                    {
                        "priceCategory": "single",
                        "quantity": "1",
                        "retailPrice": "1050",
                        "wholesalePrice": "1000"
                    }
                ],
                "isDefault": false,
                "defaultDiscount": 40
            },
            {
                "stockName": "stock-new",
                "quantity": "2",
                "price": [
                    {
                        "priceCategory": "single",
                        "quantity": "1",
                        "retailPrice": "1000",
                        "wholesalePrice": "950"
                    }
                ],
                "isDefault": true,
                "defaultDiscount": 0
            }
        ]
    },
    {
        "id": "4",
        "shortName": "LED-BULB-BAJAJ-7W",
        "longName": "Bajaj LED 7W bulb",
        "description": "Bajaj LED 7W bulb",
        "company": "Bajaj",
        "tax": "3",
        "category": "BULB : predefined list",
        "stock": [
            {
                "stockName": "stock-old",
                "quantity": "50",
                "price": [
                    {
                        "priceCategory": "single",
                        "quantity": "1",
                        "retailPrice": "150",
                        "wholesalePrice": "100"
                    },
                    {
                        "priceCategory": "box",
                        "quantity": "10",
                        "retailPrice": "1400",
                        "wholesalePrice": "1000"
                    }
                ],
                "isDefault": false,
                "defaultDiscount": 0
            },
            {
                "stockName": "stock-new",
                "quantity": "100",
                "price": [
                    {
                        "priceCategory": "single",
                        "quantity": "1",
                        "retailPrice": "155",
                        "wholesalePrice": "150"
                    },
                    {
                        "priceCategory": "box",
                        "quantity": "5",
                        "retailPrice": "750",
                        "wholesalePrice": "700"
                    }
                ],
                "isDefault": true,
                "defaultDiscount": 0
            }
        ]
    }
];
export default data;