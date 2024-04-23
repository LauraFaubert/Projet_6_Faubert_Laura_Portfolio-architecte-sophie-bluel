let works
//// récupération de l'élément du DOM qui accueillera les photos
const divGallery = document.querySelector('.gallery');
//console.log(divGallery)
// Récupération des travaux depuis le back-end avec fetch

genererWork();
async function genererWork (){
    try{
        const response = await fetch('http://localhost:5678/api/works');

        if (!response.ok){
            throw new Error ('Erreur lors de la récupération des données');
        }
        const data = await response.json(); 
        works = data;

        console.log(works);

        creerGallery();

        } catch (error){
            console.error ('Une erreur s\'est produite',error);
        }
}



function creerGallery (){
    
    resetDivGallery();

        for (let i = 0; i < works.length; i++){
            const gallery = works[i];
            // Création d'une balise dédié à la photo
            const figureElement = document.createElement ("figure");
            figureElement.dataset.id = works[i].id;
            // Création des autres balises
            const imgElement = document.createElement("img");
            imgElement.src = gallery.imageUrl;
            const figcaptionElement = document.createElement ("figcaption");
            figcaptionElement.textContent = gallery.title;
    
            //ajout de img et figcaption à figure 
            figureElement.appendChild(imgElement);
            figureElement.appendChild (figcaptionElement);
    
            //ajout de figure à gallery
            divGallery.appendChild(figureElement);
    
        }

}

function resetDivGallery (){
    //Vider la gallery existante
    divGallery.innerHTML="";
}

