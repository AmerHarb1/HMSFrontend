import {resolvePrimaryKey} from "./resolvePrimaryKey.js";
export function fixFormDataLov(lovMap, formData, tabData, setFormData, checkBoxMap) {
    if (lovMap.size > 0 ) {
        const updated = { ...formData };
        tabData.forEach(key => {
            if (checkBoxMap.includes(key)) return; // ← skip booleans
            //if (key.startsWith("product")) return;
            if (lovMap.has(key)) {
                const options = lovMap.get(key) || [];
                const rawValue = formData[key]; // ✅ use the correct row
                let displayValue = rawValue;
                if (typeof rawValue === "string" && rawValue.includes(String.fromCharCode(31))) {
                    displayValue = rawValue.substring(0, rawValue.indexOf(String.fromCharCode(31)));
                }

                const match = options.find(
                    opt => opt.name === displayValue || opt.username === displayValue || opt.description === displayValue
                );
                if (match) {
                    updated[key] = resolvePrimaryKey(match);// for lov fields, set the value to the id/code instead of the description/name
                }
                    
            }
        });
        setFormData(updated);
    }
}
