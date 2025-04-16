function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');

  const activeTab = document.getElementById(tabId);
  activeTab.style.display = 'block';
}

function ajouterTexte() {
  const texte = document.getElementById("zoneTexte").value;
  const fichierImage = document.getElementById("imageFile").files[0];

  const lecteur = new FileReader();

  lecteur.onload = function (event) {
    const imageDataUrl = event.target.result;
    const nouvelleEntree = { texte: texte, image: imageDataUrl };

    let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
    donnees.push(nouvelleEntree);
    localStorage.setItem("donnees", JSON.stringify(donnees));

    afficherDonnees();

    document.getElementById("zoneTexte").value = "";
    document.getElementById("imageFile").value = "";
  };

  if (fichierImage) {
    lecteur.readAsDataURL(fichierImage); // Lit l’image en base64
  } else {
    const nouvelleEntree = { texte: texte, image: null };

    let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
    donnees.push(nouvelleEntree);
    localStorage.setItem("donnees", JSON.stringify(donnees));

    afficherDonnees();
    document.getElementById("zoneTexte").value = "";
    document.getElementById("imageFile").value = "";
  }
}

function sauvegarderDonnee(texte, imageData) {
  let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
  donnees.push({ texte, imageURL: imageData });
  localStorage.setItem("donnees", JSON.stringify(donnees));
  afficherDonnees();
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

    if (element.type === "text") {
      const paragraphe = document.createElement("p");
      paragraphe.textContent = element.content;
      div.appendChild(paragraphe);
    } else if (element.type === "image") {
      const image = document.createElement("img");
      image.src = element.content;
      image.style.maxWidth = "200px";
      image.style.maxHeight = "150px";
      div.appendChild(image);
    }

    const btn = document.createElement("button");
    btn.textContent = "Supprimer";
    btn.onclick = () => supprimerElement(index);
    div.appendChild(btn);

    container.appendChild(div);
  });
}

// Fonction pour supprimer un texte spécifique
function supprimerTexte(index) {
  let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
  donnees.splice(index, 1); // Enlève l'élément à l'index donné
  localStorage.setItem("donnees", JSON.stringify(donnees));
  afficherDonnees(); // Recharge l'affichage
}

function effacerDonnees() {
  localStorage.removeItem("donnees"); // Supprime toutes les données
  afficherDonnees(); // Réactualise l'affichage (qui sera vide)
}

function supprimerElement(index) {
  let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
  donnees.splice(index, 1);
  localStorage.setItem("donnees", JSON.stringify(donnees));
  afficherDonnees();
}

// Appelle l'affichage au chargement de la page
window.onload = afficherDonnees;

