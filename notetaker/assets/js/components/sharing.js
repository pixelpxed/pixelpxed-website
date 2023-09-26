function openSharing() {
    toggleFetchPopup('#sharing-wrapper', 'sharing')
    
    function waitForSettingsFetchDone() {
        if (document.querySelector('#sharing-wrapper')) {
            return sharing()
        } if (!document.querySelector('#sharing-wrapper')) {
            setTimeout(() => {
                waitForSettingsFetchDone()
            }, 1);
        }
    }

    waitForSettingsFetchDone()
}

function sharing() {
    const curtime = new Date()

    const date = curtime.getDate()
    const month = curtime.getMonth() + 1
    const year = curtime.getFullYear()

    const hour = curtime.getHours()
    const minute = curtime.getMinutes()

    document.querySelector(".filename-input").innerHTML = `${date > 9 ? date : "0" + date}-${month > 9 ? month : "0" + month}-${year}_${hour > 9 ? hour : "0" + hour}-${minute >= 10 ? minute : "0" + minute}.ntkr`

    document.querySelector(".manage-notes-list").innerHTML = ""
    for (let i = 0; i < notesData.length; i++) {
        var title = notesData[i].title
        if (title == "") {
            title = untitledNoteString
        }

        document.querySelector(".manage-notes-list").insertAdjacentHTML("beforeend", `
            <div class="manage-notes-item" draggable="true" noteid="${i}">
                <div>
                    <input type="checkbox" class="manage-notes-id-${i}">
                </div>
                <p>${title}</p>
                <div>
                    <a class="material-symbols-outlined" title="Download This Note" onclick="toolsDownload('single', ${i})">download</a>
                    <a class="material-symbols-outlined" title="Delete" onclick="uiDeleteNote(${i})">delete</a>
                </div>
            </div>
        `)
    }

    if (notesData.length < 6) {
        document.querySelector(".show-all-notes").style.display = "none"
    }
}

function toggleShareNotesView() {
    document.querySelector('.manage-notes-list').classList.toggle('notes-smallview');
    document.querySelector('.show-all-notes').remove();
}

function base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}
  
function bytesToBase64(bytes) {
    const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
    return btoa(binString);
}

function toolsDownload(type = "all", id = 0) {
    const curtime = new Date()

    const date = curtime.getDate()
    const month = curtime.getMonth() + 1
    const year = curtime.getFullYear()

    const hour = curtime.getHours()
    const minute = curtime.getMinutes()
    const second = curtime.getSeconds()

    var data;
    var filename;

    id = parseInt(id)

    if (type == "all") {
        data = notesData;
        filename = `${date > 9 ? date : "0" + date}-${month > 9 ? month : "0" + month}-${year} ${hour > 9 ? hour : "0" + hour}-${minute >= 10 ? minute : "0" + minute}-${second >= 10 ? second : "0" + second}.ntkr`
    }
    if (type == "single") {
        data = `[${JSON.stringify(notesData[id])}]`

        filename = `${notesData[id].title}.ntkr`
        if (notesData[id].title == "") {
            filename = `[Untitled Note].ntkr`
        }
    }

    const filenameinput = document.querySelector(".filename-input").value
    if (filenameinput != "") {
        filename = `${filenameinput}.ntkr`
    }

    var encodedString = bytesToBase64(new TextEncoder().encode(JSON.stringify(data, null)))
    var encodedString = data
    if (type = "single") {
        encodedString = encodedString.slice(1, -1)
    }

    console.log(data);
    console.log(encodedString);

    const element = document.createElement('a');
    const blob = new Blob([JSON.stringify(encodedString)], {'type': 'text/json', 'lastModified': new Date().getTime()});

    element.href = window.URL.createObjectURL(blob);
    element.download = filename;
    
    element.click();
}

var uploadnotesdata;

function toolsUploadBrowseHandle() {
    document.querySelector(".drop-handle-browse").click()
}

function toolsUploadBrowse() {
    uploadnotesdata = document.querySelector(".drop-handle-browse").files[0]
    uploadReturnTrue()

}

function toolsUploadDropHandle(event) {
    event.preventDefault()
    
    if (event.dataTransfer.items) {
        [...event.dataTransfer.items].forEach((item, i) => {
            if (item.kind === "file") {
                const file = item.getAsFile();
                document.querySelector(".uploading-file").innerHTML = file.name

                var fileextension = file.name.split('.').pop()
                
                uploadnotesdata = file
                if (fileextension === "sntkr") {
                    return toolsUploadSingleNote()
                } if (fileextension === "notetaker" || fileextension === "ntkr") {
                    // return toolsUploadAllNote()
                    return uploadReturnTrue()
                } 

                popupOK(
                    "Invalid file.",
                    `The file you uploaded ended with '.${fileextension}' which is not valid. Notetaker only accepts files with '.notetaker' or '.ntkr' file extension only.<br><br>Please try again with a different file.`
                )
            }
        })
    } else {
        [...dataTransfer.files].forEach((file) => {
            document.querySelector(".file-dropzone").innerHTML = file.name
        })
    }
}

function toolsUploadDragOverHandle(event) {
    event.preventDefault()
}

function toolsUploadAllNote() {
    popupChoice(
        "Choose a way to upload",
        "Warning: This action can't be undone!<br><br><b>Insert</b> will add notes in this .ntkr file with current notes.<br><b>Replace</b> will delete current notes and replace with notes in .ntkr file",
        "toolsUploadInsertNote",
        "uploadReturnTrue",
        "Insert",
        "Replace"
    )
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
                `Please upload a valid file ended with a <b>.notetaker</b> or <b>.ntkr</b> extension.<br><br>If you're already uploading the valid file, your file might be damaged or corrupted.<br><br>Please try again.<br><br><span class='popup-description'>Error:</span><br>${error}`
            )
        }
    })
    filereader.readAsText(uploadnotesdata)
}

function toolsUploadSingleNote() {
    var filereader = new FileReader();
    filereader.addEventListener("load", () => {
        try {
            console.log(JSON.parse(uploaddata));
            const rawdata = filereader.result
            var uploaddata = new TextDecoder().decode(base64ToBytes(rawdata));
            triggerUnloadSave = false

            console.log(uploaddata);

            // notesData.push(JSON.parse(uploaddata))
            // saveNoteToLocalStorage()
            // location.href = `?noteid=${notesData.length - 1}`
        } catch (error) {
            return popupOK(
                "Unable to save data.", 
                `Please upload a valid file ended with a <b>.notetaker</b> or <b>.ntkr</b> extension.<br><br>If you're already uploading the valid file, your file might be damaged or corrupted.<br><br>Please try again.<br><br><span class='popup-description'>Error:</span><br>${error}`
            )
        }
    })
    filereader.readAsText(uploadnotesdata)
}