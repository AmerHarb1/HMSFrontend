import axios from 'axios';
import dayjs from "dayjs";
// 👉 Fetch child LOV when parent changes
export async function fetchChildLov(linkLov, childKey, parentValue, headers, setLovMap, localLovMapRef, currentValue) { 
  try {  
  //  console.log(`${linkLov}${childKey}Lov/${parentValue}`); 
    const res = await axios.get(`${linkLov}${childKey}Lov/${parentValue}`, { headers }); 
  //  console.log(res)
/*    setLovMap(prev => {
      const next = new Map(prev);   // clone existing
      next.set(childKey, res.data); // update child only
      return next;

*/
  const lov = res.data
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

  setLovMap(prev => new Map(prev).set(childKey, finalLov));

  // Sync state LOVs into the ref
  localLovMapRef.current.set(childKey, lov);
   
  } catch (error) { 
    const backendError = error.response?.data;
/*
    throw {
      message: backendError?.message || "Failed to load LOV",
      stackTrace: backendError?.stackTrace,
      exceptionDate: backendError?.exceptionDate
    }; 
    */
  } 
}