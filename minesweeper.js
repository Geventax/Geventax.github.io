var grid = [];
var bombs = [];
var uncovered = [];
var marked = [];
var difficulty = 40;
var gh = 24;
var gw = 18;
var status = "defuse";

function makeGrid()
{
    var htmlInput = $("#wrapper").html();
    for (var y = 1; y <= gh; y++)
    {
        grid.push([]);
        for (var x = 1; x <= gw; x++)
        {
            grid[y-1].push(0);
            htmlInput += "<div class='block' id='" + x + "x" + y + "' style='margin-left:" + (x-1)*20 + "px; margin-top:" + (y-1)*20 + "px;'></div>";
        }
    }

    $("#wrapper").html(htmlInput);

};

function uncover(x, y)
{
    if (countBombs(x,y) == 0 && !(uncovered.includes(x + "x" + y)))
    {
        uncovered.push(x + "x" + y);
        $("#" + Number(x+1) + "x" + Number(y+1)).css("background-color", "white");

        if (x != 0) {uncover(Number(x-1),y); label(Number(x-1),y);}
        if (x != gw-1) {uncover(Number(x+1), y); label(Number(x+1),y);}
        if (y != 0) {uncover(x, Number(y-1)); label(x, Number(y-1));}
        if (y != gh-1) {uncover(x, Number(y+1));  label(x, Number(y+1));}
    }
}

function generateBombs()
{

    for (var i = 0; i < difficulty; i++)
    {
        while (true)
        {
            var xb = Math.floor(Math.random() * gw);
            var yb = Math.floor(Math.random() * gh);

            if (grid[yb][xb] != 10)
            {
                grid[yb][xb] = 10;
                bombs.push(Number(Number(xb)+1) + "x" + Number(Number(yb)+1));
                break;
            }
        }

    }

};

function showBombs()
{
    for (var i = 0; i < difficulty; i++)
    {
        $("#" + bombs[i]).css("background-color", "red");
    }
}

function labelGrid()
{
    for (var y = 0; y < gh; y++)
    {
        for (var x = 0; x < gw; x++)
        {
            bobs = 0;
            if (grid[y][x] != 10)
            {
                bobs = countBombs(x,y);
            }

            if (bobs != 0)
            {
                $("#" + Number(x+1) + "x" + Number(y+1)).html("<img src='./images/" + bobs + ".png'>");
            }
        }
    }
}

function label(x, y)
{
    bobs = 0;
    if (grid[y][x] != 10)
    {
        bobs = countBombs(x,y);
    }

    if (bobs != 0)
    {
        var id = "#" + Number(x+1) + "x" + Number(y+1);
        $(id).html("<img src='./images/" + bobs + ".png'>");
        $(id).addClass("uncovered");
        $(id).removeClass("block");
    }
    else
    {
        uncover(x, y);
    }
}

function countBombs(x, y)
{
    var amountOfBombs = 0;

    // left
    if (x != 0){if (grid[y][x-1] == 10){amountOfBombs++;}};

    // right
    if (x != gw-1){if (grid[y][x+1] == 10){amountOfBombs++;}};
    
    // top
    if (y != 0){if (grid[y-1][x] == 10){amountOfBombs++;}};

    // bottom
    if (y != gh-1){if (grid[y+1][x] == 10){amountOfBombs++;}};

    // top left
    if (x != 0 && y != 0){if (grid[y-1][x-1] == 10){amountOfBombs++;}};

    // top right
    if (x != gw-1 && y != 0){if (grid[y-1][x+1] == 10){amountOfBombs++;}};

    // bottom left
    if (x != 0 && y != gh-1){if (grid[y+1][x-1] == 10){amountOfBombs++;}};

    // bottom right
    if (x != gw-1 && y != gh-1){if (grid[y+1][x+1] == 10){amountOfBombs++;}};

    return amountOfBombs;
}

function toggleDefuseMark()
{
    if (status == "defuse")
    {
        status = "marking";
        $("#status").html("<img src='./images/mark.png' alt='Marking mode'>");
    }
    else
    {
        status = "defuse";
        $("#status").html("<img src='./images/defuse.png' alt='Defusing mode'>");
    }
}

function update()
{
    $("#counter").html(difficulty);
}


window.onload = function(){
    makeGrid();

    generateBombs();
    // showBombs();
    $("#counter").html(difficulty);

    $(".block").on("click", function(e)
    {

        switch (e.which)
        {
            case 1:
                coords = e.target.id
                console.log(coords);
                xc = coords.split("x")[0] - 1;
                yc = coords.split("x")[1] - 1;
        

                // defusing / uncovering
                if (status == "defuse")
                {
                    if (! marked.includes(coords))
                    {
                        if (grid[yc][xc] != 10)
                        {
                            label(xc, yc);
                        }
                        else
                        {
                            showBombs();
                            alert("u r kill");
                            location.reload();
                        }
                    }
                    
                }
                // marking spots
                else
                {
                    // marking
                    if (! marked.includes(coords))
                    {
                        difficulty--;
                        marked.push(coords);
                        $("#" + coords).html("<img src='./images/markedBomb.png' id='" + coords + "'>");
                    }
                    // unmarking
                    else
                    {
                        difficulty++;
                        marked.splice(marked.indexOf(coords), 1);
                        $("#" + coords).html("");
                        $("#" + coords).addClass("block");
                        $("#" + coords).removeClass("uncovered");
                    }
                    update();

                    if (difficulty == 0)
                    {
                        var done = "yes";
                        for (var i = 0; i < bombs.length; i++)
                        {
                            if (! marked.includes(bombs[i]))
                            {
                                done = "no";
                                break;
                            }
                        }

                        // COMPLETED
                        if (done == "yes")
                        {
                            alert("u r god");
                            location.reload();
                        }
                    }
                    
                }

                break;
            
            default:
                alert("y");
        }

        
    });

    $("#status").on("click", function()
    {
        toggleDefuseMark();
    });
};