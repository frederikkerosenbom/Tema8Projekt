/************************************************
 GLOBAL STORAGE + SLIDE PANELS
 Denne fil kan bruges på alle sider
************************************************/

/* ============================================
   STORAGE KEYS
============================================ */
const LIKES_KEY = "likedDonors";
const CART_KEY = "cartDonors";

/* ============================================
   GET / SAVE
============================================ */
function getLikedDonors() {
  return JSON.parse(localStorage.getItem(LIKES_KEY)) || [];
}

function saveLikedDonors(likes) {
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
}

function getCartDonors() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCartDonors(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ============================================
   LIKE FUNCTIONS
============================================ */
function toggleLike(donorId) {
  let likes = getLikedDonors();

  if (likes.includes(donorId)) {
    likes = likes.filter((id) => id !== donorId);
  } else {
    likes.push(donorId);
  }

  saveLikedDonors(likes);
  updateGlobalCounts();
}

function clearLikes() {
  saveLikedDonors([]);
  updateGlobalCounts();
}

/* ============================================
   CART FUNCTIONS
============================================ */
function addToCart(donorId) {
  let cart = getCartDonors();

  if (!cart.includes(donorId)) {
    cart.push(donorId);
  }

  saveCartDonors(cart);
  updateGlobalCounts();
}

function removeFromCart(donorId) {
  const cart = getCartDonors().filter((id) => id !== donorId);
  saveCartDonors(cart);
  updateGlobalCounts();
}

function clearCart() {
  saveCartDonors([]);
  updateGlobalCounts();
}

/* ============================================
   COUNTS
============================================ */
function updateGlobalCounts() {
  const likesCountEl = document.querySelector("#likesCount");
  const cartCountEl = document.querySelector("#cartCount");

  if (likesCountEl) {
    likesCountEl.textContent = getLikedDonors().length;
  }

  if (cartCountEl) {
    cartCountEl.textContent = getCartDonors().length;
  }
}

/* ============================================
   HENT DONOR FRA DUMMYJSON
============================================ */
async function fetchDonor(id) {
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  return res.json();
}

/* ============================================
   PANEL ELEMENTER
============================================ */
const likesPanel = document.querySelector("#likesPanel");
const cartPanel = document.querySelector("#cartPanel");
const sidePanelOverlay = document.querySelector("#sidePanelOverlay");

const likesToggle = document.querySelector("#likesToggle");
const cartToggle = document.querySelector("#cartToggle");

const likesCloseBtn = document.querySelector("#likesCloseBtn");
const cartCloseBtn = document.querySelector("#cartCloseBtn");

const likesItems = document.querySelector("#likesItems");
const cartItems = document.querySelector("#cartItems");

const likesClearBtn = document.querySelector("#likesClearBtn");
const cartClearBtn = document.querySelector("#cartClearBtn");

/* ============================================
   ÅBN / LUK PANELS
============================================ */
function openLikesPanel() {
  closeCartPanel();

  likesPanel?.classList.add("isOpen");
  sidePanelOverlay?.classList.add("isOpen");
  likesToggle?.classList.add("isActive");

  likesPanel?.setAttribute("aria-hidden", "false");
  sidePanelOverlay?.setAttribute("aria-hidden", "false");

  renderLikesPanel();
}

function closeLikesPanel() {
  likesPanel?.classList.remove("isOpen");
  likesToggle?.classList.remove("isActive");
  likesPanel?.setAttribute("aria-hidden", "true");

  if (!cartPanel?.classList.contains("isOpen")) {
    sidePanelOverlay?.classList.remove("isOpen");
    sidePanelOverlay?.setAttribute("aria-hidden", "true");
  }
}

function openCartPanel() {
  closeLikesPanel();

  cartPanel?.classList.add("isOpen");
  sidePanelOverlay?.classList.add("isOpen");
  cartToggle?.classList.add("isActive");

  cartPanel?.setAttribute("aria-hidden", "false");
  sidePanelOverlay?.setAttribute("aria-hidden", "false");

  renderCartPanel();
}

function closeCartPanel() {
  cartPanel?.classList.remove("isOpen");
  cartToggle?.classList.remove("isActive");
  cartPanel?.setAttribute("aria-hidden", "true");

  if (!likesPanel?.classList.contains("isOpen")) {
    sidePanelOverlay?.classList.remove("isOpen");
    sidePanelOverlay?.setAttribute("aria-hidden", "true");
  }
}

function closeAllPanels() {
  closeLikesPanel();
  closeCartPanel();
}

/* ============================================
   RENDER LIKES
============================================ */
async function renderLikesPanel() {
  if (!likesItems) return;

  const likes = getLikedDonors();

  if (likes.length === 0) {
    likesItems.innerHTML = `<p>Du har ingen likes endnu.</p>`;
    return;
  }

  const donors = await Promise.all(likes.map((id) => fetchDonor(id)));

  likesItems.innerHTML = donors
    .map(
      (donor) => `
      <article class="panelItem">
        <h4>ID: #${donor.id}</h4>

        <div class="panelItemActions">
          <a href="donordetail.html?id=${donor.id}">Se mere</a>
          <button type="button" data-remove-like="${donor.id}">Fjern</button>
        </div>
      </article>
    `,
    )
    .join("");

  likesItems.querySelectorAll("[data-remove-like]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const donorId = Number(btn.dataset.removeLike);
      toggleLike(donorId);
      renderLikesPanel();
    });
  });
}

/* ============================================
   RENDER CART
============================================ */
async function renderCartPanel() {
  if (!cartItems) return;

  const cart = getCartDonors();

  if (cart.length === 0) {
    cartItems.innerHTML = `<p>Din kurv er tom.</p>`;
    return;
  }

  const donors = await Promise.all(cart.map((id) => fetchDonor(id)));

  cartItems.innerHTML = donors
    .map(
      (donor) => `
      <article class="panelItem">
        <h4>ID: #${donor.id}</h4>
    

        <div class="panelItemActions">
          <a href="donordetail.html?id=${donor.id}">Se mere</a>
          <button type="button" data-remove-cart="${donor.id}">Fjern</button>
        </div>
      </article>
    `,
    )
    .join("");

  cartItems.querySelectorAll("[data-remove-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const donorId = Number(btn.dataset.removeCart);
      removeFromCart(donorId);
      renderCartPanel();
    });
  });
}

/* ============================================
   EVENTS
============================================ */
likesToggle?.addEventListener("click", (event) => {
  event.preventDefault();

  if (likesPanel?.classList.contains("isOpen")) {
    closeLikesPanel();
  } else {
    openLikesPanel();
  }
});

cartToggle?.addEventListener("click", (event) => {
  event.preventDefault();

  if (cartPanel?.classList.contains("isOpen")) {
    closeCartPanel();
  } else {
    openCartPanel();
  }
});

likesCloseBtn?.addEventListener("click", closeLikesPanel);
cartCloseBtn?.addEventListener("click", closeCartPanel);

sidePanelOverlay?.addEventListener("click", closeAllPanels);

likesClearBtn?.addEventListener("click", () => {
  clearLikes();
  renderLikesPanel();
});

cartClearBtn?.addEventListener("click", () => {
  clearCart();
  renderCartPanel();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllPanels();
  }
});

/* ============================================
   GØR FUNKTIONER GLOBALE
   så donorlist.js kan bruge dem
============================================ */
window.getLikedDonors = getLikedDonors;
window.toggleLike = toggleLike;
window.addToCart = addToCart;
window.updateGlobalCounts = updateGlobalCounts;

/* ============================================
   START
============================================ */
updateGlobalCounts();
