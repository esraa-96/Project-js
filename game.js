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
var winPage = document.querySelector('#WIN');
var btn_tryAgain = document.querySelector('[value = "try again"]');
var menuButton = document.querySelector('[value = "Menu"]');
var nextlevelButton = document.querySelector('[value = "Next Level"]');
var mss = document.querySelector('#WIN .mss');
var sp_timer = document.querySelector("#s_timer");
var storedLevel = localStorage.getItem('level');
var timer_v = document.querySelector('#timer');
var level_v = document.querySelector("#level");
var logout = document.querySelector("[value='Logout']");
var cols, rows;
var w = 50;
var grid = [];
var posx = w;
var posy = w;
var Score = 0;
var lives = 3;
var notRock = [[2, 1], [3, 1], [cols - 3, rows - 2]];
var notRemove = ['rock.jpg', 'closeDoor.png']
var numOfDiamond = 0;
var numOfRock = 0;
var winScore = 2;
var flagOpen = true;
var flagKeyboard = true;
var timer = 2;
var grass = "grass.jpg"
var aroundDoor = [[cols - 3, rows - 2], [cols - 2, rows - 3]]
var effectKey = 1;
/**
 * 1-->game over
 * 2-->continue
 * 3-->win
 */
var prevKey = 0;
var jim = true;
/*-------------------------------------AllCalling-------------------------*/
if (storedLevel == 1) {
    lives = 4;

}

else if (storedLevel == 2) {
    timer = 60;//5
    lives = 3;//3

}
else {
    timer = 40;
    lives = 2;
}

function continueF() {
    level_v.innerText = storedLevel;
    score_v.innerText = Score;
    live_v.innerText = lives;
    timer_v.innerText = timer;

    if (storedLevel == 1) {
        numOfRock = 40;
        numOfDiamond = 30;
        winScore = 20;


    }
    else if (storedLevel == 2) {
        numOfRock = 70;
        numOfDiamond = 50;
        winScore = 30;
        grass = "grass2.png"

    }
    else if (storedLevel == 3) {
        numOfRock = 100;
        numOfDiamond = 60;
        winScore = 40;
        grass = "grass3.png"
        nextlevelButton.style.display = "none";

    }
    if (storedLevel > 1) {
        sp_timer.style.display = "inline";
        var timerInter = setInterval(function () {
            if (flagKeyboard) {


                if (timer == 1) {
                    clearInterval(timerInter);
                    console.log(winPage.style.display)
                    if (winPage.style.display != "block" && contin.style.display != "block") {
                        fail("sadtrombone.mp3");

                    }
                }

                timer--;
                timer_v.innerText = timer;
                console.log(timer);
            }
            else {
                clearInterval(timerInter);
            }
        }, 1000);



    }
    window.scrollTo(0, 0);
    flagOpen = true
    grid = [];
    posx = w;
    posy = w;
    setup();
    createRock();
    createDiamond();
    createBlock();
    createDoor();
    draw();
    openDoor();

}
continueF();
/*-------------------------------------AllFunction-------------------------*/

