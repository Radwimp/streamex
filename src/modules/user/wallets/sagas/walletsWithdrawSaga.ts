// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { alertPush } from '../../../public/alert';
import {
    walletsWithdrawCcyData,
    walletsWithdrawCcyError,
    WalletsWithdrawCcyFetch,
} from '../actions';

const walletsWithdrawCcyOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* walletsWithdrawCcySaga(action: WalletsWithdrawCcyFetch) {
    try {
        yield call(API.post(walletsWithdrawCcyOptions), '/account/withdraws', action.payload);
        yield put(walletsWithdrawCcyData());
        yield put(alertPush({message: 'success.withdraw.action', type: 'success'}));
    } catch (error) {
        yield put(walletsWithdrawCcyError(error));
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
