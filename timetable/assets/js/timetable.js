var customclasses = undefined
var classes = undefined

const classTimetable = localStorage.getItem("classTimetable")
const customClassJSON = JSON.parse(localStorage.getItem("customClassJSON"))

window.addEventListener('load', () => {
    if (localStorage.getItem("setupComplete") === "true") {
        setClassVariables()
        fillClasses()
        classJoiningSystem()
        fillBookmarks()
        setTimetableSystemInformation()
        updateChecker()
        googleSearchEnter()
        checkConnection()
    }
});

function setTimetableSystemInformation() {
    document.querySelectorAll(".js-fill-version").forEach(element => {
        element.innerHTML = timetableversion
    })
    document.querySelectorAll(".js-fill-timetype").forEach(element => {
        element.innerHTML = classtime_type
    })
    document.querySelectorAll(".js-fill-year").forEach(element => {
        element.innerHTML = copyrightyear
    })
    if (classTimetable !== "custom") {
        if (classtimes[classtime_type]["notify"] == true) {
            addNotification(`${classtime_type} class time is enabled by your Timetable provider.`)
        }
    }
}

function setClassVariables() {
    if (classTimetable === "305") {
        classes = classes_305
        subj = subj_305
        return skMarchDrip()
    } if (classTimetable === "306") {
        classes = classes_306
        subj = subj_306
        return skMarchDrip()
    } if (classTimetable === "custom") {
        classes = customClassJSON.customclass
        subj = customClassJSON.customlinks
        return document.querySelector(".elective-swapper").remove()
    } else {
        popupConfirm("An error occured.", "Your Timetable data doesn't seem to be correct, click 'Yes' to setup your Timetable again.", "resetTimetable", "returnNothing")
    }
}

function skMarchDrip() {
    var skMarchDrip = new Audio("./assets/sound/skMarchDrip.mp3")
    window.addEventListener("keydown", (event) => {
        if (event.altKey && event.key === "Shift") {
            addNotification(`Drippy SK March: <a href="https://www.youtube.com/watch?v=ZXfu4XMnd_g" target="_blank">https://www.youtube.com/watch?v=ZXfu4XMnd_g</a>`)        
            skMarchDrip.play()

            document.querySelector("html").classList.add("drip-timetable")
            setTimeout(() => {
                document.querySelector("html").classList.remove("drip-timetable")
            }, 81873)
        }
    })
}

