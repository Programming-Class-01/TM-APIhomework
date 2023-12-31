import { IMarketOrder, IMarketHistoryEntry, IMinMaxValue, IAverageValues } from "./interfaces.js";
import { getMarketHistory } from "./marketHistory.js";
import { getMarketOrders } from "./marketOrders.js";
import express from 'express';
import cors from "cors";

const app = express()
const port = 3000

// app.use(
//     cors({origin: `http://localhost:3000/api?region=&type=`
// }))

app.get('/api',cors(), routeDefault)

async function routeDefault(request: express.Request, response: express.Response) {
    const regionId = request.query.region
    const typeId = request.query.type

    if (typeof regionId != `string`) {
        response.sendStatus(400);
        return;
    }
    if (typeof typeId != `string`) {
        response.sendStatus(400);
        return;
    }

    const currentOrder = await getMarketOrders(regionId, typeId)
    const currentHistory = await getMarketHistory(regionId, typeId)
    const averageOutput = averageFinder(currentHistory);
    const marketSignifier = marketIndex(averageOutput);
    const marginalOrders = minmax(currentOrder)
    const marketPassThru = MarketpassThrough(marketSignifier, averageOutput);
    const marginRaw = rawMargin(currentOrder);
    const marketValue = rawMargin(currentOrder) * MarketpassThrough(marketSignifier, averageOutput);
    const capturedUnits = averageOutput.averageOfVolume * estimatedCapture;
    //HACK: fix costToMarket to use actual units instead of highestbuy
    //HACK: the 2x is meant to account for stock fluctuations, but should be calculated (average plus 1 standard deviation). No longer implemented, but 
    //      this should still be figured out.
    const costToMarket = (estimatedCapture * averageOutput.averageOfVolume) * marginalOrders.highBuy;
    const roi = 100 * (capturedValue(marketValue, estimatedCapture) / costToMarket);

    const result = {
        Average_Average: averageOutput.averageOfAverage.toFixed(2), //works
        Average_High: averageOutput.averageOfHigh.toFixed(2), //works
        Average_Low: averageOutput.averageOfLow.toFixed(2), //works
        Average_Volume: averageOutput.averageOfVolume.toFixed(2), //works
        Market_signifier: marketSignifier.toFixed(2), //works
        Marginal_Orders_Buy: marginalOrders.highBuy, //works
        Sell: marginalOrders.lowSell, //works
        Market_Pass_Through: marketPassThru.toFixed(2), //works
        Return_on_Investment: roi.toFixed(2), //works
        Raw_Margin: marginRaw.toFixed(2), 
        Market_Value: marketValue.toFixed(2),
        Captured_Units: capturedUnits.toFixed(2),
        Cost_to_Market: costToMarket.toFixed(2)
    }
    console.log(result.Raw_Margin)

    response.send(result)
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function minmax(orders: IMarketOrder[]): IMinMaxValue {
    const result: IMinMaxValue = { highBuy: 0, lowSell: Number.MAX_SAFE_INTEGER }
    for (const order of orders) {
        if (order.is_buy_order && order.price >= result.highBuy) {
            result.highBuy = order.price
        }
        if (!order.is_buy_order && order.price <= result.lowSell) {
            result.lowSell = order.price
        }
    }
    return result;
}

function averageFinder(histories: IMarketHistoryEntry[]): IAverageValues {
    const result: IAverageValues = { 
        averageOfVolume: 0, 
        averageOfHigh: 0,
        averageOfLow: 0, 
        averageOfAverage: 0 
    }

    for (const history of histories) {
        result.averageOfVolume += history.volume
        result.averageOfHigh += history.highest
        result.averageOfLow += history.lowest
        result.averageOfAverage += history.average
    }
    result.averageOfVolume /= histories.length
    result.averageOfHigh /= histories.length
    result.averageOfLow /= histories.length
    result.averageOfAverage /= histories.length
    return result;
}

// solve market signifier ()

function marketIndex(AV: IAverageValues): number {
    return (AV.averageOfHigh - AV.averageOfAverage) / (AV.averageOfHigh - AV.averageOfLow);
}

function MarketpassThrough(marketSignifier: number, averageOutput: IAverageValues): number {
    return averageOutput.averageOfVolume * (2 * Math.min(marketSignifier, 1 - marketSignifier));
}
//TODO: remove statistical outliers
//TODO: delimiter for stations.
function rawMargin(orders: IMarketOrder[]): number {
    let sellAccumulator = 0;
    let buyAccumulator = 0;
    let sellOrders = 0;
    let buyOrders = 0;
    for (const order of orders) {
        if (order.is_buy_order) {
            buyAccumulator += order.price;
            buyOrders++;
        } else {
            sellAccumulator += order.price;
            sellOrders++;
        }
    }
    const sellAverage = sellAccumulator / sellOrders;
    const buyAverage = buyAccumulator / buyOrders;
    return sellAverage - buyAverage;
}

const estimatedCapture = 0.10;

function capturedValue(marketValue: number, estimatedCapture: number): number {
    // TODO: Determine how to calculate the percentage of capturable market.
    return marketValue * estimatedCapture;
}

export { };