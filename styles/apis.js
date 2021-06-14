function fetchWeatherData() {
    const api = "794456822e1cdc510885c2d52e12eff4";

    const iconImg = document.getElementById("weather-icon");
    const loc = document.querySelector("#location");
    const tempC = document.querySelector(".c");
    const tempF = document.querySelector(".f");
    const desc = document.querySelector(".desc");
    const sunriseDOM = document.querySelector(".sunrise");
    const sunsetDOM = document.querySelector(".sunset");

    let lon;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;

            fetch(base)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    const { temp } = data.main;
                    const place = data.name;
                    const { description, icon } = data.weather[0];
                    const { sunrise, sunset } = data.sys;

                    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                    const fahrenheit = (temp * 9) / 5 + 32;

                    const sunriseGMT = new Date(sunrise * 1000);
                    const sunsetGMT = new Date(sunset * 1000);

                    iconImg.src = iconUrl;
                    loc.textContent = `${place}`;
                    desc.textContent = `${description}`;
                    tempC.textContent = `${temp.toFixed(2)} °C`;
                    tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
                    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString(
                        "en-US"
                    )}`;
                    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString(
                        "en-US"
                    )}`;
                });
        });
    }
}

function fetchCovidData() {
    // covid-19 data
    const mostRecentDate = document.querySelector(".mostRecentDate");
    const newCases = document.querySelector(".newCases");
    const death = document.querySelector(".death");
    const aVaccine = document.querySelector(".avaccine");
    const cumulativeCvaccine = document.querySelector(".cumulative_cvaccine");
    const covidData = `https://api.opencovid.ca/summary?loc=QC&ymd=true`;

    fetch(covidData)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const { date, cases, deaths, avaccine, cumulative_cvaccine } =
                data.summary[0];

            mostRecentDate.textContent = `Most recent date: ${date}`;
            newCases.textContent = `New cases: ${cases}`;
            death.textContent = `New deaths: ${deaths}`;
            aVaccine.textContent = `Vaccine administered: ${avaccine}`;
            cumulativeCvaccine.textContent = `Cumulative fully vaccinated: ${cumulative_cvaccine}`;
        });
}

async function fetchArtwork() {
    // art data
    const artImage = document.querySelector(".art-image");
    let artTitle = document.querySelector(".art-title");
    let artLink = document.querySelector("#art-link");

    const artworkIds = new Array();
    const url =
        "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=painting";

    let response = await fetch(url);
    const artworks = await response.json();
    let objectIds = artworks.objectIDs;

    const randomId = Math.trunc(Math.random() * objectIds.length);
    const artworkId = objectIds[randomId];

    const artworkData = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkId}`;
    let artworkRes = await fetch(artworkData);
    let artworkJson = await artworkRes.json();
    console.log(artworkJson);

    artImage.src = artworkJson.primaryImageSmall;
    artTitle.textContent = artworkJson.title;
    artLink.href = artworkJson.objectURL;
    artLink.textContent = "Link to The Metropolitan Museum of Art";

    let image = document.querySelector(".art-image");
    image.onload = function () {
        console.log(image.height);
        console.log(image.width);

        let limitH = 500;
        let limitW = 500;

        let newW = 0,
            newH = 0;

        if (image.width > limitW) {
            newW = limitW;
            newH = parseInt((image.height * newW) / image.width);

            if (newH > limitH) {
                newH = limitH;
                newW = parseInt((image.width * newH) / image.height);
            }
            image.width = newW;
            image.height = newH;
        } else if (image.height > limitH) {
            newH = limitH;
            newW = parseInt((image.width * newH) / image.height);
            image.width = newW;
            image.height = newH;
        }
        console.log(image.height);
        console.log(image.width);
    };
}

export { fetchWeatherData, fetchCovidData, fetchArtwork };
