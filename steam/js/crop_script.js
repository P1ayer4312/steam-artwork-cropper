// Global variables
const _URL = window.URL || window.webkitURL;
const gifuct = window.gifuct;

// Information about the image selected to be cropped
let inputImage = {
    selectedImage: document.getElementById('selectedImage'), // Input file DOM element
    file: null, // Quick access to the selected file
    img: null, // Image object that stores the image src
    width: 0,
    height: 0,
    setStatusMsg: function (message) { // Show status of what is going on in the background
        document.getElementById('statusMsg').innerText = message;
    }
}

inputImage.img = new Image();
inputImage.img.onerror = function () {
    alert("Please select an image.\n\nInvalid file type: " + inputImage.file.type);
};

let rightPanel = {
    originalSize: document.getElementById('originalSize'), // Size of the original image
    bigSize: document.getElementById('bigSize'), // Size of the left image
    smallSize: document.getElementById('smallSize'), // Size of the right image
    toggleSmall: document.getElementById('toggleSmall'), // Checkbox for adding hole in the bottom right
    leftOffset: document.getElementById('leftOffset'), // Offset for the right image
    artworkInfo: {
        show: function () {
            document.getElementById("artworkInfo").style.removeProperty('display');
        },
        hide: function () {
            document.getElementById("artworkInfo").style.setProperty('display', 'none');
        }
    },
    workshopInfo: {
        show: function () {
            document.getElementById("worshopInfo").style.removeProperty('display');
        },
        hide: function () {
            document.getElementById("worshopInfo").style.setProperty('display', 'none');
        }
    }
}

let artworkShowcase = {
    bigImg: document.getElementById('bigImg'), // The left big image of the showcase
    smallImg: document.getElementById('smallImg'), // The right small image of the showcase
    steamHeight: 0, // Height of the image displayed on the Artwork showcase
    steamBigWidth: 0, // Width of the left image displayed on the Artwork showcase
    steamSmallWidth: 0, // Height of the right image displayed on the Artwork showcase
    leftOffset: 0, // Offset for the right small image
    bigBox: document.querySelector('.bigBox'), // Container for resized gif for the left image
    smallBox: document.querySelector('.smallBox'), // Container for resized gif for the right image
    bigBoxGif: document.getElementById('bigBoxGif'), // Display the gif inside the container
    smallBoxGif: document.getElementById('smallBoxGif'), // Display the gif inside the container
    bigCanvas: null, // Used for measuring the left image
    smallCanvas: null, // Used for measuring the right image
    smallTest: 0, // This is used for storing the height of the image with a hole at the bottom 
    reset: function () { // Reset function for reseting the showcase
        inputImage.setStatusMsg("Measuring, please wait...");
        rightPanel.originalSize.innerText = '-';
        rightPanel.bigSize.innerText = '-';
        rightPanel.smallSize.innerText = '-';
        rightPanel.leftOffset.innerText = '-';
        rightPanel.leftOffset.innerText = '-';
        rightPanel.toggleSmall.checked = false;
        this.bigBox.style.setProperty('display', 'none');
        this.smallBox.style.setProperty('display', 'none');
        this.bigBoxGif.src = '';
        this.smallBoxGif.src = '';
        this.smallTest = inputImage.height;

        // Get measures for the images on the Artwork showcase
        this.steamHeight = Math.floor(((inputImage.height * 613) / inputImage.width));
        this.steamBigWidth = Math.floor((inputImage.height * 508) / this.steamHeight);
        this.steamSmallWidth = Math.floor((inputImage.height * 102) / this.steamHeight);

        // Create canvas objects
        this.bigCanvas = new CustomCanvas(this.steamBigWidth, inputImage.height);
        this.smallCanvas = new CustomCanvas(this.steamSmallWidth, inputImage.height);
    },
    loadImage: function () {
        inputImage.img.onload = function () {
            inputImage.width = this.width;
            inputImage.height = this.height;
            artworkShowcase.reset();

            artworkShowcase.bigCanvas.fillSolid(artworkShowcase.steamBigWidth, inputImage.height);
            artworkShowcase.smallCanvas.fillSolid(artworkShowcase.steamSmallWidth, inputImage.height);
            artworkShowcase.bigImg.src = artworkShowcase.bigCanvas.toDataURL();
            artworkShowcase.smallImg.src = artworkShowcase.smallCanvas.toDataURL();

            artworkShowcase.bigImg.onload = testSize; // acts like a while loop
        };

        if (inputImage.file != null)
            inputImage.img.src = _URL.createObjectURL(inputImage.file);
    },
    downloadImages: function () { // Function for zipping and downloading the cropped images
        if (inputImage.file == null) {
            alert("Please select an image first!");
            return;
        }
        inputImage.setStatusMsg("Cropping images, please wait...");
        let zip = new JSZip();
        zip.file("readme.txt", "Make sure to follow the guide on how to upload longer images :)");
        if (inputImage.file.type != 'image/gif') {
            zip.file(
                `1_${inputImage.file.name}`,
                artworkShowcase.bigCanvas.toDataURL(inputImage.file.type, 1).split(';base64,')[1], {
                    base64: true
                }
            );

            zip.file(
                `2_${inputImage.file.name}`,
                artworkShowcase.smallCanvas.toDataURL(inputImage.file.type, 1).split(';base64,')[1], {
                    base64: true
                }
            );

            zip.generateAsync({
                type: "blob"
            }).then(function (content) {
                download(content, `${inputImage.file.name}_${new Date().getTime()}.zip`);
                inputImage.setStatusMsg("Done");
            });
        } else {
            // Do fancy logic :D
            let fileReader = new FileReader();
            fileReader.onload = function () {
                let gifData = gifuct.parseGIF(fileReader.result);
                let gifs = gifuct.decompressFrames(gifData, true);
                as_createGifs(
                    zip, // Send JSZip object for zipping the gifs
                    gifs, // Send the frames used for cropping
                    1 // Which gif is cropping (big image or small image)
                );
            }

            fileReader.readAsArrayBuffer(inputImage.file);
        }
    },
}