//create 
function setup() {
    cnv.width = innerWidth - (innerWidth % w);
    cnv.height = (innerHeight * 2) - ((innerHeight * 2) % w);
    cols = Math.floor(cnv.width / w);
    rows = Math.floor(cnv.height / w);
    aroundDoor = [[cols - 3, rows - 2], [cols - 2, rows - 3]];
    notRock = [[2, 1], [3, 1], [cols - 3, rows - 2]];
    for (var row = 0; row < rows; row++) {
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
function Cell(x, y, val = grass)//1,0
{
    this.x = x;
    this.y = y;
    this.val = val;
    this.show = function () {
        var x = this.x * w;//100
        var y = this.y * w;//0
        var image = new Image();
        image.src = this.val;
        if (x == posx && y == posy) {
            this.val = 'emotion.jpg'
            image.src = 'emotion.jpg';
        }
        image.onload = function () {
            ctx.drawImage(image, x, y, w, w);

        }


    }

}

/**
 * 
 * @param {*} x 
 * @param {*} y 
 * return false if x and y not allowed
 */
function notRockFun(x, y) {
    for (var x = 0; x < notRock.length; x++) {
        if (notRock[x][0] == x || notRock[x][1] == y) {
            return false;
        }
    }
    return true;
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
    while (rocksCount < numOfRock) {
        var ranRow = Math.floor(Math.random() * rows);
        var ranCol = Math.floor(Math.random() * cols);
        for (var i = 0; i < grid.length; i++) {
            if (grid[i].val == grass &&
                grid[i].x == ranCol &&
                grid[i].y == ranRow) {
                if (notRockFun(grid[i].x, grid[i].y)) {
                    var C = new Cell(ranCol, ranRow, "rock.jpg");
                    grid[i] = C;
                    rocksCount++;
                }
            }
        }


    }
}

//Append diamonds
function createDiamond() {
    var rocksCount = 0;
    while (rocksCount < numOfDiamond) {
        var ranRow = Math.floor(Math.random() * rows);
        var ranCol = Math.floor(Math.random() * cols);
        for (var i = 0; i < grid.length; i++) {
            if (grid[i].val == grass && grid[i].x == ranCol && grid[i].y == ranRow) {
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

            grid[i].val = "closeDoor.png";
        }


    }

}



function searchCell(x, y) {
    for (var i = 0; i < grid.length; i++) {
        if (grid[i].x == x && grid[i].y == y)
            return grid[i];
    }
    return null;
}

function editCell(x, y, newSrc) {
    for (var i = 0; i < grid.length; i++) {

        if (grid[i].x == x && grid[i].y == y) {
            grid[i].val = newSrc;

        }

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

    //
    var image = new Image();

    var rockN;
    var dy = rockCell.y * w;
    var count = 0;
    var downrockCell = rockCell;
    rockCell.val = "black.jpg";
    image.src = "rock.jpg";
    image.onload = function () {
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
                downrockCell = searchCell(rockCell.x, (dy / w) + 1);
                if (downrockCell.val != "black.jpg") {
                    clearInterval(handler);
                    if (downrockCell.val == "emotion.jpg") {
                        lives--;
                        if (lives > 0) {
                            var image2 = new Image();
                            image2.src = "fail.jpg"
                            image2.onload = function () {
                                ctx.drawImage(image2, rockCell.x * w, dy + w, w, w);
                                window.scrollTo(0, 0);
                                disableScrolling(this.scrollX, this.scrollY)
                                contin.style.display = 'block'
                                effectKey = 2;
                                playSound('explosion.mp3');
                                flagKeyboard = false;

                            }


                        }
                        else {
                            fail('explosion.mp3');
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
function disableScrolling(x, y) {

    window.onscroll = function () { window.scrollTo(x, y); };
}

function enableScrolling() {
    window.onscroll = function () { };
}



//-------------------------

// btn_con.addEventListener('click', function () {
//     continueF();
//     enableScrolling();
//     contin.style.display = 'none';
//     live_v.innerText = lives;
//     flagKeyboard = true;
// })

//--------------------------
// btn_re.addEventListener('click', function () {
//     location.reload();
//     contin.style.display = 'none';
// })

//-----------------------------------
function playSound(Name) {
    var s = new sound(Name);
    s.play();
}
function openDoor() {
    if (flagOpen && Score >= winScore) {
        var cell = searchCell(cols - 2, rows - 2);
        if (cell) {
            cell.val = "door.png"
            cell.show();
            playSound('door_1.mp3');
            flagOpen = false;
        }
    }
}
function closeDoor() {
    if (!flagOpen && Score == winScore) {
        var cell = searchCell(cols - 2, rows - 2);
        if (cell) {
            cell.val = "closeDoor.png"
            cell.show();
            playSound('door_1.mp3');
            flagOpen = false;
        }
    }
}

function drawJim(newCell, newPosx, newPosy, x, y) {
    ctx.fillRect(posx, posy, w, w);
    editCell(posx / w, posy / w, "black.jpg");
    posx = newPosx;
    posy = newPosy;
    newCell.val = 'emotion.jpg';
    // newCell.show();
    var image = new Image();
    image.src = 'emotion.jpg';
    image.onload = function () {
        ctx.drawImage(image, newPosx, newPosy, w, w);
        // ctx.fillRect(x, y, w, w);
        // editCell(x / w, y / w, "black.jpg");
        ////jim=true

    }



}

function win(x, y) {
    if (!flagOpen && gameOver.style.display != "block") {
        if (x == cols - 2 && y == rows - 2) {
            window.scrollTo(0, 0);
            disableScrolling(this.scrollX, this.scrollY)
            var c = 0;
            winPage.style.display = 'block'
            if (storedLevel < 3) {
                storedLevel++;
                localStorage.setItem('level', storedLevel);
            }
            var value = ['block', 'none', 'block', 'none']
            var handler = setInterval(function () {
                if (c >= 4) {
                    clearInterval(handler);
                    mss.style.display = value[0];
                }
                mss.style.display = value[c];
                c++;



            }, 100)

            playSound("applause.mp3");
            flagKeyboard = false;
            effectKey = 3;

            return true;
        }
    }
    return false;
    // 

}

// btn_tryAgain.addEventListener('click', function () {
//     location.reload();
// })

function fail(x) {
    flagKeyboard = false;
    effectKey = 1;
    setTimeout(() => {
        window.scrollTo(0, 0);
        disableScrolling(0, 0)
        gameOver.style.display = "block";
        playSound(x);
    }, 1000);


}
// logout.addEventListener('click', function () {
//     window.open("menu.html");

// });

function checkRockAroundDoor() {

    var cell = searchCell(aroundDoor[0][0], aroundDoor[0][1]);
    console.log(cell);
    if (cell.val == "rock.jpg") {
        cell = searchCell(aroundDoor[1][0], aroundDoor[1][1]);
        console.log(cell);
        if (cell.val == "rock.jpg") {
            fail("sadtrombone.mp3");
        }
    }
}

document.onkeydown = function (e) {
    key = e.keyCode;
    if (flagKeyboard) {//====================
        //jim = false;
        switch (key) {
            case 37://left
                if (posx > w) {
                    var image = new Image();
                    var previousCell = searchCell((posx - w) / w, posy / w);
                    var beforePreviousCell = searchCell((posx - w - w) / w, posy / w);
                    var upCell = searchCell(posx / w, (posy - w) / w);
                    var position = searchCell(posx / w, posy / w);
                    if (previousCell) {
                        if (!notRemove.includes(previousCell.val)
                            ||
                            (
                                notRemove.includes(previousCell.val)
                                && beforePreviousCell.val == "black.jpg"
                            )
                        ) {

                            if (previousCell.val == "diamonds.jpg") {
                                var s = new sound("attachDiamond.m4a");
                                s.play();
                                Score++;
                            }
                            else if (previousCell.val == grass) {
                                var s = new sound("move.m4a");
                                s.play();

                            }
                            if (notRemove.includes(previousCell.val)
                                && beforePreviousCell.val == "black.jpg") {
                                changeRockDown(beforePreviousCell);
                            }

                            drawJim(previousCell, posx - w, posy, posx, posy);
                            changeRock(upCell, position);


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
                        if (!notRemove.includes(nextCell.val)
                            ||
                            (
                                notRemove.includes(nextCell.val)
                                && afterNext.val == "black.jpg"
                            )
                        ) {
                            //sound
                            if (nextCell.val == "diamonds.jpg") {
                                playSound("attachDiamond.m4a");
                                Score++;
                            }
                            else if (nextCell.val == grass) {
                                playSound("move.m4a");
                            }
                            //sound
                            if (notRemove.includes(nextCell.val)
                                && afterNext.val == "black.jpg") {
                                changeRockDown(afterNext);
                            }

                            drawJim(nextCell, posx + w, posy, posx, posy);
                            changeRock(upCell, position);
                        }


                    }
                    win(posx / w, posy / w);

                }
                break;

            case 38://up
                if (posy > w) {
                    var image = new Image();
                    /////////
                    var upCell = searchCell(posx / w, (posy - w) / w);
                    if (upCell) {
                        if (!notRemove.includes(upCell.val)) {
                            //sound

                            if (upCell.val == "diamonds.jpg") {
                                playSound("attachDiamond.m4a");
                                Score++;
                            }
                            else if (upCell.val == grass) {
                                playSound("move.m4a");
                            }

                            //sound
                            drawJim(upCell, posx, posy - w, posx, posy);
                        }

                        if (upCell.val == "diamonds.jpg") {
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

                    if (downCell) {

                        if (!notRemove.includes(downCell.val)) {
                            //sound
                            if (downCell.val == "diamonds.jpg") {
                                playSound("attachDiamond.m4a");
                                Score++;
                            }
                            else if (downCell.val == grass) {
                                playSound("move.m4a");
                            }
                            //sound

                            drawJim(downCell, posx, posy + w, posx, posy);
                            if (cellUp && cellUp.val == 'rock.jpg') {
                                rockAnimation(cellUp);
                            }
                        }



                    }
                    win(posx / w, posy / w);


                }


                break;
        }
        score_v.innerText = Score;
        openDoor();
        checkRockAroundDoor();
    }
    else {


        switch (key) {
            case 39://right
                if (effectKey == 1) {
                    logout.style.boxShadow = "";
                    btn_tryAgain.style.boxShadow = "1px 1px 8px 1px gold";
                }
                else if (effectKey == 2) {
                    btn_con.style.boxShadow = "";
                    btn_re.style.boxShadow = "1px 1px 8px 1px gold";

                }

                else if (effectKey == 3) {
                    if (nextlevelButton.style.display != "none") {
                        nextlevelButton.style.boxShadow = "1px 1px 8px 1px gold";
                        menuButton.style.boxShadow = "";
                    }
                    else {
                        menuButton.style.boxShadow = "1px 1px 8px 1px gold";
                    }
                }

                break;
            case 37://left
                if (effectKey == 1) {

                    logout.style.boxShadow = "1px 1px 8px 1px gold";
                    btn_tryAgain.style.boxShadow = "";
                }
                else if (effectKey == 2) {
                    btn_con.style.boxShadow = "1px 1px 8px 1px gold";
                    btn_re.style.boxShadow = "";

                }
                else if (effectKey == 3) {
                    if (nextlevelButton.style.display != "none") {
                        nextlevelButton.style.boxShadow = "";
                        menuButton.style.boxShadow = "1px 1px 8px 1px gold";
                    }
                    else {
                        menuButton.style.boxShadow = "1px 1px 8px 1px gold";
                    }
                }
                break;
            case 13:
                if (effectKey == 1) {
                    if (prevKey == 39) {
                        location.reload();
                    }
                    else if (prevKey == 37) {
                        document.location.href = "menu.html";
                    }
                }
                else if (effectKey == 2) {
                    if (prevKey == 39) {
                        location.reload();
                        contin.style.display = 'none';

                    }
                    else if (prevKey == 37) {
                        continueF();
                        enableScrolling();
                        contin.style.display = 'none';
                        live_v.innerText = lives;
                        flagKeyboard = true;

                    }
                }
                else if (effectKey == 3) {
                    if (nextlevelButton.style.display == "none") {
                        document.location.href = "menu.html";
                    }
                    else {
                        if (prevKey == 37) {
                            // window.open("menu.html");
                            document.location.href = "menu.html";
                        }
                        else if (prevKey == 39) {
                            location.reload();
                        }
                    }
                }



                break;
        }
        prevKey = key;

    }



}
//sound constructor
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


