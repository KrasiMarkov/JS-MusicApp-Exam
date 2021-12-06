import { getByName } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


let isLogged = false;

const searchTemplate = (onSearch) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    
</section>`;

const afterSearchTemplate = (albums, onSearch) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <div class="search-result">

        ${albums.length == 0 
                ? html`<p class="no-result">No result.</p>`
                : albums.map(itemCard)}

    </div>
</section>`;

const itemCard = (album) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        
        ${isLogged
            ?html`        
            <div class="btn-group">
                <a href="/details/${album._id}" id="details">Details</a>
            </div>`
            : null}

    </div>
</div>`

export async function searchPage(ctx) {      
    ctx.render(searchTemplate(onSearch));

    async function onSearch() {
        const query = document.querySelector("#search-input").value;
        if(query == '') {
            return alert('Please enter a name!');
        }
        const albums = await getByName(query);

        const userData = getUserData();
        isLogged = userData != null;
        ctx.render(afterSearchTemplate(albums, onSearch));
    }    
}