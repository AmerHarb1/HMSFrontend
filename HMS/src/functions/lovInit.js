import {  getParents } from "./getParents.js";
import {  getParentsFormValues } from "./getParentsFormValues.js";
import {  fetchInitParentLov } from "./fetchInitParentLov.js";

export async function lovInit(formData, field, parentChildLovMap, headers, linkLov) {
    //console.log(parentChildLovMap);
    // 1. Find all parents whose children array contains this field
    const parents = [];
    for (const [parent, children] of parentChildLovMap.entries()) {
        if (Array.isArray(children) && children.includes(field)) {
            parents.push(parent);
        }
    }
    //console.log(parents);
    // If field is not a child of any parent, nothing to do
    if (parents.length === 0) {
        return;
    }

    // 2. Build the full parent chain (recursive)
    let allParents = "";
    for (const parent of parents) {
        let chain = parent;
        chain = getParents(chain, parent, parentChildLovMap); 
        allParents += chain + ",";
    }

    // Remove trailing comma
    allParents = allParents.replace(/,$/, "");
    //console.log(allParents);
    // 3. Get parent values from formData
    const parentValues = getParentsFormValues(formData, allParents);
    //console.log(parentValues);
    // 4. Fetch LOV for this field
    return fetchInitParentLov(linkLov, field, parentValues, headers);
}