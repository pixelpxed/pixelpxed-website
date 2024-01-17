window.addEventListener('load', () => {
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os");
    }
    document.querySelector("html").setAttribute("theme", localStorage.getItem("theme"));
})

function openSettings() {
    disableScrollbar()

    popupid = popupid + 1
    if (document.querySelector('.settings-wrapper')) {
        document.querySelector('.settings-wrapper').style.display = "block"
        document.getElementById("full-page-overlay").style.display = "block"
    }
    if (!document.querySelector('.settings-wrapper')) {
        fetch('/timetable/assets/components/html/settings.html')
            .then((res) => {
                if (res.ok) {
                    return res.text()
                }
            })
            .then((html) => {
                document.querySelector(".popup-center").innerHTML += html
                document.getElementById("full-page-overlay").style.display = "block"
                setDefaultSettingsValue();
                setListenersSettingsChange();
            })
            .catch((error) => {
                cannotGetPopupContentError("settings", error)
            })
    }
}

var requiresReload = false
function closeSettings() {
    if (requiresReload == true) {
        location.reload()
    }

    enableScrollbar()
    document.querySelector('.settings-wrapper').style.display = "none"

    popupid = popupid - 1
    if (popupid === 0) {
        document.querySelector(".full-page-overlay").style.display = "none"
    }
}

function setDefaultSettingsValue() {
    // Theme
    document.querySelectorAll("input[name='settings-theme']").forEach((element) => {
        if (element.value == localStorage.getItem("theme")) {
            element.setAttribute("checked", "checked")
        }
    })

    // Google User Index
    document.querySelector("input[name='gaiindex']").value = localStorage.getItem("timetable-gaiTimetable")

    // Class
    document.querySelectorAll("input[name='settings-class']").forEach((element) => {
        if (element.value == localStorage.getItem("timetable-classTimetable")) {
            element.setAttribute("checked", "checked")

            if (localStorage.getItem("timetable-classTimetable") == "custom") {
                document.querySelector(".settings-class-custom-wrapper").style.display = "block"
            }
        }
    });
    document.querySelector(".settings-class-custom-json").value = localStorage.getItem("timetable-customClassJSON")

    // Override Time List
    document.querySelectorAll("input[name='settings-timelistoverride']").forEach((element) => {
        if (localStorage.getItem("timetable-overrideTimeList")) {
            if (element.value == localStorage.getItem("timetable-overrideTimeList")) {
                element.setAttribute("checked", "checked")
            }
        }
    });

    // Pop-up Mode
    if (localStorage.getItem("timetable-popupMode") == "true") {
        document.querySelector("input[name='popupmode']").setAttribute("checked", "checked")
    }
    
    // Time Remaining
    if (localStorage.getItem("timetable-enableTimeRemaining") == "true") {
        document.querySelector("input[name='timeremaining']").setAttribute("checked", "checked")
    }
    if (localStorage.getItem("timetable-enableTimeRemainingSound") == "true") {
        document.querySelector("input[name='timeremaining-sound']").setAttribute("checked", "checked")
    }

    // Current Class Highlight
    if (localStorage.getItem("timetable-currentClassHighlight") == "true") {
        document.querySelector("input[name='curclass-highlight']").setAttribute("checked", "checked")
    }

    // Subject Cards
    if (localStorage.getItem("timetable-subjectCard") == "true") {
        document.querySelector("input[name='subjectcard']").setAttribute("checked", "checked")
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
        localStorage.setItem("timetable-gaiTimetable", document.querySelector("input[name='gaiindex']").value)
        
        requiresReload = true
    })

    // Class
    document.querySelectorAll("input[name='settings-class']").forEach((element) => {
        element.addEventListener("change", function (event) {
            if (event.target.value == "custom") {
                document.querySelector(".settings-class-custom-wrapper").style.display = "block"
                
                requiresReload = true
            }
            if (event.target.value != "custom") {
                document.querySelector(".settings-class-custom-wrapper").style.display = "none"
                localStorage.setItem("timetable-classTimetable", event.target.value)
                
                requiresReload = true
            }
        })
    })

    // Override Time List
    document.querySelectorAll("input[name='settings-timelistoverride']").forEach((element) => {
        element.addEventListener("change", function (event) {
            localStorage.setItem("timetable-overrideTimeList", event.target.value)
            
            requiresReload = true
        })
    })

    // Pop-up Mode
    document.querySelectorAll(".settings-popupmode").forEach((element) => {
        element.addEventListener("click", function (event) {
            if (event.target.name === "popupmode") {
                if (event.target.checked) {
                    localStorage.setItem("timetable-popupMode", true)
                    
                    requiresReload = true
                }
                if (!event.target.checked) {
                    localStorage.setItem("timetable-popupMode", false)
                    
                    requiresReload = true
                }
            }
        })
    })

    // Time Remaining
    document.querySelectorAll(".settings-timeremaining").forEach((element) => {
        element.addEventListener("click", function (event) {
            if (event.target.name === "timeremaining") {
                if (event.target.checked) {
                    localStorage.setItem("timetable-enableTimeRemaining", true)
                    timeRemaining()
                } if (!event.target.checked) {
                    localStorage.setItem("timetable-enableTimeRemaining", false)
                    clearInterval(timeleftinterval)
                    document.querySelector(".timeremaining").remove()
                }
            }
            if (event.target.name === "timeremaining-sound") {
                if (event.target.checked) {
                    localStorage.setItem("timetable-enableTimeRemainingSound", true)
                }
                if (!event.target.checked) {
                    localStorage.setItem("timetable-enableTimeRemainingSound", false)
                }
            }
        })
    })

    // Highlight Current Class
    document.querySelectorAll(".settings-highlightcurclass").forEach((element) => {
        element.addEventListener("click", function (event) {
            if (event.target.name === "curclass-highlight") {
                if (event.target.checked) {
                    localStorage.setItem("timetable-currentClassHighlight", true)
                }
                if (!event.target.checked) {
                    localStorage.setItem("timetable-currentClassHighlight", false)
                    clearActiveClass()
                }
            }
        })
    })

    // Subject Cards
    document.querySelectorAll(".settings-subjectcard").forEach((element) => {
        element.addEventListener("click", function (event) {
            if (event.target.name === "subjectcard") {
                if (event.target.checked) {
                    localStorage.setItem("timetable-subjectCard", true)
                    
                    requiresReload = true
                }
                if (!event.target.checked) {
                    localStorage.setItem("timetable-subjectCard", false)
                    
                    requiresReload = true
                }
            }
        })
    })
}

function saveCustomTimetable() {
    localStorage.setItem("timetable-customClassJSON", document.querySelector(".settings-class-custom-json").value)
    localStorage.setItem("timetable-classTimetable", "custom")
}