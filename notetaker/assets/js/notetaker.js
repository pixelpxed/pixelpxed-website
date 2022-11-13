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

    loadNote()
    applySettings()
    
    // Remove the full page loading blur
    fullPageOverlay.style.display = "none";
});

// Multiuse code.
function saveNoteToLocalStorage() {
    localStorage.setItem("notetaker-notesData", JSON.stringify(notesData))
}

// Compatibility function.
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

        for (let i = 0; i < notesData.length; i++) {
            if (i == currentNoteId) {
                document.querySelector(".notes-panel").insertAdjacentHTML("beforeend", `
                    <li class="notes-list notes-list-active" noteid="${i}">
                        <a class="notes-list-${i}" href="?noteid=${i}">${notesData[i].title}</a>
                        <a class="material-symbols-outlined" onclick="deleteNote(${i})">delete</a>
                    </li>
                `)
            } if (i != currentNoteId) {
                document.querySelector(".notes-panel").insertAdjacentHTML("beforeend", `
                    <li class="notes-list" noteid="${i}">
                        <a class="notes-list-${i}" href="?noteid=${i}">${notesData[i].title}</a>
                        <a class="material-symbols-outlined" onclick="deleteNote(${i})">delete</a>
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

    // Change UI note title in notes list and file path bar.
    document.querySelector(`.notes-list-${currentNoteId}`).innerHTML = elementTitle.innerHTML
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

function applySettings() {
    // Theme
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os");
    } document.querySelector("html").setAttribute("theme", localStorage.getItem("theme"));

    // Monospace Font
    if (localStorage.getItem("notetaker-monospace") == "true") {
        document.querySelector(".main-edit-title").classList = "main-edit-title main-edit-monospace"
        document.querySelector(".main-edit-content").classList = "main-edit-content main-edit-monospace"
    }

    // Word Count
    if (localStorage.getItem("notetaker-wordcount") == "false") {
        document.querySelector(".word-count").style.display = "none"
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
    
    if (localStorage.getItem("notetaker-monospace") == "true") {
        document.querySelector(".settings-monospace").setAttribute("checked", "checked")
    }

    // Monospace Font
    document.querySelectorAll(".settings-monospace").forEach((element) => {
        element.addEventListener("click", function (event) {
            if (event.target.name === "settings-monospace") {
                if (event.target.checked) {
                    localStorage.setItem("notetaker-monospace", true)

                    document.querySelector(".main-edit-title").classList = "main-edit-title main-edit-monospace"
                document.querySelector(".main-edit-content").classList = "main-edit-content main-edit-monospace"
                }
                if (!event.target.checked) {
                    localStorage.setItem("notetaker-monospace", false)

                    document.querySelector(".main-edit-title").classList = "main-edit-title"
                    document.querySelector(".main-edit-content").classList = "main-edit-content"
                }
            }
        })
    })

    if (localStorage.getItem("notetaker-wordcount") == "true") {
        document.querySelector(".settings-wordcount").setAttribute("checked", "checked")
    }

    // Word Count
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

function resetNotetaker() {
    var listToDelete = [
        "notetaker-monospace",
        "notetaker-firstRun",
        "notetaker-notesData",
    ]

    for (i = 0; i < listToDelete.length; i++) {
        localStorage.removeItem(listToDelete[i])
    }

    return location.href = `?noteid=0`
}