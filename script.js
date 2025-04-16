function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');

  const activeTab = document.getElementById(tabId);
  activeTab.style.display = 'block';
}
function ajouterTexte() {
  console.log("Fonction Ajouter déclenchée");  // Ajoute ceci pour tester
  const texte = document.getElementById("zoneTexte").value;
  if (texte.trim() !== "") {
    let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
    donnees.push(texte);
    localStorage.setItem("donnees", JSON.stringify(donnees));
    afficherDonnees();
    document.getElementById("zoneTexte").value = "";
  }
}


function afficherDonnees() {
  const container = document.getElementById("contenuAjoute");
  container.innerHTML = "";
  const donnees = JSON.parse(localStorage.getItem("donnees")) || [];

  donnees.forEach((texte, index) => {
    const paragraphe = document.createElement("p");
    paragraphe.textContent = texte;

    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.textContent = "Supprimer";
    boutonSupprimer.onclick = () => supprimerTexte(index); // Passer l'index pour supprimer ce texte

    paragraphe.appendChild(boutonSupprimer);
    container.appendChild(paragraphe);
  });
}

function supprimerTexte(index) {
  let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
  donnees.splice(index, 1); // Enlève le texte à l'index spécifié
  localStorage.setItem("donnees", JSON.stringify(donnees));
  afficherDonnees(); // Actualise l'affichage des données
}


// Appelle l'affichage au chargement de la page
window.onload = afficherDonnees;

