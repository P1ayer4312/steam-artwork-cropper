
let workshopShowcase = {
    previewBox: $('#preview-box'), // Used for giving a preview of the slider area
    dragContainer: $('#drag-container'), // Huh... can't remember what this is for xD
    dragElem: $('#drag-elem'), // Selector for the orange slider element
    imgPreview: $('#img-preview'), // The <img> element where the image is shown
    steamHeight: 0, // Height of the image displayed on the Workshop showcase
    steamWidth: 626, // Width of the image displayed on the Workshop showcase
    sliceWidth: 0, // Width of the "Workshop Item"
    gapWitdh: 0, // Width of the gap between the images
    resetSlider: function () { // Reset slider's height and position
        this.dragElem.css({
            top: `${-(this.getImgHeight()-2)}px`,
            height: '122px'
        });
    },
    fixHeight: function () {
        // Fix to remove the empty space below the preview created by
        // the draggable element and reset it's location back to the top
        this.dragContainer.css('height', getComputedStyle(document.getElementById('img-preview')).height);
        this.previewBox.css('height', '');
        this.dragContainer.css('bottom', '');
        $('#togglePreview').prop('checked', false);
        $('#toggleSlider').prop('disabled', false);
        if (!$('#toggleSlider').is(':checked'))
            this.dragElem.show();

        this.resetSlider();
    },
    getImgHeight: function () {
        return parseInt($('#img-preview').css('height').replace('px', '')) + 2;
    },
    togglePreview: function () { // Toggle a preview of how would the picture look as Workshop Items
        if ($('#togglePreview').is(':checked')) {
            let sliderHeight = this.dragElem.css('height');
            this.dragElem.hide();
            this.previewBox.css('height', sliderHeight);
            this.dragContainer.css('bottom', `${this.getImgHeight() + parseInt( $('#drag-elem').css('top').replace('px', '') )}px`);
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
        this.fixHeight();
        this.steamHeight = getComputedValueFor(this.imgPreview[0], 'height');
        this.sliceWidth = Math.round((122 * inputImage.width) / this.steamWidth);
        this.gapWitdh = Math.round((inputImage.width - (this.sliceWidth * 5)) / 4);
    },
    downloadImages: function () {
        if (inputImage.file == null) {
            alert("Please select an image first!");
            return;
        }
        inputImage.setStatusMsg("Cropping images, please wait...");
        let cropCanvas = new CustomCanvas(workshopShowcase.sliceWidth, inputImage.height);
        let zip = new JSZip();
        ws_cropImages(
            zip, // Send JSZip object for zipping the gifs
            cropCanvas, // Send CustomCanvas object used for cropping
            1 // Which image / slice is cropping, acts like a counter
        );
    }
};

function ws_cropImages(zip, canvasEl, sliceNum) { // Recursive function for cropping images
    
    let patcher = new FileReader();
    patcher.onload = function () {
        let binaryImage = patcher.result;
        binaryImage = binaryImage.substr(0, binaryImage.length - 2) + '!';
        zip.file(
            `${sliceNum}_${inputImage.file.name}`,
            window.btoa(binaryImage), {
                base64: true
            }
        );

        if (sliceNum != 5)
            ws_cropImages(zip, canvasEl, sliceNum + 1);
        else {
            inputImage.setStatusMsg("Creating zip file, please wait...");
            zip.generateAsync({
                type: "blob"
            }).then(function (content) {
                download(content, `${inputImage.file.name}_ws_${new Date().getTime()}.zip`);
                inputImage.setStatusMsg("Done");
            });
        }
    }

    zip.file("readme.txt", "Make sure to follow the guide on how to upload longer images :)");

    switch (sliceNum) {
        case 1:
            canvasEl.addCanvas(inputImage.img, 0, 0);
            break;
        case 2:
            canvasEl.addCanvas(inputImage.img, -(workshopShowcase.sliceWidth + workshopShowcase.gapWitdh), 0);
            break;
        case 3:
            canvasEl.addCanvas(inputImage.img, -(workshopShowcase.sliceWidth + workshopShowcase.gapWitdh) * 2, 0);
            break;
        case 4:
            canvasEl.addCanvas(inputImage.img, -(workshopShowcase.sliceWidth + workshopShowcase.gapWitdh) * 3, 0);
            break;
        case 5:
            canvasEl.addCanvas(inputImage.img, -(inputImage.width - workshopShowcase.sliceWidth), 0);
            break;
        default:
            break;
    }

    canvasEl.canvas.toBlob(function (blob) {
        patcher.readAsBinaryString(blob);
    }, inputImage.file.type);

}

// Make the orange area draggable and resizable
workshopShowcase.dragElem.draggable({
    containment: "#drag-container",
    scroll: false,
    axis: 'y'
}).resizable({
    minHeight: 122,
    handles: 's, n'
});

function testFunc() {
    let temp = new CustomCanvas(workshopShowcase.sliceWidth, inputImage.height);
    temp.addCanvas(inputImage.img, 0, 0);
    // document.getElementById('test').appendChild(temp.canvas);
    document.getElementById('1').src = temp.toDataURL('image/png', 1);
    // temp.canvas.style.setProperty('margin-right', '4px');

    let temp2 = new CustomCanvas(workshopShowcase.sliceWidth, inputImage.height);
    temp2.addCanvas(inputImage.img, -(workshopShowcase.sliceWidth + workshopShowcase.gapWitdh), 0);
    // document.getElementById('test').appendChild(temp2.canvas);
    // temp2.canvas.style.setProperty('margin-right', '4px');
    document.getElementById('2').src = temp2.toDataURL('image/png', 1);

    let temp3 = new CustomCanvas(workshopShowcase.sliceWidth, inputImage.height);
    temp3.addCanvas(inputImage.img, -(workshopShowcase.sliceWidth + workshopShowcase.gapWitdh) * 2, 0);
    // document.getElementById('test').appendChild(temp3.canvas);
    // temp3.canvas.style.setProperty('margin-right', '4px');
    document.getElementById('3').src = temp3.toDataURL('image/png', 1);

    let temp4 = new CustomCanvas(workshopShowcase.sliceWidth, inputImage.height);
    temp4.addCanvas(inputImage.img, -(workshopShowcase.sliceWidth + workshopShowcase.gapWitdh) * 3, 0);
    // document.getElementById('test').appendChild(temp4.canvas);
    // temp4.canvas.style.setProperty('margin-right', '4px');
    document.getElementById('4').src = temp4.toDataURL('image/png', 1);

    let temp5 = new CustomCanvas(workshopShowcase.sliceWidth, inputImage.height);
    temp5.addCanvas(inputImage.img, -(inputImage.width - workshopShowcase.sliceWidth), 0);
    // document.getElementById('test').appendChild(temp5.canvas);
    // temp5.canvas.style.setProperty('margin-right', '4px');
    document.getElementById('5').src = temp5.toDataURL('image/png', 1);
}

function tr() {
    document.getElementById('test').innerHTML = "";
}