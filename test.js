//main
/*-------------------------------------Alldeclaration-------------------------*/
var cnv = document.querySelector("#myc");
var ctx = cnv.getContext('2d')
var image = new Image();
var image1 = new Image();
var cols, rows;
var w = 50;
var grid = [];
var ballGrid = [];
var posx = w;
var posy = w;
var Score = 0;
var s1 = new sound("attachDiamond.m4a");



/*-------------------------------------AllCalling-------------------------*/
setup();
createRock();
createDiamond();
createBlock();
draw();

/*-------------------------------------AllFunction-------------------------*/

//create 
function setup() {
    // cnv.width = 1300;
    // cnv.height = 600;
    cnv.width = innerWidth - (innerWidth % w);
    cnv.height = (innerHeight * 2) - ((innerHeight * 2) % w);
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
        console.log("show");
        console.log(this.val);
        var x = this.x * w;//100
        var y = this.y * w;//0
        var image = new Image();
        image.src = this.val;//==========================edit
        if (x == posx && y == posy) {//=====================edit
            this.val = 'emotion.jpg'
            image.src = 'emotion.jpg';
        }
        image.onload = function () {
            ctx.drawImage(image, x, y, w, w);
        }
        // ctx.drawImage(ii,x,y,w,w);
    }

}


function createBlock() {
    for (var i = 0; i < grid.length; i++) {
        if (grid[i].x == 0) {

            grid[i].val = "block.jpg";
        }
        else if (grid[i].y == 0 && grid[i].x != 0) {

            grid[i].val = "block.jpg";
        }
        else if (grid[i].x == cols - 1) {

            grid[i].val = "block.jpg";
        }
        else if (grid[i].y == rows - 1) {

            grid[i].val = "block.jpg";
        }
    }
}

