
const createPartyReducer = (state, action) => {
    switch (action.key) {
        case "LOADING":
            return { ...state, isLoading: true, isSuccess: true, message: '' };
        case "PARTY_FIELD_CHANGED":
            const actionData = action.value;
            return { ...state, [actionData.field]: actionData.newValue };
        case "PARTY_LOCATION_ADD":
            if (state.billingLocation.length > 0) {
                return { ...state, billingLocation: [...state.billingLocation, { billingName: "default", billingAddress: "default", billingContactNumber: "", billingType: "retail", isDefault: false }] };
            } else {
                return { ...state, billingLocation: [...state.billingLocation, { billingName: "default", billingAddress: "default", billingContactNumber: "", billingType: "retail", isDefault: true }] };
            }
        case "PARTY_LOCATION_CHANGED":
            const plcAtionData = action.value;
            const newBillingLocation = state.billingLocation.map((location, index) => {
                if (plcAtionData.locationIndex === index) {
                    return { ...location, [plcAtionData.field]: true }
                } else {
                    return { ...location, [plcAtionData.field]: false };
                }
            })
            return { ...state, billingLocation: newBillingLocation };
        case "PARTY_FINISH":
            console.log(state)
            return state;
        default:
            return state;
    }
}

export default createPartyReducer;
