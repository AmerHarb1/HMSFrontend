import {  fetchLov } from "./fetchLov.js";
export function getLovData(tabData, tabDataValues, setParentChildLovMap, setLovMap, linkLov, headers) {
    //console.log(tabData)
    //console.log(tabDataValues)
    if (!tabData || !Array.isArray(tabData)) {
        console.warn("getLovData: tabData is undefined or not an array");
        return;
    }

    if (!tabDataValues) {
        console.warn("getLovData: tabDataValues is undefined");
        return;
    }
    let keys = tabData;
    const row = Array.isArray(tabDataValues) ? tabDataValues[0] : tabDataValues;
    const lovCols = keys.filter(    //get LOV fields
        (key) => typeof row[key] === "string" &&
            row[key].includes(String.fromCharCode(31)) //filter fields that their value includes ascii char 31, they are the Lov fields
            
    );
    
    lovCols.forEach((key) => {
        const value = row[key];
        const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1).trim();
        if (parent) {
            //setParentChildLovMap((prev) => new Map(prev).set(parent, key)); //create map that holds the parent single child
            setParentChildLovMap((prev) => {    
                const map = new Map(prev);
                const existing = map.get(parent) || []; 
                map.set(parent, [...existing, key]);    // parent can have multiple children; store as array 
                return map;
            });
            setLovMap((prev) => new Map(prev).set(key, []));
        } else {
           //console.log(key)
            fetchLov(linkLov, key, headers, setLovMap, row[key].split(String.fromCharCode(31))[0]);
            
        }
    });
}
