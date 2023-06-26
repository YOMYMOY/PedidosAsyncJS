const $ = (id) => document.getElementById(id);
const urlBase = "http://localhost:3031/api/movies/"

window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  try {
    // Aqui debemos agregar nuestro fetch
    let response = await fetch(urlBase);
    let peliculas = await response.json();

    

    /* * Codigo que debemos usar para mostrar los datos en el frontend */
    let data = peliculas.data;

    const favoriteMovies = getFavoriteMoviesFromLocalStorage();
    data = data.filter(movie => favoriteMovies.includes(movie.id));

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      const a = document.createElement("a");
        a.setAttribute("href", "formulario.html?id=" + movie.id);
        a.setAttribute("class", "botonAgregar");
        card.appendChild(a); 
        const aText = document.createTextNode("Ver más")
        a.appendChild(aText);

        const star = document.createElement('a');
        star.setAttribute('class', 'botonAgregar');
        star.setAttribute('id', 'movie' + movie.id)
        card.appendChild(star);
        checkFavoriteMovies(movie.id, star);

        star.addEventListener('click', () => {
          if (star.innerHTML === '<i class="fa-regular fa-star"></i>') {
            star.innerHTML = '<i class="fa-solid fa-star"></i>';
            saveMovieToLocalStorage(movie.id);
          } else {
            star.innerHTML = '<i class="fa-regular fa-star"></i>';
            removeMovieFromLocalStorage(movie.id);
          }
        }) 
    });

    function saveMovieToLocalStorage(movieId) {
      const favoriteMovies = getFavoriteMoviesFromLocalStorage();
      favoriteMovies.push(movieId);
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    }
    
    function removeMovieFromLocalStorage(movieId) {
      const favoriteMovies = getFavoriteMoviesFromLocalStorage();
      const index = favoriteMovies.indexOf(movieId);
      if (index > -1) {
        favoriteMovies.splice(index, 1);
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
      }
    }

    function getFavoriteMoviesFromLocalStorage() {
      const favoriteMovies = localStorage.getItem('favoriteMovies');
      return favoriteMovies ? JSON.parse(favoriteMovies) : [];
    }

    function checkFavoriteMovies(movieId, starElement) {
      const favoriteMovies = getFavoriteMoviesFromLocalStorage();
      const isFavorite = favoriteMovies.includes(movieId);
    
      if (isFavorite) {
        starElement.innerHTML = '<i class="fa-solid fa-star"></i>';
      } else {
        starElement.innerHTML = '<i class="fa-regular fa-star"></i>';
      }
    }

  } catch (error) {
    console.log(error);
  }



};
