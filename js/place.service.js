'use strict'

const STORAGE_KEY = 'placesDB'
let gPlaces = loadPlaces()

function _createPlace(name, lat, lng, zoom) {
    return {
        id: makeId(),
        name,
        lat,
        lng,
        zoom
    }
}

function _createPlaces() {
    return [
        _createPlace('Puki\'s House', 32.1416, 34.831213, 15),
        _createPlace('Library', 32.066157, 34.777819, 14)
    ]
}

function loadPlaces() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || _createPlaces()
}

function _savePlaces() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gPlaces))
}

function getPlaces() {
    return gPlaces
}

function removePlace(placeId) {
    gPlaces = gPlaces.filter(place => place.id !== placeId)
    _savePlaces()
}

function addPlace(name, lat, lng, zoom) {
    const place = _createPlace(name, lat, lng, zoom)
    gPlaces.push(place)
    _savePlaces()
}

function getPlaceById(placeId) {
    return gPlaces.find(place => place.id === placeId)
}



