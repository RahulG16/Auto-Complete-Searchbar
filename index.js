const searchBar = document.getElementById("search");
const matchList = document.getElementById("matched-list");

// to find the searchtext
let searchStates = async (searchtext) => {
  let regex = new RegExp(`^${searchtext}`, "gi");

  const res = await fetch("./states.json");
  const data = await res.json();

  let matchedstates = data.filter((element) => {
    return element.name.match(regex) || element.abbr.match(regex);
  });

  if (searchtext.length === 0) {
    matchedstates = [];
  }

  displayStates(matchedstates);
};

// to display the matched states info

let displayStates = (matchedstates) => {
  let States = matchedstates
    .map((state) => {
      return `
        <div class='card'>
        <h3>Name: ${state.name} (${state.abbr}) | <span>${state.capital}</span> </h3>
        <small>Lat: ${state.lat} / Long: ${state.long}</small>
        </div>
        `;
    })
    .join("");

  matchList.innerHTML = States;
};

searchBar.addEventListener("input", () => searchStates(searchBar.value));
