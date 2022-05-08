/* eslint-disable no-undef */
const gifuct = require('gifuct-js');
const GIF = require('gif.js');
const JSZip = require('jszip');
const download = require('downloadjs');

const CustomCanvas = require('./CustomCanvas');
const rightPanel = require('./rightPanel');
const inputImage = require('./inputImage');
const { getComputedValueFor, _URL } = require('./functionsExport');
const changeTab = require('./changeTab');

const workshopShowcase = {
    previewBox: $('#preview-box'), // Used for giving a preview of the slider area
    dragContainer: $('#drag-container'), // Huh... can't remember what this is for xD
    dragElem: $('#drag-elem'), // Selector for the orange slider element
    imgPreview: $('#img-preview'), // The <img> element where the image is shown
    smallImageWarning: $('.warning'), // Warning element if the image is too small for workshop showcase
    steamHeight: 0, // Height of the image displayed on the Workshop showcase
    sliceWidth: 0, // Width of the "Workshop Item"
    gapWitdh: 0, // Width of the gap between the images
    sliderOffset: 0, // Offset from the top of the image to the slider
    sliderHeight: 0, // Actual height of the slider to the image
    resetSlider: function() { // Reset slider's height and position
        workshopShowcase.dragElem.css({
            top: `${-(workshopShowcase.getImgHeight() - 2)}px`,
            height: '118px'
        }).resizable({
            minHeight: 118,
            maxHeight: getComputedValueFor(document.getElementById('img-preview'), 'height') - 4,
            handles: 's, n'
        });
    },
    resetImagePreview: function() { // Reset the image preview's width and height back to original size
        workshopShowcase.previewBox.css('width', '632px');
        workshopShowcase.imgPreview.css('width', '626px');
        $('#toggleSlider').prop('disabled', false);
        workshopShowcase.fixHeight();
    },
    showOriginalImagePreview: function() { // Display a preview of what a small image would look like on the workshop showcase
        let adjustWidth = inputImage.width + 8;
        workshopShowcase.smallImageWarning.show();
        workshopShowcase.previewBox.css('width', `${adjustWidth + 2}px`);
        workshopShowcase.imgPreview.css('width', `${adjustWidth}px`);
        $('#toggleSlider').prop('disabled', true);
        workshopShowcase.fixHeight();
    },
    fixHeight: function() {
        // Fix to remove the empty space below the preview created by
        // the draggable element and reset it's location back to the top
        workshopShowcase.dragContainer.css('height', getComputedStyle(document.getElementById('img-preview')).height);
        workshopShowcase.previewBox.css('height', '');
        $('#togglePreview').prop('disabled', true);
        $('#toggleSlider').prop('checked', true);
        workshopShowcase.dragElem.hide();
        workshopShowcase.resetSlider();
    },
    getImgHeight: function() {
        return workshopShowcase.imgPreview.height() + 2;
    },
    togglePreview: function() { // Toggle a preview of how would the picture look as Workshop Items
        if ($('#togglePreview').is(':checked')) {
            workshopShowcase.dragElem.hide();
            workshopShowcase.previewBox.css('height', workshopShowcase.dragElem.css('height'));
            workshopShowcase.dragContainer.css('bottom', `${workshopShowcase.getImgHeight() + parseInt($('#drag-elem').css('top').replace('px', ''))}px`);
            $('#toggleSlider').prop('disabled', true);
        } else {
            if (!$('#toggleSlider').is(':checked')) {
                workshopShowcase.dragElem.show();
            }

            workshopShowcase.previewBox.css('height', '');
            workshopShowcase.dragContainer.css('bottom', '');
            $('#toggleSlider').prop('disabled', false);
        }
    },
    toggleSlider: function() { // Toggle the slider's visibility and disable the 'togglePreview' checkbox
        if (workshopShowcase.dragElem.css('display') == 'none') {
            workshopShowcase.dragElem.css({
                'display': ''
            });
            $('#togglePreview').prop('disabled', false);
        } else {
            workshopShowcase.dragElem.css({
                'display': 'none'
            });
            $('#togglePreview').prop('disabled', true);
        }
    },
    toggleOriginalImage: function() { // Toggle a preview of what the image would look like with it's original size and resized
        if ($('#resizeImage').is(':checked')) {
            workshopShowcase.resetImagePreview();
        } else {
            workshopShowcase.showOriginalImagePreview();
        }
    },
    loadImage: function() {
        inputImage.img.onload = function() {
            const img = inputImage.img;
            inputImage.width = img.width;
            inputImage.height = img.height;
            rightPanel.originalSize.innerText = `${img.width} x ${img.height}`;
            workshopShowcase.toggleSquare = true;
            workshopShowcase.imgPreview.attr('src', img.src);
            workshopShowcase.reset();
        }

        if (inputImage.file != null)
            inputImage.img.src = _URL.createObjectURL(inputImage.file);
    },
    reset: function() {
        workshopShowcase.resetImagePreview();
        workshopShowcase.smallImageWarning.hide();
        workshopShowcase.steamHeight = getComputedValueFor(workshopShowcase.imgPreview[0], 'height');
        workshopShowcase.sliceWidth = Math.round((122.4 * inputImage.width) / 632);
        workshopShowcase.gapWitdh = Math.round((inputImage.width - (workshopShowcase.sliceWidth * 5)) / 4);
        workshopShowcase.previewBox.css('height', '');
        workshopShowcase.dragContainer.css('bottom', '');
        $('#togglePreview').prop('checked', false);

        if (workshopShowcase.sliceWidth < 122 || inputImage.height < 122) {
            workshopShowcase.showOriginalImagePreview();
            $('#resizeImage').prop('checked', false);
        } else {
            workshopShowcase.resetImagePreview();
        }
    },
    downloadImages: function() {
        if (inputImage.file == null) {
            alert("Please select an image first!");
            return;
        }
        inputImage.setStatusMsg("Cropping images, please wait...");

        let zip = new JSZip();
        zip.file("readme.txt", "Make sure to follow the guide on how to upload longer images :)");

        document.getElementById('test').innerHTML = "";

        if (!$('#toggleSlider').is(':checked')) { // If the slider is enabled
            if ($('#togglePreview').is(':checked')) {
                $('#togglePreview').click();
            }

            workshopShowcase.sliderHeight = Math.round(((workshopShowcase.dragElem.height() + 4) * inputImage.width) / 626);
            workshopShowcase.sliderOffset = Math.round((workshopShowcase.dragElem.position().top * inputImage.width) / -626);
        } else {
            workshopShowcase.sliderOffset = 0;
        }

        if (inputImage.file.type != 'image/gif') {
            let imgHeight = !$('#toggleSlider').is(':checked') ? workshopShowcase.sliderHeight : inputImage.height;
            let cropCanvas;

            if ($('#resizeImage').is(':checked')) { // Stretch the slices to fit whole showcase width

                if (!$('#toggleSlider').is(':checked')) {
                    cropCanvas = new CustomCanvas(123, getComputedValueFor(workshopShowcase.dragElem[0], 'height') + 4);
                } else {
                    cropCanvas = new CustomCanvas(123, getComputedValueFor(workshopShowcase.imgPreview[0], 'height'));
                }

            } else { // Keep the image's original size
                cropCanvas = new CustomCanvas(workshopShowcase.sliceWidth, imgHeight);
            }

            ws_cropImages(
                zip, // Send JSZip object for zipping the gifs
                cropCanvas, // Send CustomCanvas object used for cropping
                1, // Which image / slice is cropping, acts like a counter
                $('#resizeImage').is(':checked') // If the image is too small and needs to be resized
            );
        } else {
            let fileReader = new FileReader();
            fileReader.onload = function() {
                let gifData = gifuct.parseGIF(fileReader.result);
                let gifs = gifuct.decompressFrames(gifData, true);
                ws_cropGifs(
                    zip, // Send JSZip object for zipping the gifs
                    gifs, // Send the frames used for cropping
                    1, // Which image / slice is cropping, acts like a counter
                    $('#resizeImage').is(':checked') // If the image is too small and needs to be resized
                );
            }

            fileReader.readAsArrayBuffer(inputImage.file);
        }
    }
};