// Timetable grid filling system.
var electiveGrid = undefined
function fillClasses() {
    // Disables the context menu in the table
    document.querySelector("div.table").addEventListener('contextmenu', event => {
        event.preventDefault();
    })

    if (classTimetable !== "custom") {
        for (let timeFilled = 0; timeFilled <= 10; timeFilled++) {
            document.getElementById(`time${timeFilled + 1}`).innerHTML = classtimes[classtime_type]["list"][timeFilled]
        }
    } if (classTimetable === "custom") {
        for (let timeFilled = 0; timeFilled <= 10; timeFilled++) {
            document.getElementById(`time${timeFilled + 1}`).innerHTML = (customClassJSON.customtimes)[timeFilled]
        } classtime_type = "Custom"
    }

    // Fill class names and styling.
    for (let classFilled = 0; classFilled <= 54; classFilled++) {
        var gridBefore = document.getElementById(classFilled)
        var grid = document.getElementById(classFilled + 1)

        grid.className = "table-grid"
        grid.style.display = "block"


        grid.innerHTML = classes[classFilled]
        grid.classList.add("class-joinable")

        if ((elective_toggle == true) && (classTimetable !== "custom")) {
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
                gridBefore.classList.add("table-double")
                grid.style.display = "none"
            }
        } if (classes[classFilled] == "" || classes[classFilled] == "Break" || classes[classFilled] == "Lunch") {
            grid.classList.add("table-grid-dark")
            grid.classList.remove("class-joinable")
            grid.classList.add("class-not-joinable")
        }
    }

    if ((localStorage.getItem("electiveClass") === elective_secondary) && (classTimetable !== "custom")) {
        document.getElementById(electiveGrid).innerHTML = elective_secondary
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

function classJoiningSystem() {
    var gaiNumber = localStorage.getItem("gaiTimetable")

    if (localStorage.getItem("popupMode") === "true") {
        document.querySelector(".title-description").innerHTML = `<p>Tap - Show Options<br>Select Your Action</p>`
        document.querySelectorAll(".class-joinable").forEach(grid => {
            var subjText = grid.innerHTML;
            
            grid.addEventListener("click", () => {
                var subjVdo = subj[subjText].videocall
                var subjCls = subj[subjText].classroom
                document.querySelector(".popup-center").insertAdjacentHTML("beforeend", `
                    <div id="popup-id-${popupid}" class="class-popupmode popup">
                        <div class="popup-wrapper">
                            <div class="popup-content">
                                <span class="popup-title">Class selected: ${subjText}</span>
                                <span>Select your action with options below.</span><br>
                                <span class="popup-description">The link doesn't exist if there's no button for the action.</span>
                            </div>
                            <div class="popup-buttons-box">
                                <div class="popup-buttons-wrapper">
                                    <a class="popup-button popup-button-danger" onclick="popupDone(${popupid})">Cancel</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `)

                if (subjCls != "") {
                    document.querySelector(".popup-buttons-wrapper").insertAdjacentHTML("afterbegin", `<a target="_blank" class="popup-button" onclick="popupDone(${popupid})" href="https://classroom.google.com/u/${gaiNumber}/c/${subjCls}">Classroom</a>`)
                } if (subjVdo != "") {
                    document.querySelector(".popup-buttons-wrapper").insertAdjacentHTML("afterbegin", `<a target="_blank" class="popup-button" onclick="popupDone(${popupid})" href="https://meet.google.com/${subjVdo}?authuser=${gaiNumber}">Video Call</a>`)
                } 

                popupOpen()
            })
        })
    } if (localStorage.getItem("popupMode") !== "true") {
        document.querySelector(".title-description").innerHTML = `<p>Left Click - Video Call<br>Right Click - Classroom</p>`
        document.querySelectorAll(".class-joinable").forEach(grid => {
            var subjText = grid.innerHTML;
            grid.addEventListener("click", () => {
                var subjVdo = subj[subjText].videocall
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
}

function swapElectiveClass() {
    if (electiveGrid != undefined) {
        var electiveGridContent = document.getElementById(electiveGrid)
        if (electiveGridContent.innerHTML == elective_primary) {
            localStorage.setItem("electiveClass", elective_secondary)
            return location.reload()
        } if (electiveGridContent.innerHTML == elective_secondary) {
            localStorage.setItem("electiveClass", elective_primary)
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
} function searchGoogle() {
    var searchValue = document.getElementById('google-search').value;
    window.open(`https://www.google.com/search?q=${searchValue}`);
    document.getElementById('google-search').value = ""
}

var changelogfetched = false
function about() {    
    if (document.querySelector(".about-wrapper").style.display != "block") {
        disableScrollbar()
        if (changelogfetched === false) {
            fetch('./assets/components/html/changelog.html')
                .then((response) => response.text())
                .then((html) => {document.querySelector(".changelog-list").innerHTML = html;})
            changelogfetched = true
        }
        document.querySelector(".about-wrapper").style.display = "block"
        return document.querySelector(".full-page-overlay").style.display = "block"
    } if (document.querySelector(".about-wrapper").style.display == "block") {
        enableScrollbar()
        document.querySelector(".about-wrapper").style.display = "none"
        return document.querySelector(".full-page-overlay").style.display = "none"
    }
}

var fetchedversion = timetableversion
var checkupdates = undefined
function updateChecker() {
    checkupdates = setInterval(() => {
        fetch('https://www.pixelpxed.xyz/timetable/assets/components/json/fetchresources.json')
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

function reloadPage() {
    location.reload()
}

function checkConnection() {
    window.addEventListener('online', () => {
        addNotification("You're now back online, you can now use Timetable normally.")
        updateChecker()
    });
    window.addEventListener('offline', () => {
        addNotification("It seems like you're offline, it might be our end. But please check your internet connection.")
        clearInterval(checkupdates)
    });
}