function as_createGifs(zip, gifs, currentGif) {
    // Recursive function for cropping and zipping gifs
    let gifjs = new GIF({
        workers: 2,
        quality: 1,
        workerScript: "steam/js/gif.js-master/dist/gif.worker.js"
    });

    gifjs.on('finished', function (blob) {
        // window.open(URL.createObjectURL(blob));
        let fr = new FileReader();
        fr.onload = function () {
            zip.file(
                `${currentGif}_${inputImage.file.name}`,
                fr.result.split(';base64,')[1], {
                    base64: true
                }
            );

            if (currentGif != 2)
                as_createGifs(zip, gifs, currentGif + 1);
            else {
                inputImage.setStatusMsg("Creating zip file, please wait...");
                zip.generateAsync({
                    type: "blob"
                }).then(function (content) {
                    download(content, `${inputImage.file.name}_as_${new Date().getTime()}.zip`);
                    inputImage.setStatusMsg("Done");
                });
            }
        }

        fr.readAsDataURL(blob);
    });

    gifjs.on('progress', function (e) {
        inputImage.setStatusMsg(`Rendering gif ${currentGif}/2 - ${(e*100).toFixed(0)}%`);
    })

    // smallImgHeight is for it not to check everytime if it needs to add hole at the bottom
    let smallImgHeight = rightPanel.toggleSmall.checked ? artworkShowcase.smallTest : inputImage.height;
    let background = new CustomCanvas(gifs[0].dims.width, gifs[0].dims.height);
    background.imageData(gifs[0].patch);

    for (let i = 0; i < gifs.length; i++) {
        let temp = new CustomCanvas(gifs[i].dims.width, gifs[i].dims.height);
        temp.imageData(gifs[i].patch);
        background.addCanvas(temp.canvas, gifs[i].dims.left, gifs[i].dims.top);

        let frame;
        if (currentGif == 1) {
            frame = new CustomCanvas(artworkShowcase.steamBigWidth, inputImage.height);
            frame.addCanvas(background.canvas, 0, 0);
        } else { // 2
            frame = new CustomCanvas(artworkShowcase.steamSmallWidth, smallImgHeight);
            frame.drawImage(background.canvas, artworkShowcase.leftOffset, 0, artworkShowcase.steamSmallWidth,
                inputImage.height, 0, 0, artworkShowcase.steamSmallWidth, inputImage.height);
        }
        
        gifjs.addFrame(frame.canvas, {
            delay: gifs[i].delay ? gifs[i].delay : gifs[1].delay
        });
    }

    gifjs.render();
}

