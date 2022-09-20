// Dear anyone who might be reading this code...
// I don't know what I wrote also, thank you,

window.addEventListener("load", () => {
    loadNote()
    settings()

    document.querySelector(".full-page-overlay").style.display = "none";

    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os");
    }
    document.querySelector("html").setAttribute("theme", localStorage.getItem("theme"));
});

var notes = [
    {
        "title": "Something went wrong...",
        "content": "We're unable to load your note, please try again later. 🙏<br><br>Error: Timed out while fetching note."
    }
]

// Universal already-existing popup toggle
function togglePopup(element) {
    const elementSelected = document.querySelector(element)
    const fullPageOverlay = document.querySelector(".full-page-overlay")

    if (elementSelected.style.display == "block") {
        fullPageOverlay.style.display = "none"
        return elementSelected.style.display = "none"
    } if (elementSelected.style.display != "block") {
        fullPageOverlay.style.display = "block"
        return elementSelected.style.display = "block"
    }
}

// Toggle sidebar element
function toggleSidebar() {
    document.querySelector(".side-bar").classList.toggle("side-bar-hide")
    document.querySelector(".main-content").classList.toggle("span-col-2")
}

function newNote() {
    notes.push({"title": "New Note", "content": "Click here to start editing your new note."})
    localStorage.setItem("notetaker-notesData", JSON.stringify(notes))
    location.href = `?noteid=${(notes.length) - 1}`
}

function deleteNote(noteid) {
    var amountDel = noteid
    if (amountDel === 0) {
        amountDel = 1
    }

    notes.splice(noteid, amountDel)
    localStorage.setItem("notetaker-notesData", JSON.stringify(notes))
    document.querySelector(`li[noteid="${noteid}"]`).remove()
    location.href = `?noteid=${(notes.length) - 1}`
}

// Settings
function settings() {
    document.querySelectorAll("input[name='settings-theme']").forEach((element) => {
        if (element.value == localStorage.getItem("theme")) {
            element.setAttribute("checked", "checked")
        }

        element.addEventListener("change", function (event) {
            document.querySelector("html").setAttribute("theme", event.target.value);
            localStorage.setItem("theme", event.target.value)
        })
    })

    // Monospace Font
    if (localStorage.getItem("notetaker-monospace") == "true") {
        document.querySelector(".settings-monospace").setAttribute("checked", "checked")

        document.querySelector(".main-edit-title").classList = "main-edit-title main-edit-monospace"
        document.querySelector(".main-edit-content").classList = "main-edit-content main-edit-monospace"
    }

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
}

// Notetaking loading
function loadNote() {
    const elementFilePath = document.querySelector(".main-edit-filepath")
    const elementTitle = document.querySelector(".main-edit-title")
    const elementContent = document.querySelector(".main-edit-content")

    const parameters = new URLSearchParams(window.location.search);
    var noteid = parseInt(parameters.get("noteid") ?? 0)

    if (noteid === "") {
        noteid = 0
        notes = [
            {
                "title": "Click on a note to start editing.",
                "content": "It's that easy!"
            }
        ]
        return insertContent()
    }
    
    // Private function, insert notes content.
    function insertContent() {
        elementFilePath.innerHTML = notes[noteid].title
        elementTitle.innerHTML = notes[noteid].title
        elementContent.innerHTML = notes[noteid].content
    }

    function insertNotesPanel() {
        for (let i = 0; i < notes.length; i++) {
            document.querySelector(".notes-panel").insertAdjacentHTML("beforeend", `
                <li noteid=${i} class="notes-list">
                    <a class="notes-list-${i}" href="?noteid=${i}">${notes[i].title}</a>
                    <a onclick="deleteNote(${i})" class="material-symbols-outlined">delete</a>
                </li>
            `)
        }
    }

    function insertNotesHandler() {
        notes = JSON.parse(localStorage.getItem("notetaker-notesData"))
    
        if (notes.length === 0) {
            newNote()
        } if (noteid > (notes.length - 1)) {
            location.href = "?noteid=0"
        }

        insertContent()
        insertNotesPanel()
    }

    if (localStorage.getItem("notetaker-firstRun") === null) {
        // Load the note
        fetch("./assets/json/templatenote.json")
            .then((res) => res.json())
            .then((content) => {
                localStorage.setItem("notetaker-notesData", JSON.stringify(content))
                localStorage.setItem("notetaker-firstRun", false)

                insertNotesHandler()
            })
        console.log("Notetaker detected that this session is your first time.")
    } if (localStorage.getItem("notetaker-firstRun") === "false") {
        insertNotesHandler()
    }

    let typingTimeout;

    elementTitle.addEventListener("keyup", typingTimeoutSave);
    elementContent.addEventListener("keyup", typingTimeoutSave);
    
    function typingTimeoutSave() {
        document.querySelector(".save-indicator").style.display = "none"
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(saveNote, 5000)
    }

    function saveNote() {
        document.querySelector(".save-indicator").style.display = "inline-flex"
        
        notes[noteid].title = elementTitle.innerHTML
        notes[noteid].content = elementContent.innerHTML

        localStorage.setItem("notetaker-notesData", JSON.stringify(notes))

        document.querySelector(`.notes-list-${noteid}`).innerHTML = elementTitle.innerHTML
        
        elementFilePath.innerHTML = elementTitle.innerHTML
    }
}