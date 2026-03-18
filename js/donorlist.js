/************************************************
 DONORLIST
 Denne fil bruges kun på donorlist.html
************************************************/

/* ============================================
   HTML ELEMENTER
============================================ */
const donorsContainer = document.querySelector("#donorsContainer");
const donorlistHeader = document.querySelector("#donorlistHeaderOne");

const pageInfo = document.querySelector("#pageInfo");
const prevPageBtn = document.querySelector("#prevPageBtn");
const nextPageBtn = document.querySelector("#nextPageBtn");

const activeCount = document.querySelector("#activeCount");

/* ==== Filter / sort panel ==== */
const filterPanel = document.querySelector("#filterPanel");
const filterOverlay = document.querySelector("#filterOverlay");
const sortPanel = document.querySelector("#sortPanel");

/* ==== Knapper ==== */
const filterToggle = document.querySelector("#filterToggle");
const sortToggle = document.querySelector("#sortToggle");
const filterCloseBtn = document.querySelector("#filterCloseBtn");
const sortCloseBtn = document.querySelector("#sortCloseBtn");

/* ==== Plus / minus symboler i top-knapperne ==== */
const filterSymbol = filterToggle.querySelector(".toggleSymbol");
const sortSymbol = sortToggle.querySelector(".toggleSymbol");

/* ==== Filter + sort inputs ==== */
const sorter = document.querySelector("#sorter");
const eyeFilter = document.querySelector("#eyeFilter");
const heightFilter = document.querySelector("#heightFilter");
const hairFilter = document.querySelector("#hairFilter");
const clearFilters = document.querySelector("#clearFilters");

/* ============================================
   URL PARAMETRE
   Her læser vi hvad brugeren valgte fra forsiden
============================================ */
const params = new URLSearchParams(window.location.search);
const gender = params.get("gender");

/* ============================================
   API + STATE
============================================ */
const listURL = "https://dummyjson.com/users";

let allDonors = [];
let filteredDonors = [];
let currentPage = 1;
const donorsPerPage = 12;

/* ============================================
   HENT DONORS FRA API
============================================ */
function getDonors() {
  fetch(listURL)
    .then((res) => res.json())
    .then((data) => {
      allDonors = data.users;
      applyFiltersAndSort();
    });
}

/* ============================================
   FILTER 1: GENDER FRA FORSIDEN
============================================ */
function applyGenderFilter(users) {
  if (gender === "male") {
    donorlistHeader.textContent = "Sæddonor";
    return users.filter((user) => user.gender === "male");
  }

  if (gender === "female") {
    donorlistHeader.textContent = "Ægdonor";
    return users.filter((user) => user.gender === "female");
  }

  donorlistHeader.textContent = "Alle donorer";
  return users;
}

/* ============================================
   FILTER 2: EKSTRA FILTRE
============================================ */
function applyExtraFilters(users) {
  let result = [...users];

  if (eyeFilter.value !== "") {
    result = result.filter((user) => user.eyeColor === eyeFilter.value);
  }

  if (hairFilter.value !== "") {
    result = result.filter((user) => user.hair.color === hairFilter.value);
  }

  if (heightFilter.value === "short") {
    result = result.filter((user) => user.height < 170);
  } else if (heightFilter.value === "medium") {
    result = result.filter((user) => user.height >= 170 && user.height <= 185);
  } else if (heightFilter.value === "tall") {
    result = result.filter((user) => user.height > 185);
  }

  return result;
}

/* ============================================
   SORTERING
============================================ */
function applySorting(users) {
  let result = [...users];

  if (sorter.value === "newToOld") {
    result.sort((a, b) => b.id - a.id);
  } else if (sorter.value === "oldToNew") {
    result.sort((a, b) => a.id - b.id);
  }

  return result;
}

/* ============================================
   KØR ALLE FILTRE + SORTERING
============================================ */
function applyFiltersAndSort() {
  let result = [...allDonors];

  result = applyGenderFilter(result);
  result = applyExtraFilters(result);
  result = applySorting(result);

  filteredDonors = result;

  if (activeCount) {
    activeCount.textContent = filteredDonors.length;
  }

  currentPage = 1;
  showCurrentPage();
}

/* ============================================
   PAGINATION
============================================ */
function getCurrentPageDonors() {
  const start = (currentPage - 1) * donorsPerPage;
  const end = start + donorsPerPage;
  return filteredDonors.slice(start, end);
}

/* ============================================
   FIND DE 3 NYESTE PÅ DEN AKTUELLE SIDE
============================================ */
function getNewestIdsOnPage(pageDonors) {
  return [...pageDonors]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)
    .map((donor) => donor.id);
}

