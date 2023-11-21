window.addEventListener("load", () => {
    addEventLink()
    insertCheckboxState()
    addCheckboxState()

    elementContent.addEventListener("keydown", (event) => {
        const ctrlcmd = (event.ctrlKey || event.metaKey)

        // Indent
        if (event.key == "Tab") {
            event.preventDefault()
            toolsExec("indent")
        }
        if ((ctrlcmd) & event.key == "]") {
            event.preventDefault()
            toolsExec("indent")
        }

        // Outdent
        if ((ctrlcmd) & event.key == "[") {
            event.preventDefault()
            toolsExec("outdent")
        }

        // Superscript
        if ((ctrlcmd) & event.key == ".") {
            event.preventDefault()
            toolsExec("superscript")
        }

        // Subscript
        if ((ctrlcmd) & event.key == ",") {
            event.preventDefault()
            toolsExec("subscript")
        }

        // Unordered List
        if ((ctrlcmd) & event.key == "-") {
            event.preventDefault()
            toolsExec("insertUnorderedList")
        }

        // Ordered List
        if ((ctrlcmd) & event.key == "=") {
            event.preventDefault()
            toolsExec("insertOrderedList")
        }

        // Create Link from Selection
        if ((ctrlcmd) & event.key == "k") {
            event.preventDefault()
            document.execCommand("createLink", false, document.getSelection())
            addEventLink()
        }

        // Create Link from Selection
        if ((ctrlcmd) & event.shiftKey & event.key == "k") {
            event.preventDefault()
            document.execCommand("unlink", false, document.getSelection())
            addEventLink()
        }
    })
})

document.querySelectorAll(".tools").forEach((element) => {
    element.addEventListener("mousedown", (event) => {
        saveNote()
    })
})

function addInCaret(content, caretposition = 0) {
    elementContent.focus()
    document.execCommand("insertHTML", false, content)
}

function addInBottom(content) {
    elementContent.innerHTML += content
}

// Tools: Add image
function toolsAddImage() {

    document.querySelector(".popup-center").insertAdjacentHTML("beforeend", `
        <div id="popup-id-${popupid}" class="popup">
            <div class="popup-wrapper">
                <div class="popup-content">
                    <span class="popup-title">Add Image</span>
                    <span>
                        <input class="data-toolsimage" style="margin-bottom: 1rem;" type="text" placeholder="https://placehold.co/600x400/png"></input>
                        <span> If you need to upload an image first, you can use applications like Discord to upload, then copy the image link to paste it in here.</span>    
                    </span>
                </div>
                <div class="popup-buttons-box">
                    <div class="popup-buttons-wrapper">
                        <a id="popup-confirm-true" class="popup-button" onclick="addImageTrue();">Add</a>
                        <a id="popup-confirm-false" class="popup-button" onclick="popupDone(${popupid}); returnNothing();">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    `)
    popupOpen()
}

function addImageTrue(caretposition) {
    var imageToAdd = document.querySelector(".data-toolsimage").value
    if (imageToAdd === "") {
        popupDone(popupid - 1);
        return popupOK("Cannot Insert Image", "You must provide a URL to add an image.")
    }
    
    addInBottom(`<img src="${imageToAdd}">`)

    popupDone(popupid - 1);
}

function toolsAddBulletList() {
    addInCaret(`<ul><li>Unordered List</li></ul>`)
}

function toolsAddNumberList() {
    addInCaret(`<ol><li>Ordered List</li></ol>`)
}

function insertEventLink() {
    document.querySelectorAll(".main-edit-content a").forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault()
            if (document.querySelector(".main-content").classList.contains("read-view")) {
                window.open(element.href)
            }
        })
    })
}
function removeEventLink() {
    document.querySelectorAll(".main-edit-content a").forEach((element) => {
        element.removeEventListener("click", (event) => {
            event.preventDefault()
            if (document.querySelector(".main-content").classList.contains("read-view")) {
                window.open(element.href)
            }
        })
    })
}

function addEventLink() {
    removeEventLink()
    insertEventLink()
}

function insertCheckboxState() {
    document.querySelectorAll(".main-edit-content input[type='checkbox']").forEach((element) => {
        element.addEventListener("click", () => {
            if (element.checked == true) {
                element.setAttribute("checked", "true")
            }
            if (element.checked != true) {
                element.removeAttribute("checked")
            }
        })
    })
}
function removeCheckboxState() {
    document.querySelectorAll(".main-edit-content input[type='checkbox']").forEach((element) => {
        element.removeEventListener("click", () => {
            if (element.checked == true) {
                element.setAttribute("checked", "true")
            }
            if (element.checked != true) {
                element.removeAttribute("checked")
            }
        })
    })
}

function addCheckboxState() {
    removeCheckboxState()
    insertCheckboxState()
}

// Tools: Create link
function toolsCreateLink() {
    document.execCommand("createLink", false, document.getSelection())
    addEventLink()
}

// Tools: Remove link
function toolsRemoveLink() {
    document.execCommand("unlink", false, document.getSelection())
    addEventLink()
}

// Tools: Text Color
function toolsTextColor() {
    document.execCommand("foreColor", false, document.querySelector(".tools-selected-color").value)
}

// Tools: Text Color
function toolsHiliteColor() {
    document.execCommand("hiliteColor", false, document.querySelector(".tools-selected-color").value)
}

function toolsExec(cmd) {
    document.execCommand(cmd)
}

function toolsPrint() {
    window.print()
}

function toolsAddCheckbox() {
    addInCaret(`<input type="checkbox">`)
    addCheckboxState()
}

// Adapted from: https://www.mediacollege.com/internet/javascript/text/count-words.html
function toolsWordCount() {
    var contentInside = elementContent.innerHTML
    
    contentInside = contentInside.replace(/(^\s*)|(\s*$)/gi,"");
    contentInside = contentInside.replace(/[ ]{2,}/gi," ");
    contentInside = contentInside.replace(/\n /,"\n");
    var wordCount = contentInside.split(' ').filter(function(str){return str!="";}).length;

    document.querySelector(".word-count-text").textContent = wordCount
}
