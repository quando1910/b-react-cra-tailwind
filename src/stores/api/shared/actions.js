import { generateAPIAction } from 'shared/core/services/redux';
import * as types from 'stores/types';

export const getListHighway = generateAPIAction(types.GET_LIST_HIGHWAY);
export const getHighwayDetail = generateAPIAction(types.GET_HIGHWAY_DETAIL);
