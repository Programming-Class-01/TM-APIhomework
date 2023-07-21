import { IMarketHistoryEntry } from "./interfaces.js";

async function getMarketHistory(regionId: string, typeId: string): Promise<IMarketHistoryEntry[]> {
    const response = await fetch(`https://esi.evetech.net/latest/markets/${regionId}/history/?datasource=tranquility&type_id=${typeId}`)
    const result = await response.json();
    return result;
}

export { getMarketHistory };