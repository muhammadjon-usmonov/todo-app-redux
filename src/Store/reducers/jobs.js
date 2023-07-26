const initialValue = {
	jobs: [
		{
			id: 1,
			label: "Frontend dev",
			salary: "1200",
		},
		{
			id: 2,
			label: "Backend dev",
			salary: "1200",
		},
	],
	initailValue: null,
};

export const jobs = (state = initialValue, action) => {
	switch (action.type) {
		case "ADD_JOB":
			return { ...state, jobs: [...state.jobs, action.payload] };
		case "REMOVE_JOB":
			return {
				...state,
				jobs: state.jobs.filter((job) => job.id !== action.payload),
			};
		case "EDIT_JOB": {
			return {
				...state,
				initailValue: null,
				jobs: state.jobs?.map((item) =>
					item.id === action.payload.id ? action.payload : item),
			};
		}
		default:
			return state;
	}
};

export const addJobAction = (payload) => ({ type: "ADD_JOB", payload });
export const removeJobAction = (payload) => ({ type: "REMOVE_JOB", payload });
export const editedJobs = (payload)=>({type:"EDIT_JOB",payload});
