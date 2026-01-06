export function getHeader() {
  const accessToken = JSON.parse(localStorage.getItem('accessKey'));
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + accessToken,
    withCredentials: true
  };
}