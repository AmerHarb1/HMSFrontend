export function resolvePrimaryKey(rec) {
  if (!rec) return null;  

  // Prefer numeric id if present
  if (rec.id !== undefined && rec.id !== null) {
    return rec.id;
  }

  // Fallback to code if id is missing
  if (rec.code !== undefined && rec.code !== null) {
    return rec.code;
  }

  // compound primary key: pk.code
  if (rec.pk?.code !== undefined && rec.pk.code !== null) {
    return rec.pk.code;
  }

  // compound primary key: pk.itemNumber
  if (rec.pk?.itemNumber !== undefined && rec.pk.itemNumber !== null) {
    return rec.pk.itemNumber;
  }  

  // Final fallback: use description (so it matches formData)
  return null;
}