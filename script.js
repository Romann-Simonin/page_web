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

  donnees.forEach((item, index) => {
    const ligne = document.createElement("div");
    ligne.style.display = "flex";
    ligne.style.justifyContent = "space-between";
    ligne.style.alignItems = "center";
    ligne.style.marginBottom = "10px";

    const contenu = document.createElement("div");
    contenu.style.textAlign = "left";

    const paragraphe = document.createElement("p");
    paragraphe.textContent = item.texte;
    contenu.appendChild(paragraphe);

    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.style.maxWidth = "200px";
      img.style.marginTop = "5px";
      contenu.appendChild(img);
    }

    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.textContent = "Supprimer";
    boutonSupprimer.onclick = function () {
      supprimerDonnee(index);
    };

    ligne.appendChild(contenu);
    ligne.appendChild(boutonSupprimer);

    container.appendChild(ligne);
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


// Appelle l'affichage au chargement de la page
window.onload = afficherDonnees;