function ws_cropImages(zip, canvasEl, sliceNum, isImageSmall) { // Recursive function for cropping images
    let patcher = new FileReader();
    patcher.onload = function() {
        let binaryImage = patcher.result;
        binaryImage = binaryImage.substr(0, binaryImage.length - 1) + '\x21';
        zip.file(
            `${sliceNum}_${inputImage.file.name}`,
            window.btoa(binaryImage), {
                base64: true
            }
        );

        document.getElementById(`${sliceNum}`)
            .setAttribute('src', `data:image/jpeg;base64,${window.btoa(binaryImage)}`);

        if (sliceNum != 5) {
            ws_cropImages(zip, canvasEl, sliceNum + 1, isImageSmall);
        } else {
            // TODO: Fix 122 for small images
            return;
            inputImage.setStatusMsg("Creating zip file, please wait...");
            zip.generateAsync({
                type: "blob"
            }).then(function(content) {
                download(content, `${inputImage.file.name}_ws_${new Date().getTime()}.zip`);
                inputImage.setStatusMsg("Done");
            });
        }
    }

    if (isImageSmall) {
        let temp = new CustomCanvas(workshopShowcase.sliceWidth, inputImage.height);
        let previewHeight = getComputedValueFor(workshopShowcase.imgPreview[0], 'height') + 4;
        temp.addCanvas(inputImage.img, ws_getSliceOffset(sliceNum), workshopShowcase.sliderOffset);
        canvasEl.addCanvas(temp.canvas, 0, 0, canvasEl.canvas.width, previewHeight);
    } else {
        canvasEl.addCanvas(inputImage.img, ws_getSliceOffset(sliceNum), workshopShowcase.sliderOffset);
    }

    canvasEl.canvas.toBlob(function(blob) {
        // let t = new FileReader();
        // t.readAsDataURL(blob);
        // t.onload = () => {
        //     console.log(t.result);
        // }
        patcher.readAsBinaryString(blob);
    }, inputImage.file.type);
}


