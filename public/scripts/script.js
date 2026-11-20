function getRandomPosition() {
    const randomPos = Math.round(Math.random()*100);
    return randomPos + "cqh" 
};

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

async function displayImages() {
    const content_box = document.querySelector("#content_box");
    const imageData = await fetch("uploads/images");
    const images = await imageData.json()
    let zIndexNumber = 1;
    content_box.innerHTML = "";

    for (const image of images) {
        if (image.namne !== ".gitkeep") {
            const imageElement = document.createElement("img");
            imageElement.src = image.url;
            imageElement.alt = image.name;
            imageElement.style.zIndex = "zIndexNumber";
            imageElement.className = "image"
            imageElement.style.margin = `${getRandomPosition()} 0 0 ${getRandomPosition()}`;
            content_box.appendChild(imageElement)
        }
        
    }

    zIndexNumber++;
}

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

    window.location.reload()
};

async function loadImagesDrive() {
    const res = await fetch("/api/images");
    const files = res.json;
    const content_box = document.querySelector("#content_box")

    for (const f of files) {
        const imgElement = document.createElement("img");
        imgElement.src = `/images/${f.id}`;
        imgElement.alt = f.name
        imgElement.loading = "lazy";
        content_box.appendChild(imgElement);
    }
}

displayImages();
console.log(typeof(getRandomPosition()));