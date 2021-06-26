// DOM elements and global variables
// It can probably be more optimized and refactored, but I'm too lazy to do that :)
var _URL = window.URL || window.webkitURL;
var file, img, imgWidth, imgHeight, smallTest, commands, status = 0;
var steamHeight, steamBigWidth, steamSmallWidth;
var bigBox = document.querySelector('.bigBox');
var smallBox = document.querySelector('.smallBox');
var selectedImage = document.getElementById('selectedImage');
var smallSize = document.getElementById('smallSize');
var bigSize = document.getElementById('bigSize');
var originalSize = document.getElementById('originalSize');
var bigImg = document.getElementById('bigImg');
var smallImg = document.getElementById('smallImg');
var bigCanvas = document.createElement('canvas');
var smallCanvas = document.createElement('canvas');
var gifsicleCmds = document.getElementById('gifsicleCmds');
var bCtx = bigCanvas.getContext("2d");
var sCtx = smallCanvas.getContext("2d");

selectedImage.onchange = function () {
    if ((file = this.files[0])) {
        img = new Image();
        img.onload = function () {

            // Reset values and elements' visibility
            document.getElementById('toggleSmall').checked = false;
            document.getElementById('gifsicleArea').style.setProperty('display', 'none');
            imgWidth = this.width;
            imgHeight = this.height;
            bigBox.style.setProperty('display', 'none');
            smallBox.style.setProperty('display', 'none');
            document.getElementById('bigBoxGif').src = '';
            document.getElementById('smallBoxGif').src = '';
            originalSize.innerText = '-';
            bigSize.innerText = '-';
            smallSize.innerText = '-';
            document.getElementById('leftOffset').innerText = '';
            status = 3;

            // smallTest is used for storing the height of the image with a hole at the bottom 
            smallTest = imgHeight;
            steamHeight = Math.floor(((imgHeight * 613) / imgWidth));
            steamBigWidth = Math.floor((imgHeight * 508) / steamHeight);
            steamSmallWidth = Math.floor((imgHeight * 102) / steamHeight);
            bigCanvas.width = steamBigWidth;
            bigCanvas.height = imgHeight;
            smallCanvas.width = steamSmallWidth;
            smallCanvas.height = imgHeight;

            // Prepare the canvas for testing
            bCtx.fillStyle = "#FF0000";
            sCtx.fillStyle = "#FF0000";
            bCtx.fillRect(0, 0, steamBigWidth, imgHeight);
            sCtx.fillRect(0, 0, steamSmallWidth, imgHeight);
            smallImg.src = smallCanvas.toDataURL();
            bigImg.src = bigCanvas.toDataURL();

            bigImg.onload = testSize; // acts like a while loop
        };

        img.onerror = function () {
            alert("not a valid file: " + file.type);
        };

        img.src = _URL.createObjectURL(file);
    }
}

function testSize() {

    // Get values for the images shown on the Steam Artwork showcase
    // and check if they need to be adjusted
    var bigImgComputed = Math.round(parseFloat(getComputedStyle(bigImg).height.replace('px', '')));
    var smallImgComputed = Math.round(parseFloat(getComputedStyle(smallImg).height.replace('px', '')));
    if (bigImgComputed !== smallImgComputed) {

        // Because the left bigger picture is easier to adjust and less janky to work with,
        // we're setting the right smaller image to an acceptable size taller than the big one,
        // then resize the bigger image's width until their rounded heights are the same
        if (bigImgComputed > smallImgComputed) {
            steamBigWidth += 1;
            steamSmallWidth -= 1;

            smallCanvas.width = steamSmallWidth;
            sCtx.fillStyle = "#FF0000";
            sCtx.fillRect(0, 0, steamSmallWidth, imgHeight);
            smallImg.src = smallCanvas.toDataURL();
        } else {
            steamBigWidth -= 1;
        }

        // bigCanvas and smallCanvas are used to brute force the Steam Artwork Showcase
        bigCanvas.width = steamBigWidth;
        bCtx.fillStyle = "#FF0000";
        bCtx.fillRect(0, 0, steamBigWidth, imgHeight);
        bigImg.src = bigCanvas.toDataURL();

    } else {

        // When it's done testing, display a preview of the original image and show
        // the resolutions for the pictures on the right side
        bigImg.onload = null;
        bCtx.drawImage(img, 0, 0, steamBigWidth, imgHeight, 0, 0, steamBigWidth, imgHeight);
        sCtx.drawImage(img, imgWidth - steamSmallWidth, 0, steamSmallWidth, imgHeight, 0, 0, steamSmallWidth, imgHeight);
        bigImg.src = bigCanvas.toDataURL(file.type, 1);
        smallImg.src = smallCanvas.toDataURL(file.type, 1);

        bigSize.innerText = `${steamBigWidth}x${imgHeight}`;
        smallSize.innerText = `${steamSmallWidth}x${imgHeight}`;
        originalSize.innerText = `${imgWidth}x${imgHeight}`;

        if (file.type == "image/gif") {

            // Because gifs don't work with canvas, display two gifs within resized divs
            let bigBoxGif = document.getElementById('bigBoxGif');
            let smallBoxGif = document.getElementById('smallBoxGif');
            let frameHeight = getComputedStyle(document.getElementById('bigImgA')).height;
            let gifFile = _URL.createObjectURL(file);

            smallBoxGif.src = gifFile;
            bigBoxGif.src = gifFile;

            bigBox.style.height = frameHeight;
            bigBoxGif.style.height = frameHeight;
            smallBoxGif.style.height = frameHeight;
            bigBox.style.removeProperty('display');
            smallBox.style.removeProperty('display');

            // Generate commands for gifsicle
            gifsicleCommands(imgHeight);
        }
    }
}

