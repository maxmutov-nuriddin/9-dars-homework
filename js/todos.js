const todoInner = document.querySelector(".todo__inner")
const loader = document.querySelector('.wyre-cards')


const todos = new URLSearchParams(location.search).get("todos");

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


getData(`https://jsonplaceholder.typicode.com/todos?userId=${todos}`, (todo) => {
  loader.style = `display:none`
  todo.map((todos) => {
    todoInner.innerHTML += getUserRow(todos);
  });
});


function getUserRow(todos) {
  return `
<div class="card">
  <div class="user__box">
    <p>Id: ${todos.id}</p>
    <h3 class="user__name" style="margin-top:10px;">Title: ${todos.title}</h3>
    <p class="user__text" style="margin-top:10px;">Body: ${todos.completed ? "✅" : "❌"}</p>
  </div>
  <span class="top"></span>
  <span class="right"></span>
  <span class="bottom"></span>
  <span class="left"></span>
</div>
`;
}