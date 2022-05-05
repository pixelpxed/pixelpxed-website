var curtheme = 'dark'
var language_var = 'primary'

var fetchedversion = undefined
var notifyoffline = false

var var_day = var_day_primary 
var var_month = var_month_primary

var choosesubjid = null

window.onload = function() {
    console.log("%cWarning\n\n%cBy using this console you can get attacked by what it's called 'Self-XSS.' Never paste and run any codes that you don't understand.\n",
                "text-align: center; font-size: 1.5em; color: red; font-weight: bold;", "text-align: center;")

    document.getElementById("version").innerHTML = versionnumber
    document.getElementById("year").innerHTML = copyrightyear
    
    if (secondarylanguage == true) {
        document.getElementById("changelanguagebtn").style.display = "inline-block"
    }

    update()
    onstartsetup()
    joiningsystem()

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        curtheme = 'light';
    } 

    if (swapper_control == true) {
        document.getElementById("navbar-right").style.display = "block"

        if (localStorage.getItem("swapperclass") == "Primary") {
            swap_secondary(false)
        } if (localStorage.getItem("swapperclass") == "Secondary") {
            swap_primary(false)
        }
    }

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            clearInterval(stateCheck);
            document.getElementById("loadingscreen").style.animation = "fadeout 0.3s"
            setTimeout(() => {
                document.getElementById("loadingscreen").remove()
            }, 300)
        }
    }, 1);
}

function update() {
    fetch('https://www.pixelpxed.xyz/fetch.json')
        .then(res => res.json())
        .then(data => fetchedversion = data)

    let checkupdates = setInterval(() => {
        fetch('https://www.pixelpxed.xyz/fetch.json')
            .then(res => res.json())
            .then(data => fetchedversion = data)

        if (fetchedversion.currentversion != versionnumber) {
            document.getElementById("fixedribbon").innerHTML = `A new version of Timetable is available, reload this page to update your Timetable to the latest version.<a onclick="location.reload()">Reload</a>`
            document.getElementById("fixedribbon").style.display = "block"
            notifyoffline = false
        } console.log(`Checked for Timetable updates\n- Current Version: ${versionnumber}\n- Fetched Version: ${fetchedversion.currentversion}`)
    }, 60000)
}

function onstartsetup() {
    setInterval(() => {
        var today = new Date();
        var day = var_day[today.getDay()];
        var date = today.getDate();
        var month = var_month[today.getMonth()];
        var year = today.getFullYear();
    
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
    
        document.getElementById("clock").innerHTML = `${h > 9 ? h : "0" + h}:${m >= 10 ? m : "0" + m}:${s >= 10 ? s : "0" + s}`
        document.getElementById("day").innerHTML = `${day}, ${date > 9 ? date : "0" + date} ${month} ${year}`;
    }, 1);

    for (let timeFilled = 0; timeFilled <= 10; timeFilled++) {
        document.getElementById("time" + timeFilled).innerHTML = time[timeFilled];
    }

    for (let classFilled = 0; classFilled <= 54; classFilled++) {
        document.getElementById(classFilled).innerHTML = classes_primary[classFilled];

        if (document.getElementById(classFilled).innerHTML == swapper_primary_language_primary) {
            choosesubjid = classFilled
        }

        if (document.getElementById(classFilled).innerHTML == "Lunch") {
            document.getElementById(classFilled).classList.add("subjectgrid-darker");
            document.getElementById(classFilled).classList.remove("joinable");
        } if (document.getElementById(classFilled).innerHTML == "Break") {
            document.getElementById(classFilled).classList.add("subjectgrid-darker");
            document.getElementById(classFilled).classList.remove("joinable");
        } if (document.getElementById(classFilled).innerHTML == "") {
            document.getElementById(classFilled).classList.add("subjectgrid-darker");
            document.getElementById(classFilled).classList.remove("joinable");
        } if (document.getElementById(classFilled).innerHTML == "DClass") {
            document.getElementById(classFilled).style.display = "none";
            document.getElementById(classFilled - 1).classList.add("dclass");
        }
    }

    for (let elementFilled = 0; elementFilled <= 5; elementFilled++) {
        document.getElementById("element" + elementFilled).textContent = element_primary[elementFilled]
    }

    for (let rowFilled = 0; rowFilled <= 1; rowFilled++) {
        for (let bookmarkNumber = 0; bookmarkNumber <= 3; bookmarkNumber++) {
            document.getElementById("bookmark" + bookmarkNumber + "-" + rowFilled).innerHTML = `${bookmarks["row" + rowFilled]["content" + bookmarkNumber].name}<br><a style="color: var(--linkblue);" href="${bookmarks["row" + rowFilled]["content" + bookmarkNumber].url}" target="_blank">${bookmark_go_name_primary} ›</a>`;
        } document.getElementById("row" + rowFilled).innerHTML = `${bookmarks["row" + rowFilled].rowname}`;
    }
}

