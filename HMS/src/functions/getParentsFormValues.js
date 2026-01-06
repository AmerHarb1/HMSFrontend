export function getParentsFormValues(formData, parents){
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