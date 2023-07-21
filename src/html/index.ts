async function apiCaller() {
    const region = document.getElementById(`RegionID`) as HTMLInputElement;
    const type = document.getElementById(`TypeID`) as HTMLInputElement;

    const regionId = region.value;
    const typeId = type.value;

    const parameters = new URLSearchParams({ region: regionId, type: typeId });

    const result = await fetch(`localhost:3000/api${parameters}`);

    const analysis = await result.json();

    const elem = document.getElementById(`content`);
    if (elem) {
        elem.innerHTML = analysis
    } else {
        alert(`You have probably given an invalid ID. Verify your ID's. I apologize for the inconvience, have a nice day.`)
    }
    console.log(`testing`);
}

export { apiCaller }