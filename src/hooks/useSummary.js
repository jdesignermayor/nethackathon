const URL_API = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export function useSummary() {
  const getSummaryById = (user_id) => {
    return fetch(
      `${URL_API}/Goal/GetGoalsStatusByUserId?userId=${user_id}`
    ).then((response) => response.json());
  };

  return {
    getSummaryById,
  };
}