// Main
inputImage.selectedImage.onchange = function () {
    if ((inputImage.file = this.files[0])) {
        tabInfo.reset();
        if (tabInfo.currentTab == '#artwork') {
            artworkShowcase.loadImage();
            tabInfo.artworkLoaded = true;
        } else { // #workshop
            workshopShowcase.loadImage();
            tabInfo.workshopLoaded = true;
        }
    }
}

function testSize() {
    // Get values for the images shown on the Steam Artwork showcase
    // and check if they need to be adjusted
    // let bigImgComputed = Math.round(parseFloat(getComputedStyle(bigImg).height.replace('px', '')));
    // let smallImgComputed = Math.round(parseFloat(getComputedStyle(smallImg).height.replace('px', '')));
    let bigImgComputed = getComputedValueFor(artworkShowcase.bigImg, 'height');
    let smallImgComputed = getComputedValueFor(artworkShowcase.smallImg, 'height');
    if (bigImgComputed !== smallImgComputed) {
        // Because the left bigger picture is easier to adjust and less janky to work with,
        // we're setting the right smaller image to an acceptable size taller than the big one,
        // then resize the bigger image's width until their rounded heights are the same
        if (bigImgComputed > smallImgComputed) {
            artworkShowcase.steamBigWidth += 1;
            artworkShowcase.steamSmallWidth -= 1;

            artworkShowcase.smallCanvas.setWidth(artworkShowcase.steamSmallWidth);
            artworkShowcase.smallCanvas.fillSolid(artworkShowcase.steamSmallWidth, inputImage.height);
            artworkShowcase.smallImg.src = artworkShowcase.smallCanvas.toDataURL();
        } else {
            artworkShowcase.steamBigWidth -= 1;
        }
        // bigCanvas and smallCanvas are used for measuring the Steam Artwork Showcase
        artworkShowcase.bigCanvas.setWidth(artworkShowcase.steamBigWidth);
        artworkShowcase.bigCanvas.fillSolid(artworkShowcase.steamBigWidth, inputImage.height);
        artworkShowcase.bigImg.src = artworkShowcase.bigCanvas.toDataURL();
    } else {
        // When it's done testing, display a preview of the original image and show
        // the resolutions for the pictures on the right side
        artworkShowcase.bigImg.onload = null;
        artworkShowcase.leftOffset = inputImage.width - artworkShowcase.steamSmallWidth;
        inputImage.setStatusMsg('Done');

        artworkShowcase.bigCanvas.drawImage(inputImage.img, 0, 0, artworkShowcase.steamBigWidth, inputImage.height,
            0, 0, artworkShowcase.steamBigWidth, inputImage.height);

        artworkShowcase.smallCanvas.drawImage(inputImage.img, artworkShowcase.leftOffset, 0,
            artworkShowcase.steamSmallWidth, inputImage.height, 0, 0, artworkShowcase.steamSmallWidth, inputImage.height);

        artworkShowcase.bigImg.src = artworkShowcase.bigCanvas.toDataURL(inputImage.file.type, 1);
        artworkShowcase.smallImg.src = artworkShowcase.smallCanvas.toDataURL(inputImage.file.type, 1);

        rightPanel.originalSize.innerText = `${inputImage.width} x ${inputImage.height}`;
        rightPanel.bigSize.innerText = `${artworkShowcase.steamBigWidth} x ${inputImage.height}`;
        rightPanel.smallSize.innerText = `${artworkShowcase.steamSmallWidth} x ${inputImage.height}`;
        rightPanel.leftOffset.innerText = `${artworkShowcase.leftOffset}`;

        if (inputImage.file.type == 'image/gif') {
            // Display two gifs as preview within resized divs
            let frameHeight = getComputedStyle(document.getElementById('bigImgA')).height;
            artworkShowcase.smallBoxGif.src = inputImage.img.src;
            artworkShowcase.bigBoxGif.src = inputImage.img.src;
            artworkShowcase.bigBox.style.height = frameHeight;
            artworkShowcase.bigBoxGif.style.height = frameHeight;
            artworkShowcase.smallBoxGif.style.height = frameHeight;
            artworkShowcase.bigBox.style.removeProperty('display');
            artworkShowcase.smallBox.style.removeProperty('display');
        }
    }
}

