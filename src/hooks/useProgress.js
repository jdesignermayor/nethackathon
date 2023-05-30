import { useState } from "react";

const URL_API = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export function useProgress() {
  const [goalsAndProgressList, setGoalsAndProgressList] = useState([]);

  const getProgressListByGoalId = async (user_id) => {
    const goalList = await fetch(
      `${URL_API}/Goal/GetGoalsByUserId?userId=${user_id}`
    ).then((response) => response.json());

    const newObjecy = goalList.goals.map(async (goal) => {
      const progressList = await fetch(
        `${URL_API}/Progress/GetAllProgressByGoalId?goalId=${goal.id}`,
        { headers: { method: "GET" }, accept: "*/*" }
      ).then((response) => response.json());

      console.log('goal:', goal)
      return { ...goal, progressList: progressList.progress };
    });

    Promise.all(newObjecy).then((values) => {
      setGoalsAndProgressList(values);
    });
  };

  const insertProgress = (props) => {
    const { title, description, goal, id_user } = props;

    return fetch(`${URL_API}/Progress/CreateProgress`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idGoal: Number(goal),
        idUser: String(id_user),
        title,
        description,
        isDone: false,
      }),
    });
  };

  const updateProgress = (props) => {
    const { id, id_user, title, description, idGoal } = props;

    console.log("props", props);

    return fetch(`${URL_API}/Progress/UpdateProgress`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        idUser: String(id_user),
        title,
        idGoal,
        description,
      }),
    });
  };

  const deleteProgress = (id) => {
    return fetch(`${URL_API}/Progress/DeleteProgressById?progressId=${id}`, {
      method: "DELETE",
    });
  };

  return {
    goalsAndProgressList,
    getProgressListByGoalId,
    deleteProgress,
    insertProgress,
    updateProgress,
  };
}
