// Information about the image selected to be cropped
const inputImage = {
    selectedImage: document.getElementById('selectedImage'), // Input file DOM element
    file: null, // Quick access to the selected file
    img: null, // Image object that stores the image src
    width: 0,
    height: 0,
    setStatusMsg: function(message) { // Show status of what is going on in the background
        document.getElementById('statusMsg').innerText = message;
    }
}

inputImage.img = new Image();
inputImage.img.onerror = function() {
    alert("Please select an image.\n\nInvalid file type: " + inputImage.file.type);
};

module.exports = inputImage;