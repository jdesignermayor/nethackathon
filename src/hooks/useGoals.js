const URL_API = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export function useGoals() {
  const getGoalsById = (user_id) => {
    return fetch(`${URL_API}/Goal/GetGoalsByUserId?userId=${user_id}`).then(
      (response) => response.json()
    );
  };

  const insertGoal = (props) => {
    const { id_user, title, description, date_init, date_end, frecuency } =
      props;

    return fetch(`${URL_API}/Goal/CreateGoal`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUser: String(id_user),
        title,
        description,
        isActive: true,
        frecuency,
        dateInit: new Date(date_init).toISOString(),
        dateEnd: new Date(date_end).toISOString(),
      }),
    });
  };

  const editGoal = (props) => {
    const { id, id_user, title, description, date_init, date_end, frecuency } = props;
    console.log("props", props);

    return fetch(`${URL_API}/Goal/UpdateGoal`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        idUser: id_user,
        title,
        description,
        frecuency,
        isActive: true,
        dateInit: date_init,
        dateEnd: date_end,
      }),
    });
  };

  const deleteGoal = (id) => {
    return fetch(`${URL_API}/Goal/DeleteGoalById?goalId=${id}`, {
      method: "DELETE",
    });
  };

  return {
    getGoalsById,
    insertGoal,
    deleteGoal,
    editGoal,
  };
}
