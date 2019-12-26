//main
/*-------------------------------------Alldeclaration-------------------------*/
var cnv = document.querySelector("#myc");
var ctx = cnv.getContext('2d')
var score_v = document.querySelector("#Vscore");
var live_v = document.querySelector("#VLives");
var contin = document.querySelector('#messp');
var btn_con = document.querySelector('[value = "CONTINE"]');
var btn_re = document.querySelector('[value = "RESTART"]');
var gameOver = document.querySelector('#GAME');
var cols, rows;
var w = 50;
var grid = [];
var posx = w;
var posy = w;
var Score = 0;
var lives = 1;



/*-------------------------------------AllCalling-------------------------*/
function continueF() {
    window.scrollTo(0, 0);
    grid = [];
    posx = w;
    posy = w;
    setup();
    createRock();
    createDiamond();
    createBlock();
    createDoor();
    draw();

}
continueF();
/*-------------------------------------AllFunction-------------------------*/

//create 
function setup() {
    cnv.width = innerWidth - (innerWidth % w);
    cnv.height = (innerHeight * 2) - ((innerHeight * 2) % w);
    cols = Math.floor(cnv.width / w);
    rows = Math.floor(cnv.height / w);
    for (var row = 0; row < rows; row++) {
        // // console.log("row num " + row);
        for (var col = 0; col < cols; col++) {

            var C = new Cell(col, row)
            grid.push(C);



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
        // // console.log("show");
        // // console.log(this.val);
        var x = this.x * w;//100
        var y = this.y * w;//0
        var image = new Image();
        image.src = this.val;//==========================edit
        if (x == posx && y == posy) {//=====================edit
            this.val = 'emotion.jpg'
            image.src = 'emotion.jpg';
        }
        image.onload = function () {
            console.log(image.src)
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
        // // console.log(ranRow, "    ", ranCol);
        for (var i = 0; i < grid.length; i++) {
            if (grid[i].val == "grass.jpg" && grid[i].x == ranCol && grid[i].y == ranRow) {
                var C = new Cell(ranCol, ranRow, "diamonds.jpg");
                grid[i] = C;
                rocksCount++;
            }
        }


    }

}


//door
function createDoor() {
    for (var i = 0; i < grid.length; i++) {
        if (grid[i].x == cols - 2 && grid[i].y == rows - 2) {

            grid[i].val = "door.png";
        }
    }

}



function searchCell(x, y) {
    for (var i = 0; i < grid.length; i++) {
        // // // console.log(x + "," + y);
        if (grid[i].x == x && grid[i].y == y)
            return grid[i];
    }
    return null;
}

function editCell(x, y, newSrc) {
    for (var i = 0; i < grid.length; i++) {
        // // console.log(x + "," + y);

        if (grid[i].x == x && grid[i].y == y) {
            grid[i].val = newSrc;
            // // console.log("edit");
            // // console.log(grid[i].val)
        }
        //// // console.log(grid[i]);
    }


}

function changeRockDown(position) {
    var stopF = true;
    var nextY = position.y + 1;
    while (nextY < rows && stopF) {
        var nCell = searchCell(position.x, nextY);
        if (nCell.val == "black.jpg") {
            position = nCell;
        }
        else { stopF = false; }
        nextY = nextY + 1;
    }
    position.val = "rock.jpg";
    position.show();

}


function changeRock(up, position) {
    // // console.log("inside");
    // // console.log(up.val);
    // // console.log("end");
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
        // var stopF = true;
        // var nextY = position.y + 1;
        // while (nextY < rows && stopF) {
        //     var nCell = searchCell(up.x, nextY);
        //     if (nCell.val == "black.jpg") {
        //         position = nCell;
        //     }
        //     else { stopF = false; }
        //     nextY = nextY + 1;
        // }
        // position.val = "rock.jpg";
        // position.show();
        changeRockDown(position)
        for (var j = 0; j < allPrev.length; j++) {
            var rockN = searchCell(position.x, position.y - j - 1);
            rockN.val = "rock.jpg";
            rockN.show();
        }


    }

}
function rockAnimation(rockCell)//rock
{
    //
    var flag = true;
    prevY = rockCell.y - 1;
    var allPrev = [];
    while (prevY > 1 && flag) {
        var nCell = searchCell(rockCell.x, prevY);
        if (nCell.val == "rock.jpg") {
            allPrev.push(nCell);
            nCell.val = "black.jpg";
        }
        else { flag = false; }
        prevY = prevY - 1;
    }
    console.log(allPrev)

    //
    var image = new Image();

    var rockN;
    var dy = rockCell.y * w;
    var count = 0;
    var downrockCell = rockCell;
    rockCell.val = "black.jpg";
    image.src = "rock.jpg";
    image.onload = function () {
        console.log("image1");
        var handler = setInterval(function () {
            for (var j = 0; j < allPrev.length; j++) {
                ctx.fillRect(rockCell.x * w, dy - ((j + 1) * w), w, w);
            }

            ctx.fillRect(rockCell.x * w, dy, w, w);
            dy = dy + (w / 2);
            ctx.drawImage(image, rockCell.x * w, dy, w, w);
            //draw
            for (var j = 0; j < allPrev.length; j++) {

                ctx.drawImage(image, rockCell.x * w, dy - ((j + 1) * w), w, w);
            }
            count++;
            if (count > 1) {
                console.log(dy);
                downrockCell = searchCell(rockCell.x, (dy / w) + 1);
                console.log("set interval");
                if (downrockCell.val != "black.jpg") {
                    console.log(downrockCell.val)
                    clearInterval(handler);
                    if (downrockCell.val == "emotion.jpg") {

                        if (lives > 0) {
                            console.log("000000000");
                            lives--;
                            var image2 = new Image();
                            image2.src = "fail.jpg"
                            image2.onload = function () {

                                ctx.drawImage(image2, rockCell.x * w, dy + w, w, w);
                                window.scrollTo(0, 0);
                                disableScrolling()
                                contin.style.display = 'block'

                            }


                        }
                        else {
                            window.scrollTo(0, 0);
                            disableScrolling()
                            gameOver.style.display = 'block'
                        }

                    }
                    downrockCell = searchCell(rockCell.x, (dy / w));
                    downrockCell.val = "rock.jpg";

                    for (var j = 0; j < allPrev.length; j++) {
                        rockN = searchCell(rockCell.x, (dy / w) - j - 1);
                        rockN.val = "rock.jpg";
                    }
                }
                else count = 0;

            }


        }, 200)






    }
    //debugger;



}


//--------------------
function disableScrolling() {

    window.onscroll = function () { window.scrollTo(0, 0); };
}

function enableScrolling() {
    window.onscroll = function () { };
}



//-------------------------

btn_con.addEventListener('click', function () {
    continueF();
    enableScrolling();
    contin.style.display = 'none';
    live_v.innerText = lives;
})

//--------------------------
btn_re.addEventListener('click', function () {
    location.reload();
    contin.style.display = 'none';
})

document.onkeydown = function (e) {
    key = e.keyCode;

    switch (key) {
        case 37://left
            if (posx > w) {
                var image = new Image();
                //// // console.log(posy)
                var previousCell = searchCell((posx - w) / w, posy / w);
                var beforePreviousCell = searchCell((posx - w - w) / w, posy / w);
                var upCell = searchCell(posx / w, (posy - w) / w);
                var position = searchCell(posx / w, posy / w);

                // // console.log("previousCell")
                // // console.log(previousCell)
                //// // console.log(previousCell)
                if (previousCell) {


                    if (previousCell.val != "rock.jpg") {
                        if (previousCell.val == "diamonds.jpg") {
                            var s = new sound("attachDiamond.m4a");
                            s.play();
                            Score++;
                        }
                        else {
                            var s = new sound("move.m4a");
                            s.play();

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
                        // debugger;

                        editCell(posx / w, posy / w, "black.jpg");
                        ctx.fillRect(posx, posy, w, w);
                        posx -= w;
                        previousCell.val = 'emotion.jpg';
                        image.src = 'emotion.jpg';
                        image.onload = function () {
                            ctx.drawImage(image, posx, posy, w, w);
                        }
                        changeRock(upCell, position);
                        changeRockDown(beforePreviousCell);


                    }






                }
            }

            break;
        case 38://up
            // // console.log("upppp");
            if (posy > w) {
                var image = new Image();
                /////////
                var upCell = searchCell(posx / w, (posy - w) / w);
                // // console.log("upCell")
                // // console.log(upCell)
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
                var image = new Image();
                ////////
                var nextCell = searchCell((posx + w) / w, posy / w);
                var upCell = searchCell(posx / w, (posy - w) / w);
                var position = searchCell(posx / w, posy / w);
                var afterNext = searchCell((posx + w + w) / w, posy / w);
                var underAfterNext = searchCell((posx + w + w) / w, (posy + w) / w);


                if (nextCell) {
                    // // console.log("Right");
                    // // console.log(position.val);
                    // // console.log(nextCell.val);
                    // // console.log(afterNext.val);


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

                        changeRockDown(afterNext);
                        changeRock(upCell, position);

                    }


                    if (nextCell.val == "diamonds.jpg") {
                        Score++;
                    }


                }
            }
            break;
        case 40://down
            if (posy < cnv.height - w - w) {
                var image = new Image();
                var cellUp = searchCell(posx / w, (posy - w) / w);
                var position = searchCell(posx / w, posy / w);
                var downCell = searchCell(posx / w, (posy + w) / w);
                // // // console.log(nextCell)
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
                        downCell.show();
                        // // console.log("upcell");
                        // // console.log(cellUp.val)
                        if (cellUp && cellUp.val == 'rock.jpg') {
                            //// // console.log("anim")
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
    score_v.innerText = Score;




}
//sound constructor
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    //// // console.log(this.sound);
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

////////////////
// ctx.fillRect(rockCell.x * w, rockCell.y * w, w, w);



