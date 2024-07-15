function importPreJS(src) {
    const scriptElement = document.createElement("script");
    scriptElement.src = src;
    scriptElement.defer = true;
    document.head.insertBefore(scriptElement, document.head.firstChild);
}

function importJS(src) {
    const scriptElement = document.createElement("script");
    scriptElement.src = src;
    scriptElement.defer = true;
    document.head.appendChild(scriptElement);
}

function importCSS(src) {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = src;
    document.head.appendChild(linkElement);
}

function viewport() {
    const metaTag = document.createElement("meta");
    metaTag.setAttribute("name", "viewport");
    metaTag.setAttribute("content", "width=device-width, initial-scale=1.0");
    document.head.appendChild(metaTag);
}

async function fetchJSON(from) {
    try {
        const response = await fetch(from);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error: ", error);
        throw error; // Re-throw the error so it can be caught in the calling function if needed.
    }
}

async function fetchText(from) {
    try {
        const response = await fetch(from);
        const textData = await response.text();
        return textData;
    } catch (error) {
        console.log("Error: ", error);
        throw error; // Re-throw the error so it can be caught in the calling function if needed.
    }
}

{
    viewport();
}


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


function GET() {
    var queryString = window.location.search.slice(1);
    var queryParams = {};
    queryString.split('&').forEach(function (param) {
        var keyValue = param.split('=');
        var key = decodeURIComponent(keyValue[0]);
        var value = decodeURIComponent(keyValue[1]) || '';
        if (queryParams[key]) {
            if (Array.isArray(queryParams[key])) {
                queryParams[key].push(value);
            } else {
                queryParams[key] = [queryParams[key], value];
            }
        } else {
            queryParams[key] = value;
        }
    });
    return queryParams;
}


async function post(link, data) {
    try {
        const response = await fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const responseType = response.headers.get('content-type');
        if (responseType && responseType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


function goTo(link) {
    window.location.href = link;
}

function jumpTo(id) {
    var targetElement = document.getElementById(id);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function $(selector) {
    if (selector[0] == '#')
        return document.querySelector(selector);
    else
        return document.querySelectorAll(selector);
}

function getInputs(container_id) {
    let form = document.getElementById(container_id);
    let formData = {};
    let inputElements = form.querySelectorAll('input, select, textarea');
    inputElements.forEach(function (inputElement) {
        var inputName = inputElement.name;
        var inputValue = inputElement.value;
        if (inputName) formData[inputName] = inputValue;
    });
    return formData;
}