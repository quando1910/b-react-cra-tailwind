import { combineReducers } from 'redux';
import { createReducer } from '../../shared/core/services/redux';
import { Highway } from 'shared/models/Highway';

const initialFavoriteState = {
  favorites: []
}

const addFavorite = (state, payload) => {
  const checkExisted = state.favorites.find(x => x.id === payload.id);
  if (!checkExisted) {
    state.favorites.push(new Highway(payload));
  }
  return {
    ...state,
    favorites: [...state.favorites],
  }
};

const removeFavorite = (state, payload) => ({
  ...state,
  favorites: state.favorites.filter(x => x.id !== payload.id),
});

const addInfoForFavorite = (state, payload) => {
  const item = state.favorites.find(x => x.id === payload.id);
  item.addInfo(payload.comment, payload.color);
  return {
    ...state,
    favorites: [...state.favorites],
  }
};

const favoriteStrategies = {
  ADD_FAVORITE: addFavorite,
  REMOVE_FAVORITE: removeFavorite,
  ADD_INFO_FOR_FAVORITE: addInfoForFavorite,
  __default__: (state) => state,
};
const favoriteController = createReducer(favoriteStrategies, {
  ...initialFavoriteState,
});

/* commonReducer */
export const commonReducer = combineReducers({
  favoriteController,
});
