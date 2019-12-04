var numOfImages = 19;

let vh = document.getElementById("vh_div").clientHeight

function populate(order, height)
{
    
    for (var x = order; Math.abs(x) <= numOfImages; x += order)
    {

        let num = (((x - Math.round(0.5 + 0.25*order))+numOfImages)%numOfImages)
        let adjustedX = Math.abs((x + (-1*order)))

        if (adjustedX % 4 == 0 && adjustedX != 0)
        {
            document.getElementById("gallery_container").innerHTML += `
            
            <div class="image_spacer"></div>

            `
        }

        

        // console.log(num + ", " + adjustedX);
        // HERE IS THE IMAGE CONTAINER <div class="image_container"></div>

        document.getElementById("gallery_container").innerHTML += `<img id="`+(Math.abs(x)-1)+`" src="images/cats/cat`+num+`.jpg">`

    }

    scaling(height)

    spacing(height)
}

function scaling(height)
{

    for (var x = 0; x < numOfImages; x++)
    {
        let catImage = document.getElementById(x)
        catImage.style.setProperty('height', height + 'vh')

        let natHeight = catImage.naturalHeight
        let natWidth = catImage.naturalWidth
        let ratio = natHeight / natWidth

        let cWidth = height / ratio
        
        catImage.style.setProperty('width', cWidth + 'vh')
    }
}

function spacing(height)
{
    for (var x = 0; x < numOfImages; x++)
    {
        if (x % 4 == 0 && x != 0)
        {

            let sumofWidths = 0
            for (var i = 0; i < 4; i++) {sumofWidths += document.getElementById(x-4+i).clientWidth}
            // console.log(sumofWidths);

            let delta = document.getElementById("gallery_container").clientWidth - sumofWidths
            
            // if (delta < 0)
            // {
            //     // FUCK THIS JUST MAKE A MOBILE VERSION MEDIA QUERY
            // }

            for (var i = 1; i < 4; i++)
            {
                document.getElementById(x-4+i).style.setProperty('margin-left', delta/3 - 9 + 'px')
            }
        }

    }
}


window.addEventListener('resize', spacing)

window.onload = function() {
    let gallery_ok = localStorage.getItem("gallery")

    if (gallery_ok == null)
    {
        localStorage.setItem("gallery", "corrected")
        window.location.reload(false)
    }
}

populate(1, 20)