export default function getNameInitials(nameString) {
    if (nameString) {
        return nameString.split(" ").reduce((previousValue, currentValue) => { return previousValue + currentValue.substring(0, 1) }, '');
    } else {
        return ''
    }
}