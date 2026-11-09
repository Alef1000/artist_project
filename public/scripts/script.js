function createText() {
    const newParagraph = document.createElement("p");
    const userMessage = document.createTextNode(document.getElementById("text_box").value);

    newParagraph.appendChild(userMessage);

    const contentBox = document.getElementById("content_box");
    contentBox.appendChild(newParagraph)
};

function addImage() {

};