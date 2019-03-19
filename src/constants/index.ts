export const PG_TITLE_PREFIX = 'Streamex';

export const pgRoutes = (isLoggedIn: boolean, address: string): string[][] => {
    const routes = [
        ['page.header.navbar.trade', '/trade'],
        ['page.header.navbar.wallets', '/wallets'],
        ['page.header.navbar.openOrders', '/orders'],
        ['page.header.navbar.history', '/history'],
    ];
    const routesUnloggedIn = [
        ['page.header.navbar.signIn', '/signin'],
        ['page.header.navbar.signUp', '/signup'],
    ];
    return isLoggedIn ? routes : address === '/signin' ? [routesUnloggedIn[1]] : [routesUnloggedIn[0]];
};

export const STORAGE_DEFAULT_LIMIT = 50;
