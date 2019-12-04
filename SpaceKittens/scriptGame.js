let canvas = document.getElementById("game_container")
let ctx = canvas.getContext("2d")

let frame = new Image();
frame.src = "images/other/space.png"

// IMAGES START

let head_down = new Image();
head_down.src = "images/other/start_down.png"

let head_right = new Image();
head_right.src = "images/other/start_right.png"

let head_left = new Image();
head_left.src = "images/other/start_left.png"

let head_up = new Image();
head_up.src = "images/other/start_up.png"

let horizontal = new Image();
horizontal.src = "images/other/cat_horizontal.png"

let vertical = new Image();
vertical.src = "images/other/cat_vertical.png"

let down_right = new Image();
down_right.src = "images/other/down_right.png"

let down_left = new Image();
down_left.src = "images/other/down_left.png"

let up_left = new Image();
up_left.src = "images/other/up_left.png"

let up_right = new Image();
up_right.src = "images/other/up_right.png"

let end_down = new Image();
end_down.src = "images/other/end_down.png"

let end_left = new Image();
end_left.src = "images/other/end_left.png"

let end_right = new Image();
end_right.src = "images/other/end_right.png"

let end_up = new Image();
end_up.src = "images/other/end_up.png"

// IMAGES STOP

let clear = new Image()
clear.src="images/other/empty.png"

// catnip
let catnip = new Image()
catnip.src = "images/other/catnip.png"
let nip = {x:5, y:2}


let px = 5
let py = 5
let xv = 0
let yv = -1


let loop = setInterval(gameloop, 1000/5)

document.addEventListener('keydown', keyPush)


player_trail = [{x:px, y:py+2},{x:px, y:py+1}, {x:px, y:py}]


function keyPush(e)
{
    if (!keyThisTurn)
    {
        switch (e.keyCode)
        {
            case 37:
                if (xv == 0)
                {
                    xv = -1
                    yv = 0
                }
                break

            case 38:
                if (yv == 0)
                {
                    xv = 0
                    yv = -1
                }
                break

            case 39:
                if (xv == 0)
                {
                    xv = 1
                    yv = 0
                }
                break

            case 40:
                if (yv == 0)
                {
                    xv = 0
                    yv = 1
                }
                break
        }
        keyThisTurn = true
    }
}

var keyThisTurn = false

