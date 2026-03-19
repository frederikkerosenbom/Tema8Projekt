const params = new URLSearchParams(window.location.search);
id = params.get("id");

// const productURL = "https://dummyjson.com/users/" + id;
const detailcontainer = document.querySelector("#donorDetailContainer");
const donor = document.querySelector(".donorDetailTitles h1");
const donorBack = document.querySelector(".donorDetailTitles a");
/**** get a single user ****/

function getData() {
  fetch(`https://dummyjson.com/users/${id}`)
    .then((res) => res.json())

    .then((data) => {
      const backBtn = document.querySelector("#backBtn");

      if (data.gender === "male") {
        backBtn.href = "donorlist.html?gender=male";
      } else {
        backBtn.href = "donorlist.html?gender=female";
      }
      show(data);
    });
}

function show(data) {
  const likedDonors = getLikedDonors(); // fra global-storage.js

  const isLiked = likedDonors.includes(data.id);
  detailcontainer.innerHTML = `
        <div class="detailPic"><img src="${data.image}" alt=""></div>

         <div class="detailInfo">
                <div class="idRow"><h3>ID</h3><p>#${data.id}</p>

             <button 
            class="likeBtn ${isLiked ? "liked" : ""}" 
            data-id="${data.id}" 
            aria-label="Like donor"
          >
            <svg class="heartIcon heartIcon-detail" viewBox="0 0 24 24">
              <path d="M12 21s-6-4.35-9-7.5S0 6.5 3 4.5 8.5 4 12 7c3.5-3 7-3.5 9-2.5s3 6 0 9S12 21 12 21z"/>
            </svg>
          </button>
                
                </div>
                <div class="infoText">
                    <div><h3>Hårfarve</h3><p> ${data.hair.color}</p></div>
                    <div><h3>Hårtype</h3><p>${data.hair.type}</p></div>
                    <div><h3>Alder</h3><p>${data.age} år</p></div>
                    <div><h3>Blodtype</h3><p>${data.bloodGroup}</p></div>
                    <div><h3>Øjenfarve</h3><p>${data.eyeColor}</p></div>
                    <div><h3>Højde</h3><p>${data.height} cm</p></div>
                </div>
                 <button class="detailKnap cartBtn" data-id="${data.id}">
              Tilføj til kurv
            </button>
            </div>

  `;

  donor.innerHTML = `${data.gender === "male" ? "Sæddonor" : "Ægdonor"}`;

  addCardEventListeners();

  updateGlobalCounts();
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
      toggleLike(donorId);
    });
  });

  cartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const donorId = Number(btn.dataset.id);
      addToCart(donorId);
      updateGlobalCounts();
    });
  });
}
getData();
