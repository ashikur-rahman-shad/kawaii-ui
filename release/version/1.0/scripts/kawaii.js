const overlay = document.getElementsByClassName("overlay")[0];
const popup = document.getElementsByClassName("popup-container")[0];
const popupContent = document.getElementsByClassName("popup-content")[0];
const popupCloseButton = document.getElementsByClassName("popup-close")[0];

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function popupClose() {
    popupContent.classList.remove("maximized");
    popup.classList.remove("maximized");
    await delay(500);
    popupContent.innerHTML = "";
    overlay.style.display = "none";
}

async function popupShow() {
    popupContent.innerHTML = "";
    overlay.style.display = "flex";
    await delay(10);
    popup.classList.add("maximized");
    popupContent.classList.add("maximized");
    await delay(500);
}

if (popupCloseButton)
    popupCloseButton.addEventListener("click", () => {
        popupClose();
    });

function currentDir() {
    const currentUrl = window.location.href;
    return currentUrl.substring(0, currentUrl.lastIndexOf("/")) + "/";
}

function id(id) {
    return document.getElementById(id);
}

function input(ID) {
    return id(ID).value;
}

function output(ID, value) {
    id(ID).innerHTML = value;
}

function toggleTheme(theme) {
    const body = document.body;
    if (theme) body.setAttribute("theme", theme);
    else if (body.getAttribute("theme") == "dark")
        body.setAttribute("theme", "light");
    else body.setAttribute("theme", "dark");
}

function clickElement(element, attribute, resultFunction) {
    const elements = document.querySelectorAll(`${element}[${attribute}]`);
    elements.forEach((el) => {
        let q = el.getAttribute("onclick");
        if (q == null) q = "";
        el.setAttribute("onclick", q + ";" + resultFunction);
    });
}

clickElement("button", "toggleTheme", "toggleTheme()");
