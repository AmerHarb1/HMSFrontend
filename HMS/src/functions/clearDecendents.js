// helper: clear all descendants recursively


export function clearDescendants(next, parentKey, parentChildLovMap) {
   if (parentChildLovMap.has(parentKey)) {
      const childKey = parentChildLovMap.get(parentKey); 
      next[childKey] = ""; // clear child 
      // recurse down to grandchild 
      clearDescendants(next, childKey, parentChildLovMap); 
    }
  }