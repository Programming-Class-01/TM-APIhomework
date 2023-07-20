interface IMarketOrder {
    duration: number;
    is_buy_order: boolean;
    issued: string;
    location_id: number;
    min_volume: number;
    order_id: number;
    price: number;
    range: string;
    system_id: number;
    type_id: number;
    volume_remain: number;
    volume_total: number;
};

interface IMarketHistoryEntry {
    average: number;
    date: string;
    highest: number;
    lowest: number;
    order_count: number;
    volume: number;
};
interface IMinMaxValue {
    highBuy: number,
    lowSell: number,
};
interface IAverageValues {
    averageOfVolume: number,
    averageOfHigh: number,
    averageOfLow: number,
    averageOfAverage: number,
};

export { IMarketOrder, IMarketHistoryEntry, IMinMaxValue, IAverageValues };