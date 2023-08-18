const commentsInner = document.querySelector(".comments__inner")
const loader = document.querySelector('.wyre-cards')


const comments = new URLSearchParams(location.search).get("comments");

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


getData(`https://jsonplaceholder.typicode.com/comments?userId=${comments}`, (commemt) => {
  loader.style = `display:none`
  commemt.map((commemts) => {
    commentsInner.innerHTML += getUserRow(commemts);
  });
});


function getUserRow(commemts) {
  return `
<div class="card">
  <div class="user__box">
    <p>Id: ${commemts.id}</p>
    <h3 class="user__name" style="margin-top:10px;">Title: ${commemts.name}</h3>
    <p class="user__name" style="margin-top:10px;">Email:<a href="#">${commemts.email}</a></p>
    <p class="user__name" style="margin-top:10px;">Body: ${commemts.body}</p>
  </div>
  <span class="top"></span>
  <span class="right"></span>
  <span class="bottom"></span>
  <span class="left"></span>
</div>
`;
}