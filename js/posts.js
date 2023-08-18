const postsInner = document.querySelector(".post__inner")
const loader = document.querySelector('.wyre-cards')


const posts = new URLSearchParams(location.search).get("posts");

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


getData(`https://jsonplaceholder.typicode.com/posts?userId=${posts}`, (post) => {
  loader.style = `display:none`
  post.map((posts) => {
    postsInner.innerHTML += getUserRow(posts);
  });
});


function getUserRow(posts) {
  return `
<div class="card">
  <div class="user__box">
    <p>Id: ${posts.id}</p>
    <h3 class="user__name" style="margin-top:10px;">Title: ${posts.title}</h3>
    <p class="user__text" style="margin-top:10px;">Body:${posts.body}</p>
  </div>
  <span class="top"></span>
  <span class="right"></span>
  <span class="bottom"></span>
  <span class="left"></span>
  <a href="commetns.html?comment=${posts.id}" class="btn btn__todo">Comments</a>
</div>
`;
}