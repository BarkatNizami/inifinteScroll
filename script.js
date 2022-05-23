const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
let count = 5;
const apiKey = 'EwmHwTOGvV8BxyeDtXnUi2mgviaxsmaZl1L7Lakbfhw';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; 

//Check if all images were loaded
function imageLoaded() {
     imagesLoaded++;
     if(imagesLoaded === totalImages) {
         ready = true;
         loader.hidden = true;
         count = 30;
     }
}

//Helper function to set Attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create displayPhotos method to display the photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each element in the array
    photosArray.forEach((photo) => {
      //Create <a> tag to link to Unsplash
      const item = document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
    })
      //Create <img> for photo
      const img = document.createElement('img');
      setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.user.bio,
        title: photo.user.bio, 
      });
      //EventListener, check when image has been loaded
      img.addEventListener('load', imageLoaded);
      //Put <img> inside <a>, then put them both inside imageContainer
      item.appendChild(img);
      imageContainer.appendChild(item);  
    });
}

//Get photos from Unsplash
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        
    }

} 

//Check to see if the scrollbar has reached bottom
window.addEventListener('scroll', () => {
   if((window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000) && ready) {
       ready = false;
       getPhotos();
   }
})

//OnLoad
getPhotos();