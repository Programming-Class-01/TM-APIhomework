import { IMarketOrder } from "./interfaces.js";

async function getMarketOrders(regionId: string, typeId: string): Promise<IMarketOrder[]> {
    const response = await fetch(`https://esi.evetech.net/latest/markets/${regionId}/orders/?datasource=tranquility&order_type=all&type_id=${typeId}`)
    const result = await response.json();
    return result;
}

export { getMarketOrders };