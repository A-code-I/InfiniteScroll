const imgContainer=document.getElementById('Image-container');
const loader=document.getElementById('loader');

let photosArray=[];
// Unsplash API
const count=30;
const topic='church';
const collections='Jesus';
const api_key='pzUppk1cHNzwwbjdYs7lZo5QjZqh0VXIe_XreLfEI44';
// const api_key='Ec9_2tLPsKQGvKrZ5Bwb81-jtKpupAwfNCXcqrpl8BU';
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${api_key}&collections=${collections}&topics=${topic}&count=${count}`;

// Helper function to setAttributes on DOM Elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
// Display photos 
function displayPhotos(){
    // Run function for each objects in PhotoArray
    photosArray.forEach((photo) =>{
        // Creation of Anchor element to link to unsplash
        const anchorItem=document.createElement('a');
        setAttributes(anchorItem,{
            href:photo.links.html,
            target:'_blank',
        });
        // Create <img>  for photo
        const img=document.createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });
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

// check to see if scroilling near bottom of page ,load mor photos
window.addEventListener('scroll', ()=> {
    if(window.innerHeight+window.scrollY>document.body.offsetHeight-1000){
        getPhotos();
        console.log("load more");
    }
})
//On Load
getPhotos();
