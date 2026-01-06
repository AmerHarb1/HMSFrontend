export function getMapKeyByValue(map, targetValue) {
  for (const [key, value] of map.entries()) {
    if (value === targetValue) { // Strict equality check
      return key; 
    }
  }
  return undefined; // No match found
}