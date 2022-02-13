const data = [
    {
        "party": {
            "partyId": 1,
            "partyName": "Deepak Bisht",
            "billingLocation": {
                "billingName": "Deepak's House",
                "billingAddress": "Golna Karadiya Almora",
                "billingContactNumber": "+919675697987",
                "billingType": "retail"
            }
        },
        "items": [
            {
                "shortName": "",
                "longName": "",
                "company": "",
                "stock": {
                    "stockName": "stock-old",
                    "priceCategory": "single",
                    "quantity": "1",
                    "price": "5"
                },
                "quantity": "150",
                "subToal": "(150/1)*5 : [(quantity/stock.quantity)*stock.price]",
                "tax": "pick from item",
                "discount": "",
                "total": "(subTotal + tax) - discount"
            }
        ],
        "price": {
            "subTotal": "1100 : complete subTotal of all items",
            "tax": "100 : complete tax of all items",
            "discount": "200 : : complete discount of all items",
            "total": "1000 : : complete total of all items"
        },
        "payment": [
            {
                "type": "cash",
                "amount": "100"
            },
            {
                "type": "gpay",
                "amount": "400"
            }
        ],
        "status": "PARTIALLY_PAID",
        "due": "-500",
        "dueDate": "",
        "creationDate": "",
        "history": [
            {
                "type": "update"
            }
        ]
    }
]

export default data;