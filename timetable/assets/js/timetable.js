var customclasses = undefined
var classes = undefined

window.addEventListener('load', () => {
    if (localStorage.getItem("setupComplete") === "true") {
        setClassVariables()
        setTimetableSystemInformation()
        fillClasses()
        classJoiningSystem()
        fillBookmarks()
        updateChecker()
        googleSearchEnter()
    }
});

function setTimetableSystemInformation() {
    if (timetableversion != "") {
        document.querySelectorAll(".js-fill-version").forEach(element => {
            element.innerHTML = timetableversion
        })
    }
    if (classtime_type != "") {
        document.querySelectorAll(".js-fill-timetype").forEach(element => {
            element.innerHTML = classtime_type
        })
    }
    if (classtimes[classtime_type]["notify"] == true) {
        addNotification(`${classtime_type} class time is enabled by your Timetable provider.`)
    }
}

function setClassVariables() {
    if (localStorage.getItem("classTimetable") === "305") {
        classes = classes_305
        subj = subj_305
        document.querySelector(".mobile-link").style.display = "inline-flex"
        return
    } if (localStorage.getItem("classTimetable") === "306") {
        classes = classes_306
        subj = subj_306
        document.querySelector(".mobile-link").style.display = "none"
        return
    } if (localStorage.getItem("classTimetable") === "custom") {
        classes = JSON.parse(localStorage.getItem("customClassJSON")).customclass
        subj = JSON.parse(localStorage.getItem("customClassJSON")).customlinks
        return
    } else {
        popupConfirm("An error occured.", "Your Timetable data doesn't seem to be correct, click 'Yes' to setup your Timetable again.", "resetTimetable", "returnNothing")
    }
}

// Timetable grid filling system.
var electiveGrid = undefined
function fillClasses() {
    // Disables the context menu in the table
    document.querySelector("div.table").addEventListener('contextmenu', event => {
        event.preventDefault();
    })

    for (let timeFilled = 0; timeFilled <= 10; timeFilled++) {
        document.getElementById(`time${timeFilled + 1}`).innerHTML = classtimes[classtime_type]["list"][timeFilled]
    }

    if (localStorage.getItem("classTimetable") === "custom") {
        for (let timeFilled = 0; timeFilled <= 10; timeFilled++) {
            document.getElementById(`time${timeFilled + 1}`).innerHTML = (JSON.parse(localStorage.getItem("customClassJSON")).customtime)[timeFilled]
        }

        document.querySelectorAll(".js-fill-timetype").forEach(element => {
            element.innerHTML = "Custom"
        })
    }

    // Fill class names and styling.
    for (let classFilled = 0; classFilled <= 54; classFilled++) {
        var gridForwardZero = document.getElementById(classFilled)
        var gridForwardOne = document.getElementById(classFilled + 1)

        gridForwardOne.className = "table-grid"
        gridForwardOne.style.display = "block"


        gridForwardOne.innerHTML = classes[classFilled]
        gridForwardOne.classList.add("class-joinable")

        if (elective_toggle == true) {
            document.querySelector(".elective-swapper").style.display = "inline-flex"
            if (classes[classFilled] == elective_primary) {
                electiveGrid = classFilled + 1
            }
        }

        if (classes[classFilled] == "DClass") {
            if (classFilled == 0) {
                console.error(`Setting a double class in the first grid is not possible, Timetable is ignoring the 'DClass' declairation for the grid.`)
                addNotification("Setting a double class in the first grid is not possible, Timetable is ignoring the 'DClass' declairation for the grid.", `error`)
            } if (classFilled != 0) {
                gridForwardZero.classList.add("table-double")
                gridForwardOne.style.display = "none"
            }
        } if (classes[classFilled] == "" || classes[classFilled] == "Break" || classes[classFilled] == "Lunch") {
            gridForwardOne.classList.add("table-grid-dark")
            gridForwardOne.classList.remove("class-joinable")
            gridForwardOne.classList.add("class-not-joinable")
        }
    }

    if (localStorage.getItem("electiveClass") === elective_secondary) {
        document.getElementById(electiveGrid).innerHTML = elective_secondary
    }
}

