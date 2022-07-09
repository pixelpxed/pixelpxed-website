window.addEventListener('load', () => {
    checkSetup()
});

function checkSetup() {
    if (localStorage.getItem("setupComplete") != "true") {
        disableScrollbar()
        document.getElementById("setup-wrapper").style.display = "block"
        checkForCustomJSON()
    } if (localStorage.getItem("setupComplete") == "true") {
        document.getElementById("setup-wrapper").remove()
        document.getElementById("full-page-overlay").style.display = "none"
    }
}

// If #setup-option-class value is 'custom', display #setup-custom-json-wrapper.
function checkForCustomJSON() {
    document.getElementById("setup-option-class").addEventListener("click", () => {
        if (document.getElementById("setup-option-class").value == "custom") {
            return document.getElementById("setup-custom-json-wrapper").style.display = "block"
        } if (document.getElementById("setup-option-class").value != "custom") {
            return document.getElementById("setup-custom-json-wrapper").style.display = "none"
        }
    })
}

function setupTimetable() {
    localStorage.clear()

    var classSetup = document.getElementById("setup-option-class").value

    localStorage.setItem("classTimetable", classSetup)
    localStorage.setItem("gaiTimetable", document.getElementById("setup-option-index").value)

    if (classSetup == "custom") {
        var jsonClassSetup = document.getElementById("setup-custom-json-value-classes").value
        var jsonLinksSetup = document.getElementById("setup-custom-json-value-links").value

        if (jsonClassSetup == "" || jsonLinksSetup === "") {
            return document.getElementById("setup-error").textContent = "All fields can't be empty."
        } 
        
        localStorage.setItem("customClassJSON", jsonClassSetup)
        localStorage.setItem("customLinksJSON", jsonLinksSetup)
    }

    localStorage.setItem("setupComplete", "true")

    location.href = "./"
}

function resetTimetable() {
    popupConfirm("Reset Timetable?", "Are you sure you want to reset your Timetable? This action can't be undone!", resetTimetableTrue, returnNothing)
}

function resetTimetableTrue() {
    localStorage.clear()
    return location.href = "./"
}