function gameloop()
{
    let extend = false

    px += xv
    py += yv

    px = (px+10)%10
    py = (py+10)%10

    if (px == nip.x && py == nip.y)
    {
        ctx.drawImage(clear, nip.x*50, nip.y*50)
        extend = true
        
        while (true)
        {
            let nx = Math.floor(Math.random()*10)
            let ny = Math.floor(Math.random()*10)

            let fits = true
            for (var x = 0; x < player_trail.length; x++)
            {
                if (player_trail[x].x == nx && player_trail[x].y == ny)
                {
                    fits = false
                }
            }

            if (fits)
            {
                nip.x = nx
                nip.y = ny
                break
            }
        }

        ctx.drawImage(catnip, nip.x*50, nip.y*50)
    }

    for (var x = 0; x < player_trail.length-1; x++)
    {

        if (player_trail[x].x == px && player_trail[x].y == py)
        {
            while (player_trail.length > 3)
            {
                ctx.drawImage(clear, player_trail[0].x*50, player_trail[0].y*50)
                player_trail.shift()
            }

        }
    }

    player_trail.push({x:px, y:py})
    // TESTING WHICH IMAGE TO SHOW

    // FRONT END
    let dx = px - player_trail[player_trail.length-2].x
    let dy = py - player_trail[player_trail.length-2].y

    if (dy == -1 || dy == 9)
    {
        ctx.drawImage(head_down, px*50, py*50)
    }
    else if (dy == 1 || dy == -9)
    {
        ctx.drawImage(head_up, px*50, py*50)
    }
    else if (dx == -1 || dx == 9)
    {
        ctx.drawImage(head_right, px*50, py*50)
    }
    else if (dx == 1 || dx == -9)
    {
        ctx.drawImage(head_left, px*50, py*50)
    }

    // SECOND THINGY
    let dx1 = player_trail[player_trail.length-2].x - player_trail[player_trail.length-3].x
    let dy1 = player_trail[player_trail.length-2].y - player_trail[player_trail.length-3].y

    if ((dx == 1 && dx1 == 1) || (dx == -1 && dx1 == -1) || (dx == 1 && dx1 == -9) || (dx == -1 && dx1 == 9) || (dx == 9 && dx1 == -1) || (dx == -9 && dx1 == 1))
    {
        ctx.drawImage(clear, player_trail[player_trail.length-2].x*50, player_trail[player_trail.length-2].y*50)
        ctx.drawImage(horizontal, player_trail[player_trail.length-2].x*50, player_trail[player_trail.length-2].y*50)
    }
    else if ((dy == 1 && dy1 == 1) || (dy == -1 && dy1 == -1) || (dy == 1 && dy1 == -9) || (dy == -1 && dy1 == 9) || (dy == 9 && dy1 == -1) || (dy == -9 && dy1 == 1))
    {
        ctx.drawImage(clear, player_trail[player_trail.length-2].x*50, player_trail[player_trail.length-2].y*50)
        ctx.drawImage(vertical, player_trail[player_trail.length-2].x*50, player_trail[player_trail.length-2].y*50)
    }
    else if (((dx == 1 || dx == -9) && (dy1 == -1 || dy1 == 9)) || ((dx1 == -1 || dx1 == 9) && (dy == 1 || dy == -9)))
    {
        ctx.drawImage(clear, player_trail[player_trail.length-2].x*50, player_trail[player_trail.length-2].y*50)
        ctx.drawImage(down_right, player_trail[player_trail.length-2].x*50, player_trail[player_trail.length-2].y*50)
    }
    else if (((dx == 1 || dx == -9) && (dy1 == 1 || dy1 == -9)) || ((dx1 == -1 || dx1 == 9) && (dy == -1 || dy == 9)))
    {
        ctx.drawImage(clear, player_trail[player_trail.length-2].x*50, player_trail[player_trail.length-2].y*50)
        ctx.drawImage(up_right, player_trail[player_trail.length-2].x*50, player_trail[player_trail.length-2].y*50)
    }
    else if (((dx == -1 || dx == 9) && (dy1 == -1 || dy1 == 9)) || ((dx1 == 1 || dx1 == -9) && (dy == 1 || dy == -9)))
    {
        ctx.drawImage(clear, player_trail[player_trail.length-2].x*50, player_trail[player_trail.length-2].y*50)
        ctx.drawImage(down_left, player_trail[player_trail.length-2].x*50, player_trail[player_trail.length-2].y*50)
    }
    else if (((dx == -1 || dx == 9) && (dy1 == 1 || dy1 == -9)) || ((dx1 == 1 || dx1 == -9) && (dy == -1 || dy == 9)))
    {
        ctx.drawImage(clear, player_trail[player_trail.length-2].x*50, player_trail[player_trail.length-2].y*50)
        ctx.drawImage(up_left, player_trail[player_trail.length-2].x*50, player_trail[player_trail.length-2].y*50)
    }

    // ctx.drawImage(frame, px*50, py*50)
    ctx.drawImage(clear, player_trail[0].x*50, player_trail[0].y*50)

    if (extend == false)
    {
        player_trail.shift()
    }

    // DRAW BUTT
    let dxl = player_trail[1].x - player_trail[0].x
    let dyl = player_trail[1].y - player_trail[0].y

    if (dxl == 1 || dxl == -9)
    {
        ctx.drawImage(clear, player_trail[0].x*50, player_trail[0].y*50)
        ctx.drawImage(end_right, player_trail[0].x*50, player_trail[0].y*50)
    }
    else if (dxl == -1 || dxl == 9)
    {
        ctx.drawImage(clear, player_trail[0].x*50, player_trail[0].y*50)
        ctx.drawImage(end_left, player_trail[0].x*50, player_trail[0].y*50)
    }
    else if (dyl == 1 || dyl == -9)
    {
        ctx.drawImage(clear, player_trail[0].x*50, player_trail[0].y*50)
        ctx.drawImage(end_down, player_trail[0].x*50, player_trail[0].y*50)
    }
    else if (dyl == -1 || dyl == 9)
    {
        ctx.drawImage(clear, player_trail[0].x*50, player_trail[0].y*50)
        ctx.drawImage(end_up, player_trail[0].x*50, player_trail[0].y*50)
    }

    keyThisTurn = false
}

window.onload = function() {
    ctx.drawImage(catnip, nip.x*50, nip.y*50)
}