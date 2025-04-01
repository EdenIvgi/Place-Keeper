'use strict'

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


let gMap

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps")

    gMap = new Map(document.getElementById("map"), {
        center: { lat: 32.0853, lng: 34.7818 },
        zoom: 12,
    })
}
