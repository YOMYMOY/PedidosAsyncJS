const $ = (id) => document.getElementById(id);
const urlBase = "http://localhost:3031/api/movies/"

window.onload = async () => {

    let query = new URLSearchParams(location.search);

    let id = query.has('id') && query.get('id');

    try {
        let response = await fetch(urlBase + id);
        let pelicula = await response.json();
        let { title, awards, rating, length: duration, release_date } = pelicula.data;

        $('title').value = title;
        $('rating').value = rating;
        $('length').value = duration;
        $('awards').value = awards;
        $('release_date').value = moment(release_date).format('YYYY-MM-DD');
    } catch (error) {
        console.log(error);
    }

    $('editarBtn').addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(urlBase + 'update/' + id, {
                method: 'PUT',
                body: JSON.stringify({
                    title: $('title').value,
                    rating: $('rating').value,
                    length: $('length').value,
                    awards: $('awards').value,
                    release_date: $('release_date').value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let result = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    })

    $('crearBtn').addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(urlBase + 'create', {
                method: 'POST',
                body: JSON.stringify({
                    title: $('title').value,
                    rating: $('rating').value,
                    length: $('length').value,
                    awards: $('awards').value,
                    release_date: $('release_date').value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    });

    $('eliminarBtn').addEventListener('click', async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(urlBase + 'delete/' + id, {
                method : 'DELETE'
            })

            const result = await response.json();
            console.log(result);
            window.location.href = 'home.html';
        } catch (error) {
            console.log(error);
        }
    });
}