//Append Rock
function createRock() {
    var rocksCount = 0;
    while (rocksCount < 43) {
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
    while (rocksCount < 43) {
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
        // console.log(x + "," + y);
        if (grid[i].x == x && grid[i].y == y)
            return grid[i];
    }
    return null;
}

function editCell(x, y, newSrc) {
    for (var i = 0; i < grid.length; i++) {
        console.log(x + "," + y);

        if (grid[i].x == x && grid[i].y == y) {
            grid[i].val = newSrc;
            console.log("edit");
            console.log(grid[i].val)
        }
        //console.log(grid[i]);
    }


}

function changeRock(up, position) {
    console.log("inside");
    console.log(up.val);
    console.log("end");
    var flag = true;
    if (up.val == "rock.jpg") {
        up.val = "black.jpg";
        ctx.fillRect(up.x * w, up.y * w, w, w);
        prevY = up.y - 1;
        var allPrev = [];
        while (prevY > 1 && flag) {
            var nCell = searchCell(up.x, prevY);
            if (nCell.val == "rock.jpg") {
                allPrev.push(nCell);
                nCell.val = "black.jpg";
                ctx.fillRect(nCell.x * w, nCell.y * w, w, w);
            }
            else { flag = false; }
            prevY = prevY - 1;
        }
        var stopF = true;
        var nextY = position.y + 1;
        console.log(nextY);
        while (nextY < rows && stopF) {
            var nCell = searchCell(up.x, nextY);
            if (nCell.val == "black.jpg") {
                position = nCell;
            }
            else { stopF = false; }
            nextY = nextY + 1;
        }
        position.val = "rock.jpg";
        position.show();
        for (var j = 0; j < allPrev.length; j++) {
            var rockN = searchCell(position.x, position.y - j - 1);
            rockN.val = "rock.jpg";
            rockN.show();
        }


    }

}
function rockAnimation(rockCell)//rock
{
    var dy = rockCell.y * w;
    var count = 0;
    var downrockCell = rockCell;
    rockCell.val = "black.jpg";
    // ctx.fillRect(rockCell.x * w, rockCell.y * w, w, w);


    // var handler = setInterval(function () {


    //     ctx.fillRect(rockCell.x * w, dy, w, w);
    //     dy = dy + (w / 2);
    //     var image = new Image();
    //     image.src = 'rock.jpg';
    //     image.onload = function () {
    //         console.log("drawRock");
    //         ctx.drawImage(image, rockCell.x * w, dy, w, w);
    //     }
    //     count++;
    //     if (count > 1) {
    //         downrockCell = searchCell(downrockCell.x, downrockCell.y + 2);
    //         console.log("out cond");
    //         console.log("set interval");
    //         console.log(downrockCell.val);
    //         if (downrockCell.val != "black.jpg") {
    //             console.log("set interval");
    //             console.log(downrockCell.val);
    //             clearInterval(handler);
    //             var downrockCell2 = searchCell(downrockCell.x, downrockCell.y - 1);
    //             downrockCell2.val = "rock.jpg";
    //         }
    //         else count = 0;

    //     }


    // }, 200)
    var Interval = function () {
        ctx.fillRect(rockCell.x * w, (dy - w), w, w);
        dy = dy + (w / 2);
        count++;
        if (count > 1) {
            downrockCell = searchCell(downrockCell.x, downrockCell.y + 1);
            var downrockCellROCK = searchCell(downrockCell.x, downrockCell.y);
            if (downrockCell.val != "black.jpg") {
                console.log("Out iterval");
                console.log(downrockCell.val);
                //downrockCell.val = "rock.jpg";


            }
            else {
                count = 0;
                console.log("continue");
                window.setTimeout(Interval, 200);
            }

        }
        else window.setTimeout(Interval, 200);
        var cell = new Cell(downrockCell.x, (dy / w) - 1);
        cell.val = "rock.jpg";
        cell.show();

    }

    window.setTimeout(Interval, 200);


}

document.onkeydown = function (e) {//???????????????????
    key = e.keyCode;

    switch (key) {
        case 37://left
            if (posx > w) {
                console.log(image1);
                var image = new Image();
                //console.log(posy)
                var previousCell = searchCell((posx - w) / w, posy / w);
                var beforePreviousCell = searchCell((posx - w - w) / w, posy / w);
                var underBeforePreviousCell = searchCell((posx - w - w) / w, (posy + w) / w);

                var upCell = searchCell(posx / w, (posy - w) / w);
                var position = searchCell(posx / w, posy / w);

                console.log("previousCell")
                console.log(previousCell)
                //console.log(previousCell)
                if (previousCell) {


                    if (previousCell.val != "rock.jpg") {
                        if (previousCell.val == "diamonds.jpg") {
                            // var s = new sound("attachDiamond.m4a");
                            console.log(s1);
                            s1.stop();
                            s1.play();
                            Score++;
                        }
                        else {
                            //s = new sound("move.m4a");
                            console.log(s1);
                            s1.src = "move.m4a";
                            s1.stop();
                            s1.play();

                        }

                        ctx.fillRect(posx, posy, w, w);
                        editCell(posx / w, posy / w, "black.jpg");
                        posx -= w;
                        previousCell.val = 'emotion.jpg';
                        image.src = 'emotion.jpg';
                        image.onload = function () {
                            ctx.drawImage(image, posx, posy, w, w);
                        }
                        changeRock(upCell, position);

                    }

                    else if (beforePreviousCell.val == "black.jpg") {

                        editCell(posx / w, posy / w, "black.jpg");
                        ctx.fillRect(posx, posy, w, w);
                        posx -= w;
                        previousCell.val = 'emotion.jpg';
                        image.src = 'emotion.jpg';
                        image.onload = function () {
                            ctx.drawImage(image, posx, posy, w, w);
                        }
                        previousCell.val = "rock.jpg"
                        //afterNext.show();

                        changeRock(previousCell, underBeforePreviousCell);

                    }






                }
            }

            break;
        case 38://up
            console.log("upppp");
            if (posy > w) {
                var image = new Image();
                /////////
                var upCell = searchCell(posx / w, (posy - w) / w);
                console.log("upCell")
                console.log(upCell)
                if (upCell) {


                    if (upCell.val != "rock.jpg") {

                        //sound

                        if (upCell.val == "diamonds.jpg") {
                            var s = new sound("attachDiamond.m4a");
                            s.play();
                            Score++;
                        }
                        else {
                            var s = new sound("move.m4a");
                            s.play();

                        }
                        //sound

                        ctx.fillRect(posx, posy, w, w);//???????????????????????????
                        editCell(posx / w, posy / w, "black.jpg");

                        posy -= w;
                        upCell.val = 'emotion.jpg';
                        image.src = 'emotion.jpg';
                        image.onload = function () {
                            ctx.drawImage(image, posx, posy, w, w);
                        }
                    }

                    if (upCell.val == "diamonds.jpg") {
                        Score++;
                    }


                }
            }
            break;
        case 39://right
            if (posx < cnv.width - w - w) {
                var image = new Image();//?????????????????????????????????
                ////////
                var nextCell = searchCell((posx + w) / w, posy / w);
                var upCell = searchCell(posx / w, (posy - w) / w);
                var position = searchCell(posx / w, posy / w);
                var afterNext = searchCell((posx + w + w) / w, posy / w);
                var underAfterNext = searchCell((posx + w + w) / w, (posy + w) / w);


                if (nextCell) {
                    console.log("Right");
                    console.log(position.val);
                    console.log(nextCell.val);
                    console.log(afterNext.val);


                    if (nextCell.val != "rock.jpg") {


                        //sound

                        if (nextCell.val == "diamonds.jpg") {
                            var s = new sound("attachDiamond.m4a");
                            s.play();
                            Score++;
                        }
                        else {
                            var s = new sound("move.m4a");
                            s.play();

                        }
                        //sound
                        editCell(posx / w, posy / w, "black.jpg");
                        ctx.fillRect(posx, posy, w, w);

                        posx += w;
                        image.src = 'emotion.jpg';
                        nextCell.val = 'emotion.jpg';
                        image.onload = function () {
                            ctx.drawImage(image, posx, posy, w, w);
                        }
                        changeRock(upCell, position);
                    }


                    else if (afterNext.val == "black.jpg") {

                        editCell(posx / w, posy / w, "black.jpg");
                        ctx.fillRect(posx, posy, w, w);
                        posx += w;
                        image.src = 'emotion.jpg';
                        nextCell.val = 'emotion.jpg';
                        image.onload = function () {
                            ctx.drawImage(image, posx, posy, w, w);
                        }

                        afterNext.val = "rock.jpg"
                        //afterNext.show();

                        changeRock(afterNext, underAfterNext);

                    }


                    if (nextCell.val == "diamonds.jpg") {
                        Score++;
                    }


                }
            }
            break;
        case 40://down
            if (posy < cnv.height - w - w) {
                var image = new Image();//?????????????????????????
                ///////////
                var cellUp = searchCell(posx / w, (posy - w) / w);
                var position = searchCell(posx / w, posy / w);
                var downCell = searchCell(posx / w, (posy + w) / w);
                // console.log(nextCell)
                if (downCell) {


                    if (downCell.val != "rock.jpg") {

                        //sound

                        if (downCell.val == "diamonds.jpg") {
                            var s = new sound("attachDiamond.m4a");
                            s.play();
                            Score++;
                        }
                        else {
                            var s = new sound("move.m4a");
                            s.play();

                        }
                        //sound
                        editCell(posx / w, posy / w, "black.jpg");

                        ctx.fillRect(posx, posy, w, w);//???????????????????????????
                        posy += w;
                        image.src = 'emotion.jpg';
                        downCell.val = 'emotion.jpg';
                        image.onload = function () {
                            ctx.drawImage(image, posx, posy, w, w);
                        }
                        console.log("upcell");
                        console.log(cellUp.val)
                        if (cellUp && cellUp.val == 'rock.jpg') {
                            console.log("anim")
                            rockAnimation(cellUp);
                        }
                    }

                    if (downCell.val == "diamonds.jpg") {
                        Score++;
                    }


                }


            }


            break;
    }
    // canvas.width = canvas.width;
    // ctx.drawImage(img, x, y);


}
//sound constructor
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    console.log(this.sound);
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
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


