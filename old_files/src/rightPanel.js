const rightPanel = {
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

rightPanel.artworkInfo.show();
module.exports = rightPanel;