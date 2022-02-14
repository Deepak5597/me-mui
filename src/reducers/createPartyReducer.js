
const createPartyReducer = (state, action) => {

    const preparePartyData = () => {
        const billingLocations = state.billingLocation.map(bl => {
            if (!bl.billingContactNumber.startsWith("+91")) {
                return { ...bl, billingContactNumber: "+91".concat(bl.billingContactNumber) }
            }
            return bl;
        })
        return { name: state.name, partyType: state.partyType, currentBalance: state.currentBalance, billingLocations: billingLocations }
    }

    switch (action.key) {
        case "LOADING":
            return { ...state, isLoading: true };
        case "PARTY_FIELD_CHANGED":
            const actionData = action.value;
            return { ...state, showMessage: false, [actionData.field]: actionData.newValue };
        case "PARTY_LOCATION_ADD":
            if (state.billingLocation.length > 0) {
                return { ...state, billingLocation: [...state.billingLocation, { billingName: "default", billingAddress: "default", billingContactNumber: "", billingType: "retail", isDefault: false }] };
            } else {
                return { ...state, billingLocation: [...state.billingLocation, { billingName: "default", billingAddress: "default", billingContactNumber: "", billingType: "retail", isDefault: true }] };
            }
        case "PARTY_LOCATION_CHANGED":
            const plcAtionData = action.value;
            const newBillingLocation = state.billingLocation.map((location, index) => {
                if (Number(plcAtionData.locationIndex) === index) {
                    return { ...location, [plcAtionData.field]: plcAtionData.newValue }
                } else {
                    return { ...location };
                }
            })
            return { ...state, billingLocation: newBillingLocation, showMessage: false };
        case "PARTY_DEFAULT_LOCATION_CHANGED":
            const pdlAtionData = action.value;
            const newPdlBillingLocation = state.billingLocation.map((location, index) => {
                if (Number(pdlAtionData.locationIndex) === index) {
                    return { ...location, [pdlAtionData.field]: true }
                } else {
                    return { ...location, [pdlAtionData.field]: false };
                }
            })
            return { ...state, billingLocation: newPdlBillingLocation, showMessage: false };
        case "PARTY_FINISH":
            if (state.name === undefined || state.name === "") {
                return { ...state, isLoading: false, showMessage: true, message: "Party Name is Mandatory", isSuccess: false };
            }
            const invalidBl = state.billingLocation.filter(bl => ((bl.billingName === "undefined" || bl.billingName === "") || (bl.billingContactNumber === "undefined" || bl.billingContactNumber === "")));
            if (invalidBl.length) {
                return { ...state, isLoading: false, showMessage: true, message: "Some of the Location is missing, either Name or Contact Number", isSuccess: false };
            }
            const partyToAdd = preparePartyData(state);
            console.log(partyToAdd)
            return { ...state, isLoading: false, showMessage: true, message: "Party Add Successfully", isSuccess: true }
        default:
            return state;
    }
}

export default createPartyReducer;
