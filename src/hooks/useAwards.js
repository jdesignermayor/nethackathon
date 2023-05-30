const URL_API = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export function useAwards() {
  const getAwardsById = (user_id) => {
    return fetch(`${URL_API}/Award/GetAwardsByUserId?userId=${user_id}`).then(
      (response) => response.json()
    );
  };

  return {
    getAwardsById,
  };
}