function classJoiningSystem() {
    var gaiNumber = localStorage.getItem("gaiTimetable")

    document.querySelectorAll(".class-joinable").forEach(grid => {
        var subjText = grid.innerHTML;
        grid.addEventListener("click", () => {
            var subjVdo = subj[subjText].videocall

            if (grid.id == electiveGrid) {
                if (grid.textContent == elective_secondary) {
                    return window.open(`https://meet.google.com/${subj[elective_secondary].videocall}?authuser=${gaiNumber}`);
                }
            }

            if (subjVdo !== "" && subjVdo !== null && subjVdo !== undefined) {
                console.log(`"${subjText}" class video call opened.`)
                return window.open(`https://meet.google.com/${subjVdo}?authuser=${gaiNumber}`);
            } if (subjVdo == "" || subjVdo == null || subjVdo == undefined) {
                return addNotification(`"${subjText}" class does not have a video call link.`, `error`)
            }
        }),
        grid.addEventListener("auxclick", () => {
            var subjCls = subj[subjText].classroom
            if (subjCls !== "" && subjCls !== null && subjCls !== undefined) {
                console.log(`"${subjText}" class classroom opened.`)
                return window.open(`https://classroom.google.com/u/${gaiNumber}/c/${subjCls}`);
            } if (subjCls == "" || subjCls == null || subjCls == undefined) {
                return addNotification(`"${subjText}" class does not have a classroom link.`, `error`)
            }
        })
    })
}

function swapElectiveClass() {
    if (electiveGrid != undefined) {
        var electiveGridContent = document.getElementById(electiveGrid)
        if (electiveGridContent.innerHTML == elective_primary) {
            localStorage.setItem("electiveClass", elective_secondary)
            return electiveGridContent.innerHTML = elective_secondary
        } if (electiveGridContent.innerHTML == elective_secondary) {
            localStorage.setItem("electiveClass", elective_primary)
            return electiveGridContent.innerHTML = elective_primary
        }
    }
}

function googleSearchEnter() {
    document.getElementById("google-search").addEventListener("keydown", key => {
        if (key.code === "Enter") {
            searchGoogle()
        }
    })
}

function searchGoogle() {
    var searchValue = document.getElementById('google-search').value;
    window.open(`https://www.google.com/search?q=${searchValue}`);
    document.getElementById('google-search').value = ""
}

var changelogfetched = false
function about() {    
    if (document.getElementById("about-wrapper").style.display != "block") {
        disableScrollbar()
        if (changelogfetched === false) {
            fetch('./assets/components/html/changelog.html')
                .then((response) => response.text())
                .then((html) => {document.getElementById("about-content").innerHTML = html;})
            changelogfetched = true
        }
        document.getElementById("about-wrapper").style.display = "block"
        return document.getElementById("full-page-overlay").style.display = "block"
    } if (document.getElementById("about-wrapper").style.display == "block") {
        enableScrollbar()
        document.getElementById("about-wrapper").style.display = "none"
        return document.getElementById("full-page-overlay").style.display = "none"
    }
}

function fillBookmarks() {
    for (let bookmarkRowFilled = 0; bookmarkRowFilled <= 1; bookmarkRowFilled++) {
        document.getElementById(`bookmark-title-${bookmarkRowFilled}`).innerHTML = bookmarks[bookmarkRowFilled].title
        for (let bookmarkFilled = 0; bookmarkFilled <= 4; bookmarkFilled++) {
            const bookmarkElement = document.getElementById(`bookmark-${bookmarkRowFilled}-${bookmarkFilled}`)
            const bookmarkJSON = bookmarks[bookmarkRowFilled]["bookmarks"][bookmarkFilled]

            bookmarkElement.innerHTML = bookmarkJSON.title
            
            bookmarkElement.setAttribute("href", bookmarkJSON.url)
            if (bookmarkJSON.gaiRequired == true) {
                bookmarkElement.setAttribute("href", bookmarkJSON.url + localStorage.getItem("gaiTimetable") + bookmarkJSON.urlAfter)
            }
        }
    }
}

var fetchedversion = timetableversion
function updateChecker() {
    fetch('https://www.pixelpxed.xyz/timetable/assets/components/json/fetchresources.json')
        .then(res => res.json())
        .then(data => fetchedversion = data)

    let checkupdates = setInterval(() => {
        fetch('https://www.pixelpxed.xyz/timetable/assets/components/json/fetchresources.json')
            .then(res => res.json())
            .then(data => fetchedversion = data)

        if (fetchedversion.currentversion != timetableversion) {
            popupConfirm("New version of Timetable", `A new version of Timetable is available, reload this page now to update to the latest version by clicking the button 'Yes'.`, "reloadPage", "returnNothing")
            clearInterval(checkupdates)
        } 
        
        console.log(`Checked for Timetable updates\n- Current Version: ${timetableversion}\n- Fetched Version: ${fetchedversion.currentversion}`)
    }, 60000)
}

function reloadPage() {
    location.reload()
}