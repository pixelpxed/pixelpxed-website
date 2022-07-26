window.addEventListener("load", () => {
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os")
    } document.documentElement.className = localStorage.getItem("theme")

    document.querySelectorAll(".settings-theme").forEach((element) => {
        if (element.value == localStorage.getItem("theme")) {
            element.setAttribute("checked", "checked")
        }

        element.addEventListener("change", function(event) {
            document.documentElement.className = event.target.value
            localStorage.setItem("theme", event.target.value)
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