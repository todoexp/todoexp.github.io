"use strict";

import * as Utils from "./utils.js";
import * as API from "./apis.js";

var checkboxNumber = 0;
var datesNumber = new Array();

window.onload = function () {
    const today = new Date();
    document.getElementById("itemDueDate").valueAsDate = today;

    API.fetchWeatherData();
    API.fetchCovidData();
    API.fetchArtwork();
};

function addNewItem() {
    checkboxNumber++;
    const idNumber = checkboxNumber;
    let dueDateValue = document.getElementById("itemDueDate").value;

    let newItemDiv = document.createElement("div");
    newItemDiv = Utils.createNewItemDiv(idNumber, dueDateValue);

    const sectionID = "section-" + dueDateValue;
    const wrapperID = "wrapper-" + dueDateValue;
    let getSection = document.getElementById(sectionID);

    if (!getSection) {
        let dateSection = document.createElement("section");
        dateSection = Utils.createNewDateSection(
            newItemDiv,
            sectionID,
            dueDateValue
        );

        let dateSections = document.querySelectorAll(".dateSection");
        let allToDoItems = document.getElementById("all-to-do-items");

        // get date in number form and save to the datesNumber array
        let dateNumbers = dueDateValue.split("-");
        let dateString = dateNumbers[0] + dateNumbers[1] + dateNumbers[2];
        let dateInt = parseInt(dateString, 10);
        datesNumber.push(dateInt);

        if (dateSections.length == 0) {
            allToDoItems.append(dateSection);
        } else {
            datesNumber.sort();

            let index = datesNumber.indexOf(dateInt);

            if (index == 0) {
                allToDoItems.append(dateSection);
            } else {
                const postDateNumber = datesNumber[index - 1]; // a number
                const postDateToString = postDateNumber.toString();
                const postDate =
                    postDateToString.slice(0, 4) +
                    "-" +
                    postDateToString.slice(4, 6) +
                    "-" +
                    postDateToString.slice(6);

                let postDateSection = document.getElementById(
                    "section-" + postDate
                );

                allToDoItems.insertBefore(dateSection, postDateSection);
            }
        }
    } else {
        document.getElementById("wrapper-" + dueDateValue).append(newItemDiv);
    }

    Utils.addEventListeners(idNumber, sectionID, wrapperID);
}

const input = document.getElementById("newItem");
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addNewItem();
    }
});

// show today's tasks
const today = document.querySelector(".today");
today.addEventListener("click", () => {
    const dateOfToday = new Date();
    let dateString = dateOfToday.toISOString().slice(0, 10);
    let sectionId = "section-" + dateString;

    if (!document.getElementById(sectionId)) return;
    else {
        let allDateSections = document.querySelectorAll(".dateSection");
        for (const element of allDateSections) {
            if (element.id != sectionId) {
                element.classList.add("section-hide");
            }
        }
    }
});

// show all tasks
const allTasks = document.querySelector(".all-tasks");
allTasks.addEventListener("click", () => {
    let checkNull = document.querySelector(".dateSection");

    if (checkNull) {
        let allDateSections = document.querySelectorAll(".dateSection");
        for (const element of allDateSections) {
            if (element.classList.contains("section-hide")) {
                element.classList.remove("section-hide");
            }
        }
    }
});
