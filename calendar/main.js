const parameters = new URLSearchParams(window.location.search);
const urlnoparameters = location.protocol + '//' + location.host + location.pathname;

var calendartitle = parameters.get("month");

var daycount = parseInt(parameters.get("days"));
var offsetcount = parseInt(parameters.get("offset"));

window.onload = function () {
    console.log("%cWarning\n\n%cBy using this console you can get attacked by what it's called 'Self-XSS.' Never paste and run any codes that you don't understand.\n",
        "text-align: center; font-size: 1.5em; color: red; font-weight: bold;", "text-align: center;")

    fillCalender();
    setDefaultValues();
}

function setDefaultValues() {
    document.getElementById("new-calendar-offset").value = 0;

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList = 'dark';
    }

    if (localStorage.getItem("theme") == "dark") {
        document.documentElement.classList = "dark";
        document.getElementById("themeswitch").textContent = "light_mode"
    }
    if (localStorage.getItem("theme") == "light") {
        document.documentElement.classList = "light";
        document.getElementById("themeswitch").textContent = "dark_mode"
    }
}

function fillCalender() {
    let calendar = document.querySelector(".calendar-table")

    document.getElementById("calendar-title").innerHTML = calendartitle

    rowcount = Math.ceil((daycount + offsetcount) / 7);
    document.getElementById("calendar-table").style.gridTemplateRows = `max-content repeat(${rowcount}, minmax(0, 1fr))`

    fillremaining = (rowcount * 7) - (daycount + offsetcount)

    for (let week = 1; week <= 7; week++) {
        let weekname = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][week - 1];

        calendar.insertAdjacentHTML("beforeend", `<div class="grid-content day">${weekname}</div>`);
    }

    for (let offset = 1; offset <= offsetcount; offset++) {
        calendar.insertAdjacentHTML("beforeend", `<div class="grid-content othermonth">&nbsp<div class="grid-contentedit" contenteditable></div></div>`);
    }

    for (let day = 1; day <= daycount; day++) {
        calendar.insertAdjacentHTML("beforeend", `<div class="grid-content">${day}<div class="grid-contentedit" contenteditable></div></div>`);
    }

    for (let remaining = 1; remaining <= fillremaining; remaining++) {
        calendar.insertAdjacentHTML("beforeend", `<div class="grid-content othermonth">${remaining}<div class="grid-contentedit" contenteditable></div></div>`);
    }

    document.querySelectorAll(".grid-content").forEach(grid => {
        grid.addEventListener("click", click => {
            click.currentTarget.classList.toggle("selected");
            localStorage.setItem("prevSession", document.getElementById("calendar-wrapper").innerHTML)
        })
    })
}

function newCalendar() {
    const newtitle = document.getElementById("new-calendar-title").options[document.getElementById("new-calendar-title").selectedIndex].text
    const newdays = [31, 28, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][parseInt(document.getElementById("new-calendar-title").value)]
    const newoffset = document.getElementById("new-calendar-offset").value;

    return location.replace(`${urlnoparameters}?month=${newtitle}&days=${newdays}&offset=${newoffset}`)
}

function theme() {
    if (document.documentElement.classList != 'dark') {
        localStorage.setItem("theme", "dark")
        document.getElementById("themeswitch").textContent = "light_mode"
        return document.documentElement.className = 'dark';
    }
    if (document.documentElement.classList == 'dark') {
        localStorage.setItem("theme", "light")
        document.getElementById("themeswitch").textContent = "dark_mode"
        return document.documentElement.className = 'light';
    }
}

function openNewCalendar() {
    document.getElementById('new-calendar-wrapper').style.display = 'block';
}

function closeNewCalendar() {
    document.getElementById('new-calendar-wrapper').style.display = 'none';
}

// Usage: closeribbon([Element to close in CSS style writing.], [Direction: up, left, right, down], [Duration (In seconds, numbers only.)])
function close_slide(element, direction) {
    if (direction == "up") {
        document.querySelector(element).style.top = `-${document.querySelector(element).offsetHeight}px`;
    }
    if (direction == "down") {
        document.querySelector(element).style.bottom = `-${document.querySelector(element).offsetHeight}px`;
    }
    if (direction == "left") {
        document.querySelector(element).style.left = `-${document.querySelector(element).offsetWidth}px`;
    }
    if (direction == "right") {
        document.querySelector(element).style.right = `-${document.querySelector(element).offsetWidth}px`;
    }
}