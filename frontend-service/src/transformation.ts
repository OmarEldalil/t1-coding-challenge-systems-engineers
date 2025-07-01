import {MarketMessage, PnL, RawMarketMessage, RawTradeMessage, TradeMessage} from './types';
import {PnLRecordPlain} from "./db";
import {convertTimestampToDateString} from "./utils/helpers";


export function toMarketMessage(raw: RawMarketMessage): MarketMessage {
    return {
        messageType: raw.messageType,
        buyPrice: parseFloat(raw.buyPrice),
        sellPrice: parseFloat(raw.sellPrice),
        time: new Date(raw.time)
    };
}

export function toTradeMessage(raw: RawTradeMessage): TradeMessage {
    return {
        messageType: raw.messageType,
        tradeType: raw.tradeType,
        volume: parseFloat(raw.volume),
        time: new Date(raw.time)
    };
}

export function transformPnlRecordToPnl(record: PnLRecordPlain): PnL {
    return {
        startTime: convertTimestampToDateString(record.startTime),
        endTime: convertTimestampToDateString(record.endTime),
        pnl: record.pnl
    };
}