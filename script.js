function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');

  const activeTab = document.getElementById(tabId);
  activeTab.style.display = 'block';
}

function ajouterTexte() {
  const texte = document.getElementById("zoneTexte").value;
  if (texte.trim() !== "") {
    let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
    donnees.push({ type: "text", content: texte });
    localStorage.setItem("donnees", JSON.stringify(donnees));
    afficherDonnees();
    document.getElementById("zoneTexte").value = "";
  }
}

function ajouterImage(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function(e) {
      let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
      donnees.push({ type: "image", content: e.target.result });
      localStorage.setItem("donnees", JSON.stringify(donnees));
      afficherDonnees();
    };
    reader.readAsDataURL(file);
  }
}

function afficherDonnees() {
  const container = document.getElementById("contenuAjoute");
  container.innerHTML = "";
  const donnees = JSON.parse(localStorage.getItem("donnees")) || [];

  donnees.forEach((element, index) => {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.style.marginBottom = "10px";
    div.style.borderBottom = "1px solid #ccc";
    div.style.paddingBottom = "5px";

    const contenu = document.createElement("div");
    contenu.style.flex = "1";

    if (element.type === "text") {
      const paragraphe = document.createElement("p");
      paragraphe.textContent = element.content;
      paragraphe.style.margin = "0";
      contenu.appendChild(paragraphe);
    } else if (element.type === "image") {
      const image = document.createElement("img");
      image.src = element.content;
      image.style.maxWidth = "200px";
      image.style.maxHeight = "150px";
      contenu.appendChild(image);
    }

    const btn = document.createElement("button");
    btn.textContent = "Supprimer";
    btn.onclick = () => supprimerElement(index);

    div.appendChild(contenu);
    div.appendChild(btn);
    container.appendChild(div);
  });
}

function supprimerElement(index) {
  let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
  donnees.splice(index, 1);
  localStorage.setItem("donnees", JSON.stringify(donnees));
  afficherDonnees();
}

function effacerDonnees() {
  localStorage.removeItem("donnees");
  afficherDonnees();
}

window.onload = afficherDonnees;
