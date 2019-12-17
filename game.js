//main
/*-------------------------------------Alldeclaration-------------------------*/
var cnv = document.querySelector("#myc");
var ctx = cnv.getContext('2d')
var image = new Image();
var cols, rows;
var w = 50;
var grid = [];
var ballGrid = [];
var posx = 0;
var posy = 0;
var Score = 0;



/*-------------------------------------AllCalling-------------------------*/
setup();
createRock();
createDiamond();
draw();








/*-------------------------------------AllFunction-------------------------*/

//create 
function setup() {
    cnv.width = 1300;
    cnv.height = 600;
    cols = Math.floor(cnv.width / w);
    rows = Math.floor(cnv.height / w);
    for (var row = 0; row < rows; row++) {
        console.log("row num " + row);
        for (var col = 0; col < cols; col++) {

            var C = new Cell(col, row)
            grid.push(C);
            //console.log(col);


        }
    }

}
//function draw
function draw() {
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}

//constructure cell
function Cell(x, y, val = "grass.jpg")//1,0
{
    this.x = x;
    this.y = y;
    this.val = val;
    this.show = function () {
        var x = this.x * w;//100
        var y = this.y * w;//0
        // console.log(x + " " + y);
        //ctx.strokeRect(x,y,w,w);
        var image = new Image();
        image.src = val;
        if (x == 0 && y == 0) {
            image.src = 'emotion.jpg';
        }
        image.onload = function () {
            ctx.drawImage(image, x, y, w, w);
        }
        // ctx.drawImage(ii,x,y,w,w);
    }

}



//Append Rock
function createRock() {
    var rocksCount = 0;
    while (rocksCount < 18) {
        var ranRow = Math.floor(Math.random() * rows);
        var ranCol = Math.floor(Math.random() * cols);
        for (var i = 0; i < grid.length; i++) {
            if (grid[i].val == "grass.jpg" && grid[i].x == ranCol && grid[i].y == ranRow) {
                var C = new Cell(ranCol, ranRow, "rock.jpg");
                grid[i] = C;
                rocksCount++;
            }
        }


    }
}

//Append diamonds
function createDiamond() {
    var rocksCount = 0;
    while (rocksCount < 18) {
        var ranRow = Math.floor(Math.random() * rows);
        var ranCol = Math.floor(Math.random() * cols);
        console.log(ranRow, "    ", ranCol);
        for (var i = 0; i < grid.length; i++) {
            if (grid[i].val == "grass.jpg" && grid[i].x == ranCol && grid[i].y == ranRow) {
                var C = new Cell(ranCol, ranRow, "diamonds.jpg");
                grid[i] = C;
                rocksCount++;
            }
        }


    }

}

function searchCell(x, y) {
    for (var i = 0; i < grid.length; i++) {
        console.log(x + "," + y);
        if (grid[i].x == x && grid[i].y == y)
            return grid[i];
    }
    return null;
}

document.onkeydown = function (e) {//???????????????????
    key = e.keyCode;
    switch (key) {
        case 37://left
            if (posx > 0) {
                var image = new Image();
                console.log(posy)
                var nextCell = searchCell((posx - w) / w, posy / w);
                console.log(nextCell)
                if (nextCell) {


                    if (nextCell.val != "rock.jpg") {
                        ctx.fillRect(posx, posy, w, w);//???????????????????????????
                        posx -= w;
                        image.src = 'emotion.jpg';
                        image.onload = function () {
                            ctx.drawImage(image, posx, posy, w, w);
                        }
                    }

                    if (nextCell.val == "diamonds.jpg") {
                        Score++;
                    }


                }
            }

            break;
        case 38://up
            if (posy > 0) {
                var image = new Image();
                /////////
                var nextCell = searchCell(posx / w, (posy - w) / w);
                console.log(nextCell)
                if (nextCell) {


                    if (nextCell.val != "rock.jpg") {
                        ctx.fillRect(posx, posy, w, w);//???????????????????????????
                        posy -= w;
                        image.src = 'emotion.jpg';
                        image.onload = function () {
                            ctx.drawImage(image, posx, posy, w, w);
                        }
                    }

                    if (nextCell.val == "diamonds.jpg") {
                        Score++;
                    }


                }
            }
            break;
        case 39://right
            if (posx < cnv.width - w) {
                var image = new Image();//?????????????????????????????????
                ////////
                var nextCell = searchCell((posx + w) / w, posy / w);
                console.log(nextCell)
                if (nextCell) {


                    if (nextCell.val != "rock.jpg") {
                        ctx.fillRect(posx, posy, w, w);//???????????????????????????
                        posx += w;
                        image.src = 'emotion.jpg';
                        image.onload = function () {
                            ctx.drawImage(image, posx, posy, w, w);
                        }
                    }

                    if (nextCell.val == "diamonds.jpg") {
                        Score++;
                    }


                }
            }
            break;
        case 40://down
            if (posy < cnv.height - w) {
                var image = new Image();//?????????????????????????
                ///////////
                var nextCell = searchCell(posx / w, (posy + w) / w);
                console.log(nextCell)
                if (nextCell) {


                    if (nextCell.val != "rock.jpg") {
                        ctx.fillRect(posx, posy, w, w);//???????????????????????????
                        posy += w;
                        image.src = 'emotion.jpg';
                        image.onload = function () {
                            ctx.drawImage(image, posx, posy, w, w);
                        }
                    }

                    if (nextCell.val == "diamonds.jpg") {
                        Score++;
                    }


                }

            }


            break;
    }
    // canvas.width = canvas.width;
    // ctx.drawImage(img, x, y);


}
// Cell.prototype={

//     show:function()
//     {
//         var x=this.x*w;
//         var y=this.y*w;
//         ctx.strock()
//         ctx.rect(x,y,w,w);

//     }
// }
// window.onload = function() {
//     var c = document.getElementById("myCanvas");
//     var ctx = c.getContext("2d");
//     var img = document.getElementById("scream");
//     ctx.drawImage(img, 10, 10, 150, 180);
//   };


