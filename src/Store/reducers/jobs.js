/** @format */

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

export const editLevel = (text) => {
	const action = {
		type: "EDIT_LEVEL",
	};
	return action;
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
      console.log(action.payload);  
			return {
				...state,
				initailValue: state.jobs?.find(item => item?.id === action.payload),
			};
		}
		default:
			return state;
	}
};

export const addJobAction = (payload) => ({ type: "ADD_JOB", payload });
export const removeJobAction = (payload) => ({ type: "REMOVE_JOB", payload });
export const editedJobs = (payload)=>({type:"EDIT_JOB",payload});
