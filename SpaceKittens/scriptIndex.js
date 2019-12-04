var numOfImages = 19 // highest index image is number 18
var slideImage = Math.floor(Math.random() * (numOfImages))

var autoSlideshow = window.setInterval(autoSlide, 8000);
window.addEventListener('resize', sizeing)

function imageSlideshow(direction)
{
    slideImage += direction

    if (slideImage == numOfImages)
    {
        slideImage = 0
    }
    else if(slideImage < 0)
    {
        slideImage = numOfImages-1
    }

    changeImage(slideImage)

}

function sizeImage()
{
    document.getElementById("img_slideshow_image").style.setProperty('padding-top', "")

    let dH = document.getElementById("div_slideshow_image").clientHeight
    let dW = document.getElementById("div_slideshow_image").clientWidth

    document.getElementById("img_slideshow_image").style.setProperty('height', dH + "px")

    let iW = document.getElementById("img_slideshow_image").clientWidth

    if (iW > dW)
    {
        // console.log("Too wide")
        document.getElementById("img_slideshow_image").style.setProperty('width', dW*0.8 + "px")
        document.getElementById("img_slideshow_image").style.setProperty('height', "")
    }
    else
    {
        // console.log("Not too wide")
        document.getElementById("img_slideshow_image").style.setProperty('height', dH*0.8 + "px")
        document.getElementById("img_slideshow_image").style.setProperty('width', "")
    }
    
}

function changeImage(n)
{
    document.getElementById("img_slideshow_image").src = "images/cats/cat" + n + ".jpg"

    sizeImage()

    for (var x = -1; x < 2; x++)
    {
        document.getElementById("preview_" + (x+2)).src = "images/cats/cat" + (((n+x)+numOfImages)%numOfImages) + ".jpg"
    }

}


function autoSlide()
{
    imageSlideshow(1);
}

function sizeButtons()
{
    let dH = document.getElementById("div_slideshow_image").clientHeight
    
    let buttons = document.getElementsByClassName('img_control_arrow')
    for (var x = 0; x < buttons.length; x++)
    {
        buttons[x].style.setProperty('height', dH*0.1 + "px")
    }

    let bW = Number(window.getComputedStyle(document.getElementById("arrow_right")).width.split("px")[0])
    let dW = document.getElementById("div_slideshow_image").clientWidth


    document.getElementById("arrow_left").style.setProperty('margin-left', dW*0.1+"px")
    document.getElementById("arrow_right").style.setProperty('margin-left', (dW*0.9-bW)+"px")
}

function sizeing()
{
    sizeImage()
    sizeButtons()
    sizePreview()
}

function sizePreview()
{

    let previews = document.getElementsByClassName("img_mini_preview")
    let dH = document.getElementById("div_slideshow_image").clientHeight
    let dW = document.getElementById("div_slideshow_image").clientWidth

    for (var x = 0; x < previews.length; x++)
    {
        previews[x].style.setProperty('height', dH*0.1 + "px")
    }

    let pw1 = Number(window.getComputedStyle(document.getElementById("preview_1")).width.split("px")[0])
    let pw2 = Number(window.getComputedStyle(document.getElementById("preview_2")).width.split("px")[0])
    let pw3 = Number(window.getComputedStyle(document.getElementById("preview_3")).width.split("px")[0])

    let complete_width = pw1 + pw2 + pw3 + 2 * dW*0.1
    // console.log(complete_width + "," + dW)

    document.getElementById("preview_1").style.setProperty('margin-left', (dW-complete_width)/2 + "px")
    document.getElementById("preview_2").style.setProperty('margin-left', (dW-complete_width)/2 + pw1 + dW*0.1 + "px")
    document.getElementById("preview_3").style.setProperty('margin-left', (dW-complete_width)/2 + pw1 + pw2 + dW*0.2  + "px")
}


window.onload = function() {

    changeImage(slideImage)

    sizeButtons()

    document.getElementById("arrow_left")
    document.getElementById("arrow_right")

    this.sizePreview()

}