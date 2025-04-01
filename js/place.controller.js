'use strict'
let gMap

function onInit() {
    initMap()
    renderPlaces()
}

function renderPlaces() {
    const places = getPlaces()
    const elList = document.getElementById('placeList')

    if (!places.length) {
        elList.innerHTML = '<li>No places saved</li>'
        return
    }

    elList.innerHTML = places.map(place => `
        <li>
            <strong>${place.name}</strong> (lat: ${place.lat}, lng: ${place.lng})
            <button onclick="onRemovePlace('${place.id}')">❌ Remove</button>
        </li>
    `).join('')
}

function onRemovePlace(placeId) {
    removePlace(placeId)
    renderPlaces()
}

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps")

    gMap = new Map(document.getElementById("map"), {
        center: { lat: 29.557669, lng: 34.951923 },
        zoom: 12,
    })

    gMap.addListener('click', ev => {
        const name = prompt('Place name?', 'Place 1')
        if (!name) return

        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()

        addPlace(name, lat, lng, gMap.getZoom())
        renderPlaces()
        addMarker({ lat, lng })
    })

}

function addMarker({ lat, lng }) {
    new google.maps.Marker({
        position: { lat, lng },
        map: gMap,
    })
}

