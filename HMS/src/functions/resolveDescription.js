export function resolveDescription(rec) {

  if (!rec) return null;

  // Prefer numeric id if present
  if (rec.name !== undefined && rec.name !== null) {
    return rec.name;
  }

  // Fallback to code if id is missing
  if (rec.description !== undefined && rec.description !== null) {
    //if(rec.description.indexOf('-') > 0){
      //return rec.description.substring(rec.description.substring(rec.description.indexOf('-') + 1));
    //}
    return rec.description;
  }

  // combound primary key
  if (rec.username !== undefined && rec.username !== null) {
    return rec.username;
  }

  return null; // nothing usable
}