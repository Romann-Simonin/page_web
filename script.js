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
  container.innerHTML = ""; // Vide la zone avant d'afficher les données

  const donnees = JSON.parse(localStorage.getItem("donnees")) || [];

  donnees.forEach((texte, index) => {
    // Créer un conteneur pour le texte et le bouton
    const donneesContainer = document.createElement("div");
    donneesContainer.className = "donnees-container";

    // Créer un paragraphe pour chaque donnée
    const paragraphe = document.createElement("p");
    paragraphe.textContent = texte;

    // Créer un bouton de suppression
    const boutonSuppression = document.createElement("button");
    boutonSuppression.textContent = "Supprimer";
    boutonSuppression.onclick = () => supprimerTexte(index);

    // Ajouter le paragraphe et le bouton dans le conteneur
    donneesContainer.appendChild(paragraphe);
    donneesContainer.appendChild(boutonSuppression);

    // Ajouter le conteneur dans le container principal
    container.appendChild(donneesContainer);
  });
}


// Fonction pour supprimer un texte spécifique
function supprimerTexte(index) {
  let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
  donnees.splice(index, 1); // Supprimer l'élément à l'index spécifié
  localStorage.setItem("donnees", JSON.stringify(donnees)); // Mettre à jour le localStorage
  afficherDonnees(); // Réafficher les données après suppression
}



// Appelle l'affichage au chargement de la page
window.onload = afficherDonnees;

