
const UNSPLASH_API_KEY = "yaui-N0sgYnBww8h-qrbFjCp8V4oT-bBZ8YXLD44LVs";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;
const body = document.querySelector("body");
const locationContainer = document.querySelector(".js-location span");


function loadBg() {
  const savedImage = localStorage.getItem("bg");
  if (savedImage === null) {
    getBg();
  } else {
    const parsedImage = JSON.parse(savedImage);
    const today = new Date();
    if (today > parsedImage.expiresOn) {
      getBg();
    } else {
      body.style.backgroundImage = ` url(${parsedImage.url})`;

      locationContainer.innerHTML = `${parsedImage.name}`;
    }
  } return;
}


function saveBg(imageUrl, city, country, name) {
  const savedImage = localStorage.getItem("bg");
  if (savedImage !== null) {
    localStorage.removeItem("bg");
  }
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);

  const imageObject = {
    url: imageUrl,
    expiresOn: expirationDate,
    city,
    country,
    name
  };
  localStorage.setItem("bg", JSON.stringify(imageObject));
  loadBg();
  return;
}



function getBg() {
  fetch(UNSPLASH_URL)
    .then(response => response.json())
    .then(json => {
      const image = json;
      if (image.urls && image.urls.full && image.location) {
        const fullUrl = image.urls.full;
        const location = image.location;
        const city = location.city;
        const country = location.country;
        const name = location.name;
        saveBg(fullUrl, city, country, name);
      } else {
        getBg();
      }

    }); return;
}


function init() {
  loadBg();
  return;
}

init();

