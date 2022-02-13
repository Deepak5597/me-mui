const saleReducer = (state, action) => {
    switch (action.key) {
        case "PARTY_CHANGED":
            const selectedPartyId = action.value;
            const selectedParty = state.partyData.filter((party) => party.id === selectedPartyId);
            const defaultBillingLocation = selectedParty[0].billingLocation.length && selectedParty[0].billingLocation[0];
            return { ...state, billingType: defaultBillingLocation.billingType, "billingLocationDropdownData": selectedParty[0].billingLocation, "partyDetails": { ...state.partyDetails, party: selectedParty[0], selectedParty: selectedParty[0].id, billingLocation: defaultBillingLocation } };
        case "BILLING_LOCATION_CHANGED":
            const selectedBillingName = action.value;
            const selectedBillingLocation = state.billingLocationDropdownData.filter((bl) => bl.billingName === selectedBillingName);
            return { ...state, billingType: selectedBillingLocation[0].length ? selectedBillingLocation[0].billingType : "retail", "partyDetails": { ...state.partyDetails, billingLocation: selectedBillingLocation.length && selectedBillingLocation[0] } };
        case "SALE_FINISH":
            console.log(action.value);
            return { ...state }
        default:
            return state;
    }
}

export default saleReducer;