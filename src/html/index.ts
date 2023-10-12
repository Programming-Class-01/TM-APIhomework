export {};

interface IReturn {
    Average_Average: string;
    Average_High: string;
    Average_Low: string;
    Average_Volume: string;
    Market_signifier: string;
    Marginal_Orders_Buy: number;
    Sell: number;
    Market_Pass_Through: string;
    Raw_Margin: string;
    Market_Value: string;
    Captured_Units: string;
    Cost_to_Market: string;
    Return_on_Investment: string;
}

async function apiCaller(): Promise<any> {
    const region = document.getElementById(`RegionID`) as HTMLInputElement;
    const type = document.getElementById(`TypeID`) as HTMLInputElement;

    const regionId = region.value;
    const typeId = type.value;

    const parameters = new URLSearchParams({ region: regionId, type: typeId });
    const address = `http://localhost:3000/api?${parameters}`
    console.log(address)

    let result  
    try { result = await fetch(address)} catch (error) {
        console.log(error)
    };

    if (!result) return;

    const analysis: IReturn = await result.json();

    const elem = document.getElementById(`content`);
    if (elem) {
        elem.innerHTML = `Average: ${analysis.Average_Average}, 
        Average High: ${analysis.Average_High}, 
        Average Low: ${analysis.Average_Low}, 
        Average Volume: ${analysis.Average_Volume},
        Marginal Orders buy: ${analysis.Marginal_Orders_Buy},
        Market Passthrough: ${analysis.Market_Pass_Through},
        Market Signifier: ${analysis.Market_signifier},
        ROI: ${analysis.Return_on_Investment},
        Sell price: ${analysis.Sell},
        Captured units: ${analysis.Captured_Units},
        Cost to Market: ${analysis.Cost_to_Market},
        Market Value: ${analysis.Market_Value},
        Raw margin: ${analysis.Raw_Margin}
        `
    } else {
        alert(`You have probably given an invalid ID. Verify your ID's. I apologize for the inconvience, have a nice day.`)
    }
}
document.getElementById(`json`)?.addEventListener(`click`, apiCaller)
