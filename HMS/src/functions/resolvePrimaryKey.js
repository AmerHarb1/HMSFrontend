
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

  // combound primary key
  if (rec.pk.code !== undefined && rec.pk.code !== null) {
    return rec.pk.code;
  }

  // combound primary key
  if (rec.pk.itemNumber !== undefined && rec.pk.itemNumber !== null) {
    return rec.pk.itemNumber;
  }

  return null; // nothing usable
}