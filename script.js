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
    // Créer un paragraphe pour chaque donnée
    const paragraphe = document.createElement("p");
    paragraphe.textContent = texte;

    // Créer un bouton de suppression
    const boutonSuppression = document.createElement("button");
    boutonSuppression.textContent = "Supprimer";
    boutonSuppression.onclick = () => supprimerTexte(index);

    // Ajouter le paragraphe et le bouton dans le container
    container.appendChild(paragraphe);
    container.appendChild(boutonSuppression);
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

