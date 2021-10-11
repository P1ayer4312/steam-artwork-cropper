let workshopShowcase = {
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
    resetSlider: function () { // Reset slider's height and position
        this.dragElem.css({
            top: `${-(this.getImgHeight() - 2)}px`,
            height: '118px'
        }).resizable({
            minHeight: 118,
            maxHeight: getComputedValueFor(document.getElementById('img-preview'), 'height') - 4,
            handles: 's, n'
        });
    },
    resetImagePreview: function () { // Reset the image preview's width and height back to original size
        this.previewBox.css('width', '632px');
        this.imgPreview.css('width', '626px');
        $('#toggleSlider').prop('disabled', false);
        this.fixHeight();
    },
    showOriginalImagePreview: function () { // Display a preview of what a small image would look like on the workshop showcase
        let adjustWidth = inputImage.width + 8;
        this.smallImageWarning.show();
        this.previewBox.css('width', `${adjustWidth + 2}px`);
        this.imgPreview.css('width', `${adjustWidth}px`);
        $('#toggleSlider').prop('disabled', true);
        this.fixHeight();
    },
    fixHeight: function () {
        // Fix to remove the empty space below the preview created by
        // the draggable element and reset it's location back to the top
        this.dragContainer.css('height', getComputedStyle(document.getElementById('img-preview')).height);
        this.previewBox.css('height', '');
        $('#togglePreview').prop('disabled', true);
        $('#toggleSlider').prop('checked', true);
        this.dragElem.hide();
        this.resetSlider();
    },
    getImgHeight: function () {
        return this.imgPreview.height() + 2;
    },
    togglePreview: function () { // Toggle a preview of how would the picture look as Workshop Items
        if ($('#togglePreview').is(':checked')) {
            this.dragElem.hide();
            this.previewBox.css('height', this.dragElem.css('height'));
            this.dragContainer.css('bottom', `${this.getImgHeight() + parseInt($('#drag-elem').css('top').replace('px', ''))}px`);
            $('#toggleSlider').prop('disabled', true);
        } else {
            if (!$('#toggleSlider').is(':checked'))
                this.dragElem.show();

            this.previewBox.css('height', '');
            this.dragContainer.css('bottom', '');
            $('#toggleSlider').prop('disabled', false);
        }
    },
    toggleSlider: function () { // Toggle the slider's visibility and disable the 'togglePreview' checkbox
        if (this.dragElem.css('display') == 'none') {
            this.dragElem.css({
                'display': ''
            });
            $('#togglePreview').prop('disabled', false);
        } else {
            this.dragElem.css({
                'display': 'none'
            });
            $('#togglePreview').prop('disabled', true);
        }
    },
    toggleOriginalImage: function () { // Toggle a preview of what the image would look like with it's original size and resized
        if ($('#resizeImage').is(':checked'))
            this.resetImagePreview();
        else
            this.showOriginalImagePreview();
    },
    loadImage: function () {
        inputImage.img.onload = function () {
            inputImage.width = this.width;
            inputImage.height = this.height;
            rightPanel.originalSize.innerText = `${this.width} x ${this.height}`;
            workshopShowcase.toggleSquare = true;
            workshopShowcase.imgPreview.attr('src', inputImage.img.src);
            workshopShowcase.reset();
        }

        if (inputImage.file != null)
            inputImage.img.src = _URL.createObjectURL(inputImage.file);
    },
    reset: function () {
        this.resetImagePreview();
        this.smallImageWarning.hide();
        this.steamHeight = getComputedValueFor(this.imgPreview[0], 'height');
        this.sliceWidth = Math.round((122 * inputImage.width) / 626);
        this.gapWitdh = Math.round((inputImage.width - (this.sliceWidth * 5)) / 4);
        this.previewBox.css('height', '');
        this.dragContainer.css('bottom', '');
        $('#togglePreview').prop('checked', false);

        if (this.sliceWidth < 122 || inputImage.height < 122) {
            this.showOriginalImagePreview();
            $('#resizeImage').prop('checked', false);
        } else
            this.resetImagePreview();

    },
    downloadImages: function () {
        if (inputImage.file == null) {
            alert("Please select an image first!");
            return;
        }
        inputImage.setStatusMsg("Cropping images, please wait...");

        let zip = new JSZip();
        zip.file("readme.txt", "Make sure to follow the guide on how to upload longer images :)");

        document.getElementById('test').innerHTML = "";

        if (!$('#toggleSlider').is(':checked')) { // If the slider is enabled
            if ($('#togglePreview').is(':checked'))
                $('#togglePreview').click();
            
            workshopShowcase.sliderHeight = Math.round(((workshopShowcase.dragElem.height() + 4) * inputImage.width) / 626);
            workshopShowcase.sliderOffset = Math.round((workshopShowcase.dragElem.position().top * inputImage.width) / -626);
        } else
            workshopShowcase.sliderOffset = 0;

        if (inputImage.file.type != 'image/gif') {
            let imgHeight = !$('#toggleSlider').is(':checked') ? workshopShowcase.sliderHeight : inputImage.height;
            let cropCanvas;

            if ($('#resizeImage').is(':checked')) { // Stretch the slices to fit whole showcase width

                if (!$('#toggleSlider').is(':checked'))
                    cropCanvas = new CustomCanvas(122, getComputedValueFor(workshopShowcase.dragElem[0], 'height') + 4);
                else
                    cropCanvas = new CustomCanvas(122, getComputedValueFor(workshopShowcase.imgPreview[0], 'height'));

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
            fileReader.onload = function () {
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
    patcher.onload = function () {
        let binaryImage = patcher.result;
        binaryImage = binaryImage.substr(0, binaryImage.length - 1) + '\x21';
        zip.file(
            `${sliceNum}_${inputImage.file.name}`,
            window.btoa(binaryImage), {
                base64: true
            }
        );

        if (sliceNum != 5) {
            ws_cropImages(zip, canvasEl, sliceNum + 1, isImageSmall);
        } else {
            inputImage.setStatusMsg("Creating zip file, please wait...");
            zip.generateAsync({
                type: "blob"
            }).then(function (content) {
                download(content, `${inputImage.file.name}_ws_${new Date().getTime()}.zip`);
                inputImage.setStatusMsg("Done");
            });
        }
    }

    if (isImageSmall) {
        let temp = new CustomCanvas(workshopShowcase.sliceWidth, inputImage.height);
        let previewHeight = getComputedValueFor(workshopShowcase.imgPreview[0], 'height') + 4;

        // let k = new CustomCanvas(canvasEl.canvas.width, canvasEl.canvas.height, true);
        temp.addCanvas(inputImage.img, ws_getSliceOffset(sliceNum), workshopShowcase.sliderOffset);
        canvasEl.addCanvas(temp.canvas, 0, 0, canvasEl.canvas.width, previewHeight);

        // k.addCanvas(canvasEl.canvas, 0, 0);

        // document.getElementById('test').appendChild(k.canvas);
        // if (sliceNum != 5) 
        //     ws_cropImages(zip, canvasEl, sliceNum + 1, isImageSmall);

        // return;
    } else
        canvasEl.addCanvas(inputImage.img, ws_getSliceOffset(sliceNum), workshopShowcase.sliderOffset);

    canvasEl.canvas.toBlob(function (blob) {
        patcher.readAsBinaryString(blob);
    }, inputImage.file.type);
}


function ws_cropGifs(zip, gifs, currentSlice, isImageSmall) {
    // Recursive function for cropping gifs
    let patcher = new FileReader();
    patcher.onload = function () {
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

        if (currentSlice != 5) {
            ws_cropGifs(zip, gifs, currentSlice + 1, isImageSmall);
        } else {
            inputImage.setStatusMsg("Creating zip file, please wait...");
            zip.generateAsync({
                type: "blob"
            }).then(function (content) {
                download(content, `${inputImage.file.name}_ws_${new Date().getTime()}.zip`);
                inputImage.setStatusMsg("Done");
            });
        }
    }

    let gifjs = new GIF({
        workers: 2,
        quality: 1,
        workerScript: "steam/js/gif.js-master/dist/gif.worker.js"
    });

    gifjs.on('progress', function (e) {
        inputImage.setStatusMsg(`Rendering gif ${currentSlice}/5 - ${(e*100).toFixed(0)}%`);
    })

    gifjs.on('finished', function (blob) {
        patcher.readAsBinaryString(blob);
        // document.getElementById('test').innerHTML += `<img src="${URL.createObjectURL(blob)}">`;
        // if (currentSlice != 5) 
        //     ws_cropGifs(zip, gifs, currentSlice + 1, isImageSmall);
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
            
            if (!$('#toggleSlider').is(':checked'))
                frame = new CustomCanvas(122, getComputedValueFor(workshopShowcase.dragElem[0], 'height') + 4);
            else
                frame = new CustomCanvas(122, getComputedValueFor(workshopShowcase.imgPreview[0], 'height'));

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

function prev(name) {
    document.getElementById('1').setAttribute('src', `1_${name}`);
    document.getElementById('2').setAttribute('src', `2_${name}`);
    document.getElementById('3').setAttribute('src', `3_${name}`);
    document.getElementById('4').setAttribute('src', `4_${name}`);
    document.getElementById('5').setAttribute('src', `5_${name}`);

}