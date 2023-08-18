const userInner = document.querySelector('.user__inner')
const on = document.querySelector('.on')
const center = document.querySelector('.center')
const loader = document.querySelector('.wyre-cards')

on.addEventListener('click', () => {
  center.classList.toggle('on__off')
})

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


getData("https://jsonplaceholder.typicode.com/users", (users) => {
  loader.style = `display:none`
  users.map((user) => {
    userInner.innerHTML += getUserRow(user);
  });
});


function getUserRow(user) {
  return `
<div class="card">
  <div class="user__box">
    <p>Id: ${user.id}</p>
    <h3 class="user__name">Name: ${user.name}</h3>
    <h3 class="user__username">Name: ${user.username}</h3>
    <p class="user__text">Email:<a href="#"> ${user.email}</a></p>
    <p class="user__text">Email:<a href="#"> ${user.phone}</a></p>
  </div>
  <span class="top"></span>
  <span class="right"></span>
  <span class="bottom"></span>
  <span class="left"></span>
  <div class="all__btn">
    <a href="todos.html?todos=${user.id}" class="btn btn__todo">Todos</a>
    <a href="posts.html?posts=${user.id}" class="btn btn__post">Posts</a>
    <a href="album.html?album=${user.id}" class="btn btn__albums">Albums</a>
</div>
</div>
`;
}