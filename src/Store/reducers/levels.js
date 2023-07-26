const initialValue = {
	levels: [
		{
			id: 1,
			salary: 150,
			label: "Junior",
		},
		{
			id: 2,
			salary: 250,
			label: "Middle",
		},
		{
			id: 3,
			salary: 350,
			label: "Senior",
		},
	],
	initailValue: null,
};

export const levels = (state = initialValue, action) => {
	switch (action.type) {
		case "ADD_LEVEL":
			return { ...state, levels: [...state.levels, action.payload] };
		case "REMOVE_LEVEL":
			return {
				...state,
				levels: state.levels.filter(
					(level) => level.id !== action.payload,
				),
			};

		case "EDITED_ACTION": {
			return {
				...state,
				initailValue: null,
				levels: state.levels?.map((item) =>
					item.id === action.payload.id ? action.payload : item),
				} }

		default:
			return state;
	}
};

export const addLevelAction = (payload) => ({ type: "ADD_LEVEL", payload });
export const removeLevelAction = (payload) => ({type: "REMOVE_LEVEL",payload,});
export const editedLevelAction = (payload) => ({type: "EDITED_ACTION",payload,});
