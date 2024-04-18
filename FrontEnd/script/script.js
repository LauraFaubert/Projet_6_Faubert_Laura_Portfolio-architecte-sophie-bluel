

// Récupération des travaux depuis le back-end avec fetch

async function getWork (){

    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();
}

getWork();




function genererWorks (works) {
    for (let i = 0; i < works.lenght; i++){
        const gallery = works[i];

        // récupération de l'élément du DOM qui accueillera les photos
        const divGallery = document.querySelector('.gallery');
        //console.log(divGallery)
        //Vider la gallery existante
        divGallery.innerHTML="";
        // Création d'une balise dédié à la photo
        const figureElement = document.createElement ("figure");
        figureElement.dataset.id = works[i].id;
        // Création des autres balises
        const imgElement = document.createElement("img");
        imgElement.src = gallery.imageUrl;
        const figcaptionElement = document.createElement ("figcaption");
        figcaptionElement.src = gallery.title;

        //ajout de img et figcaption à figure 
        figureElement.appendChild(imgElement);
        figureElement.appendChild (figcaptionElement);

        //ajout de figure à gallery
        gallery.appendChild(figureElement);

    }
}
genererWorks();

