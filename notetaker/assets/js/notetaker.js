var notesData

let typingTimeout
const saveIndicator = document.querySelector(".save-indicator")

const elementFilePath = document.querySelector(".main-edit-filepath")
const elementTitle = document.querySelector(".main-edit-title")
const elementContent = document.querySelector(".main-edit-content")

const fullPageOverlay = document.querySelector(".full-page-overlay")

const parameters = new URLSearchParams(window.location.search);
var currentNoteId = parseInt(parameters.get("noteid") ?? 0)

window.addEventListener("load", () => {
    // Log warning message when using console.
    console.log("%cWarning!%c\n\nConsole is a very powerful tool.\n\nRunning codes you don't understand can break your Notetaker, or worse, steal your personal data.\n\nNever paste and run any code you don't understand.",
        "font-family: sans-serif; font-weight: bold; font-size: 1.5em; color: var(--color-red);",
        "font-family: sans-serif;")

    try {
        loadNote()
        applySettings()
        
        // Remove the full page loading blur
        fullPageOverlay.style.display = "none";
    } catch (error) {
        popupChoice(
            "An error occured.",
            `Notetaker is unable to read the notes data, it may be corrupt, or damaged. You can try refreshing this page, or reset Notetaker.<br><br><span class='popup-description'>Error:</span><br>${error}`,
            "resetNotetakerSettings",
            "reloadNotetaker",
            "Reset",
            "Reload"
        )
    }
    
    // UI Style
    // 0 = Regular UI
    // 1 = Sidebar hidden by default.
    // 2 = Sidebar hidden by default, navigation bar hidden.
    // 3 = Sidebar hidden, navigation bar hidden, file path bar hidden, insert open in new tab button.
    // 4 = Navigation bar hidden, added settings page, and info to filepath-bars
    if (parameters.get("uistyle") === "1" || parameters.get("uistyle") === "2") {
        toggleSidebarView()
    } if (parameters.get("uistyle") === "2" || parameters.get("uistyle") === "3" || parameters.get("uistyle") === "4") {
        document.querySelector("nav").style.display = "none"

        document.querySelector(".application-root").style.gridTemplateRows = "100vh"
        document.querySelector(".main-content").style.gridTemplateRows = "max-content max-content calc(100vh - 36.5px)"
    } if (parameters.get("uistyle") === "3") {
        toggleSidebarView()
        document.querySelector(".file-path-bar").style.display = "none"
        document.querySelector(".main-edit").insertAdjacentHTML("beforeend", `
            <a 
                class="material-symbols-outlined" 
                onclick="window.open((window.location.href).slice(0, -10), '_blank');"
                title="Open Note in New Tab" 
                style="
                    position: fixed; 
                    bottom: 1rem; 
                    right: 1rem; 
                    
                    width: max-content;
                    height: max-content; 

                    padding: 0.5rem;

                    background: var(--color-gray-6); 
                    border: 1px solid var(--color-gray-4);
                    border-radius: 0.5rem;"
                >
                open_in_new
            </a>
        `)
    } if (parameters.get("uistyle") === "4") {
        document.querySelector(".file-path-bar").insertAdjacentHTML("beforeend", `
            <div style="border-left: 1px solid var(--color-gray-4); display: none;">
                <a class="material-symbols-outlined" title="Help" onclick="toggleFetchPopup('#info-wrapper', 'info')">info</a>
                <a class="material-symbols-outlined" title="Settings" onclick="openSettings()">settings</a>
            </div>
        `)
    }

    fetch("/assets/json/common.json")
        .then((res) => res.json())
        .then((json) => {
            document.getElementById("copyrightyear").innerHTML = json.copyrightyear
        })
});

var triggerUnloadSave = true;
window.addEventListener("unload", () => {
    if (triggerUnloadSave == true) {
        saveNote()
    }
})

// Multiuse code.
function saveNoteToLocalStorage() {
    localStorage.setItem("notetaker-notesData", JSON.stringify(notesData))
}

