import {
    PG_TITLE_PREFIX,
    pgRoutes,
    STORAGE_DEFAULT_LIMIT,
} from './';

describe('Constants', () => {
    const expectedRoutesForLoggedInUser = [
      ['page.header.navbar.trade', '/trade'],
      ['page.header.navbar.wallets', '/wallets'],
      ['page.header.navbar.openOrders', '/orders'],
      ['page.header.navbar.history', '/history'],
    ];

    const expectedRoutesForNotLoggedInUser = [
      ['page.header.navbar.signIn', '/signin'],
    ];

    it('Rendering correct title prefix', () => {
        expect(PG_TITLE_PREFIX).toBe('Streamex');
    });

    it('Rendering correct storage default limit', () => {
        expect(STORAGE_DEFAULT_LIMIT).toBe(50);
    });

    it('Rendering correct correct routes if user is not logged in', () => {
        expect(pgRoutes(false, '/signup')).toEqual(expectedRoutesForNotLoggedInUser);
    });

    it('Rendering correct correct routes if user is not logged in', () => {
        expect(pgRoutes(true, '/trade')).toEqual(expectedRoutesForLoggedInUser);
    });
});
