window.onload = function () {
    console.log("%cWarning\n\n%cBy using this console you can get attacked by what it's called 'Self-XSS.' Never paste and run any codes that you don't understand.\n",
        "text-align: center; font-size: 1.5em; color: red; font-weight: bold;", "text-align: center;")

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