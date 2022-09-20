window.onload = function () {
    console.log("%cWarning!%c\n\nConsole is a very powerful tool.\n\nRunning codes you don't understand can steal your personal data.\n\nNever paste and run any code you don't understand.",
        "font-family: sans-serif; font-weight: bold; font-size: 1.5em; color: var(--color-red);",
        "font-family: sans-serif;")
        
    document.getElementById("year").innerHTML = "2022"

    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os")
    }
    document.documentElement.className = localStorage.getItem("theme")

    setNavigationOffset()

    document.querySelectorAll("a.projects-title[href]:not([value='']").forEach(title => {
        title.innerHTML += `<span style="color: var(--color-blue);" class="material-symbols-outlined">navigate_next</span>`
    })
}

function setNavigationOffset() {
    document.getElementById("main").style.marginTop = `${document.getElementById("navigation-bar").offsetHeight}px`
    window.addEventListener('resize', setNavigationOffset)
}


function setThemeIcon() {
    if (localStorage.getItem("theme") == "dark") {
        return document.getElementById("theme-switch").textContent = "light_mode"
    }
    if (localStorage.getItem("theme") == "light") {
        return document.getElementById("theme-switch").textContent = "dark_mode"
    }
}

// Function for swapping color themes.
function swapTheme() {
    if (document.documentElement.classList != 'dark') {
        localStorage.setItem("theme", "dark")
        document.getElementById("theme-switch").textContent = "light_mode"
        return document.documentElement.className = 'dark';
    }
    if (document.documentElement.classList == 'dark') {
        localStorage.setItem("theme", "light")
        document.getElementById("theme-switch").textContent = "dark_mode"
        return document.documentElement.className = 'light';
    }
}