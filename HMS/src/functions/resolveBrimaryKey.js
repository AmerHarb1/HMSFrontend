
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

  return null; // nothing usable
}