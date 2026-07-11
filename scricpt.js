// 1. FIREBASE CONFIG YAKO
const firebaseConfig = {
  apiKey: "AIzaSyDPZx7OPw2D6J533kNX-T302RoqPGAPz7k",
  authDomain: "teknova-c9d6e.firebaseapp.com",
  databaseURL: "https://teknova-c9d6e-default-rtdb.firebaseio.com",
  projectId: "teknova-c9d6e",
  storageBucket: "teknova-c9d6e.firebasestorage.app",
  messagingSenderId: "47075576420",
  appId: "1:47075576420:web:29d0588bee99558d866d71"
};

// 2. ANZISHA FIREBASE
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const attractionsRef = db.ref("attractions");

// 3. ONSHESHA VIVUTIO KUTOKA FIREBASE
function loadAttractions() {
  attractionsRef.on("value", (snapshot) => {
    const data = snapshot.val();
    const grid = document.getElementById('attractionGrid');
    grid.innerHTML = '';

    if(data){
      Object.keys(data).forEach(key => {
        const item = data[key];
        grid.innerHTML += `
          <div class="card">
            <img src="${item.img}" alt="${item.title}">
            <div class="card-body">
              <span class="tag">${item.tag}</span>
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
            </div>
          </div>
        `;
      });
    }
  });
}

// 4. SEARCH BAR - SIRI "JOSE MWENA"
document.getElementById('searchInput').addEventListener('input', function(e){
  const value = e.target.value.toUpperCase();

  // KAMA IMEANDIKWA JOSE MWENA
  if(value === "JOSE MWENA"){
    document.getElementById('adminPanel').classList.remove('admin-hidden');
    e.target.value = ''; // Futa search
  }

  // HII NI SEARCH YA KAWAIDA PIA
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const title = card.querySelector('h3').innerText.toUpperCase();
    if(title.includes(value)){
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// 5. LOGIN YA ADMIN
function checkPass(){
  const user = document.getElementById('adminUser').value;
  const pass = document.getElementById('adminPass').value;

  if(user === "TEKNOVA" && pass === "2029"){
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboardForm').style.display = 'block';
    loadDeleteList(); // Jaza list ya kufuta
  } else {
    document.getElementById('adminError').innerText = "Username au Password si sahihi!";
  }
}

// 6. ONGEZA KWENYE FIREBASE
function addToFirebase(){
  const t = document.getElementById('newTitle').value;
  const g = document.getElementById('newTag').value;
  const i = document.getElementById('newImg').value;
  const d = document.getElementById('newDesc').value;

  if(!t ||!g ||!i ||!d) return alert("Jaza sehemu zote!");

  attractionsRef.push({
    title: t,
    tag: g,
    img: i,
    desc: d
  });

  alert("Kimehifadhiwa kwenye Firebase!");
  document.getElementById('newTitle').value = '';
  document.getElementById('newTag').value = '';
  document.getElementById('newImg').value = '';
  document.getElementById('newDesc').value = '';
}

// 7. JAZA LIST YA KUFUTA
function loadDeleteList(){
  const select = document.getElementById('deleteSelect');
  select.innerHTML = '';
  attractionsRef.on("value", (snapshot) => {
    const data = snapshot.val();
    if(data){
      Object.keys(data).forEach(key => {
        select.innerHTML += `<option value="${key}">${data[key].title}</option>`;
      });
    }
  });
}

// 8. FUTA KUTOKA FIREBASE
function deleteFromFirebase(){
  const key = document.getElementById('deleteSelect').value;
  if(confirm("Una uhakika unataka kufuta?")){
    db.ref("attractions/" + key).remove();
    alert("Kimefutwa!");
  }
}

// 9. FUNGA ADMIN
function closeAdmin(){
  document.getElementById('adminPanel').classList.add('admin-hidden');
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('dashboardForm').style.display = 'none';
  document.getElementById('adminUser').value = '';
  document.getElementById('adminPass').value = '';
  document.getElementById('adminError').innerText = '';
}

// SCROLL TOP
const scrollBtn = document.getElementById('scrollTop');
window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) { scrollBtn.style.display = "block"; }
  else { scrollBtn.style.display = "none"; }
};
scrollBtn.onclick = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };

// ANZISHA
document.addEventListener('DOMContentLoaded', loadAttractions);
