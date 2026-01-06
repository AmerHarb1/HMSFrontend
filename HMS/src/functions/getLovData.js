import {  fetchLov } from "./fetchLov.js";
export function getLovData(tabData, tabDataValues, setParentChildLovMap, setLovMap, linkLov, headers, setDateCols) {
    
    let keys = tabData;
    const row = Array.isArray(tabDataValues) ? tabDataValues[0] : tabDataValues;
    const lovCols = keys.filter(
        (key) => typeof row[key] === "string" &&
            row[key].includes(String.fromCharCode(31)) //filter fields that their value includes ascii char 31, they are the Lov fields
    );
    lovCols.forEach((key) => {
        const value = row[key];
        const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1).trim();
        if (parent) {
            setParentChildLovMap((prev) => new Map(prev).set(parent, key)); //create map that holds the parent child
            setLovMap((prev) => new Map(prev).set(key, []));
        } else {
            fetchLov(linkLov, key, headers, setLovMap);
        }
    });

    keys.forEach((k) => {
        if (k.endsWith("Date")) {
            setDateCols((prev) => [...prev, k]);
        }
    });
}
