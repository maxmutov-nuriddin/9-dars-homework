const photosInner = document.querySelector(".photos__inner")
const loader = document.querySelector('.wyre-cards')


const photo = new URLSearchParams(location.search).get("photo");

loader.style = `display:block`

function getData(url, callback) {
  let xhr = new XMLHttpRequest();


  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let resJson = xhr.response;
      let res = JSON.parse(resJson);
      callback?.(res);
    } else if (xhr.readyState === 4) {
      console.log(xhr.statusText);
    }
  };

  xhr.open("get", url);

  xhr.send();
}


getData(`https://jsonplaceholder.typicode.com/photos?albumId=${photo}`, (photos) => {
  loader.style = `display:none`
  photos.map((photo) => {
    photosInner.innerHTML += getUserRow(photo);
  });
});


function getUserRow(photo) {
  return `
<div class="card">
  <div class="user__box">
    <p>Id: ${photo.id}</p>
    <h3 class="user__name" style="margin-top:10px;">Title: ${photo.title}</h3>
    <img src="${photo.url}" width="250" height="100" style="margin-top:10px;">
  </div>
  <span class="top"></span>
  <span class="right"></span>
  <span class="bottom"></span>
  <span class="left"></span>
</div>
`;
}