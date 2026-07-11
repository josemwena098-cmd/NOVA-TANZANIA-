// DATA YA VIVUTIO VYA TANZANIA
const attractions = [
  {
    title: "Hifadhi ya Serengeti",
    tag: "Wanyama Pori",
    img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7d?q=80&w=2070",
    desc: "Nyumbani kwa uhamiaji mkubwa zaidi duniani. Ona Simba, Chui, Ndovu na Wanyama Milioni 2."
  },
  {
    title: "Bonde la Ngorongoro",
    tag: "Maajabu ya Asili",
    img: "https://images.unsplash.com/photo-1516426122078-a0824333ddf9?q=80&w=2070",
    desc: "Caldera kubwa zaidi duniani. Unaona Big Five wote kwa siku moja ndani ya bonde hili."
  },
  {
    title: "Mlima Kilimanjaro",
    tag: "Mlima Mrefu Afrika",
    img: "https://images.unsplash.com/photo-1619155107458-8f0f7f1f1f1f?q=80&w=2070",
    desc: "Mita 5895 juu ya usawa wa bahari. Panda na uone theluji juu ya ikweta. Changamoto kwa watalii."
  },
  {
    title: "Fukwe za Zanzibar",
    tag: "Pwani & Visiwa",
    img: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2070",
    desc: "Maji ya turquoise, mchanga mweupe na Stone Town ya kihistoria. Piga mbizi kwenye matumbawe."
  },
  {
    title: "Makumbusho ya Taifa - Dar",
    tag: "Historia & Makumbusho",
    img: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2070",
    desc: "Jifunze historia ya Tanzania, mabaki ya mwanadamu wa kale 'Zinjanthropus' kutoka Olduvai."
  },
  {
    title: "Bonongo la Olduvai",
    tag: "Mabaki ya Kale",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070",
    desc: "Mahali ambapo mabaki ya mwanadamu wa kwanza yamepatikana. 'Bonde la Ubinadamu'."
  },
  {
    title: "Mji wa Kale wa Kilwa Kisiwani",
    tag: "Urithi wa Dunia UNESCO",
    img: "https://images.unsplash.com/photo-1609948203244-8b4d91e1b7b1?q=80&w=2070",
    desc: "Mabaki ya mji wa biashara wa karne ya 9. Nyumba za mawe na Misikiti ya kale."
  },
  {
    title: "Pango la Amboni - Tanga",
    tag: "Mabaki ya Kale",
    img: "https://images.unsplash.com/photo-1501554728185-ce9257bfd611?q=80&w=2070",
    desc: "Mapango makubwa zaidi Afrika Mashariki yenye miaka milioni 150. Ya ajabu sana ndani."
  }
];

// Onyesha Vivutio
function loadAttractions() {
  const grid = document.getElementById('attractionGrid');
  grid.innerHTML = '';
  attractions.forEach(item => {
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

// Scroll to Top
const scrollBtn = document.getElementById('scrollTop');
window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};
scrollBtn.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ========== ADMIN DASHBOARD YA SIRI - MARA 5 ==========
let clickCount = 0;

// SIRI: Bonyeza Logo mara 5 inafunguka admin
document.getElementById('secretLogo').addEventListener('click', () => {
  clickCount++;
  if(clickCount === 5){
    document.getElementById('adminPanel').classList.remove('admin-hidden');
    clickCount = 0;
  }
  setTimeout(() => { clickCount = 0 }, 3000); // inareset baada ya sekunde 3
});

function checkPass(){
  const pass = document.getElementById('adminPass').value;
  // BADILI PASSWORD HAPA UKITAKA
  if(pass === "tanzania2026"){ 
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboardForm').style.display = 'block';
  } else {
    document.getElementById('adminError').innerText = "Password si sahihi!";
  }
}

function saveNew(){
  const title = document.getElementById('newTitle').value;
  const tag = document.getElementById('newTag').value;
  const img = document.getElementById('newImg').value;
  const desc = document.getElementById('newDesc').value;
  
  if(!title || !tag || !img || !desc) return alert("Tafadhali jaza sehemu zote!");
  
  const newCode = `{
  title: "${title}",
  tag: "${tag}",
  img: "${img}",
  desc: "${desc}"
},`;
  
  alert(`Nakili code hii uende ukaiweke kwenye 'attractions' kwenye script.js: \n\n${newCode}`);
  
  // Safisha form
  document.getElementById('newTitle').value = '';
  document.getElementById('newTag').value = '';
  document.getElementById('newImg').value = '';
  document.getElementById('newDesc').value = '';
}

function closeAdmin(){
  document.getElementById('adminPanel').classList.add('admin-hidden');
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('dashboardForm').style.display = 'none';
  document.getElementById('adminPass').value = '';
  document.getElementById('adminError').innerText = '';
}

// ANZISHA APP
document.addEventListener('DOMContentLoaded', loadAttractions);