// Download the canvas images
function savePics(num) {
    let time = Date.now();
    if (num === 1) download(bigCanvas.toDataURL(file.type, 1), `${time}-1-${file.name}`, file.type);
    else download(smallCanvas.toDataURL(file.type, 1), `${time}-2-${file.name}`, file.type);
}





function rightSide() {

    // This function is used for creating a hole for the '+N' element if the user
    // has more artwork images uploaded on Steam
    var bigImgComputed = Math.round(parseFloat(getComputedStyle(bigImg).height.replace('px', '')));
    var rightSizeComputed = Math.round(
        parseFloat(getComputedStyle(document.getElementById('rightSide')).height.replace('px', ''))) - 11;

    if (bigImgComputed < rightSizeComputed) {
        smallTest--;
        smallCanvas.height = smallTest;
        sCtx.fillStyle = "#FF0000";
        sCtx.fillRect(0, 0, steamSmallWidth, smallTest);
        smallImg.src = smallCanvas.toDataURL();
    } else {
        smallImg.onload = null;
        smallSize.innerText = `${steamSmallWidth}x${smallTest}`;
        sCtx.drawImage(img, imgWidth - steamSmallWidth, 0, steamSmallWidth, imgHeight, 0, 0, steamSmallWidth, imgHeight);
        smallImg.src = smallCanvas.toDataURL(file.type, 1);
        if (file.type == "image/gif") gifsicleCommands(smallTest);
    }
}

function toggleSmall() {

    // This function is called when the 'Bottom right space' checkbox is clicked
    if (document.getElementById('toggleSmall').checked) {
        if (smallTest === imgHeight) {
            smallImg.onload = rightSide;

            // Some resolutions can't be approximated right for smaller images,
            // so we give the small one a bit more height, them manually adjust it
            let m = 50;
            if (steamSmallWidth < 100) m = 40;

            // Approximate the correct length, then check it manually
            smallTest = Math.round((bigImg.height - m) * steamSmallWidth / 102);
            rightSide();
        } else {
            smallCanvas.height = smallTest;
            sCtx.drawImage(img, imgWidth - steamSmallWidth, 0, steamSmallWidth, imgHeight,
                0, 0, steamSmallWidth, imgHeight);
            smallImg.src = smallCanvas.toDataURL();
            if (file.type == "image/gif") gifsicleCommands(smallTest);
        }
        smallSize.innerText = `${steamSmallWidth}x${smallTest}`;
    } else {
        smallCanvas.height = imgHeight;
        sCtx.drawImage(img, imgWidth - steamSmallWidth, 0, steamSmallWidth, imgHeight, 0, 0, steamSmallWidth,
            imgHeight);
        smallImg.src = smallCanvas.toDataURL();
        smallSize.innerText = `${steamSmallWidth}x${imgHeight}`;
        if (file.type == "image/gif") gifsicleCommands(imgHeight);
    }
}

function selectCmds() {
    gifsicleCmds.select();
}

function gifsicleCommands(smallHeight) {
    // gifsicle.exe --crop 200,100-400,200 -o testCrop.gif booba.gif
    // Generate commands for gifsicle https://www.lcdf.org/gifsicle/
    commands = [];
    let time = Date.now();
    commands.push(
        `gifsicle --careful --colors 256 --crop 0,0-${steamBigWidth},${imgHeight} -o "${time}-1-${file.name}" "${file.name}"`);
    commands.push(
        `gifsicle --careful --colors 256 --crop ${imgWidth - steamSmallWidth},0-${imgWidth},${smallHeight} -o "${time}-2-${file.name}" "${file.name}"`
    );
    document.getElementById('leftOffset').innerText = `x / left offset: ${imgWidth - steamSmallWidth}`;
    document.getElementById('gifsicleArea').style.removeProperty('display');
    getCmd(status);
}

function getCmd(n) {
    n = parseInt(n);
    status = n;
    switch (n) {
        case 1:
            gifsicleCmds.innerText = commands[0];
            break;
        case 2:
            gifsicleCmds.innerText = commands[1];
            break;
        case 3:
            gifsicleCmds.innerText = commands.join(' & ');
            break;
        default:
            break;
    }
}