/* ============================================
   VIS DONORS PÅ AKTUELLE SIDE
============================================ */
function showCurrentPage() {
  donorsContainer.innerHTML = "";

  const pageDonors = getCurrentPageDonors();
  const newestIds = getNewestIdsOnPage(pageDonors);
  const likedDonors = getLikedDonors(); // fra global-storage.js

  pageDonors.forEach((donor) => {
    const isLiked = likedDonors.includes(donor.id);
    const isNew = newestIds.includes(donor.id);

    donorsContainer.innerHTML += `
      <article class="donorCard">
        <div class="donorImg">
          ${isNew ? `<span class="newBadge">NEW</span>` : ""}

          <button 
            class="likeBtn ${isLiked ? "liked" : ""}" 
            data-id="${donor.id}" 
            aria-label="Like donor"
          >
            <svg class="heartIcon" viewBox="0 0 24 24">
              <path d="M12 21s-6-4.35-9-7.5S0 6.5 3 4.5 8.5 4 12 7c3.5-3 7-3.5 9-2.5s3 6 0 9S12 21 12 21z"/>
            </svg>
          </button>

          <img src="${donor.image}" alt="${donor.firstName}" />
        </div>

        <div class="donorInfo">
          <h3>ID: #${donor.id}</h3>

          <div class="infoText">
            <div>
              <h4>Land</h4>
              <p>${donor.address.country}</p>
            </div>

            <div>
              <h4>Øjenfarve</h4>
              <p>${donor.eyeColor}</p>
            </div>

            <div>
              <h4>Hårfarve</h4>
              <p>${donor.hair.color}</p>
            </div>

            <div>
              <h4>Højde</h4>
              <p>${donor.height} cm</p>
            </div>
          </div>

          <div class="cardActions">
            <a class="seMereBtn" href="donordetail.html?id=${donor.id}">
              Se mere
            </a>

            <button class="cartBtn" data-id="${donor.id}">
              Tilføj
            </button>
          </div>
        </div>
      </article>
    `;
  });

  addCardEventListeners();
  updatePagination();
  updateGlobalCounts(); // fra global-storage.js
}

/* ============================================
   OPDATER PAGINATION
============================================ */
function updatePagination() {
  const totalPages = Math.ceil(filteredDonors.length / donorsPerPage);

  pageInfo.textContent = `Side ${currentPage} af ${totalPages || 1}`;
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

/* ============================================
   EVENTS PÅ CARDS
============================================ */
function addCardEventListeners() {
  const likeButtons = document.querySelectorAll(".likeBtn");
  const cartButtons = document.querySelectorAll(".cartBtn");

  likeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const donorId = Number(btn.dataset.id);
      toggleLike(donorId); // global-storage.js
      showCurrentPage();
    });
  });

  cartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const donorId = Number(btn.dataset.id);
      addToCart(donorId); // global-storage.js
      updateGlobalCounts();
    });
  });
}

/* ============================================
   FILTER PANEL
   Slide-in panel + overlay
============================================ */
function openFilter() {
  filterPanel.classList.add("isOpen");
  filterOverlay.classList.add("isOpen");
  filterPanel.setAttribute("aria-hidden", "false");
  filterOverlay.setAttribute("aria-hidden", "false");
  filterSymbol.textContent = "−";

  closeSort();
}

function closeFilter() {
  filterPanel.classList.remove("isOpen");
  filterOverlay.classList.remove("isOpen");
  filterPanel.setAttribute("aria-hidden", "true");
  filterOverlay.setAttribute("aria-hidden", "true");
  filterSymbol.textContent = "+";
}

/* ============================================
   SORT PANEL
   Lille dropdown
============================================ */
function openSort() {
  sortPanel.classList.add("isOpen");
  sortPanel.setAttribute("aria-hidden", "false");
  sortSymbol.textContent = "−";

  closeFilter();
}

function closeSort() {
  sortPanel.classList.remove("isOpen");
  sortPanel.setAttribute("aria-hidden", "true");
  sortSymbol.textContent = "+";
}

/* ============================================
   TOGGLE KNAPPER
============================================ */
filterToggle.addEventListener("click", (event) => {
  event.stopPropagation();

  if (filterPanel.classList.contains("isOpen")) {
    closeFilter();
  } else {
    openFilter();
  }
});

sortToggle.addEventListener("click", (event) => {
  event.stopPropagation();

  if (sortPanel.classList.contains("isOpen")) {
    closeSort();
  } else {
    openSort();
  }
});

/* Luk-knapper */
filterCloseBtn.addEventListener("click", closeFilter);

/* Overlay lukker filter */
filterOverlay.addEventListener("click", closeFilter);

/* Klik udenfor lukker kun sort */
document.addEventListener("click", (event) => {
  const clickedInsideSort = sortPanel.contains(event.target) || sortToggle.contains(event.target);

  if (!clickedInsideSort) {
    closeSort();
  }
});

/* Escape lukker begge */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeFilter();
    closeSort();
  }
});

/* ============================================
   FILTER + SORT EVENTS
============================================ */
sorter.addEventListener("change", applyFiltersAndSort);
eyeFilter.addEventListener("change", applyFiltersAndSort);
heightFilter.addEventListener("change", applyFiltersAndSort);
hairFilter.addEventListener("change", applyFiltersAndSort);

clearFilters.addEventListener("click", () => {
  eyeFilter.value = "";
  heightFilter.value = "";
  hairFilter.value = "";
  applyFiltersAndSort();
});

/* ============================================
   PAGINATION KNAPPER
============================================ */
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showCurrentPage();
  }
});

nextPageBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredDonors.length / donorsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    showCurrentPage();
  }
});

/* ============================================
   START
============================================ */
getDonors();
