export function getCheckBoxData(tabData, tabDataValues, setCheckBoxMap) {
    //console.log(tabData)
    //console.log(tabDataValues)
    let keys = tabData;
    const row = Array.isArray(tabDataValues) ? tabDataValues[0] : tabDataValues;
    const checkBoxCols = keys.filter(
        (key) => typeof row[key] === "boolean"            
    );
   // console.log(checkBoxCols)
    checkBoxCols.forEach((k) => {
            setCheckBoxMap((prev) => [...prev, k]);
    });
}