// Compatibility functions.
function toggleSidebar() {
    toggleSidebarView()
} function togglePopup(element) {
    toggleExistingPopup(element)
}

// Toggling sidebar view.
function toggleSidebarView() {
    document.querySelector(".side-bar").classList.toggle("side-bar-hide")
    document.querySelector(".main-content").classList.toggle("col-span-2")
}

function toggleFetchPopup(element, htmlfile) {
    // Element definition
    const selectedElement = document.querySelector(element)

    // If no element is present in page, fetch and display
    if (!selectedElement) {
        fetch(`/notetaker/assets/html/${htmlfile}.html`)
            .then((res) => res.text())
            .then((html) => {
                document.querySelector(".popup-zone").insertAdjacentHTML("afterbegin", html)
                
                popupid = popupid + 1
                fullPageOverlay.style.display = "block"
                document.querySelector(element).style.display = "block"
            })
        return
    }

    // For existing element. If element is not displayed, display as block, else display as none.
    if (selectedElement.style.display == "block") {
        popupid = popupid - 1
        if (popupid == 0) {
            fullPageOverlay.style.display = "none"
        }
        return selectedElement.style.display = "none"
    } if (selectedElement.style.display != "block") {
        popupid = popupid + 1
        fullPageOverlay.style.display = "block"
        return selectedElement.style.display = "block"
    }
    return true
}

function loadNote() {
    function insertNotesData() {
        // If there's no note in JSON list, create a new note.
        if (notesData.length === 0) {
            newNote()
        }
        // If note ID requested is higher than current note list count, redirects to note ID 0.
        if (currentNoteId > (notesData.length - 1)) {
            location.href = `?noteid=0`
        }

        elementFilePath.innerHTML = notesData[currentNoteId].title
        elementTitle.innerHTML = notesData[currentNoteId].title
        elementContent.innerHTML = notesData[currentNoteId].content

        document.title = `${notesData[currentNoteId].title}`

        console.log(parameters.get("uistyle"));

        var uistyle = ""
        if (parameters.get("uistyle") !== null) {

        }

        for (let i = 0; i < notesData.length; i++) {
            if (i == currentNoteId) {
                document.querySelector(".notes-panel").insertAdjacentHTML("beforeend", `
                    <li class="notes-list notes-list-active" noteid="${i}">
                        <a class="notes-list-${i}">${notesData[i].title}</a>
                        <a class="material-symbols-outlined note-panel-delete" onclick="deleteNote(${i})">delete</a>
                    </li>
                `)
            } if (i != currentNoteId) {
                document.querySelector(".notes-panel").insertAdjacentHTML("beforeend", `
                    <li class="notes-list" noteid="${i}" onclick="location.href='?noteid=${i}${uistyle}'">
                        <a class="notes-list-${i}">${notesData[i].title}</a>
                        <a class="material-symbols-outlined note-panel-delete" onclick="deleteNote(${i})">delete</a>
                    </li>
                `)
            }
        }
    }

    // First time running
    if (localStorage.getItem("notetaker-firstRun") === null) {
        // Load template note from file templatenote.json
        fetch("/notetaker/assets/json/templatenote.json")
            .then((res) => res.json())
            .then((data) => {
                notesData = data

                localStorage.setItem("notetaker-notesData", JSON.stringify(notesData))
                localStorage.setItem("notetaker-firstRun", false)

                insertNotesData()
            })
    }
    // Normal note loading
    if (localStorage.getItem("notetaker-firstRun") === "false") {
        notesData = JSON.parse(localStorage.getItem("notetaker-notesData"))
        insertNotesData()
    }

    wordCount()
}

