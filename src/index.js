// const addBtn = document.querySelector("#new-toy-btn");
// const toyFormContainer = document.querySelector(".container");
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  // console.log("%cDOM is loaded", "color :purple")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => {

      let toysHTML = toys.map(function(toy){
        return `
        <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button data-id="${toy.id}"class="like-btn">Like <3</button>
        <button data-id="${toy.id}"class="delete-btn">GONE!</button>
      </div>
      `
      })
      toyCollection .innerHTML += toysHTML.join('')
    })

    toyFormContainer.addEventListener ("submit", function(event) {
      event.preventDefault()
      console.log(event.target.name)

      const toyName = event.target.name.value
      const toyImage = event.target.image.value

      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: toyName,
          image: toyImage,
          likes: 99
        })
      })

      .then( response => response.json())
      .then( newToy => {

        let newToyHTML = `
        <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes} Likes </p>
        <button data-id="${newToy.id}" class="like-btn">Like <3</button>
        <button data-id="${newToy.id}"class="delete-btn">GONE!</button>
      </div>
      `

      toyCollection.innerHTML += newToyHTML
          console.log(event.target.reset())
      })

    })

    toyCollection.addEventListener("click", (event) => {
      if (event.target.className === "like-btn") {

      let currentLikes = parseInt(event.target.previousElementSibling.innerText)
      let newLikes = currentLikes + 1
      event.target.previousElementSibling.innerText = newLikes + " Likes"

      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
      }

      if (event.target.className === "delete-btn"){
        fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
          method: "DELETE"
        })
        .then(response => {
          event.target.parentElement.remove()
        })
      }
    })


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
