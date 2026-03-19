// const params = new URLSearchParams(window.location.search);
// const id = params.get("id");

// const productURL = "https://dummyjson.com/users/" + id;
const detailcontainer = document.querySelector("#donorDetailContainer");

/* ============================================
   URL PARAMETRE
   Her læser vi hvad brugeren valgte fra forsiden
============================================ */
const params = new URLSearchParams(window.location.search);
const gender = params.get("gender");

/**** get a single user ****/

function getData() {
  fetch(`https://dummyjson.com/users/1`)
    .then((res) => res.json())
    // .then(console.log)
    .then((data) => show(data));
}

/* ============================================
   FILTER 1: GENDER FRA FORSIDEN
============================================ */
function applyGenderFilter(data) {
  if (gender === "male") {
    donorlistHeader.textContent = "Sæddonor";
    return data.filter((person) => person.gender === "male");
  }

  if (gender === "female") {
    donorlistHeader.textContent = "Ægdonor";
    return data.filter((person) => person.gender === "female");
  }

  donorlistHeader.textContent = "Alle donorer";
  return data;
}

function show(data) {
  detailcontainer.innerHTML = `
        <div class="detailPic"><img src="${data.image}" alt=""></div>

         <div class="detailInfo">
                <div class="idRow"><h3>ID</h3><p>#${data.id}</p>

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="heartIcon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
               </svg>
                
                </div>
                <div class="infoText">
                    <div><h3>Hårfarve</h3><p> ${data.hair.color}</p></div>
                    <div><h3>Hårtype</h3><p>${data.hair.type}</p></div>
                    <div><h3>Alder</h3><p>${data.age} år</p></div>
                    <div><h3>Blodtype</h3><p>${data.bloodGroup}</p></div>
                    <div><h3>Øjenfarve</h3><p>${data.eyeColor}</p></div>
                    <div><h3>Højde</h3><p>${data.height} cm</p></div>
                </div>
                <a href="" class="detailKnap">Tilføj til kurv</a>
            </div>

  `;
}

getData();