function language_primary() {
    var_day = var_day_primary 
    var_month = var_month_primary

    for (let classFilled = 0; classFilled <= 54; classFilled++) {
        document.getElementById(classFilled).innerHTML = classes_primary[classFilled];
    }

    for (let elementFilled = 0; elementFilled <= 5; elementFilled++) {
        document.getElementById("element" + elementFilled).textContent = element_primary[elementFilled]
    }

    for (let rowFilled = 0; rowFilled <= 1; rowFilled++) {
        for (let bookmarkNumber = 0; bookmarkNumber <= 3; bookmarkNumber++) {
            document.getElementById("bookmark" + bookmarkNumber + "-" + rowFilled).innerHTML = `${bookmarks["row" + rowFilled]["content" + bookmarkNumber].name}<br><a style="color: var(--linkblue);" href="${bookmarks["row" + rowFilled]["content" + bookmarkNumber].url}" target="_blank">Go ›</a>`;
        } document.getElementById("row" + rowFilled).innerHTML = `${bookmarks["row" + rowFilled].rowname}`;
    }
    
    document.getElementById("timetable-box-title").innerHTML = timetable_title_primary
    document.getElementById("timetable-box-description").innerHTML = timetable_description_primary

    document.getElementById("onlineonsitetxt").textContent = online_onsite_primary

    document.getElementById("searchtitle").textContent = bookmark_google_title_primary
    document.getElementById("searchbar").placeholder = bookmark_google_title_primary
    document.getElementById("searchsubmit").value = bookmark_google_search_primary

    if (localStorage.getItem("swapperclass") != "Secondary") {
        document.getElementById(choosesubjid).textContent = swapper_secondary_language_primary;
    } if (localStorage.getItem("swapperclass") == "Secondary") {
        document.getElementById(choosesubjid).textContent = swapper_primary_language_primary;
    }
}

function language_secondary() {
    var_day = var_day_secondary
    var_month = var_month_secondary
    
    for (let classFilled = 0; classFilled <= 54; classFilled++) {
        document.getElementById(classFilled).innerHTML = classes_secondary[classFilled];
    }

    for (let elementFilled = 0; elementFilled <= 5; elementFilled++) {
        document.getElementById("element" + elementFilled).textContent = element_secondary[elementFilled]
    }

    for (let rowFilled = 0; rowFilled <= 1; rowFilled++) {
        for (let bookmarkNumber = 0; bookmarkNumber <= 3; bookmarkNumber++) {
            document.getElementById("bookmark" + bookmarkNumber + "-" + rowFilled).innerHTML = `${bookmarks["row" + rowFilled]["content" + bookmarkNumber].name}<br><a style="color: var(--linkblue);" href="${bookmarks["row" + rowFilled]["content" + bookmarkNumber].url}" target="_blank">${bookmark_go_name_primary} ›</a>`;
        } document.getElementById("row" + rowFilled).innerHTML = `${bookmarks["row" + rowFilled].rowname_secondary}`;
    }

    document.getElementById("timetable-box-title").innerHTML = timetable_title_secondary
    document.getElementById("timetable-box-description").innerHTML = timetable_description_secondary

    document.getElementById("onlineonsitetxt").textContent = online_onsite_secondary

    document.getElementById("searchtitle").textContent = bookmark_google_title_secondary
    document.getElementById("searchbar").placeholder = bookmark_google_title_secondary
    document.getElementById("searchsubmit").value = bookmark_google_search_secondary

    if (localStorage.getItem("swapperclass") != "Secondary") {
        document.getElementById(choosesubjid).textContent = swapper_secondary_language_secondary;
    } if (localStorage.getItem("swapperclass") == "Secondary") {
        document.getElementById(choosesubjid).textContent = swapper_primary_language_secondary;
    }
}

function language_swapper() {
    if (language_var == 'primary') {
        language_var = 'secondary';
        popup(`CNE-02`, `The language has been changed.`, `white`)
        return language_secondary()
    } if (language_var == 'secondary') {
        language_var = 'primary';
        popup(`CNE-02`, `The language has been changed.`, `white`)
        return language_primary()
    }
}

function themeswitch() {
    if (curtheme == 'dark') {
        curtheme = 'light';
        popup(`CNE-03`, `The theme has been changed.`, `white`)
        return document.documentElement.className = 'light';
    } if (curtheme == 'light') {
        curtheme = 'dark';
        popup(`CNE-03`, `The theme has been changed.`, `white`)
        return document.documentElement.className = 'dark';
    }
}

