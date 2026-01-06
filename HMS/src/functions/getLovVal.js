export function getLovVal(lov, descr) {
    if (!Array.isArray(lov)) 
        return null; 
    const clean = s => s?.trim().toLowerCase(); 
    const match = lov.find(item => clean(item.description) === clean(descr) || clean(item.name) === clean(descr));
    if (!match) 
        return null; // Case A: code at top level 
    if (match.code) 
        return match.code; // Case B: code inside pk 
    if (match.pk?.code) 
        return match.pk.code; 
    if (match.pk?.itemNumber) 
        return match.pk.itemNumber; 
    return null; 
}