// Adapted from: https://www.mediacollege.com/internet/javascript/text/count-words.html
function wordCount() {
    var contentInside = elementContent.innerHTML
    
    contentInside = contentInside.replace(/(^\s*)|(\s*$)/gi,"");
    contentInside = contentInside.replace(/[ ]{2,}/gi," ");
    contentInside = contentInside.replace(/\n /,"\n");
    var wordCount = contentInside.split(' ').filter(function(str){return str!="";}).length;

    document.querySelector(".word-count-text").textContent = wordCount
}

// If user stop typing in editor for 5 seconds, save the note.
// But also saves note every 60 seconds (prevents data lost from crashes.)
elementTitle.addEventListener("keyup", typingTimeoutSave);
elementContent.addEventListener("keyup", typingTimeoutSave);
function typingTimeoutSave() {
    wordCount()

    // Do not display save indicator whe typing.
    saveIndicator.style.display = "none"

    // Clear existing typing timeout to start clock again.
    clearTimeout(typingTimeout)
    typingTimeout = setTimeout(saveNote, 5000);

    setTimeout(saveNote, 60000)
}

function saveNote() {
    // Indicate note has been saved.
    saveIndicator.style.display = "inline-flex"

    // Saves the new content to notesData list.
    notesData[currentNoteId].title = elementTitle.innerHTML
    notesData[currentNoteId].content = elementContent.innerHTML

    // Change UI note title in notes list, window title and file path bar.
    document.querySelector(`.notes-list-${currentNoteId}`).innerHTML = elementTitle.innerHTML
    document.title = elementTitle.innerHTML
    elementFilePath.innerHTML = elementTitle.innerHTML

    // Saves note to localStorage
    saveNoteToLocalStorage()
}

function newNote() {
    // Add new a new note template to notesData list
    notesData.push(
        {
            "title": "New Note",
            "content": "Click here to start editing your new note."
        }
    )

    // Save note to localStorage
    saveNoteToLocalStorage()

    // Redirects to new note.
    location.href = `?noteid=${notesData.length - 1}`
}

// Delete a note.
function deleteNote(id) {
    // Delete note, save new note data, then remove the note deleted from sidebar list.
    notesData.splice(id, 1)

    saveNoteToLocalStorage()

    document.querySelector(`li[noteid="${id}"]`).remove()

    // If user deletes the current note, redirects to the first note.
    if (currentNoteId == id) {
        return location.href = `?noteid=0`
    }
    // If user's current note id is higher than the deleted note, 
    // redirects to the id for the current note.
    if (currentNoteId > id) {
        return location.href = `?noteid=${currentNoteId - 1}`
    }
}

function applyFontSettings() {
    var fontstyle = localStorage.getItem("notetaker-font")

    document.querySelector(".main-edit-title").classList = `main-edit-title main-edit-${fontstyle}`
    document.querySelector(".main-edit-content").classList = `main-edit-content main-edit-${fontstyle}`
    
    if (fontstyle === "custom") {
        return setCustomFont()
    }
}

function applySettings() {
    // Theme
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os");
    } document.querySelector("html").setAttribute("theme", localStorage.getItem("theme"));

    if (localStorage.getItem("notetaker-monospace")) {
        localStorage.removeItem("notetaker-monospace")
    }

    // Monospace Font
    if (!localStorage.getItem("notetaker-font")) {
        localStorage.setItem("notetaker-font", "sansserif")
    } applyFontSettings()

    // Word Count
    if (localStorage.getItem("notetaker-wordcount") != "true") {
        document.querySelector(".word-count").style.display = "none"
    }

    // Monospace Font
    if (localStorage.getItem("notetaker-noContentMargins") == "true") {
        document.querySelector(".editor-wrapper").classList = "editor-wrapper editor-wrapper-fullwidth"
    }
}

function openSettings() {
    toggleFetchPopup('#settings-wrapper', 'settings')
    
    function waitForSettingsFetchDone() {
        if (document.querySelector('#settings-wrapper')) {
            return settings()
        } if (!document.querySelector('#settings-wrapper')) {
            setTimeout(() => {
                waitForSettingsFetchDone()
            }, 1);
        }
    }

    waitForSettingsFetchDone()
}