function swap_primary(popupshow) {
    if (language_var == 'primary') {
        document.getElementById(choosesubjid).textContent = swapper_secondary_language_primary
    } if (language_var == 'secondary') {
        document.getElementById(choosesubjid).textContent = swapper_secondary_language_secondary
    }

    document.getElementById("swapper-primary").style.opacity = "0.5"
    document.getElementById("swapper-secondary").style.opacity = "1"

    localStorage.setItem("swapperclass", "Primary")

    if (popupshow == false) {
        return
    } return popup(`CNE-01`, `The class has been swapped, Timetable will remember the change.`, `white`)
}

function swap_secondary(popupshow) {
    if (language_var == 'primary') {
        document.getElementById(choosesubjid).textContent = swapper_primary_language_primary
    } if (language_var == 'secondary') {
        document.getElementById(choosesubjid).textContent = swapper_primary_language_secondary
    }
    
    document.getElementById("swapper-primary").style.opacity = "1"
    document.getElementById("swapper-secondary").style.opacity = "0.5"

    localStorage.setItem("swapperclass", "Secondary")

    if (popupshow == false) {
        return
    } return popup(`CNE-01`, `The class has been swapped, Timetable will remember the change.`, `white`)
}

function joiningsystem() {
    document.querySelectorAll("div.table").forEach(grid => {grid.addEventListener('contextmenu', event => event.preventDefault());})

    document.querySelectorAll("a.joinable").forEach(grid => {
        var subjecttext = grid.innerHTML;
        grid.addEventListener("click", () => {
            var o = subj[subjecttext].videocall;

            if (grid.id == choosesubjid) {
                if (grid.textContent == "Japanese")
                return popup(`JAP-01`, `Your teacher should send you a link, please check there!`, `white`)
            }

            if (o !== "") {
                console.log(`[SUC-01] Open "${grid.innerHTML}" subject video call.`)
                return window.open(o);
            } if (o == "" || o == null || o == undefined) {
                return popup(`NON-02`, `"${grid.innerHTML}" subject doesn't have a video call link.`); 
            }
        }), 
        grid.addEventListener("auxclick", () => {
            var o = subj[subjecttext].classroom;
    
            if (grid.id == choosesubjid) {
                if (grid.textContent == "Japanese")
                return window.open(subj["Japanese"].classroom)
            }

            if (o !== "") {
                console.log(`[SUC-02] Open "${grid.innerHTML}" subject classroom.`)
                return window.open(o);
            } if (o == "" || o == null || o == undefined) {
                return popup(`NON-02`, `"${grid.innerHTML}" subject doesn't have a classroom link.`);
            }
        })
    })

    document.querySelectorAll("a.subjectgrid-darker").forEach(grid => {
        grid.addEventListener("click", () => {
            popup(`BLK-01`, `There's no class here, so there's no video call for you to attend!`, `white`);
        }), 
        grid.addEventListener("auxclick", () => {
            popup(`BLK-02`, `There's no class here, so there's no classroom for you to check!`, `white`);
        })
    })
}

function clearSearch() {
    var searchvalue = document.getElementById("searchbar").value
    window.open(`https://www.google.com/search?q=${searchvalue}`).focus
    document.getElementById("searchbar").value = ''
}

function popup(code, msg, status) {
    document.querySelector(".popup").className = "popup";
    document.querySelector(".timebar-player").className = "timebar-player"
    window.requestAnimationFrame(function() {
        window.requestAnimationFrame(function() {
            code = code ?? "UKN-00"
            msg = msg ?? "An unknown error occured."

            // Popup box color
            if (status == "white") {
                document.getElementById("popup").style.background = "var(--textcolor)";

                document.getElementById("codewrap").style.color = "var(--alt-textcolor)";
                document.getElementById("code").style.color = "var(--alt-textcolor)";
                document.getElementById("msg").style.color = "var(--alt-textcolor)";
            } if (!status || status != "white") {
                document.getElementById("popup").style.background = "var(--red)";

                document.getElementById("codewrap").style.color = "var(--textcolor)";
                document.getElementById("code").style.color = "var(--textcolor)";
                document.getElementById("msg").style.color = "var(--textcolor)";

                console.error(`[${code}] ${msg}`)
            }

            document.getElementById('popup').style.display = 'block'
            document.getElementById("code").innerHTML = code;
            document.getElementById("msg").innerHTML = msg;
            document.querySelector(".popup").className = "popup popup-ani";
            document.querySelector(".timebar-player").className = "timebar-player timebar-player-ani"
        });
    });
}