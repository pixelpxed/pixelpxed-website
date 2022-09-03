window.addEventListener('load', () => {
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os");
    }
    document.querySelector("html").setAttribute("theme", localStorage.getItem("theme"));
})

var settingsBoxFetched = false

function openSettings() {
    disableScrollbar()

    if (settingsBoxFetched == true) {
        document.querySelector('.settings-wrapper').style.display = "block"
    }
    if (settingsBoxFetched != true) {
        fetch('./assets/components/html/settings.html')
            .then((response) => response.text())
            .then((html) => document.querySelector(".popup-center").innerHTML += html)
            .then(() => {
                setDefaultSettingsValue();
                setListenersSettingsChange();
            })
        settingsBoxFetched = true
    }

    document.getElementById("full-page-overlay").style.display = "block"
}

function closeSettings() {
    enableScrollbar()
    document.querySelector('.settings-wrapper').style.display = "none"
    document.querySelector(".full-page-overlay").style.display = "none"
}

function setDefaultSettingsValue() {
    // Theme
    document.querySelectorAll("input[name='settings-theme']").forEach((element) => {
        if (element.value == localStorage.getItem("theme")) {
            element.setAttribute("checked", "checked")
        }
    })

    // Google User Index
    document.querySelector("input[name='gaiindex']").value = localStorage.getItem("gaiTimetable")

    // Class
    document.querySelectorAll("input[name='settings-class']").forEach((element) => {
        if (element.value == localStorage.getItem("classTimetable")) {
            element.setAttribute("checked", "checked")

            if (localStorage.getItem("classTimetable") == "custom") {
                document.querySelector(".settings-class-custom-wrapper").style.display = "block"
            }
        }
    });
    document.querySelector(".settings-class-custom-json").value = localStorage.getItem("customClassJSON")

    // Pop-up Mode
    if (localStorage.getItem("popupMode") == "true") {
        document.querySelector("input[name='popupmode']").setAttribute("checked", "checked")
    }
    // Time Remaining
    if (localStorage.getItem("enableTimeRemaining") == "true") {
        document.querySelector("input[name='timeremaining']").setAttribute("checked", "checked")
    }
    if (localStorage.getItem("enableTimeRemainingSound") == "true") {
        document.querySelector("input[name='timeremaining-sound']").setAttribute("checked", "checked")
    }
}

function setListenersSettingsChange() {
    // Theme
    document.querySelectorAll("input[name='settings-theme']").forEach((element) => {
        element.addEventListener("change", function (event) {
            document.querySelector("html").setAttribute("theme", event.target.value);
            localStorage.setItem("theme", event.target.value)
        })
    })

    // Google User Index
    document.querySelector("input[name='gaiindex']").addEventListener("click", () => {
        localStorage.setItem("gaiTimetable", document.querySelector("input[name='gaiindex']").value)
    })

    // Class
    document.querySelectorAll("input[name='settings-class']").forEach((element) => {
        element.addEventListener("change", function (event) {
            if (event.target.value == "custom") {
                document.querySelector(".settings-class-custom-wrapper").style.display = "block"
            }
            if (event.target.value != "custom") {
                document.querySelector(".settings-class-custom-wrapper").style.display = "none"
                localStorage.setItem("classTimetable", event.target.value)
                location.reload()
            }
        })
    })

    // Time Remaining
    document.querySelectorAll(".settings-timeremaining").forEach((element) => {
        element.addEventListener("click", function (event) {
            if (event.target.name === "timeremaining") {
                if (event.target.checked) {
                    localStorage.setItem("enableTimeRemaining", true)
                    timeRemaining()
                } if (!event.target.checked) {
                    localStorage.setItem("enableTimeRemaining", false)
                    clearInterval(timeleftinterval)
                    document.querySelector(".timeremaining").remove()
                }
            }
            if (event.target.name === "timeremaining-sound") {
                if (event.target.checked) {
                    localStorage.setItem("enableTimeRemainingSound", true)
                }
                if (!event.target.checked) {
                    localStorage.setItem("enableTimeRemainingSound", false)
                }
            }
        })
    })

    // Pop-up Mode
    document.querySelectorAll(".settings-popupmode").forEach((element) => {
        element.addEventListener("click", function (event) {
            if (event.target.name === "popupmode") {
                if (event.target.checked) {
                    localStorage.setItem("popupMode", true)
                    location.reload()
                }
                if (!event.target.checked) {
                    localStorage.setItem("popupMode", false)
                    location.reload()
                }
            }
        })
    })
}

function saveCustomTimetable() {
    localStorage.setItem("customClassJSON", document.querySelector(".settings-class-custom-json").value)
    localStorage.setItem("classTimetable", "custom")
    return location.reload()
}