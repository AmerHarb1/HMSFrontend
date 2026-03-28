import axios from 'axios';
import dayjs from "dayjs";
// 👉 Fetch LOV data for a field
export async function fetchLov(linkLov, key, headers, setLovMap, currentValue) {
  try {
    const lov = await axios.get(`${linkLov}${key}Lov`, { headers })
                           .then(res => res.data);
    //console.log(lov)
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
    setLovMap(prev => new Map(prev).set(key, finalLov));
    
  } catch (error) {
    console.log(`${linkLov}${key}`)
    console.warn("response", error.response?.data);
  }
}