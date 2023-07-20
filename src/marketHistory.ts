import { IMarketHistoryEntry } from "./interfaces.js";

async function getMarketHistory(): Promise<IMarketHistoryEntry[]> {
    const response = await fetch("https://esi.evetech.net/latest/markets/10000002/history/?datasource=tranquility&type_id=593")
    const result = await response.json();
    return result;
}

export { getMarketHistory };