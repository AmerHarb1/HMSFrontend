import axios from 'axios';
import dayjs from "dayjs";
// 👉 Fetch LOV data for a field
export async function fetchInitLov(linkLov, key, headers, currentValue, localLovMapRef) {
  try {
    //console.log(`${linkLov}${key}Lov`)
    const res = await axios.get(`${linkLov}${key}Lov`, { headers });
    const lov = res.data
  
    localLovMapRef?localLovMapRef.current?localLovMapRef.current.set(key, lov):null:null;
   
  const today = dayjs();

    const isActive = (row) =>
        (!row.effectiveDate || dayjs(row.effectiveDate).isBefore(today)) &&
        (!row.expireDate || dayjs(row.expireDate).isAfter(today));

    const activeLov = lov.filter(isActive);

    const currentRow = lov.find(r => r.value === currentValue);

    let finalLov = activeLov;

    if (currentRow && !isActive(currentRow)) {
        finalLov = [ { ...currentRow, disabled: true }, ...activeLov ];
    }

    return finalLov; // return LOV list
  } catch (error) {
    console.log(`${linkLov}${key}Lov`)
    console.warn("response", error.response?.data);
  }
}