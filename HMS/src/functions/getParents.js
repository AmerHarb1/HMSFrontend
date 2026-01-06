import {  getMapKeyByValue } from "./getMapKeyByValue.js";
// helper: get all parents recursively
export function getParents(parents, parentKey, parentChildLovMap) {
    const valuesArray = [...parentChildLovMap.values()];
    let parent=""
   if (valuesArray.includes(parentKey)) { //is parentKey a child of another parent
      parent = getMapKeyByValue(parentChildLovMap, parentKey);
      parents = parent + '-' + parents; // concatenate parents      
      return getParents(parents, parent, parentChildLovMap); // recurse down to grandchild 
    }
    return parents;
  }