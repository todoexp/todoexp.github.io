function checkboxEventListener(idNumber) {
    let targetDiv = document.getElementById("leftDiv-" + idNumber);
    let delID = "del-" + idNumber;

    // 如果里面是text input，移除text input，加上p + del
    if (document.getElementById(delID) === null) {
        let delElement = document.createElement("del");

        let targetInput = document.getElementById("text-" + idNumber);
        delElement.innerHTML = targetInput.value;
        delElement.id = "del-" + idNumber;
        targetInput.remove();

        let pElement = document.createElement("p");
        pElement.id = "p-" + idNumber;
        pElement.append(delElement);
        targetDiv.append(pElement);
        document.getElementById("div-" + idNumber).style.backgroundColor =
            "lightgreen";
    } else {
        // 如果里面是del，移除p，加上text input
        let targetDel = document.getElementById(delID);
        // 新建text input
        let newTextInput = document.createElement("input");
        newTextInput.type = "text";
        newTextInput.id = "text-" + idNumber;
        newTextInput.value = targetDel.innerHTML;
        newTextInput.readOnly = true;
        newTextInput.disabled = true;

        // 移除p
        document.getElementById("p-" + idNumber).remove();
        targetDiv.append(newTextInput);
        document.getElementById("div-" + idNumber).style.backgroundColor =
            "#eaeaea";
    }
}

function deleteButtonEventListener(idNumber, sectionID, wrapperID) {
    let targetDiv = document.getElementById("div-" + idNumber);
    targetDiv.remove();

    let targetWrapper = document.getElementById(wrapperID);

    if (!targetWrapper.hasChildNodes()) {
        document.getElementById(sectionID).remove();
    }
}

function itemDivClick(idNumber) {
    let targetDiv = document.getElementById("div-" + idNumber);

    if (targetDiv) {
        if (!document.getElementById("del-" + idNumber)) {
            let text = document.getElementById("text-" + idNumber);
            text.disabled = false;
            text.readOnly = false;
            text.focus();
        }
    }
}

function itemDivEnterKey(idNumber) {
    if (!document.getElementById("del-" + idNumber)) {
        let text = document.getElementById("text-" + idNumber);
        text.disabled = true;
        text.readOnly = true;
    }
}

function foldSection(sectionItemWrapperID) {
    let getWrapper = document.getElementById(sectionItemWrapperID);
    if (getWrapper.classList.contains("wrapper-hide")) {
        getWrapper.classList.remove("wrapper-hide");
    } else {
        getWrapper.classList.add("wrapper-hide");
    }
}

function createNewItemDiv(idNumber, dueDateValue) {
    let newItemDiv = document.createElement("div");
    newItemDiv.classList.add("to-do-item");
    newItemDiv.id = "div-" + idNumber;

    // 创建一个leftDiv，里面包含两个input
    let leftDiv = document.createElement("div");
    leftDiv.classList.add("left-side");
    leftDiv.id = "leftDiv-" + idNumber;

    // 创建checkbox input
    let checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.name = "checkbox";
    checkboxInput.id = "checkbox-" + idNumber;
    leftDiv.append(checkboxInput);

    // 创建text input
    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.name = "text";
    textInput.id = "text-" + idNumber;
    textInput.maxLength = 40;
    textInput.size = 40;
    textInput.value = document.getElementById("newItem").value;
    textInput.readOnly = true;
    textInput.disabled = true;
    leftDiv.append(textInput);

    // reset newItem input value
    document.getElementById("newItem").value = null;

    // 创建rightDiv
    let rightDiv = document.createElement("div");
    rightDiv.classList.add("right-side");
    rightDiv.id = "rightDiv-" + idNumber;

    // 创建一个delete button
    let button = document.createElement("button");
    button.type = "button";
    button.value = "Delete";
    button.innerHTML = "Delete";
    button.id = "deleteButton-" + idNumber;

    rightDiv.append(button);

    newItemDiv.append(leftDiv);
    newItemDiv.append(rightDiv);

    return newItemDiv;
}

function createNewDateSection(newItemDiv, sectionID, dueDateValue) {
    let dateSection = document.createElement("section");
    dateSection.classList.add("dateSection");
    dateSection.id = sectionID;

    // append a div element at the front of the section
    let dateMark = document.createElement("div");
    dateMark.classList.add("dateDiv");

    let foldImg = document.createElement("img");
    foldImg.src = "images/arrow-down.svg";
    foldImg.classList.add("arrow-down");
    dateMark.appendChild(foldImg);

    let dateP = document.createElement("p");
    dateP.innerHTML = dueDateValue;
    dateP.classList.add("date-string");
    dateMark.append(dateP);

    // 创建一个section item wrapper
    let sectionItemWrapper = document.createElement("div");
    sectionItemWrapper.id = "wrapper-" + dueDateValue;

    foldImg.addEventListener("click", () => {
        foldSection(sectionItemWrapper.id);
    });

    sectionItemWrapper.append(newItemDiv);
    dateSection.append(dateMark);
    dateSection.append(sectionItemWrapper);

    return dateSection;
}

function addEventListeners(idNumber, sectionID, wrapperID) {
    let checkboxInput = document.getElementById("checkbox-" + idNumber);
    checkboxInput.addEventListener("change", () => {
        checkboxEventListener(idNumber);
    });

    let deleteButton = document.getElementById("deleteButton-" + idNumber);
    deleteButton.addEventListener("click", () => {
        deleteButtonEventListener(idNumber, sectionID, wrapperID);
    });

    let itemDiv = document.getElementById("div-" + idNumber);
    itemDiv.addEventListener("click", () => {
        itemDivClick(idNumber);
    });
    itemDiv.addEventListener("keydown", (e) => {
        if (e.key === "Enter") itemDivEnterKey(idNumber);
    });
}

export { createNewItemDiv, createNewDateSection, addEventListeners };
