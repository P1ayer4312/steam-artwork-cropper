/*
TODO: 
 - vertikalni linii +
 - crop opcija
 - patch ??
 - ischisti UI
*/

// Link workshopShowcase elements and some control values
const workshopShowcase = {
    previewBox: $('#preview-box'),
    dragContainer: $('#drag-container'),
    dragElem: $('#drag-elem'),
    imgPreview: $('#img-preview'),
    resetSlider: function () {
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
    togglePreview: function () {
        // Toggle a preview of how would the picture look as Workshop Items
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
    toggleSlider: function () {
        if (this.dragElem.css('display') == 'none')
            this.dragElem.css({'display': ''});
        else
            this.dragElem.css({'display': 'none'});
    },
    loadImage: function () {
        inputImage.img.onload = function () {
            workshopShowcase.toggleSquare = true;
            workshopShowcase.togglePreview();
            workshopShowcase.imgPreview.attr('src', inputImage.img.src);
            workshopShowcase.fixHeight();
        }
        
        if (inputImage.file != null)
            inputImage.img.src = _URL.createObjectURL(inputImage.file);
    }
};

// Make the orange area dragable
workshopShowcase.dragElem.draggable({
    containment: "#drag-container",
    scroll: false,
    axis: 'y',
    stop: function () {
        //console.log(this.style.top)
    }
});
workshopShowcase.dragElem.resizable({
    minHeight: 122,
    handles: 's, n'
});


// workshopShowcase.selectedImage.onchange = function () {

//     // Check if the image file is valid and it's an image
//     let image = new Image();
//     image.src = _URL.createObjectURL(workshopShowcase.selectedImage.files[0]);
//     image.onerror = function () {
//         alert("Please select a valid image!");
//     }
//     image.onload = function () {
//         workshopShowcase.toggleSquare = true;
//         workshopShowcase.togglePreview();
//         workshopShowcase.imgPreview.attr('src', image.src);
//         workshopShowcase.fixHeight();
//     }
// }