let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
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
document.addEventListener('DOMContentLoaded', function() {
  const toyCollection = document.getElementById('toy-collection');
  
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const name = document.createElement('h2');
        name.textContent = toy.name;
        
        const image = document.createElement('img');
        image.classList.add('toy-avatar');
        image.src = toy.image;
        
        const likes = document.createElement('p');
        likes.textContent = `${toy.likes} Likes`;
        
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-btn');
        likeButton.id = toy.id;
        likeButton.textContent = 'Like ❤️';
        likeButton.addEventListener('click', () => increaseLikes(toy, likes));
        
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(likes);
        card.appendChild(likeButton);
        toyCollection.appendChild(card);
      });
    })
    .catch(error => console.error('Error fetching toys:', error));
});
document.addEventListener('DOMContentLoaded', function() {
  const toyForm = document.querySelector('.add-toy-form');
  
  toyForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = event.target.name.value;
    const image = event.target.image.value;
    
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
    })
    .then(response => response.json())
    .then(newToy => {
      // Create card for the new toy and append it to the toy collection
      const card = document.createElement('div');
      // ... similar to the card creation in Challenge 1
      // ... make sure to add the necessary elements and event listener for the 'Like' button
      toyCollection.appendChild(card);
      // Reset the form fields
      event.target.reset();
    })
    .catch(error => console.error('Error adding a new toy:', error));
  });
});
function increaseLikes(toy, likesElement) {
  const newLikes = toy.likes + 1;
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      likes: newLikes
    })
  })
  .then(response => response.json())
  .then(updatedToy => {
    likesElement.textContent = `${updatedToy.likes} Likes`;
  })
  .catch(error => console.error('Error updating toy likes:', error));
}
