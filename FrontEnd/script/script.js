// Récupération des travaux depuis le back-end avec fetch

async function genererWork (){
    try{
        const response = await fetch('http://localhost:5678/api/works');

        if (!response.ok){
            throw new Error ('Erreur lors de la récupération des données');
        }
        const works = await response.json(); 
        
        //console.log(works);

        creerGallery(works);
        creerFiltreBouttons(works);

        } catch (error){
            console.error ('Une erreur s\'est produite',error);
        }
}


//fonction pour créer la galerie des travaux
function creerGallery (works){
    const divGallery = document.querySelector('.gallery');
    
    supprimerDivGallery(divGallery);

    works.forEach(work => {
        const figureElement = document.createElement("figure");
        figureElement.dataset.id = work.id;

        const imgElement = document.createElement("img");
        imgElement.src = work.imageUrl;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.textContent = work.title;

        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);

        divGallery.appendChild(figureElement);
    });
}    
//Fonction pour supprimer la galerie existante
function supprimerDivGallery (divGallery){
    divGallery.innerHTML="";
}


//Fonction pour créer les boutons de filtre

async function creerFiltreBouttons(works){
    
    const divFilters = document.createElement ("div");
    divFilters.classList.add("filters")

    const boutonsNoms = ["Tous", "Objets","Appartements","Hotels & restaurants"];

    boutonsNoms.forEach((nom, index)=> {
        const categorieBouton = document.createElement ("button");
        categorieBouton.textContent = nom;
        divFilters.appendChild(categorieBouton);

        categorieBouton.addEventListener("click", () => {
            let categoryId = null;
            if (index > 0){
                categoryId = index;
            }
            filtreTravauxParCategories(works, categoryId);

            divFilters.querySelectorAll("button").forEach(button => {
                button.classList.remove("bouton_actif");
            });
            categorieBouton.classList.add("bouton_actif");
        });
    });
    // Insérez les boutons de filtre après le H2 de la section
    const h2Element = document.querySelector("#portfolio h2")
    h2Element.insertAdjacentElement("afterend", divFilters); 
}
// Fonction pour filtrer les travaux par catégorie
function filtreTravauxParCategories (works, categoryId){
    let filtreWorks;
    if (categoryId !== null){
        filtreWorks = works.filter (work => work.category.id === categoryId);
    }else{
        filtreWorks = works;
    }
    
    
    creerGallery(filtreWorks);
   
}


genererWork();