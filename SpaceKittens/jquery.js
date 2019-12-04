


//  HERE GOES STUFF FOR LOADING THE SITE

function get(id) {return document.getElementById(id);}


function load() {
    get("div_gameboard").innerHTML = "<div id='gameboard'><img src='board.jpg'></div>";
}

function s(thing) {

    return Number(thing.slice(0, thing.length-2));

}




//  GAME MECHANICS


function loadData() {
    
    var opponent;

    $.post()


}










// function align() {

//     var ww = window.innerWidth;
//     var dw = s($("#wrapper").css("width"));

//     var t = (ww-dw)/2 + "px";

//     console.log(t);

//     $("#wrapper").css("margin-left",t);
// }




window.onload = load();
