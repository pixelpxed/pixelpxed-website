var customclasses = undefined
var classes = undefined
var overrideTimeList = "Regular"

const classTimetable = localStorage.getItem("timetable-classTimetable")

window.addEventListener('load', () => {
    if (localStorage.getItem("timetable-setupComplete") === "true") {
        setClassVariables()
        fillBookmarks()
        setTimetableSystemInformation()
        updateChecker()
        googleSearchEnter()
        checkConnection()
    }
});

function toggleFetchPopup(element, htmlfile) {
    // Element definition
    const selectedElement = document.querySelector(element)

    // If no element is present in page, fetch and display
    if (!selectedElement) {
        fetch(`/timetable/assets/components/html/${htmlfile}.html`)
            .then((res) => res.text())
            .then((html) => {
                document.querySelector(".popup-center").insertAdjacentHTML("afterbegin", html)
                
                document.querySelector(".full-page-overlay").style.display = "block"
                document.querySelector(element).style.display = "block"
            })
        return
    }

    // For existing element. If element is not displayed, display as block, else display as none.
    if (selectedElement.style.display == "block") {
        document.querySelector(".full-page-overlay").style.display = "none"
        return selectedElement.style.display = "none"
    } if (selectedElement.style.display != "block") {
        document.querySelector(".full-page-overlay").style.display = "block"
        return selectedElement.style.display = "block"
    }

    return true
}

function setTimetableSystemInformation() {
    if (localStorage.getItem("timetable-devMode") == "true") {
        addNotification(`
            <b>👋 Welcome to development mode!</b><br>
            In this mode, everything is not guaranteed to work perfectly. You may see unexpected behavior in Timetable happening, please keep that in mind while using development mode.
            <br><br>
            To toggle this mode on or off, run <a onclick="toggleDevMode()">toggleDevMode()</a> in the console.
        `)
    }

    document.querySelectorAll(".js-fill-version").forEach(element => {
        element.innerHTML = timetableversion
    })
    document.querySelectorAll(".js-fill-timetype").forEach(element => {
        element.innerHTML = classtime_type
    })
    if (fetchcopyrightyear == true) {
        fetch("/assets/json/common.json")
            .then((res) => res.json())
            .then((json) => {
                document.querySelectorAll(".js-fill-year").forEach(element => {
                    element.innerHTML = json.copyrightyear
                })
            })
    } else {
        document.querySelectorAll(".js-fill-year").forEach(element => {
            element.innerHTML = copyrightyear
        })
    }

    if (!localStorage.getItem("timetable-overrideTimeList")) {
        localStorage.setItem("timetable-overrideTimeList", "auto")
    } if (localStorage.getItem("timetable-overrideTimeList") === "auto") {
        if (classTimetable !== "custom") {
            if (classtimes[classtime_type]["notify"] == true) {
                addNotification(`${classtime_type} class time is enabled by your Timetable provider.`)
            }
        }
    } if (localStorage.getItem("timetable-overrideTimeList") !== "auto") {
        if (localStorage.getItem("timetable-overrideTimeList") === "regular") {
            overrideTimeList = "Regular"
            classtime_type = "Regular"
        } if (localStorage.getItem("timetable-overrideTimeList") === "special") {
            overrideTimeList = "Special"
            classtime_type = "Special"
        } if (localStorage.getItem("timetable-overrideTimeList") === "online") {
            overrideTimeList = "Special"
            classtime_type = "Special"
        } document.querySelector(".about-timelist").innerHTML += ` / <b>Override:</b> ${overrideTimeList}`
    }

    // Check localStorage for setting Time Remaining
    if (localStorage.getItem("timetable-enableTimeRemaining") === "true") {
        timeRemaining()
    }
}

