// 1. FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDPZx7OPw2D6J533kNX-T302RoqPGAPz7k",
  authDomain: "teknova-c9d6e.firebaseapp.com",
  databaseURL: "https://teknova-c9d6e-default-rtdb.firebaseio.com",
  projectId: "teknova-c9d6e",
  storageBucket: "teknova-c9d6e.firebasestorage.app",
  messagingSenderId: "47075576420",
  appId: "1:47075576420:web:29d0588bee99558d866d71"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const ref = db.ref("vivutio");

let allData = {};

// 2. PASSWORD
const ADMIN_USER = "TEKNOVA";
const ADMIN_PASS = "2029";

// 3. FUNGUO: JOSE MWENA
document.getElementById('searchInput').addEventListener('keyup', function(e){
  if(e.key === 'Enter' && this.value.toUpperCase() === 'JOSE MWENA'){
    document.getElementById('loginOverlay').classList.add('show');
    this.value = '';
  }
});

// 4. LOGIN
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const user = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPassword').value;
  if(user.toUpperCase() === ADMIN_USER && pass === ADMIN_PASS){
    document.getElementById('loginOverlay').classList.remove('show');
    document.getElementById('adminPanel').classList.add('show');
    loadAdmin();
  } else {
    document.getElementById('loginError').classList.add('show');
  }
});

// 5. HIFADHI
document.getElementById('vivutioForm').addEventListener('submit', function(e){
  e.preventDefault();
  const data = {
    title: document.getElementById('newTitle').value,
    cat: document.getElementById('newCat').value,
    img: document.getElementById('newImg').value,
    desc: document.getElementById('newDesc').value
  };
  ref.push(data);
  alert("Imehifadhiwa!");
  this.reset();
});

// 6. SOMA DATA
function loadData(){
  ref.on('value', snap => {
    allData = snap.val() || {};
    renderCards();
  });
}
function renderCards(){
  const grid = document.getElementById('vivutioGrid');
  grid.innerHTML = '';
  if(!allData) return grid.innerHTML = '<div class="empty-state">Bado hakuna vivutio</div>';
  Object.keys(allData).forEach(key => {
    const i = allData[key];
    grid.innerHTML += `
      <div class="card">
        <img class="card-img" src="${i.img}" alt="${i.title}">
        <div class="card-body">
          <div class="card-cat">${i.cat}</div>
          <h3>${i.title}</h3>
          <p>${i.desc}</p>
        </div>
      </div>
    `;
  });
}

// 7. ADMIN LIST
function loadAdmin(){
  const list = document.getElementById('adminList');
  list.innerHTML = '';
  Object.keys(allData).forEach(key => {
    const i = allData[key];
    list.innerHTML += `
      <div class="admin-list-item">
        <img src="${i.img}">
        <div class="info">
          <div class="t">${i.title}</div>
          <div class="c">${i.cat}</div>
        </div>
        <div class="actions">
          <button class="icon-btn danger" onclick="del('${key}')">Futa</button>
        </div>
      </div>
    `;
  });
}
function del(key){ if(confirm("Futa?")) ref.child(key).remove(); }

// 8. FUNGA
document.getElementById('loginClose').onclick = () => document.getElementById('loginOverlay').classList.remove('show');
document.getElementById('backToSite').onclick = () => document.getElementById('adminPanel').classList.remove('show');
document.getElementById('logoutBtn').onclick = () => document.getElementById('adminPanel').classList.remove('show');

loadData();