function rightSide() {
    // This function is used for creating a hole for the '+N' element if the user
    // has more artwork images uploaded on Steam
    let bigImgComputed = getComputedValueFor(artworkShowcase.bigImg, 'height')
    let rightSizeComputed = getComputedValueFor(document.getElementById('rightSide'), 'height') - 12;
    if (bigImgComputed < rightSizeComputed) {
        artworkShowcase.smallTest--;
        artworkShowcase.smallCanvas.setHeight(artworkShowcase.smallTest);
        artworkShowcase.smallCanvas.fillSolid(artworkShowcase.steamSmallWidth, artworkShowcase.smallTest);
        artworkShowcase.smallImg.src = artworkShowcase.smallCanvas.toDataURL();
    } else {
        artworkShowcase.smallImg.onload = null;
        inputImage.setStatusMsg("Done");
        rightPanel.smallSize.innerText = `${artworkShowcase.steamSmallWidth} x ${artworkShowcase.smallTest}`;
        artworkShowcase.smallCanvas.drawImage(inputImage.img, artworkShowcase.leftOffset, 0,
            artworkShowcase.steamSmallWidth, inputImage.height, 0, 0, artworkShowcase.steamSmallWidth, inputImage.height);

        artworkShowcase.smallImg.src = artworkShowcase.smallCanvas.toDataURL(inputImage.file.type, 1);
    }
}

function toggleSmall() {
    // This function is called when the 'Bottom right space' checkbox is clicked
    if (rightPanel.toggleSmall.checked) {
        if (artworkShowcase.smallTest === inputImage.height) {
            artworkShowcase.smallImg.onload = rightSide;

            // Some resolutions can't be approximated right for smaller images,
            // so we give the small one a bit more height, then manually adjust it
            let m = 50;
            if (artworkShowcase.steamSmallWidth < 100) m = 40;

            // Approximate the correct length, then check it manually
            artworkShowcase.smallTest = Math.round((artworkShowcase.bigImg.height - m) * artworkShowcase.steamSmallWidth / 102);
            inputImage.setStatusMsg("Measuring, please wait...");
            rightSide();
        } else {
            artworkShowcase.smallCanvas.setHeight(artworkShowcase.smallTest);
        }
        rightPanel.smallSize.innerText = `${artworkShowcase.steamSmallWidth} x ${artworkShowcase.smallTest}`;
    } else {
        artworkShowcase.smallCanvas.setHeight(inputImage.height);
        rightPanel.smallSize.innerText = `${artworkShowcase.steamSmallWidth} x ${inputImage.height}`;
    }

    artworkShowcase.smallCanvas.drawImage(inputImage.img, artworkShowcase.leftOffset, 0,
        artworkShowcase.steamSmallWidth, inputImage.height, 0, 0, artworkShowcase.steamSmallWidth, inputImage.height);

    artworkShowcase.smallImg.src = artworkShowcase.smallCanvas.toDataURL(inputImage.file.type, 1);
}

function getComputedValueFor(element, parameter) { // Function for extracting pixel value from computed element's style
    return Math.round(parseFloat(getComputedStyle(element)[parameter].replace('px', '')));
}

class CustomCanvas {
    constructor(width = 1, height = 1, border = false) {
        this.canvas = document.createElement('canvas');
        this.canvasCtx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        if (border)
            this.canvas.style.setProperty("border", "1px solid black");
    }
    imageData = function (data) {
        let t = this.canvasCtx.createImageData(this.canvas.width, this.canvas.height);
        t.data.set(data);
        this.canvasCtx.putImageData(t, 0, 0);
    }
    addCanvas = function (canvasElement, left, top, width, height) {
        if (width == undefined && height == undefined)
            this.canvasCtx.drawImage(canvasElement, left, top);
        else
            this.canvasCtx.drawImage(canvasElement, left, top, width, height);
    }
    fillSolid = function (dx, dy) {
        this.canvasCtx.fillStyle = "black";
        this.canvasCtx.fillRect(0, 0, dx, dy);
    }
    setWidth = function (w) {
        this.canvas.width = w;
    }
    setHeight = function (h) {
        this.canvas.height = h;
    }
    toDataURL = function (type = 'image/jpeg', quality = 0.1) {
        return this.canvas.toDataURL(type, quality);
    }
    drawImage = function (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.canvasCtx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}