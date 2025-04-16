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

    // Création du bouton "Effacer"
    const boutonEffacer = document.createElement("button");
    boutonEffacer.textContent = "Effacer";
    boutonEffacer.onclick = function() {
      effacerTexte(index); // Appelle la fonction pour effacer le texte spécifique
    };

    container.appendChild(paragraphe);
    container.appendChild(boutonEffacer);
  });
}

function effacerTexte(index) {
  let donnees = JSON.parse(localStorage.getItem("donnees")) || [];
  donnees.splice(index, 1); // Supprime l'élément à l'index donné
  localStorage.setItem("donnees", JSON.stringify(donnees));
  afficherDonnees(); // Réaffiche les données restantes
}


// Appelle l'affichage au chargement de la page
window.onload = afficherDonnees;

