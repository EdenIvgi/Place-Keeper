'use strict'
let gMap
let gNewLat, gNewLng, gNewZoom
function onInit() {
    initMap()
    renderPlaces()
}

function renderPlaces() {
    const places = getPlaces()
    const elList = document.querySelector('.place-list')

    if (!places.length) {
        elList.innerHTML = '<li>No places saved</li>'
        return
    }

    elList.innerHTML = places.map(place =>
        `<li onclick="onShowCoords('${place.id}')">
      <span><strong>${place.name}</strong></span>
      <div class="place-actions">
          <button onclick="event.stopPropagation(); onPanToPlace('${place.id}')">Go</button>
          <button onclick="event.stopPropagation(); onRemovePlace('${place.id}')">Remove</button>
      </div>
  </li>`
    ).join('')

    places.forEach(place => {
        addMarker({ lat: place.lat, lng: place.lng })
    })
}

function onRemovePlace(placeId) {
    removePlace(placeId)
    renderPlaces()
}

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps")

    const elMap = document.querySelector('.map')
    gMap = new Map(elMap, {
        center: { lat: 29.557669, lng: 34.951923 },
        zoom: 12,
    })

    gMap.addListener('click', ev => {
        gNewLat = ev.latLng.lat()
        gNewLng = ev.latLng.lng()
        gNewZoom = gMap.getZoom()

        openNewPlaceModal()
    })
}

function addMarker({ lat, lng }) {
    new google.maps.Marker({
        position: { lat, lng },
        map: gMap,
    })
}

function onPanToPlace(placeId) {
    const place = getPlaceById(placeId)
    gMap.setCenter({ lat: place.lat, lng: place.lng })
    gMap.setZoom(place.zoom)
}

function onShowCoords(placeId) {
    const place = getPlaceById(placeId)
    const modal = document.querySelector('.coords-modal')
    const contentEl = modal.querySelector('.content')

    const existingInfo = contentEl.querySelector('.coords-info')
    if (existingInfo) existingInfo.remove()

    const infoHtml = `
    <div class="coords-info">
      <h3>${place.name}</h3>
      <p>Latitude: ${place.lat}</p>
      <p>Longitude: ${place.lng}</p>
    </div>
  `
    contentEl.insertAdjacentHTML('beforeend', infoHtml)
    modal.classList.add('open')
}

function closeModal() {
    document.querySelector('.coords-modal').classList.remove('open')
}


function openNewPlaceModal() {
    const modal = document.querySelector('.new-place-modal')
    const input = modal.querySelector('.new-place-input')
    input.value = ''
    modal.classList.add('open')
    input.focus()
}

function closeNewPlaceModal() {
    document.querySelector('.new-place-modal').classList.remove('open')
}

function onSaveNewPlace() {
    const name = document.querySelector('.new-place-input').value.trim()
    if (!name) return alert('Please enter a name.')

    addPlace(name, gNewLat, gNewLng, gNewZoom)
    renderPlaces()
    addMarker({ lat: gNewLat, lng: gNewLng })
    closeNewPlaceModal()
}