var customClassJSON
function setClassVariables() {
    if (classTimetable === "405") {
        fetch(`${classdatafetchpath}/${classTimetable}.json`)
            .then((res) => res.json())
            .then((data) => {
                classes = data.class
                subj = data.links

                fillClasses()
                classJoiningSystem()
            })
        return
    }
    if (classTimetable === "custom") {
        customClassJSON = JSON.parse(localStorage.getItem("timetable-customClassJSON"))
        classes = customClassJSON.customclass
        subj = customClassJSON.customlinks

        fillClasses()
        classJoiningSystem()

        document.querySelectorAll(".icon-todo").forEach((item) => {
            item.remove()
        })

        document.querySelectorAll(".elective-swapper").forEach((item) => {
            item.remove()
        })
        
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

    for (let i = 0; i <= 10; i++) {
        if (classTimetable !== "custom") {
            if (localStorage.getItem("timetable-overrideTimeList") === "auto") {
                document.getElementById(`time${i + 1}`).innerHTML = classtimes[classtime_type]["list"][i]
            } if (localStorage.getItem("timetable-overrideTimeList") !== "auto") {
                document.getElementById(`time${i + 1}`).innerHTML = classtimes[overrideTimeList]["list"][i]
            }
        }
        if (classTimetable === "custom") {
            document.getElementById(`time${i + 1}`).innerHTML = (customClassJSON.customtimes)[i]
            classtime_type = "Custom"
        }
    }

    // Fill class names and styling.
    for (let i = 0; i <= 54; i++) {
        var gridBefore = document.getElementById(i)
        var grid = document.getElementById(i + 1)

        grid.className = "table-grid"


        grid.innerHTML = classes[i]
        grid.classList.add("class-joinable")

        if ((elective_toggle == true) && (classTimetable !== "custom")) {
            document.querySelector(".elective-swapper").style.display = "inline-flex"
            if (classes[i] == elective_primary) {
                electiveGrid = i + 1
            }
        }

        if (classes[i] == "DClass") {
            if (i == 0) {
                console.error(`Setting a double class in the first grid is not possible, Timetable is ignoring the 'DClass' declairation for the grid.`)
                addNotification("Setting a double class in the first grid is not possible, Timetable is ignoring the 'DClass' declairation for the grid.", `error`)
            }
            if (i != 0) {
                gridBefore.classList.add("table-double")
                grid.style.display = "none"
            }
        }
        if (classes[i] == "" || classes[i] == "Break" || classes[i] == "Lunch") {
            grid.classList.add("table-grid-dark")
            grid.classList.remove("class-joinable")
            grid.classList.add("class-not-joinable")
        }
    }

    if ((localStorage.getItem("timetable-electiveClass") === elective_secondary) && (classTimetable !== "custom")) {
        document.getElementById(electiveGrid).innerHTML = elective_secondary
    }
}

function fillBookmarks() {
    for (let i = 0; i <= 1; i++) {
        document.getElementById(`bookmark-title-${i}`).innerHTML = bookmarks[i].title
        for (let bookmarkFilled = 0; bookmarkFilled <= 4; bookmarkFilled++) {
            const bookmarkElement = document.getElementById(`bookmark-${i}-${bookmarkFilled}`)
            const bookmarkJSON = bookmarks[i]["bookmarks"][bookmarkFilled]

            bookmarkElement.innerHTML = bookmarkJSON.title

            bookmarkElement.setAttribute("href", bookmarkJSON.url)
            if (bookmarkJSON.gaiRequired == true) {
                bookmarkElement.setAttribute("href", bookmarkJSON.url + localStorage.getItem("timetable-gaiTimetable") + bookmarkJSON.urlAfter)
            }
        }
    }
}

function classJoiningSystem() {
    var gaiNumber = localStorage.getItem("timetable-gaiTimetable")

    if (localStorage.getItem("timetable-popupMode") === "true") {
        document.querySelector(".title-description").innerHTML = `<p>Tap - Show Options<br>Select Your Action</p>`
        document.querySelectorAll(".class-joinable").forEach(grid => {
            var subjText = grid.innerHTML

            grid.addEventListener("click", () => {
                var subjVdo = subj[subjText].videocall
                var subjCls = subj[subjText].classroom

                var subjTitle = subj[subjText].subjname;
                if (subjTitle === "") {
                    subjTitle = subjText
                }   var subjContent = subj[subjText]

                var subjTeacher = subjContent.teacher
                if (subjTeacher === "") {
                    subjTeacher = "<i style='opacity: 0.5;'>ไม่มีข้อมูลคุณครู</i>"
                }

                var subjCode = subjContent.subjcode
                if (subjCode === "") {
                    subjCode = "<i style='opacity: 0.5;'>ไม่มีข้อมูลรหัสวิชา</i>"
                }

                var subjClassCode = subjContent.classcode
                if (subjClassCode === "") {
                    subjClassCode = "<i style='opacity: 0.25;'>ไม่มีข้อมูล</i>"
                }

                document.querySelector(".popup-center").insertAdjacentHTML("beforeend", `
                    <div id="popup-id-${popupid}" class="class-popupmode popup">
                        <div class="popup-wrapper">
                            <div class="popup-content">
                                <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;>">
                                    <span class="popup-title">${subjTitle}</span>
                                    <span class="info-chipbox">Class Code: <span style="font-family: 'Roboto Mono', 'Sarabun', sans-serif;">${subjClassCode}</span></span>
                                </div>
                                <span class="popup-description">${subjTeacher} · ${subjCode}<br></span>
                            </div>
                            <div class="popup-buttons-box">
                                <div class="popup-buttons-wrapper popup-buttons-wrapper-${popupid}">
                                    <a class="popup-button popup-button-danger" onclick="popupDone(${popupid})">Close</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `)

                const popupelement = document.querySelector(`.popup-buttons-wrapper-${popupid}`)

                if (subjCls != "") {
                    popupelement.insertAdjacentHTML("afterbegin", `<a target="_blank" class="popup-button" onclick="popupDone(${popupid})" href="https://classroom.google.com/u/${gaiNumber}/c/${subjCls}">Classroom</a>`)
                }
                if (subjVdo != "") {
                    popupelement.insertAdjacentHTML("afterbegin", `<a target="_blank" class="popup-button" onclick="popupDone(${popupid})" href="https://meet.google.com/${subjVdo}?authuser=${gaiNumber}">Video Call</a>`)
                }

                popupOpen()
            })
        })
    }
    if (localStorage.getItem("timetable-popupMode") !== "true") {
        document.querySelector(".title-description").innerHTML = `<p>Left Click - Video Call<br>Right Click - Classroom</p>`
        document.querySelectorAll(".class-joinable").forEach(grid => {
            var subjText = grid.innerHTML;
            grid.addEventListener("click", () => {
                    var subjVdo = subj[subjText].videocall
                    if (subjVdo !== "" && subjVdo !== null && subjVdo !== undefined) {
                        console.log(`"${subjText}" class video call opened.`)
                        return window.open(`https://meet.google.com/${subjVdo}?authuser=${gaiNumber}`);
                    }
                    if (subjVdo == "" || subjVdo == null || subjVdo == undefined) {
                        return addNotification(`"${subjText}" class does not have a video call link.`, `error`)
                    }
                }),
                grid.addEventListener("auxclick", () => {
                    var subjCls = subj[subjText].classroom
                    if (subjCls !== "" && subjCls !== null && subjCls !== undefined) {
                        console.log(`"${subjText}" class classroom opened.`)
                        return window.open(`https://classroom.google.com/u/${gaiNumber}/c/${subjCls}`);
                    }
                    if (subjCls == "" || subjCls == null || subjCls == undefined) {
                        return addNotification(`"${subjText}" class does not have a classroom link.`, `error`)
                    }
                })
        })
    }

    if (localStorage.getItem("timetable-subjectCard") === "true") {
        subjectCard()
    }
}

function swapElectiveClass() {
    if (electiveGrid != undefined) {
        var electiveGridContent = document.getElementById(electiveGrid)
        if (electiveGridContent.innerHTML == elective_primary) {
            localStorage.setItem("timetable-electiveClass", elective_secondary)
            return location.reload()
        }
        if (electiveGridContent.innerHTML == elective_secondary) {
            localStorage.setItem("timetable-electiveClass", elective_primary)
            return location.reload()
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
    if (document.querySelector(".about-wrapper").style.display != "block") {
        disableScrollbar()
        if (changelogfetched === false) {
            fetch('/timetable/assets/components/html/changelog.html')
                .then((res) => {
                    if (res.ok) {
                        return res.text();
                    }
                    changelogfetched = true
                })
                .then((html) => {
                    document.querySelector(".changelog-list").innerHTML = html;
                })
                .catch((error) => {
                    return document.querySelector(".changelog-list").innerHTML = "<p class='popup-description' style='font-weight: var(--font-weight-normal); text-align: center; margin-top: 1rem;'>Cannot get changelog. Please check your connection!</p>";
                })
        }
        document.querySelector(".about-wrapper").style.display = "block"
        return document.querySelector(".full-page-overlay").style.display = "block"
    }
    if (document.querySelector(".about-wrapper").style.display == "block") {
        enableScrollbar()
        document.querySelector(".about-wrapper").style.display = "none"
        return document.querySelector(".full-page-overlay").style.display = "none"
    }
}

var fetchedversion = timetableversion
var checkupdates = undefined

function updateChecker() {
    checkupdates = setInterval(() => {
        fetch('/timetable/assets/components/json/fetchresources.json')
            .then((respond) => respond.json())
            .then((data) => fetchedversion = data)
            .then(() => {
                if (fetchedversion.currentversion != timetableversion) {
                    addNotification(`<b>New version of Timetable is available. (v${fetchedversion.currentversion})</b><br><a onclick="location.reload()">Reload</a> Timetable now to update.`)
                    clearInterval(checkupdates)
                }
                console.log(`Checked for Timetable updates\n- Client Version: ${timetableversion}\n- Server Version: ${fetchedversion.currentversion}`)
            })
    }, 60000)
}

function checkConnection() {
    window.addEventListener('online', () => {
        addNotification("Online: You're back online.")
        updateChecker()
    });
    window.addEventListener('offline', () => {
        addNotification("Offline: Try checking your connection.")
        clearInterval(checkupdates)
    });
}

function subjectCard() {
    document.querySelectorAll(".class-joinable").forEach(grid => {
        var timerIn;
        var timerOut;
        var subjText = grid.innerHTML

        // Wait 2 seconds after hover on the grid element, if the cursor doesn't move or exit, add a subject card.
        grid.addEventListener("mouseover", (event) => {
            // timerIn = setTimeout(() => {
                clearTimeout(timerOut);

                var subjTitle = subj[subjText].subjname;
                if (subjTitle === "") {
                    subjTitle = subjText
                } var subjContent = subj[subjText]

                var subjTeacher = subjContent.teacher
                if (subjTeacher === "") {
                    subjTeacher = "<i style='opacity: 0.5;'>ไม่มีข้อมูลคุณครู</i>"
                }

                var subjCode = subjContent.subjcode
                if (subjCode === "") {
                    subjCode = "<i style='opacity: 0.5;'>ไม่มีข้อมูลรหัสวิชา</i>"
                }

                var subjClassCode = subjContent.classcode
                if (subjClassCode === "") {
                    subjClassCode = "<i style='opacity: 0.25;'>ไม่มีข้อมูล</i>"
                }

                var subjClassroomIcon = ""
                if (subj[subjText].classroom !== "") {
                    subjClassroomIcon = `
                        <div class="info-chipbox"x>
                            Classroom
                        </div>
                    `
                }

                var subjVideoIcon = ""
                if (subj[subjText].videocall !== "") {
                    subjVideoIcon = `
                        <div class="info-chipbox"x>
                            Video Call
                        </div>
                    `
                }
                grid.insertAdjacentHTML("beforeend", `
                    <div class="subjcard">
                        <p class="popup-title">${subjTitle}</p>
                        <p class="popup-description" style="margin-bottom: 0.5rem;">${subjTeacher} · ${subjCode}</p>
                        <div class="info-chipbox-wrapper">
                            <div class="info-chipbox">
                            <b>Class Code:</b> <span style="font-family: 'Roboto Mono', 'Sarabun', sans-serif;">${subjClassCode}</span>
                            </div><br>
                            ${subjClassroomIcon}
                            ${subjVideoIcon}
                        </div>
                    </div>
                `)

                
            // }, 2000);
        })
        // Clear the timeout wait when the cursor moves or exited the element.
        grid.addEventListener("mouseout", (event) => {
            // clearTimeout(timerIn);
            document.querySelector(".subjcard").remove()
        })
    });

    for (let i = 0; i < card_left_alterlist.length; i++) {
        document.getElementById(card_left_alterlist[i]).classList.add("subjcard-alter-left")
    }

    for (let i = 0; i < card_bottom_alterlist.length; i++) {
        document.getElementById(card_bottom_alterlist[i]).classList.add("subjcard-alter-bottom")
    }
}

function reloadPage() {
    location.reload()
}

function cannotGetPopupContentError(location, error) {
    console.warn(`Failed to get popup content for ${location}, opening to-do failed.`);
    popupOK(
        `Can't get content.`, 
        `Timetable couldn't get the content for the page.<br><br>

        Please check your internet connection, or try again later.<br><br>
        
        <span class="popup-description">Error:</span><br>
        ${error}`,
        "returnNothing"
    )
}

function toggleDevMode() {
    if (localStorage.getItem("timetable-devMode") == "true") {
        localStorage.setItem("timetable-devMode", "false")
        return location.reload()
    } if (localStorage.getItem("timetable-devMode") == "false") {
        localStorage.setItem("timetable-devMode", "true")
        return location.reload()
    }

    if (!localStorage.getItem("timetable-devMode")) {
        localStorage.setItem("timetable-devMode", "true")
        return location.reload()
    }
}