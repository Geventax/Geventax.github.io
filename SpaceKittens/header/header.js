var header_data = `<div id="top_header">
<h1 id="title">SpaceKittens v3.1</h1>
</div>

<header>
<div id="home_div" onclick="redirect('index.html')">
    <h2 id="home">Home</h2>
</div>

<div id="gallery_div" onclick="redirect('gallery.html')">
    <h2 id="gallery">Gallery</h2>
</div>

<div id="game_div" onclick="redirect('game.html')">
    <h2 id="game">Cat</h2>
</div>

</header>`;


document.getElementById("wrapper").innerHTML = header_data + document.getElementById("wrapper").innerHTML;

if (document.getElementById("home_page") != null) {document.getElementById("home_div").classList.add("current")}
else if (document.getElementById("gallery_page") != null) {document.getElementById("gallery_div").classList.add("current")}
else if (document.getElementById("game_page") != null) {document.getElementById("game_div").classList.add("current")}

function redirect(location)
{
    window.location.href = location;
}