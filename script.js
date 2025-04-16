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
    const ligne = document.createElement("div");
    ligne.style.display = "flex";
    ligne.style.justifyContent = "space-between";
    ligne.style.alignItems = "center";
    ligne.style.marginBottom = "8px";

    const paragraphe = document.createElement("p");
    paragraphe.textContent = texte;
    paragraphe.style.margin = "0";

    const bouton = document.createElement("button");
    bouton.textContent = "Supprimer";
    bouton.onclick = () => supprimerTexte(index);

    ligne.appendChild(paragraphe);
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

