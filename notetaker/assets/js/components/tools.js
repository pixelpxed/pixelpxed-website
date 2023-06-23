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
                        <input type="text" class="data-toolslinktitle" style="margin-bottom: 1rem;" placeholder="Notetaker (Optional)"></input>    
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
    var titleToAdd = document.querySelector(".data-toolslinktitle").value

    if (urlToAdd === "") {
        popupDone(popupid - 1);
        return popupOK("Cannot Insert Link", "You must provide a URL to add a link.")
    }
    if (titleToAdd = "") {
        titleToAdd = urlToAdd
    }

    console.log(urlToAdd);
    console.log(titleToAdd);

    addInCaret(`
        <a href="${urlToAdd}" onclick="window.open('${urlToAdd}')">
            Link: ${urlToAdd}
        </a>
    `)

    popupDone(popupid - 1);
}

function toolsAddLinkOpenUrl(url) {
    window.open(url)
}