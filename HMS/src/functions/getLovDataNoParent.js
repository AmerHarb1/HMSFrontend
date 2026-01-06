import {  lovInit } from "./lovInit.js";
import { fetchInitLov } from "./fetchInitLov.js";
import { getLovVal } from "./getLovVal.js";

export async function getLovDataNoParent(tabData, formData, setParentChildLovMap, setLovMap, linkLov, headers, setDateCols, setFormData) {
    console.log(formData)
    const localLovMap = new Map();
    const localParentChildMap = new Map(); 
    let keys = tabData;
    let row = Array.isArray(formData) ? formData[0] : formData;
    const lovCols = keys.filter(  
        (key) =>
            typeof row[key] === "string" && row[key].includes(String.fromCharCode(31)) //filter fields that their value includes ascii char 31, they are the Lov fields
        );

    // 1) Build a local parent-child map (not state) 
    for (const key of lovCols) { 
        const value = row[key]; 
        const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1).trim(); //get string after chr(13), it's parent
        if (parent) { 
            // parent can have multiple children; store as array 
            //const existing = localParentChildMap.get(parent) || []; 
            localParentChildMap.set(parent, key); 
        } 
    }

    // 2. Load localLovMap
    for (const key of lovCols) {
        const value = row[key]; 
        let lov="";
        let val="";
        let rootLov="";
        let pk="";
        let descr="";
        const parent = value.substring(value.indexOf(String.fromCharCode(31)) + 1) .trim(); //the text after chr(13) is the parent
        if (!parent) { // Root LOV 
            lov = await fetchInitLov(linkLov, key, headers);
            descr = row[key].split(String.fromCharCode(31))[0];
            pk = getLovVal(lov, descr);
             if (pk) { 
                row[key] = pk;
             }
        } else { // Child LOV 
            descr = row[key].split(String.fromCharCode(31))[0];
            rootLov = await fetchInitLov(linkLov, key, headers);
            pk = getLovVal(rootLov, descr);
            if (pk) { 
                row[key] = pk; 
                lov = await lovInit(row, key, localParentChildMap, headers, linkLov); 
            } 
        }
        localLovMap.set(key, lov);
        
        if (val){
            row[key] = val;
        }
    }
    
    // 3. Push final maps into React state 
    setLovMap(localLovMap); 
    setParentChildLovMap(localParentChildMap); 
    setFormData(row);

    keys.forEach((k) => {
        if (k.endsWith("Date")) {
            setDateCols((prev) => [...prev, k]);
        }
    });

}