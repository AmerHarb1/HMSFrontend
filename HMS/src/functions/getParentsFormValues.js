export function getParentsFormValues(formData, parents){
    if (parents === undefined){
        return null;
    }
    const parentArray = parents.split('-');
    let values = ""
    Object.entries(formData).forEach(([key, value]) => {         
        if (parentArray.includes(key)) { 
            //console.log(key + '-' + value)
            values = values ? `${values}-${value}` : value; 
        } 
    });
    return values;
}