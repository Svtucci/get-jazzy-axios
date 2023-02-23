console.log('script sourced');

function getArtists() {
    // Axios GET request
    axios.get('/artist').then((response) => {
        // Code that will run on successful response
        // from the server.
        console.log(response);
        // quotesFromServer will be an Array of quotes
        let quotesFromServer = response.data;
        let contentDiv = document.querySelector('#artistTableBody');
        contentDiv.innerHTML=''; //resets content div to clear out existing info so new additions don't cause duplicates of the old
        for(let artist of quotesFromServer) {
            contentDiv.innerHTML += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.born}</td>
                    <td>${artist.died}</td>
                </tr>
            `;
        }
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong.');
    }); // ALWAYS add .catch
}
// TODO Add ajax request for /songs and display on DOM
getArtists();

function getSongs() {
    axios.get('/songs').then((response) => {
        console.log(response); 
        let quotesFromServer = response.data;
        let contentDiv = document.querySelector('#songTableBody');
        contentDiv.innerHTML=''; //resets content div to clear out existing info so new additions don't cause duplicates of the old
        for(let song of quotesFromServer) {
            contentDiv.innerHTML += `
                <tr>
                   <td>${song.title}</td>
                   <td>${song.artist}</td>
                </tr>
            `
        }
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong.');
    }); 
};

getSongs();

function submitForm (event) { //start
    event.preventDefault(); 
    let artist = document.querySelector('#artistNameInput').value; 
    console.log('Input:', artist); 
    let artistForServer = {
        name: artist,  
    }; //end of the new object
//post = request type, /artist is url, artistForServer= data to send,   
axios.post('/artist', artistForServer).then((response) => {
    console.log(response);
    getArtists();
}).catch((error) => {
    console.log(error);
    alert('Something went wrong.');
});
} //end of submitForm function



  