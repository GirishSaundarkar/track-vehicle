const map = L.map("map").setView([18.483725, 73.815036], 15);
console.log('map: ', map);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap",
}).addTo(map);

const vehicleIcon = L.icon({
    iconUrl: "../carIcon/car.png",
    iconSize: [30, 30],
});

let vehicleMarker = null;
const routePath = [];
let polyline = L.polyline([], { color: "blue" }).addTo(map);

const fetchVehicleData = async () => {
    try {
        const response = await fetch("/api/vehicle");
        const data = await response.json();
        const { latitude, longitude } = data;

        if (vehicleMarker) {
            vehicleMarker.setLatLng([latitude, longitude]);
        } else {
            vehicleMarker = L.marker([latitude, longitude], {
                icon: vehicleIcon,
            }).addTo(map);
        }

        map.setView([latitude,longitude], 16);

        routePath.push([latitude, longitude]);
        polyline.setLatLngs(routePath);
    } catch (error) {
        console.error("Error fetching vehicle data:", error);
    }
};

setInterval(fetchVehicleData, 3000);
