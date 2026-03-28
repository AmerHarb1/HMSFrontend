import {  getParents } from "./getParents.js";
import {  getParentsFormValues } from "./getParentsFormValues.js";
import {  fetchChildLov } from "./fetchChildLov.js";

export  function lovChange(updatedFormData, field, parentChildLovMap, setLovMap, headers, linkLov, localLovMapRef) {
    if (!(parentChildLovMap instanceof Map)) {
        console.warn("parentChildLovMap is not a Map:", parentChildLovMap);
        return;
    }

    // If this field is not a parent of any LOV, stop
    if (!parentChildLovMap.has(field)) return;

    // Get ALL children of this parent
    const childKeys = parentChildLovMap.get(field);   // <-- now an array
    if (!Array.isArray(childKeys)) return;

    // Get all parents in the chain (grandparents, etc.)
    const parents = getParents(field, field, parentChildLovMap);
    const parentValues = getParentsFormValues(updatedFormData, parents);

    // Fetch LOV for each child
    childKeys.forEach((childKey) => {
        fetchChildLov(
            linkLov,
            childKey,
            parentValues,
            headers,
            setLovMap,
            localLovMapRef,
            updatedFormData[childKey]
        );
    });
    }