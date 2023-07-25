const initialValue = {
  workers: [
    {
      id: 1,
      name: "Karim",
      lastname: "Botirov",
      phone: "+99890454644",
      job: "dasturchi",
      level: "junior",
    },
  ],
};

export const workers = (state = initialValue, action) => {
  switch (action.type) {
    case "ADD_WORKER":
      return { ...state, workers: [...state.workers, action.payload] };
    case "REMOVE_WORKER":
      return {
        ...state,
        workers: state.workers.filter((worker) => worker.id !== action.payload),
      };
    default:
      return state;
  } 
};

export const addWorkerAction = (payload) => ({ type: "ADD_WORKER", payload });
export const removeWorkerAction = (payload) => ({
  type: "REMOVE_WORKER",
  payload,
});
