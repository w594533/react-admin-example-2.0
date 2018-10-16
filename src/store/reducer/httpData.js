import * as type from '@/store/action/type';

const handleData = (state = { isFetching: true, data: {} }, action) => {
	switch (action.type) {
		case type.REQUEST_DATA:
			return { ...state, isFetching: true };
		case type.RECEIVE_DATA:
			return { ...state, isFetching: false, data: action.data };
		default:
			return { ...state };
	}
};
const httpData = (state = {}, action) => {
	switch (action.type) {
		case type.RECEIVE_DATA:
		case type.REQUEST_DATA:
			return {
				...state,
				[action.category]: handleData(state[action.category], action)
			};
		default:
			return { ...state };
	}
};

export default httpData;
