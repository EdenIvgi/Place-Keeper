'use strict'

function onSubmit(ev) {
    ev.preventDefault()

    const userEmail = document.querySelector('[name=userEmail]').value
    const userTxtColor = document.querySelector('[name=userTxtColor]').value
    const userBgColor = document.querySelector('[name=userBgColor]').value
    const birthDate = document.querySelector('[name=birthDate]').value
    const birthTime = document.querySelector('[name=birthTime]').value
    const ageRange = document.querySelector('[name=ageRange]').value

    const userData = {
        email: userEmail,
        txtColor: userTxtColor,
        bgColor: userBgColor,
        birthDate,
        birthTime,
        age: ageRange
    }

    console.log('Saving user data:', userData)
    userService.save(userData)
    applyUserPreferences(userData.txtColor, userData.bgColor)
}

function applyUserPreferences(txtColor, bgColor) {
    const isSettingsPage = window.location.pathname.includes('user-settings.html')
    if (!isSettingsPage) return

    document.body.style.color = txtColor
    document.body.style.backgroundColor = bgColor
    document.body.style.backgroundImage = 'none'
}

const userService = {
    save,
    load
}

function save(userData) {
    localStorage.setItem('userPrefs', JSON.stringify(userData))
}

function load() {
    return JSON.parse(localStorage.getItem('userPrefs'))
}

window.addEventListener('load', () => {
    const userData = userService.load()
    if (userData) applyUserPreferences(userData.txtColor, userData.bgColor)

})

function onAgeInput(val) {
    const el = document.querySelector('.age-val')
    if (el) el.innerText = val
}

function resetUserSettings() {
    localStorage.removeItem('userPrefs')
    document.body.removeAttribute('style')
    location.reload()
}
