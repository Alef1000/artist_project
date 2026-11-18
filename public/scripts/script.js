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
/*
function getUploadedImages() {
    return JSON.parse("<%-JSON.stringify(images)%>");
};
*/
function displayImages() {
    let images = ""
    const uploadedImages = getUploadedImages();
    const contentBox = document.querySelector("#content_box")

    uploadedImages.forEach((image, index) => {
        images += `<div class="image">
                        <img src="./public/uploads/images/${image}" alt="image">
                    </div>`
    })
    contentBox.InnerHTML = images;
};

function saveImage() {
    const image_form = document.getElementById("image_form");
    const input = document.querySelector("#image_button");
    const formData = new FormData(image_form)
    const image = input.files[0]

    fetch("upload", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if(response.status !== 200) throw Error(response.statusText);
    })
    .catch(error => {
        console.log(error)
    })
};
