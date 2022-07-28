window.addEventListener("load", () => {
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os")
    } document.documentElement.className = localStorage.getItem("theme")

    document.querySelectorAll("input[name='settings-theme']").forEach((element) => {
        if (element.value == localStorage.getItem("theme")) {
            element.setAttribute("checked", "checked")
        }

        element.addEventListener("change", function(event) {
            document.documentElement.className = event.target.value
            localStorage.setItem("theme", event.target.value)
        })
    })

    document.querySelector("input[name='gaiindex']").value = localStorage.getItem("gaiTimetable")
    document.querySelector("input[name='gaiindex']").addEventListener("click", () => {
        localStorage.setItem("gaiTimetable", document.querySelector("input[name='gaiindex']").value)
    })

    document.querySelectorAll("input[name='settings-class']").forEach((element) => {
        if (element.value == localStorage.getItem("classTimetable")) {
            element.setAttribute("checked", "checked")

            if (localStorage.getItem("classTimetable") == "custom") {
                document.querySelector(".settings-class-custom-wrapper").style.display = "block"
            }
        }

        element.addEventListener("change", function(event) {
            if (event.target.value == "custom") {
                document.querySelector(".settings-class-custom-wrapper").style.display = "block"
            } if (event.target.value != "custom") {
                document.querySelector(".settings-class-custom-wrapper").style.display = "none"
                localStorage.setItem("classTimetable", event.target.value)
                document.querySelector(".table").style.opacity = "0"
                setTimeout(() => {
                    setClassVariables()
                    fillClasses()
                    classJoiningSystem()
                    document.querySelector(".table").style.opacity = "1"
                }, 200);
            }
        })
    })

    document.querySelectorAll(".settings-timeremaining").forEach((element) => {
        if (localStorage.getItem("enableTimeRemaining") == "true") {
            document.querySelector("input[name='timeremaining']").setAttribute("checked", "checked")
        } if (localStorage.getItem("enableTimeRemainingSound") == "true") {
            document.querySelector("input[name='timeremaining-sound']").setAttribute("checked", "checked")
        }

        element.addEventListener("click", function(event) {
            if (event.target.name === "timeremaining") {
                if (event.target.checked) {
                    localStorage.setItem("enableTimeRemaining", true)
                } if (!event.target.checked) {
                    localStorage.setItem("enableTimeRemaining", false)
                }
            } if (event.target.name === "timeremaining-sound") {
                if (event.target.checked) {
                    localStorage.setItem("enableTimeRemainingSound", true)
                } if (!event.target.checked) {
                    localStorage.setItem("enableTimeRemainingSound", false)
                }
            }
        })
    })

    setTimeout(() => {
        openSettings()
    }, 500);
})

function openSettings() {
    disableScrollbar()
    document.getElementById('settings-wrapper').style.display = 'block'
    document.getElementById("full-page-overlay").style.display = "block"
}

function closeSettings() {
    enableScrollbar()
    document.getElementById('settings-wrapper').style.display = 'none'
    document.getElementById("full-page-overlay").style.display = "none"
}

function reloadSettings() {
    popupConfirm("Reload Timetable?", "This action requires Timetable to reload, reload now?", "reloadTimetable", "returnNothing")
}

function reloadTimetable() {
    location.reload()
}