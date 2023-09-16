const imgContainer=document.getElementById('Image-container');
const loader=document.getElementById('loader');

let photosArray=[];

let ready=true;
let imgLoaded=0;
let totalImages=0;

// Unsplash API
const count=30;
const reduiredQuery='jesus,bible verses,faith bible'
// const queryWithExclusion = reduiredQuery + ' -hindu';
const contentFilter = 'high'; // You can adjust this value as needed

// const api_key='HD9nnO1thKkhfDmKIRRj-dRDjvxs5fHYHodqC6ftgg4';  //slow tes2
const api_key='pzUppk1cHNzwwbjdYs7lZo5QjZqh0VXIe_XreLfEI44';
// const api_key='Ec9_2tLPsKQGvKrZ5Bwb81-jtKpupAwfNCXcqrpl8BU';
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${api_key}&query=${reduiredQuery}&count=${count}&content_filter=${contentFilter}`;

// Check if all images were loaded
function imageLoaded(){
    imgLoaded++;
    // console.log(imgLoaded);
    if (imgLoaded===totalImages){
        ready=true;
        loader.hidden=true;
        // console.log('ready=',ready);
    }
}


// Helper function to setAttributes on DOM Elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
// Display photos 
function displayPhotos(){
    imgLoaded=0;
    totalImages=photosArray.length;
    // console.log("Total Images =",totalImages);
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

        // Event listener to check when each is finished loading 
        img.addEventListener('load',imageLoaded);
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
    if(window.innerHeight+window.scrollY>document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();
    }
})
//On Load
getPhotos();
