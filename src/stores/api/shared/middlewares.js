import { get } from 'shared/core/services/saga';
import * as types from 'stores/types';
import { all, takeLatest } from 'redux-saga/effects';

function* getListHighway({ resolve, reject }) {
  try {
    const res = yield get(['/'], {});
    resolve(res);
  } catch (error) {
    reject(error);
  }
}

function* getHighwayDetail({ payload, resolve, reject }) {
  try {
    const res = yield get([payload.id, 'services', 'roadworks'], {});
    resolve(res);
  } catch (error) {
    reject(error);
  }
}


export function* watchShared() {
  yield all([
    takeLatest(types.GET_LIST_HIGHWAY, getListHighway),
    takeLatest(types.GET_HIGHWAY_DETAIL, getHighwayDetail),
  ]);
}
