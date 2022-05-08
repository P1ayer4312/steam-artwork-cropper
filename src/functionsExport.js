function getComputedValueFor(element, parameter) { // Function for extracting pixel value from computed element's style
    return Math.round(parseFloat(getComputedStyle(element)[parameter].replace('px', '')));
}

const _URL = window.URL || window.webkitURL;

module.exports = {
	getComputedValueFor,
	_URL
}