function ws_cropGifs(zip, gifs, currentSlice, isImageSmall) {
    // Recursive function for cropping gifs
    let patcher = new FileReader();
    patcher.onload = function() {
        let binaryImage = patcher.result;

        // Trim empty bytes and add 21 at the end
        for (let i = binaryImage.length - 1; i != 0; i--) {
            if (binaryImage.charAt(i) != '\x00') {
                binaryImage = binaryImage.substr(0, i) + '\x21';
                break;
            }
        }

        zip.file(
            `${currentSlice}_${inputImage.file.name}`,
            window.btoa(binaryImage), {
                base64: true
            }
        );

        document.getElementById(`${currentSlice}`)
            .setAttribute('src', `data:image/gif;base64,${window.btoa(binaryImage)}`);

        if (currentSlice != 5) {
            ws_cropGifs(zip, gifs, currentSlice + 1, isImageSmall);
        } else {
            return;
            inputImage.setStatusMsg("Creating zip file, please wait...");
            zip.generateAsync({
                type: "blob"
            }).then(function(content) {
                download(content, `${inputImage.file.name}_ws_${(new Date()).getTime()}.zip`);
                inputImage.setStatusMsg("Done");
            });
        }
    }

    let gifjs = new GIF({
        workers: 2,
        quality: 1,
        workerScript: "steam/js/gif.worker.js"
    });

    gifjs.on('progress', function(e) {
        inputImage.setStatusMsg(`Rendering gif ${currentSlice}/5 - ${(e*100).toFixed(0)}%`);
    })

    gifjs.on('finished', function(blob) {
        patcher.readAsBinaryString(blob);
    });

    // imgHeight is for it to check if the slider is enabled and to set it's height
    let imgHeight = !$('#toggleSlider').is(':checked') ? workshopShowcase.sliderHeight : inputImage.height;
    let background = new CustomCanvas(gifs[0].dims.width, gifs[0].dims.height);
    background.imageData(gifs[0].patch);
    let previewHeight = getComputedValueFor(workshopShowcase.imgPreview[0], 'height') + 4;

    for (let i = 0; i < gifs.length; i++) {
        let nextFrame = new CustomCanvas(gifs[i].dims.width, gifs[i].dims.height);
        nextFrame.imageData(gifs[i].patch);
        background.addCanvas(nextFrame.canvas, gifs[i].dims.left, gifs[i].dims.top);

        let frame;
        if (isImageSmall) {

            if (!$('#toggleSlider').is(':checked')) {
                frame = new CustomCanvas(123, getComputedValueFor(workshopShowcase.dragElem[0], 'height') + 4);
            } else {
                frame = new CustomCanvas(123, getComputedValueFor(workshopShowcase.imgPreview[0], 'height'));
            }

            let temp = new CustomCanvas(workshopShowcase.sliceWidth, inputImage.height);
            temp.addCanvas(background.canvas, ws_getSliceOffset(currentSlice), workshopShowcase.sliderOffset);
            frame.addCanvas(temp.canvas, 0, 0, frame.canvas.width, previewHeight);

        } else {
            frame = new CustomCanvas(workshopShowcase.sliceWidth, imgHeight);
            frame.addCanvas(background.canvas, ws_getSliceOffset(currentSlice), workshopShowcase.sliderOffset);
        }

        gifjs.addFrame(frame.canvas, {
            delay: gifs[i].delay ? gifs[i].delay : gifs[1].delay
        });
    }

    gifjs.render();
}

function ws_getSliceOffset(sliceNum) {
    switch (sliceNum) {
        case 1:
            return 0;
        case 2:
            return -(workshopShowcase.sliceWidth + workshopShowcase.gapWitdh);
        case 3:
            return -(workshopShowcase.sliceWidth + workshopShowcase.gapWitdh) * 2;
        case 4:
            return -(workshopShowcase.sliceWidth + workshopShowcase.gapWitdh) * 3;
        case 5:
            return -(inputImage.width - workshopShowcase.sliceWidth);
        default:
            return 0;
    }
}

// Make the orange area draggable and resizable
workshopShowcase.dragElem.draggable({
    containment: "#drag-container",
    scroll: false,
    axis: 'y'
});

document.getElementById('workshopTab').addEventListener('click', () => {
    workshopShowcase.fixHeight();
    changeTab(1, workshopShowcase.loadImage);
});
document.getElementById('toggleSlider').addEventListener('click', workshopShowcase.toggleSlider);
document.getElementById('togglePreview').addEventListener('click', workshopShowcase.togglePreview);
document.getElementById('downloadWorkshop').addEventListener('click', workshopShowcase.downloadImages);
document.getElementById('resizeImage').addEventListener('click', workshopShowcase.toggleOriginalImage);
document.getElementById('resetSlider').addEventListener('click', workshopShowcase.resetSlider);

module.exports = workshopShowcase.loadImage;