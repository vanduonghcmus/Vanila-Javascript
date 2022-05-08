const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

populateUI();

// Save selected movie index and price
function setMovieSelected(movieIndex, moviePrice) {
  localStorage.setItem("selectMovieIndex", movieIndex);
  localStorage.setItem("selectMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeat", JSON.stringify(seatsIndex));

  const selectedSeatCount = selectedSeats.length;

  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
}

// Movie change event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieSelected(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeat = JSON.parse(localStorage.getItem("selectedSeat"));
  if (selectedSeat !== null && selectedSeat.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeat.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectMovieIndex = localStorage.getItem("selectMovieIndex");
  if (selectMovieIndex !== null) {
    movieSelect.selectedIndex = selectMovieIndex;
  }
}

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
