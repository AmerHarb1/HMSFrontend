export function removeChr31(serviceFormData) {
    const newRow = {};
    console.log(serviceFormData)
    Object.entries(serviceFormData).forEach(([key, value]) => {
        if (typeof value === "string" && value.includes(String.fromCharCode(31))) {
            console.log(value)
            newRow[key] = value.substring(0, value.indexOf(String.fromCharCode(31))); //If the value contains ASCII 31, it strips everything after it.
            console.log(newRow[key])
        } else {
            newRow[key] = value;
        }
    });
    console.log(newRow)
    return newRow;
}
