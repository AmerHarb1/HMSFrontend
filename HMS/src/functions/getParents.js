// helper: get all parents recursively
export function getParents(parents, parentKey, parentChildLovMap) {

    // Find all parents whose children array contains parentKey
    let directParents = [];
    for (const [parent, children] of parentChildLovMap.entries()) {
        if (Array.isArray(children) && children.includes(parentKey)) {
            directParents.push(parent);
        }
    }

    // No parent found → stop recursion
    if (directParents.length === 0) {
        return parents;
    }

    // For each parent, recurse upward
    for (const parent of directParents) {
        parents = parent + "-" + parents;
        parents = getParents(parents, parent, parentChildLovMap);
    }

    return parents;
}