function saveCustomFont() {
    localStorage.setItem("notetaker-customFont", document.querySelector(".textfield-customfont").value)
    setCustomFont()
    applyFontSettings()
}

function setCustomFont() {
    var customfont = localStorage.getItem("notetaker-customFont", customfont)
    
    document.querySelector(".main-edit-title").style.fontFamily = `"${customfont}", "Outfit", "Sarabun", sans-serif`
    document.querySelector(".main-edit-content").style.fontFamily = `"${customfont}", "Outfit", "Sarabun", sans-serif`
}

// Settings
function settings() {
    // Theme
    document.querySelectorAll("input[name='settings-theme']").forEach((element) => {
        if (element.value == localStorage.getItem("theme")) {
            element.setAttribute("checked", "checked")
        }

        element.addEventListener("change", function (event) {
            document.querySelector("html").setAttribute("theme", event.target.value);
            localStorage.setItem("theme", event.target.value)
        })
    })

    // Font
    document.querySelectorAll("input[name='settings-font']").forEach((element) => {
        if (element.value == localStorage.getItem("notetaker-font")) {
            element.setAttribute("checked", "checked")
        }
    })

    document.querySelectorAll("input[name='settings-font']").forEach((element) => {
        element.addEventListener("change", function (event) {
            localStorage.setItem("notetaker-font", event.target.value)
            applyFontSettings()
        })
    })

    if (localStorage.getItem("notetaker-font") === "custom" || (localStorage.getItem("notetaker-customFont") !== null)) {
        document.querySelector(".textfield-customfont").value = localStorage.getItem("notetaker-customFont")
        applyFontSettings()
    }
    
    // Word Count
    if (localStorage.getItem("notetaker-noContentMargins") == "true") {
        document.querySelector(".settings-nocontentmargins").setAttribute("checked", "checked")
    }

    document.querySelectorAll(".settings-nocontentmargins").forEach((element) => {
        element.addEventListener("click", function (event) {
            if (event.target.name === "settings-nocontentmargins") {
                if (event.target.checked) {
                    localStorage.setItem("notetaker-noContentMargins", true)
                    
                    document.querySelector(".editor-wrapper").classList = "editor-wrapper editor-wrapper-fullwidth"
                }
                if (!event.target.checked) {
                    localStorage.setItem("notetaker-noContentMargins", false)

                    document.querySelector(".editor-wrapper").classList = "editor-wrapper"
                }
            }
        })
    })
    
    // Word Count
    if (localStorage.getItem("notetaker-wordcount") == "true") {
        document.querySelector(".settings-wordcount").setAttribute("checked", "checked")
    }

    document.querySelectorAll(".settings-wordcount").forEach((element) => {
        element.addEventListener("click", function (event) {
            if (event.target.name === "settings-wordcount") {
                if (event.target.checked) {
                    localStorage.setItem("notetaker-wordcount", true)
                    
                    document.querySelector(".word-count").style.display = "inline-flex"
                }
                if (!event.target.checked) {
                    localStorage.setItem("notetaker-wordcount", false)

                    document.querySelector(".word-count").style.display = "none"
                }
            }
        })
    })
}

function resetNotetakerSettings() {
    return popupConfirm("Reset Notetaker?", "Are you sure you want to reset Notetaker, your notes data will also be deleted. This action can't be undone!", "resetNotetaker", "returnNothing")
}

function resetNotetaker() {
    var listToDelete = [
        "notetaker-font",
        "notetaker-customFont",
        "notetaker-firstRun",
        "notetaker-notesData",
        "notetaker-wordcount",
        "notetaker-noContentMargins"
    ]

    for (i = 0; i < listToDelete.length; i++) {
        localStorage.removeItem(listToDelete[i])
    }

    return location.href = `?noteid=0`
}

function reloadNotetaker() {
    location.reload()
}