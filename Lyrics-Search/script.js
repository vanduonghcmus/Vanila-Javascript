const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://private-anon-a409128002-lyricsovh.apiary-mock.com/v1";

// Search by song
function searchSongs(term) {
  fetch(`${apiURL}/suggest/${term}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

// Add event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in search term");
  } else {
    searchSongs(searchTerm);
  }
});
