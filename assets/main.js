window.onload = function() {
    console.log("%cWarning\n\n%cBy using this console you can get attacked by what it's called 'Self-XSS.' Never paste and run any codes that you don't understand.\n",
                "text-align: center; font-size: 1.5em; color: red; font-weight: bold;", "text-align: center;")

    document.getElementById("year").innerHTML = "2022"

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.className = 'light';
    } if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.className = 'dark';
    }

    setNavigationOffset()
    setThemeIcon()

    document.querySelectorAll(".projects-title-link").forEach(title => {
        title.innerHTML += `<span style="color: var(--color-blue);" class="material-symbols-outlined">navigate_next</span>`
    })
}

function setNavigationOffset() {
    document.getElementById("main").style.marginTop = `${document.getElementById("navigation-bar").offsetHeight}px`
    window.addEventListener('resize', setNavigationOffset)
}


function setThemeIcon() {
    if (localStorage.getItem("theme") == "dark") {
        document.documentElement.classList = "dark";
        return document.getElementById("theme-switch").textContent = "light_mode"
    } if (localStorage.getItem("theme") == "light") {
        document.documentElement.classList = "light";
        return document.getElementById("theme-switch").textContent = "dark_mode"
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.documentElement.className = 'light';
        } if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.className = 'dark';
        }
    }
}

// Function for swapping color themes.
function themeswitch() {
    if (document.documentElement.classList != 'dark') {
        localStorage.setItem("theme", "dark")
        document.getElementById("theme-switch").textContent = "light_mode"
        return document.documentElement.className = 'dark';
    } if (document.documentElement.classList == 'dark') {
        localStorage.setItem("theme", "light")
        document.getElementById("theme-switch").textContent = "dark_mode"
        return document.documentElement.className = 'light';
    }
}