window.onload = function () {
    console.log(
        "\n%cWarning%c\n\nConsole is a very powerful tool.\n\nRunning codes you don't understand can break your Timetable, or worse, steal your personal data.\n\nNever paste and run any code you don't understand.\n",
        "font-family: sans-serif; font-weight: bold; font-size: 1.5em; color: var(--color-red);",
        "font-family: sans-serif;"
    )
        

    fetch("/assets/json/common.json")
        .then((res) => res.json())
        .then((json) => {
            document.getElementById("year").innerHTML = json.copyrightyear
        })

    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os");
    }
    document.querySelector("html").setAttribute("theme", localStorage.getItem("theme"));

    addTitleNavigationIcon()

    settings()
}

function toggleThemeMenu() {
    document.querySelector(".theme-option").classList.toggle("theme-option-shown")
}

function addTitleNavigationIcon() {
    document.querySelectorAll("a.projects-title[href]:not([value='']").forEach(title => {
        title.innerHTML += `<span style="color: var(--color-accent);" class="material-symbols-outlined">navigate_next</span>`
    })
}

const fullPageOverlay = document.querySelector(".full-page-overlay")
function toggleFetchPopup(element, htmlfile) {
    // Element definition
    const selectedElement = document.querySelector(element)

    // If no element is present in page, fetch and display
    if (!selectedElement) {
        fetch(`/notetaker/assets/html/${htmlfile}.html`)
            .then((res) => res.text())
            .then((html) => {
                document.querySelector(".popup-zone").insertAdjacentHTML("afterbegin", html)
                
                fullPageOverlay.style.display = "block"
                document.querySelector(element).style.display = "block"
            })
        return
    }

    // For existing element. If element is not displayed, display as block, else display as none.
    if (selectedElement.style.display == "block") {
        fullPageOverlay.style.display = "none"
        return selectedElement.style.display = "none"
    } if (selectedElement.style.display != "block") {
        fullPageOverlay.style.display = "block"
        return selectedElement.style.display = "block"
    }

    return true
}

function settings() {
    // Theme
    document.querySelectorAll("input[name='settings-theme']").forEach((element) => {
        if (element.value == localStorage.getItem("theme")) {
            element.setAttribute("checked", "checked")
        }
    })

    // Theme
    document.querySelectorAll("input[name='settings-theme']").forEach((element) => {
        element.addEventListener("change", function (event) {
            document.querySelector("html").setAttribute("theme", event.target.value);
            localStorage.setItem("theme", event.target.value)
        })
    })
}