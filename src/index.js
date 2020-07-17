let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form

    

    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block"
      console.log(toyFormContainer)
      toyFormContainer.addEventListener('submit', (e) => postNewToy(e))
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // const toyForm = document.querySelector('#add-toy-form')
  

  loadToys();
});

function loadToys () {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(json => renderToys(json))
}

function renderToys (json) {
  const toyContainer = document.querySelector("#toy-collection")

  // console.log(json)

  json.forEach( toy => {
    let div = document.createElement("div")
    let h2 = document.createElement("h2")
    let img = document.createElement("img")
    let p = document.createElement("p")
    div.className = "card"
    h2.innerHTML = toy.name
    img.className = "toy-avatar"
    img.src = toy.image
    p.innerHTML = `Likes: ${toy.likes}`
    
    let btn = document.createElement("button")
    btn.className = "like-btn"
    btn.addEventListener("click", (e) => {
      event.preventDefault()
      incrementLikes(e, toy)
    })

    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(btn)

    toyContainer.appendChild(div)
    
  })
}
function incrementLikes(e, toy) {

  toy.likes ++
  console.log(toy.likes)
    
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method:'PATCH',
    headers: {
      'Content-Type':'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({likes: toy.likes})
  })
}

function postNewToy(e) {
  e.preventDefault()

  console.log(e.target.name.value)
  console.log(e.target.image.value)

  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
 
    body: JSON.stringify({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    })
  })
}