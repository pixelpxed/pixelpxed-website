var notesData

const untitledNoteString = "<span style='opacity: 0.3; color: var(--color-main-text);'>[Untitled Note]</span>"

let typingTimeout
const saveIndicator = document.querySelector(".save-indicator")

const elementFilePath = document.querySelector(".main-edit-filepath")
const elementTitle = document.querySelector(".main-edit-title")
const elementContent = document.querySelector(".main-edit-content")

const fullPageOverlay = document.querySelector(".full-page-overlay")

const parameters = new URLSearchParams(window.location.search);
var currentNoteId = parseInt(parameters.get("noteid") ?? 0)

var triggerUnloadSave = true;
var anotherInstanceOpened = false;

var firstInstance = true;

const bc = new BroadcastChannel("notetaker");
bc.onmessage = (event) => {
    if (event.data === `first`) {
        bc.postMessage(`notFirst`);

        saveNote();

        triggerUnloadSave = false;
        firstInstance = true;

        multipleInstanceError()
    }
    if (event.data === `notFirst`) {
        firstInstance = false;

        multipleInstanceError()
    }
};
bc.postMessage(`first`);

function multipleInstanceError() {
    document.title = "Multiple Instances Running!";
    popupOK(
        `Another instance of Notetaker is running.`,
        `Notetaker has <a href="/notetaker/assets/etc/instanceWar.txt" target="_blank">checked</a> and detected that multiple instance of Notetaker is already running. Notetaker can only run one instance at a time, to prevent data loss.<br><br>Please choose to close the tabs/windows until only one Notetaker tab/window is running, and then click the OK button below.<br><br>Don't worry, the current data you have is saved.`,
        `reloadNotetaker`
    );
}

window.addEventListener("load", () => {
    if (firstInstance == true) {
        onInstanceCheckPass()
    } if (firstInstance != false) {
        return
    }
})

window.addEventListener("pagehide", () => {
    if (triggerUnloadSave == true) {
        saveNote()
    }
})

function onInstanceCheckPass() {
    try {
        if (anotherInstanceOpened == true) {
            return
        }
        if (anotherInstanceOpened != true) {
            loadNote()
            applySettings()
            
            // Remove the full page loading blur
            fullPageOverlay.style.display = "none";
            
            setTimeout(saveNote, 60000)
        }
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
};

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

        if (notesData[currentNoteId].title == "") {
            elementFilePath.innerHTML = untitledNoteString
        }

        document.title = `${notesData[currentNoteId].title}`

        var uistyle = ""
        if (parameters.get("uistyle") !== null) {

        }

        for (let i = 0; i < notesData.length; i++) {
            var activecheck = ""
            if (i == currentNoteId) {
                activecheck = " notes-list-active"
            }

            var noteTitle = notesData[i].title
            if (noteTitle == "") {
                noteTitle = untitledNoteString
            }

            document.querySelector(".notes-panel").insertAdjacentHTML("beforeend", `
                <li class="notes-list${activecheck}" noteid="${i}">
                    <a class="notes-list-${i} note-panel-title" onclick="location.href='?noteid=${i}${uistyle}'">${noteTitle}</a>
                    <div class="notes-list-tools">
                        <a class="material-symbols-outlined note-panel-delete" title="Delete" onclick="uiDeleteNote(${i})">delete</a>
                    </div>
                </li>
            `)
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

    toolsWordCount()
}

// Prevent line breaks on titles.
elementTitle.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault()
    }
});

// If user stop typing in editor for 5 seconds, save the note.
// But also saves note every 60 seconds (prevents data lost from crashes.)
elementTitle.addEventListener("keyup", typingTimeoutSave);
elementContent.addEventListener("keyup", typingTimeoutSave);
function typingTimeoutSave() {
    toolsWordCount()

    console.log(elementContent.selectionStart);

    // Do not display save indicator whe typing.
    saveIndicator.style.display = "none"

    // Clear existing typing timeout to start clock again.
    clearTimeout(typingTimeout)
    typingTimeout = setTimeout(saveNote, 5000);
}

function saveNote() {
    var saveTitle = elementTitle.innerHTML
    var saveContent = elementContent.innerHTML

    // Saves the new content to notesData list.
    notesData[currentNoteId].title = saveTitle
    notesData[currentNoteId].content = saveContent

    // Change UI note title in notes list, window title and file path bar.
    document.querySelector(`.notes-list-${currentNoteId}`).innerHTML = saveTitle
    document.title = saveTitle
    elementFilePath.innerHTML = saveTitle

    if (saveTitle == "") {
        document.querySelector(`.notes-list-${currentNoteId}`).innerHTML = untitledNoteString
        elementFilePath.innerHTML = untitledNoteString
    }

    // Saves note to localStorage
    saveNoteToLocalStorage()

    // Indicate note has been saved.
    saveIndicator.style.display = "inline-flex"
}

function newNote() {
    // Add new a new note template to notesData list
    notesData.push(
        {
            "title": "",
            "content": ""
        }
    )

    // Save note to localStorage
    saveNoteToLocalStorage()

    // Redirects to new note.
    location.href = `?noteid=${notesData.length - 1}`
}

var uiDeleteNoteId = undefined;
function uiDeleteNote(id) {
    uiDeleteNoteId = id

    var deleteTitle = notesData[id].title
    if (deleteTitle == "") {
        deleteTitle = untitledNoteString
    }

    popupConfirm(
        `Delete note?`,
        `Are you sure you want to delete<br>'<b>${deleteTitle}</b>'?<br>This action can't be undone!`,
        `deleteNote`,
        `returnNothing`
    )
}

// Delete a note.
function deleteNote() {
    // Delete note, save new note data, then remove the note deleted from sidebar list.
    notesData.splice(uiDeleteNoteId, 1)

    saveNoteToLocalStorage()

    document.querySelector(`li[noteid="${uiDeleteNoteId}"]`).remove()

    // If user deletes the current note, redirects to the first note.
    if (currentNoteId == uiDeleteNoteId) {
        return location.href = `?noteid=0`
    }
    // If user's current note id is higher than the deleted note, 
    // redirects to the id for the current note.
    if (currentNoteId > uiDeleteNoteId) {
        return location.href = `?noteid=${currentNoteId - 1}`
    }
}