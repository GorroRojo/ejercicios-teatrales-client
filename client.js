const form = document.querySelector('.ejercicio-form');
const loadingElement = document.querySelector('.loading');
const ejerciciosElement = document.querySelector('.ejercicios');
const API_URL = 'http://localhost:5000/ejercicios'


listAllEjercicios();

function listAllEjercicios() {
  loadingElement.style.display = "block";
  fetch(API_URL)
    .then(response => response.json())
    .then(array => array.reverse())
    .then(ejercicios => {
      ejercicios.forEach(ejercicio => {
        const div = document.createElement('div');

        const header = document.createElement('h3');
        header.textContent = ejercicio.name;

        const contents = document.createElement('p');
        contents.textContent = ejercicio.content;

        const date = document.createElement('p');
        date.className = "fecha";
        date.textContent = new Date(ejercicio.created);

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);
        ejerciciosElement.appendChild(div);
      })

    });
  loadingElement.style.display = "none";

}

form.addEventListener('submit', (event) => {
  ejerciciosElement.innerHTML = '';
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");

  const ejercicio = {
    name,
    content
  }
  const ejerciciojson = JSON.stringify(ejercicio);
  form.style.display = "none";
  loadingElement.style.display = "block";

  fetch(API_URL, {
      method: 'POST',
      body: ejerciciojson,
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())
    .then(ej => {
      form.reset();
      form.style.display = '';
      listAllEjercicios();
    });
});