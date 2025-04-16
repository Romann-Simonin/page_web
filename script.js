function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');

  const activeTab = document.getElementById(tabId);
  activeTab.style.display = 'block';
}


function ajouterTexte() {
  const texte = document.getElementById("zoneTexte").value.trim();
  const imageInput = document.getElementById("imageFile");
  const file = imageInput.files[0];

  if (!texte && !file) return; // rien à ajouter

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result;

      sauvegarderDonnee(texte, imageData);
    };
    reader.readAsDataURL(file);
  } else {
    sauvegarderDonnee(texte, null);
  }

  // Reset les champs
  document.getElementById("zoneTexte").value = "";
  document.getElementById("imageFile").value = "";
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
    ligne.style.marginBottom = "12px";

    const contenu = document.createElement("div");
    contenu.style.textAlign = "left";

    if (item.texte) {
      const paragraphe = document.createElement("p");
      paragraphe.textContent = item.texte;
      paragraphe.style.margin = "0";
      contenu.appendChild(paragraphe);
    }

    if (item.imageURL) {
      const image = document.createElement("img");
      image.src = item.imageURL;
      image.alt = "Image ajoutée";
      image.style.maxWidth = "200px";
      image.style.marginTop = "5px";
      contenu.appendChild(image);
    }

    const bouton = document.createElement("button");
    bouton.textContent = "Supprimer";
    bouton.onclick = () => supprimerTexte(index);

    ligne.appendChild(contenu);
    ligne.appendChild(bouton);
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



// Appelle l'affichage au chargement de la page
window.onload = afficherDonnees;

