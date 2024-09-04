async function sidebarClose(side) {
    $(`sidebar[position='${side}']`)[0].classList.add("hide");
}

async function sidebarShow(side) {
    $(`sidebar[position='${side}']`)[0].classList.remove("hide");
}

async function sidebarToggle(side) {
    let sidebar = $(`sidebar[position='${side}']`)[0];
    if (sidebar.classList.contains("hide"))
        sidebar.classList.remove("hide");
    else
        $(`sidebar[position='${side}']`)[0].classList.add("hide");
}

function popup(content, id = 12323) {
    let popup_id = id;
    $("body")[0].innerHTML += `
    <overlay id="popup-overlay-${popup_id}">
        <div class="popup-container" id="popup-container-${popup_id}">
            <div  class="popup-close-right" onclick="popupClose('${popup_id}')">×</div>
            <div class="popup-content" id="popup-content-${popup_id}">
            ${content}
            </div>
        </div>
    </overlay>
    `;
    return popup_id;
}

var boolBuffer = {};
async function popupBool(content = "Are you sure you want to proceed?", details, id = 1278) {
    let popup_id = id;
    let result;
    $("body")[0].innerHTML +=
        `
        <overlay id="popup-overlay-${popup_id}">
            <div class="popup-container" id="popup-container-${popup_id}">
                <div class="popup-content" id="popup-content-${popup_id}">
                <h2>${content}</h2>
                <p>${details}</p>
                <button onclick="boolBuffer['${popup_id}']=1">Yes</button>
                <button onclick="boolBuffer['${popup_id}']=0">No</button>
                </div>
            </div>
        </overlay>
        `;
    await popupShow(popup_id);
    while (true) {
        if (boolBuffer[popup_id] == 1 || boolBuffer[popup_id] == 0) {
            await popupClose(popup_id);
            result = boolBuffer[popup_id];
            boolBuffer[popup_id] = null;
            return result;
        }
        await delay(100);
    }
}

async function popupAlert(content = "", details = "", id = 12323) {
    let popup_id = id;
    $("body")[0].innerHTML +=
        `
        <overlay id="popup-overlay-${popup_id}">
            <div class="popup-container" id="popup-container-${popup_id}">
                <div class="popup-content widen" id="popup-content-${popup_id}">
                <h2>${content}</h2>
                <p>${details}</p>
                </div>
                <button onclick="popupClose('${popup_id}')">Ok</button>
            </div>
        </overlay>
        `;
    await popupShow(popup_id);
}

async function popupMessage(content, id = 12323) {
    let popup_id = id;
    $("body")[0].innerHTML +=
        `
        <overlay id="popup-overlay-${popup_id}">
            <div class="popup-container" id="popup-container-${popup_id}">
                <div class="popup-content widen" id="popup-content-${popup_id}">
                ${content}
                </div>
                <button onclick="popupClose('${popup_id}')">Ok</button>
            </div>
        </overlay>
        `;
    // return popup_id;
    await popupShow(popup_id);
}

async function testBool() {
    let x = await popupBool();
    console.log(x);
    if (x == 1) popupAlert('<h2>Deleted</h2>', "", 4234324);
    if (x == 0) popupAlert('<h2>Not Deleted</h2>', "", 4234324);
}

async function testFetch() {
    let x = await fetchText("./component.html");
    popupShow(popup(x));
}
