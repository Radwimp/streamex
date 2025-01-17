import * as actions from './actions';
import {
    ORDERS_CANCEL_ALL_DATA,
    ORDERS_CANCEL_ALL_ERROR,
    ORDERS_CANCEL_ALL_FETCH,
    ORDERS_HISTORY_CANCEL_DATA,
    ORDERS_HISTORY_CANCEL_ERROR,
    ORDERS_HISTORY_CANCEL_FETCH,
    ORDERS_HISTORY_DATA,
    ORDERS_HISTORY_ERROR,
    ORDERS_HISTORY_FETCH,
} from './constants';

describe('Orders History actions', () => {
    it('should check userOrdersHistoryFetch action creator', () => {
        const payload = { pageIndex: 0, type: 'all', limit: 25 };
        const expectedAction = { type: ORDERS_HISTORY_FETCH, payload };
        expect(actions.userOrdersHistoryFetch(payload)).toEqual(expectedAction);
    });

    it('should check userOrdersHistoryData action creator', () => {
        const payload = { list: [], pageIndex: 2, total: 0 };
        const expectedAction = { type: ORDERS_HISTORY_DATA, payload };
        expect(actions.userOrdersHistoryData(payload)).toEqual(expectedAction);
    });

    it('should check userOrdersHistoryError action creator', () => {
        const expectedAction = { type: ORDERS_HISTORY_ERROR };
        expect(actions.userOrdersHistoryError()).toEqual(expectedAction);
    });

    it('should check ordersCancelAllFetch action creator', () => {
        const payload = { tab: 'all' };
        const expectedAction = { type: ORDERS_CANCEL_ALL_FETCH, payload };
        expect(actions.ordersCancelAllFetch(payload)).toEqual(expectedAction);
    });

    it('should check ordersCancelAllData action creator', () => {
        const payload = [];
        const expectedAction = { type: ORDERS_CANCEL_ALL_DATA, payload };
        expect(actions.ordersCancelAllData(payload)).toEqual(expectedAction);
    });

    it('should check ordersCancelAllError action creator', () => {
        const expectedAction = { type: ORDERS_CANCEL_ALL_ERROR };
        expect(actions.ordersCancelAllError()).toEqual(expectedAction);
    });

    it('should check ordersHistoryCancelFetch action creator', () => {
        const payload = { id: 2, type: 'open', list: [] };
        const expectedAction = { type: ORDERS_HISTORY_CANCEL_FETCH, payload };
        expect(actions.ordersHistoryCancelFetch(payload)).toEqual(expectedAction);
    });

    it('should check ordersHistoryCancelData action creator', () => {
        const payload = [];
        const expectedAction = { type: ORDERS_HISTORY_CANCEL_DATA, payload };
        expect(actions.ordersHistoryCancelData(payload)).toEqual(expectedAction);
    });

    it('should check ordersHistoryCancelError action creator', () => {
        const expectedAction = { type: ORDERS_HISTORY_CANCEL_ERROR };
        expect(actions.ordersHistoryCancelError()).toEqual(expectedAction);
    });
});
