import * as types from 'stores/types';

export const addFavoriteHighway = (payload) => ({
  type: types.ADD_FAVORITE,
  payload
});

export const addInfoForFavorite = (payload) => ({
  type: types.ADD_INFO_FOR_FAVORITE,
  payload
});

export const removeFavoriteHighway = (payload) => ({
  type: types.REMOVE_FAVORITE,
  payload
});