export function getTextAreaFields(tabData, setTextAreaMap) {
   // console.log(tabData)
    tabData.forEach((k) => {
        if (k.endsWith("TextArea")) {
            setTextAreaMap((prev) => [...prev, k]);
        };
    });
    
}