export {};
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

    const analysis = await result.json();

    console.log(analysis);

    const elem = document.getElementById(`content`);
    if (elem) {
        elem.innerHTML = JSON.stringify(analysis)
    } else {
        alert(`You have probably given an invalid ID. Verify your ID's. I apologize for the inconvience, have a nice day.`)
    }
}
document.getElementById(`json`)?.addEventListener(`click`, apiCaller)
