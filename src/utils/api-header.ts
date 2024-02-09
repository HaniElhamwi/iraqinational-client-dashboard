export const getApiHeader = () => {
  const getAccessToken = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${getAccessToken}`, // Include the JWT in the Authorization header
    'Content-Type': 'application/json',
  };
};
