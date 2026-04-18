export function normalizeBoolean(v){
    if (v === true || v === false) return v;
    if (v === "true" || v === "Y" || v === "1" || v === 1) return true;
    return false;
}