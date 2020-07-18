let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', (e) => postToy(e))
    } else {
      toyFormContainer.style.display = "none";
    }
  });


const fetchToys = () => {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(json => json.forEach(toy => assignCard(toy)))

}
 fetchToys();

 const assignCard = (toy) => {
  const toyCollect = document.getElementById('toy-collection')
   let card = document.createElement('div')
   card.className = 'card'
   card.id = toy.id
   card.innerHTML = `
    <h2> ${toy.name} </h2>
    <img src='${toy.image}' class="toy-avatar"/>
    <p> ${toy.likes} Likes </p>
    <button class="like-btn"> Like ♥ </button>
    </div>
   `
  toyCollect.appendChild(card)
  
  let btn = document.getElementById(toy.id)
  btn.addEventListener('click', (e) => {
    e.preventDefault
    incrementLikes(e, toy)
  })
 }

 const postToy = (e) => {
  e.preventDefault()
   fetch('http://localhost:3000/toys',{
      method:'POST',
      headers: {
        'Content-Type':'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    })
    })
  }

function incrementLikes(e, toy) {
  toy.likes ++
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method:'PATCH',
    headers: {
      'Content-Type':'application/json',
      Accept: 'application/json'
    },
  body: JSON.stringify({likes: toy.likes})
  })
  .then(res => res.json())
  .then(json => {
    let currentToy = document.getElementById(json.id)
    let p = currentToy.querySelector('p')
    p.textContent = `${json.likes} Likes `
  })
}