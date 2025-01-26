import { ADD_FAVORITE, REMOVE_FAVORITE } from "./Actions";

const initialState = {
    movies: [], 
};

const favReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVORITE:
            if (!state.movies.find((movie) => movie.id === action.payload.id)) {
                return {
                    ...state,
                    movies: [...state.movies, action.payload],
                };
            }
            return state;

        case REMOVE_FAVORITE:
            return {
                ...state,
                movies: state.movies.filter((movie) => movie.id !== action.payload),
            };

        default:
            return state;
    }
};

export default favReducer;
