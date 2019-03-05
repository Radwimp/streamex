import { Decimal, Loader, OrderBook } from '@openware/components';
import classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { accumulateVolume, calcMaxVolume, sortBids } from '../../helpers';
import {
    Market,
    RootState,
    selectCurrentMarket,
    selectCurrentPrice,
    selectDepthAsks,
    selectDepthBids,
    selectDepthLoading,
    setCurrentPrice,
} from '../../modules';

interface ReduxProps {
    bids: string[][];
    bidsLoading: boolean;
    asks: string[][];
    currentMarket: Market | undefined;
    currentPrice: string;
}

interface DispatchProps {
    setCurrentPrice: typeof setCurrentPrice;
}

type Props = ReduxProps & DispatchProps & InjectedIntlProps;

class OrderBookContainer extends React.Component<Props> {
    public render() {
        const { bids, bidsLoading, asks } = this.props;
        const cn = classNames('pg-bids', {
            'pg-bids--loading': bidsLoading,
        });

        return (
            <div className={cn}>
                {bidsLoading ? <Loader /> : this.orderBook(sortBids(bids), asks)}
            </div>
        );
    }

    private orderBook = (bids, asks) => (
        <OrderBook
            side={'right'}
            title={this.props.intl.formatMessage({id: 'page.body.trade.header.bids'})}
            headers={this.renderHeaders()}
            data={this.renderOrderBook(bids, 'bids', this.props.intl.formatMessage({id: 'page.noDataToShow'}), this.props.currentMarket)}
            rowBackgroundColor={'rgba(84, 180, 137, 0.4)'}
            maxVolume={calcMaxVolume(bids, asks)}
            orderBookEntry={accumulateVolume(bids)}
            onSelect={this.handleOnSelect}
        />
    );

    private renderHeaders = () => {
        return [
            this.props.intl.formatMessage({id: 'page.body.trade.orderbook.header.volume'}),
            this.props.intl.formatMessage({id: 'page.body.trade.orderbook.header.amount'}),
            this.props.intl.formatMessage({id: 'page.body.trade.orderbook.header.price'}),
        ];
    }

    private renderOrderBook = (array: string[][], side: string, message: string, currentMarket?: Market) => {
        const total = accumulateVolume(array);
        const priceFixed = currentMarket ? currentMarket.bid_precision : 0;
        const amountFixed = currentMarket ? currentMarket.ask_precision : 0;
        return (array.length > 0) ? array.map((item, i) => {
            const [price, volume] = item;
            return [
                    <Decimal key={i} fixed={amountFixed}>{total[i]}</Decimal>,
                    <Decimal key={i} fixed={amountFixed}>{volume}</Decimal>,
                    <span style={{ color: 'var(--open-orders-order-buy)' }} key={i}><Decimal fixed={priceFixed}>{price}</Decimal></span>,
                ];
        }) : [[[''], message]];
    }

    private handleOnSelect = (index: string) => {
        const { bids, currentPrice } = this.props;
        const priceToSet = bids[Number(index)] ? bids[Number(index)][0] : '';

        if (currentPrice !== priceToSet) {
            this.props.setCurrentPrice(priceToSet);
        }
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    bids: selectDepthBids(state),
    asks: selectDepthAsks(state),
    bidsLoading: selectDepthLoading(state),
    currentMarket: selectCurrentMarket(state),
    currentPrice: selectCurrentPrice(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    });

const Bids = injectIntl(connect(mapStateToProps, mapDispatchToProps)(OrderBookContainer));
type BidsProps = ReduxProps;

export {
    Bids,
    BidsProps,
};
