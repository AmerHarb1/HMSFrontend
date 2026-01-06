import {  getParents } from "./getParents.js";
import {  getParentsFormValues } from "./getParentsFormValues.js";
import {  fetchChildLov } from "./fetchChildLov.js";

export  function lovChange(updatedFormData, field, parentChildLovMap, setLovMap, headers, linkLov) {
        if (!(parentChildLovMap instanceof Map)) { 
            console.warn("parentChildLovMap is not a Map:", parentChildLovMap); 
            return; 
        } 
        
        if (!parentChildLovMap.has(field)) 
            return; 
        
        const childKey = parentChildLovMap.get(field); 
        let parents = getParents(field, field, parentChildLovMap); 
        const parentValues = getParentsFormValues(updatedFormData, parents); 
        fetchChildLov(linkLov, childKey, parentValues, headers, setLovMap);
    }