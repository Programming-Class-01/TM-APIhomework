import { IMarketOrder } from "./interfaces.js";

async function getMarketOrders(): Promise<IMarketOrder[]> {
    const response = await fetch("https://esi.evetech.net/latest/markets/10000002/orders/?datasource=tranquility&order_type=all&type_id=593")
    const result = await response.json();
    return result;
}

export { getMarketOrders };