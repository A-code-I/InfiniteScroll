const imgContainer=document.getElementById('Image-container');
const loader=document.getElementById('loader');

let photosArray=[];
// Unsplash API
const count=5;
const api_key='Ec9_2tLPsKQGvKrZ5Bwb81-jtKpupAwfNCXcqrpl8BU';
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${api_key}&count=${count}`;

// Display photos 
function displayPhotos(){
    // Run function for each objects in PhotoArray
    photosArray.forEach((photo) =>{
        // Creation of Anchor element to link to unsplash
        const anchorItem=document.createElement('a');
        anchorItem.setAttribute('href',photo.links.html);
        anchorItem.setAttribute('target','_blank');
        // Create <img>  for photo
        const img=document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        // Put <img> inside <a> and put both inside image container
        anchorItem.appendChild(img);
        imgContainer.appendChild(anchorItem);      
    })
}
//Fetching photos from Splash API
async function getPhotos(){
    try {
        const response=await fetch(apiUrl);
        photosArray= await response.json();
        
        displayPhotos();
    } catch (error) {
        // catches error 
    }
}

//On Load
getPhotos();