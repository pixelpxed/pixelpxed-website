window.addEventListener("load", () => {

})

function addInCaret(content) {
    // if (elementContent.selectionTextStart || elementContent.selectionTextStart == '0') {
    //     var selectionTextStart = elementContent.selectionStart
    //     var selectionTextEnd = elementContent.selectionEnd

    //     elementContent.innerHTML = elementContent.textContent.substring(0, selectionTextStart) + `<img src="${imageToAdd}">` + elementContent.textContent.substring(selectionTextEnd, elementContent.textContent.length)
    // } else {
        elementContent.innerHTML += content
    // }
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
    
    addInCaret(`<img src="${imageToAdd}">`)

    popupDone(popupid - 1);
}



// Tools: Add link
function toolsAddLink() {
    document.querySelector(".popup-center").insertAdjacentHTML("beforeend", `
        <div id="popup-id-${popupid}" class="popup">
            <div class="popup-wrapper">
                <div class="popup-content">
                    <span class="popup-title">Add Link</span>
                    <span>
                        <input type="text" class="data-toolslinkurl" placeholder="https://www.pixelpxed.me/notetaker/"></input>    
                    </span>
                </div>
                <div class="popup-buttons-box">
                    <div class="popup-buttons-wrapper">
                        <a id="popup-confirm-true" class="popup-button" onclick="addLinkTrue();">Add</a>
                        <a id="popup-confirm-false" class="popup-button" onclick="popupDone(${popupid}); returnNothing();">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    `)
    popupOpen()
}

function addLinkTrue() {
    var urlToAdd = document.querySelector(".data-toolslinkurl").value

    if (urlToAdd === "") {
        popupDone(popupid - 1);
        return popupOK("Cannot Insert Link", "You must provide a URL to add a link.")
    }

    addInCaret(`
        <a href="${urlToAdd}" onclick="window.open('${urlToAdd}')">
            ${urlToAdd}
        </a>
    `)

    popupDone(popupid - 1);
}

function toolsAddLinkOpenUrl(url) {
    window.open(url)
}

function toolsBoldText() {
    document.execCommand("bold")
}

function toolsItalicText() {
    document.execCommand("italic")
}

function toolsUnderlineText() {
    document.execCommand("underline")
}

function toolsStrikethoughText() {
    document.execCommand("strikethrough")
}

function toolsPrint() {
    window.print()
}

function toolsDownload() {
    const element = document.createElement('a');
    const blob = new Blob([JSON.stringify(notesData, null, '\t')], {'type': 'text/json', 'lastModified': new Date().getTime()});

    const curtime = new Date()

    const date = curtime.getDate()
    const month = curtime.getMonth() + 1
    const year = curtime.getFullYear()

    const hour = curtime.getHours()
    const minute = curtime.getMinutes()
    const second = curtime.getSeconds()

    element.href = window.URL.createObjectURL(blob);
    element.download = `${date > 9 ? date : "0" + date}-${month > 9 ? month : "0" + month}-${year}_${hour > 9 ? hour : "0" + hour}-${minute >= 10 ? minute : "0" + minute}-${second >= 10 ? second : "0" + second}_v1.notetaker`;
    
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
                document.querySelector(".file-dropzone").innerHTML = file.name

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
            var uploaddata = filereader.result;
            
            localStorage.setItem("notetaker-notesData", uploaddata);
            location.reload()
        } catch (error) {
            return popupOK(
                "Unable to save data.", 
                `Please upload a valid file ended with a <b>.notetaker</b> extension.<br><br>If you're already uploading a <b>.notetaker</b> file, your file might be damaged or corrupted.<br><br>Please try again.<br><br><span class='popup-description'>Error:</span><br>${error}`
            )
        }
    });
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