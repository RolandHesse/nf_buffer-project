const peopleInSpace = document.querySelector("[data-js='people-in-space']");
const listContainer = document.querySelector('[data-js="list-container"]');
const allButton = document.querySelector('[data-js="all-button"]');
const issButton = document.querySelector('[data-js="iss-button"]');
const tiangongButton = document.querySelector('[data-js="tiangong-button"]');

console.log("Something");

let peopleArray;

async function getPeopleInSpace() {
  const response = await fetch("http://api.open-notify.org/astros.json");
  try {
    if (!response.ok) {
      console.log("Response not okay");
    } else {
      const data = await response.json();
      console.log("data: ", data);
      console.log("data.people: ", data.people);
      peopleArray = data.people;
      peopleInSpace.textContent = data.number;
      updatePeopleList(peopleArray);

      // data.people (an array)
      // loop over them (using forEach)
      // for each item in the array use
      // document.createElement("li")
      // add the name of the person to the element
      // append element to the dom}
    }
  } catch (error) {
    console.error(error);
  }
}

getPeopleInSpace();

// add functionality to allButton
allButton.addEventListener("click", () => {
  listContainer.innerHTML = "";
  updatePeopleList(peopleArray);
});

// add functionality to issButton
issButton.addEventListener("click", () => {
  listContainer.innerHTML = "";
  const issPeople = peopleArray.filter((person) => person.craft === "ISS");
  console.log("issPeople: ", issPeople);
  updatePeopleList(issPeople);
});

// add functionality to tiangongButton
tiangongButton.addEventListener("click", () => {
  listContainer.innerHTML = "";
  const tiangongPeople = peopleArray.filter(
    (person) => person.craft === "Tiangong"
  );
  console.log("tiangongPeople: ", tiangongPeople);
  updatePeopleList(tiangongPeople);
});

function updatePeopleList(arrayName) {
  arrayName.forEach((person) => {
    const listEntry = document.createElement("li");
    listEntry.textContent = person.name;
    listContainer.append(listEntry);
  });
}

console.log("peopleArray: ", peopleArray);
