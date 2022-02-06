const sanitizeGridData = (data) => {
    let sanitizedData = [];
    data.forEach((item) => {

        sanitizedData.push({
            id: item.party.partyId,
            name: item.party.partyName,
            type: item.party.billingLocation.billingType,
            billingName: item.party.billingLocation.billingName,
            billingContactNumber: item.party.billingLocation.billingContactNumber,
            billingAddress: item.party.billingLocation.billingAddress,
            items: item.items.length,
            total: item.price.total,
            status: item.status,
            creationDate: item.creationDate
        })
    });
    return sanitizedData;
}

export default sanitizeGridData;