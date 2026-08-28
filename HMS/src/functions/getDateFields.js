export function getDateFields(tabData, setDateCols) {
    //console.log(tabData)
    tabData.forEach((k) => {
        if (k.endsWith("Date")) {
            setDateCols((prev) => [...prev, k]);
        };
    });
}