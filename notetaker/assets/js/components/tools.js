window.addEventListener("load", () => {
    addEventLink()

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

function addInCaret(content) {
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

function addImageTrue() {
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

function addEventLink() {
    document.querySelectorAll(".main-edit-content a").forEach((element) => {
        element.removeEventListener("click", () => {
            popupOK(
                "Open Link",
                `<a href="${element.href}" style="line-break: anywhere;" target="_blank">${element.href}</a>`
            )
        })

        element.addEventListener("click", () => {
            popupOK(
                "Open Link",
                `<a href="${element.href}" style="line-break: anywhere;" target="_blank">${element.href}</a>`
            )
        })
    })
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

function base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}
  
function bytesToBase64(bytes) {
    const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
    return btoa(binString);
}

function toolsDownload() {
    const encodedString = bytesToBase64(new TextEncoder().encode(JSON.stringify(notesData, null)))

    const element = document.createElement('a');
    const blob = new Blob([encodedString], {'type': 'text/json', 'lastModified': new Date().getTime()});

    const curtime = new Date()

    const date = curtime.getDate()
    const month = curtime.getMonth() + 1
    const year = curtime.getFullYear()

    const hour = curtime.getHours()
    const minute = curtime.getMinutes()
    const second = curtime.getSeconds()

    element.href = window.URL.createObjectURL(blob);
    element.download = `${date > 9 ? date : "0" + date}-${month > 9 ? month : "0" + month}-${year}_${hour > 9 ? hour : "0" + hour}-${minute >= 10 ? minute : "0" + minute}-${second >= 10 ? second : "0" + second}_v2.notetaker`;
    
    element.click();
}

var uploadnotesdata;

function toolsUploadBrowseHandle() {
    document.querySelector(".drop-handle-browse").click()
}

function toolsUploadBrowse() {
    uploadnotesdata = document.querySelector(".drop-handle-browse").files[0]
    toolsUploadConfirm()

}

function toolsUploadDropHandle(event) {
    event.preventDefault()
    
    if (event.dataTransfer.items) {
        [...event.dataTransfer.items].forEach((item, i) => {
            if (item.kind === "file") {
                const file = item.getAsFile();
                document.querySelector(".uploading-file").innerHTML = file.name

                var fileextension = file.name.split('.').pop()
                if (fileextension !== "notetaker") {
                    return popupOK(
                        "Invalid file.",
                        `The file you uploaded ended with '.${fileextension}' which is not valid. Notetaker only accepts files with '.notetaker' file extension only.<br><br>Please try again with a different file.`
                    )
                }

                uploadnotesdata = file
                toolsUploadConfirm()
            }
        })
    } else {
        [...dataTransfer.files].forEach((file) => {
            document.querySelector(".file-dropzone").innerHTML = file.name
        })
    }
}

function uploadReturnTrue() {
    var filereader = new FileReader();
    filereader.addEventListener("load", () => {
        try {
            const rawdata = filereader.result
            
            // Backwards compatability: Base64 data encode checker.
            const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
            const base64check = base64regex.test(rawdata)
            if (base64check == true) {
                var uploaddata = new TextDecoder().decode(base64ToBytes(rawdata));
            } if (base64check == false) {
                var uploaddata = filereader.result;
            }

            triggerUnloadSave = false
            
            localStorage.setItem("notetaker-notesData", uploaddata);
            location.href = "/notetaker/"
        } catch (error) {
            return popupOK(
                "Unable to save data.", 
                `Please upload a valid file ended with a <b>.notetaker</b> extension.<br><br>If you're already uploading a <b>.notetaker</b> file, your file might be damaged or corrupted.<br><br>Please try again.<br><br><span class='popup-description'>Error:</span><br>${error}`
            )
        }
    })
    filereader.readAsText(uploadnotesdata)
}

function toolsUploadConfirm() {
    popupConfirm(
        "Important information.",
        "By pressing 'Yes', you acknowledge that the current notes data present the editor will be lost, and replaced with the new data. <u>This action can't be undone!</u>",
        "uploadReturnTrue",
        "returnNothing"
    )
}

function toolsUploadDragOverHandle(event) {
    event.preventDefault()
}