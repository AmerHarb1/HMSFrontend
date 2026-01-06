import {  getParents } from "./getParents.js";
import {  getParentsFormValues } from "./getParentsFormValues.js";
import {  fetchInitParentLov } from "./fetchInitParentLov.js";
import {  getMapKeyByValue } from "./getMapKeyByValue.js";

export async function lovInit(formData, field, parentChildLovMap, headers, linkLov) {
    const valuesArray = [...parentChildLovMap.values()];
        let parents = ""; 
        let parent = "";   
        if (valuesArray.includes(field)) { //is field a child of another parent
            parent = getMapKeyByValue(parentChildLovMap, field);
            parents = parent
            parents = getParents(parents, parent, parentChildLovMap); //get the parent of the changed field, if any
            const parentValues = getParentsFormValues(formData, parents); //get the concatenated values of parents
            return fetchInitParentLov(linkLov, field, parentValues, headers);
        }
    }