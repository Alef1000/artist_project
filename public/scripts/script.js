function createText() {
    const newParagraph = document.createElement("p");
    const userMessage = getText();
    newParagraph.appendChild(userMessage);

    const contentBox = document.getElementById("content_box");
    contentBox.appendChild(newParagraph)

    pushText(userMessage);
};

function getText() {
     return document.createTextNode(document.getElementById("text_box").value);
};

function pushText() {

};

function getUploadedImages() {
    return savedImages = JSON.parse("<%-JSON.stringify(images%>");
};

function displayImages() {
    let images = ""
    const uploadedImages = getUploadedImages();

    uploadedImages.forEach((image, index) => {
        images += `<div class="image">
                        <img src="./public/uploads/images/${image}" alt="image">
                    </div>`
    })
    content.InnerHTML = images
};

function addImage() {

};

if(savedImages) displayImages();