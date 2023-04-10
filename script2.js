const profs =[
  {
    id: 1,
    nom: "Sukuna",
    semaine: "",
    modules: [1, 2, 3],
    plannings: [[], [], [], []],
  },
  {
    id: 2,
    nom: "Aly",
    semaine: "",
    modules: [6, 2, 3],
    plannings: [[], [], [], []],
  },
  {
    id: 3,
    nom: "Wane",
    semaine: "",
    modules: [4, 3, 5],
    plannings: [[], [], [], []],
  },
  {
    id: 4,
    nom: "Gojo",
    semaine: "",
    modules: [1, 4, 3],
    plannings: [[], [], [], []],
  },
  {
    id: 5,
    nom: "Itachi",
    semaine: "",
    modules: [1, 3],
    plannings: [[], [], [], []],
  },
];

const modules =[
  { id: 1, nom: "Javascript", semaine: "", plannings: [[], [], [], []] },
  { id: 2, nom: "Python", semaine: "", plannings: [[], [], [], []] },
  { id: 3, nom: "Java", semaine: "", plannings: [[], [], [], []] },
  { id: 4, nom: "PHP", semaine: "", plannings: [[], [], [], []] },
  { id: 5, nom: "Angular", semaine: "", plannings: [[], [], [], []] },
  { id: 6, nom: "React", semaine: "", plannings: [[], [], [], []] },
];

const classes =  [
  {
    id: 1,
    nom: "DevWeb",
    semaine: "",
    plannings: [[], [], [], []],
    effectif: 30,
  },
  { id: 2, nom: "Gl", semaine: "", plannings: [[], [], [], []], effectif: 29 },
  {
    id: 3,
    nom: "Devops",
    semaine: "",
    plannings: [[], [], [], []],
    effectif: 50,
  },
  {
    id: 4,
    nom: "Hackeuse",
    semaine: "",
    plannings: [[], [], [], []],
    effectif: 10,
  },
];

const salles = [
  { id: 1, nom: "101", semaine: "", plannings: [[], [], [], []], effectif: 30 },
  { id: 2, nom: "102", semaine: "", plannings: [[], [], [], []], effectif: 29 },
  { id: 3, nom: "103", semaine: "", plannings: [[], [], [], []], effectif: 50 },
  { id: 4, nom: "104", semaine: "", plannings: [[], [], [], []], effectif: 10 },
];
document.body.innerHTML = loadData("emploi")? loadData("emploi") : document.body.innerHTML;
const boxes = document.querySelectorAll(".box");
const selection = document.querySelector(".selection");
const plus = document.querySelectorAll(".iconeday");
const modal = document.querySelector(".modal-container");
const cancelModal = document.querySelector(".cancel-btn");
const slider = document.querySelector(".slider");
const btnToggle = document.querySelector("#btoggle");
const rightContain = document.querySelector(".right");
const leftContain = document.querySelector(".left");
const lundi = document.querySelector("#day_1");
const mardi = document.querySelector("#day_2");
const mercredi = document.querySelector("#day_3");
const jeudi = document.querySelector("#day_4");
const vendredi = document.querySelector("#day_5");
const samedi = document.querySelector("#day_6");
const dimanche = document.querySelector("#day_7");
const searching = document.querySelector(".search");
const planningTitle = document.querySelector(".num-planning");
let nbcours = document.querySelector(".nbcours");
let currentDay;
let numberPlanning = 0;
// chargement des données
function chargerSelect(data, select, label = "Selectionner") {
  select.innerHTML = "";
  const option = creatingElement("option");
  option.innerHTML = label;
  select.appendChild(option);
  data.forEach((d) => {
    const option = creatingElement("option");
    option.innerHTML = d.nom;
    select.appendChild(option);
  });
}
function creatingElement(elName) {
  return document.createElement(elName);
}
function loadData(key) {
  return (localStorage.getItem(key));
}
function saveData(key, data) {
  localStorage.setItem(key, data);
}
boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    boxes.forEach((b) => {
      b.style.backgroundColor = "";
    });
    const boxTitle = box.classList;
    if (boxTitle.contains("classroom")) {
      chargerSelect(salles, selection, "selectionner une salle");
      box.style.backgroundColor = "green";
    }

    if (boxTitle.contains("course")) {
      chargerSelect(modules, selection, "selectionner  un cours");
      box.style.backgroundColor = "orange";
    }

    if (boxTitle.contains("teacher")) {
      chargerSelect(profs, selection, "selectionner  un prof");
      box.style.backgroundColor = "rgb(106, 106, 251)";
    }

    if (boxTitle.contains("module")) {
      chargerSelect(classes, selection, "selectionner  une classe");
      box.style.backgroundColor = "red";
    }
  });
});

