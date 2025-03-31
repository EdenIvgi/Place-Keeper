'use strict'

function onInit() {
    renderPlaces()
}

function renderPlaces() {
    const places = getPlaces()
    const elList = document.getElementById('placeList')

    if (!places.length) {
        elList.innerHTML = '<li>No places yet</li>'
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
