function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');

  const activeTab = document.getElementById(tabId);
  activeTab.style.display = 'block';
}

function ajouterTexte() {
  const texte = document.getElementById("zoneTexte").value;
  const imageFile = document.getElementById("imageFile").files[0];

  if (texte.trim() !== "") {
    let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
    let newData = { type: 'text', content: texte };
    donnees.push(newData);
    localStorage.setItem("donnees", JSON.stringify(donnees));
  }

  if (imageFile) {
    const reader = new FileReader();
    reader.onloadend = function () {
      let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
      let newData = { type: 'image', content: reader.result };
      donnees.push(newData);
      localStorage.setItem("donnees", JSON.stringify(donnees));
    }
    reader.readAsDataURL(imageFile);
  }

  afficherDonnees();
  document.getElementById("zoneTexte").value = "";
  document.getElementById("imageFile").value = "";
}

function afficherDonnees() {
  const container = document.getElementById("contenuAjoute");
  container.innerHTML = "";
  const donnees = JSON.parse(localStorage.getItem("donnees")) || [];

  donnees.forEach(data => {
    if (data.type === 'text') {
      const paragraphe = document.createElement("p");
      paragraphe.textContent = data.content;
      container.appendChild(paragraphe);
    }

    if (data.type === 'image') {
      const img = document.createElement("img");
      img.src = data.content;
      img.style.maxWidth = "200px"; // Limite la taille de l'image
      container.appendChild(img);
    }

    // Création du bouton pour supprimer chaque élément
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.onclick = function () {
      supprimerElement(data);
    };
    container.appendChild(deleteButton);
  });
}

function supprimerElement(dataToRemove) {
  let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
  donnees = donnees.filter(data => data !== dataToRemove);
  localStorage.setItem("donnees", JSON.stringify(donnees));
  afficherDonnees(); // Met à jour l'affichage
}

function effacerDonnees() {
  localStorage.removeItem("donnees");
  afficherDonnees();
}

// Appel au chargement de la page pour afficher les données sauvegardées
window.onload = afficherDonnees;