function showModal(e) {
  modal.classList.toggle("active");
  let target = e.target;
  currentDay = target.getAttribute("data-day");
}
plus.forEach((p) => {
  p.addEventListener("click", showModal);
});
cancelModal.addEventListener("click", showModal);
//function de remplissage des select de la modal
chargerSelect(modules, document.querySelector(".select1"));
chargerSelect(profs, document.querySelector(".select3"));
chargerSelect(salles, document.querySelector(".select2"));
chargerSelect(classes, document.querySelector(".select6"));
//fonction pour generer les heures de la modal
function generateHours() {
  const select = document.querySelector(".select4");
  select.innerHTML = "";
  for (let i = 8; i < 18; i++) {
    const option = creatingElement("option");
    option.innerHTML = i;
    select.appendChild(option);
  }
  const select5 = document.querySelector(".select5");
  select5.innerHTML = "";
  for (let i = 9; i < 18; i++) {
    const option = creatingElement("option");
    option.innerHTML = i;
    select5.appendChild(option);
  }
}
generateHours();
function generatePlanning(jour, color) {
  let module = document.querySelector(".select1").value;
  let prof = document.querySelector(".select3").value;
  let salle = document.querySelector(".select2").value;
  let classe = document.querySelector(".select6").value;
  if(module == "Selectionner" || prof == "Selectionner" || salle == "Selectionner" || classe == "Selectionner"){
    alert("Veuillez remplir tous les champs");
    return;
  }
  // Vérifier si la salle est disponible
  for (let i = 0; i < classes.length; i++) {
    for (let j = 0; j < salles.length; j++) {
      if (classes[i].nom == classe && salles[j].nom == salle) {
        if (classes[i].effectif > salles[j].effectif) {
          alert("l'effectif de la salle est inferieur a celui de la classe");
          return;
        }
      }
    }
  }
  const select4 = document.querySelector(".select4");
  const debut = select4.value;
  const select5 = document.querySelector(".select5");
  const fin = select5.value;
  const duree = fin - debut;
  const column = debut - 8;

  // Vérifier si la plage horaire est valide
  if (duree <= 0) {
    alert("La plage horaire sélectionnée est invalide.");
    return;
  }

  // Vérifier si l'heure est déjà occupée
  const divs = jour.querySelectorAll("div");
  for (let i = 0; i < divs.length; i++) {
    const marginLeft = divs[i].style.marginLeft;
    const width = divs[i].style.width;
    const divDebut = parseInt(marginLeft) / 11 + 8;
    const divFin = divDebut + parseInt(width) / 150;
    if (debut >= divDebut && debut < divFin) {
      alert("L'heure est déjà occupée.");
      return;
    }
  }

  // Créer l'élément
  const div = creatingElement("div");
  div.style.backgroundColor = color;
  div.style.width = `${duree * 11}%`;
  div.style.position = "absolute";
  div.style.height = "100%";
  div.style.marginLeft = `${column * 11}%`;
  div.style.fontWeight = "bold";
  div.style.fontSize = "20px";
  div.style.borderRadius = "20px";
  div.style.textAlign = "center";
  div.innerHTML = `<p>${module}</p><p>${prof}</p><p>${salle}</p> <span><i class="fa-solid fa-xmark"></i></span>`;
  jour.appendChild(div);
  let close = div.querySelector("span");
  close.addEventListener("click",removeModule);
  saveData("emploi", document.body.innerHTML);
}

function addByAttribute() {
  if (currentDay == "1") {
    generatePlanning(lundi, "purple");
  } else if (currentDay == "2") {
    generatePlanning(mardi, "blue");
  } else if (currentDay == "3") {
    generatePlanning(mercredi, "green");
  } else if (currentDay == "4") {
    generatePlanning(jeudi, "yellow");
  } else if (currentDay == "5") {
    generatePlanning(vendredi, "orange");
  } else if (currentDay == "6") {
    generatePlanning(samedi, "pink");
  } else if (currentDay == "7") {
    generatePlanning(dimanche, "red");
  }
  modal.classList.remove("active");
}
document.querySelector(".add-btn").addEventListener("click", addByAttribute);
let isFlexStar = true;
function slideRight() {
  if (isFlexStar) {
    btnToggle.style.justifyContent = "flex-end";
    btnToggle.style.backgroundColor = "black";
    slider.style.backgroundColor = "white";
    rightContain.style.backgroundColor = "pink";
    leftContain.style.backgroundColor = "pink";
    isFlexStar = false;
  } else {
    btnToggle.style.justifyContent = "flex-start";
    btnToggle.style.backgroundColor = "white";
    slider.style.backgroundColor = "black";
    rightContain.style.backgroundColor = "rgb(37, 36, 36)";
    leftContain.style.backgroundColor = "rgb(68, 68, 68)";
    isFlexStar = true;
  }
}
btnToggle.addEventListener("click", slideRight);
//gerer la fonction de recherche au saisie de l'utilisateur
function search() {
  const query = searching.value.toLowerCase().trim();
  const allDays = [lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche];

  allDays.forEach((day) => {
    const divs = day.querySelectorAll("div");
    divs.forEach((div) => {
      const text = div.textContent.toLowerCase();
      if (text.includes(query)) {
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    });
  });
}
searching.addEventListener("input", search);
function showPlanning(e) {
  const selectedOption = e.target.options[e.target.selectedIndex];
    planningTitle.innerHTML = selectedOption.text;
    if (selectedOption.text == "selectionner un cours" || selectedOption.text == "selectionner un prof" || selectedOption.text == "selectionner une salle" || selectedOption.text == "selectionner une classe") {
      planningTitle.innerHTML = "Emploi du temps";
    }
    const query = selectedOption.text.toLowerCase().trim();
  const allDays = [lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche];
  allDays.forEach((day) => {
    const divs = day.querySelectorAll("div");
    divs.forEach((div) => {
      const text = div.textContent.toLowerCase();
      if (text.includes(query)) {
        div.style.display = "block";
      } else if(query == "selectionner un cours" || query == "selectionner un prof" || query == "selectionner une salle" || query == "selectionner une classe") {
        div.style.display = "block";
      }
      else {
        div.style.display = "none";
      }
    });
  });
}
selection.addEventListener("change", showPlanning);
function removeModule(e) {
  e.target.parentElement.parentElement.remove();
  saveData("emploi", document.body.innerHTML);
}
