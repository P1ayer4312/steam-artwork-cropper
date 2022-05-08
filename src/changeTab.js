const workshopArea = document.getElementById("workshopArea");
const artworkArea = document.getElementById("artworkArea");
const tabInfo = require('./tabInfo');
const rightPanel = require('./rightPanel');
/**
 * 0 - Show Artwork Tab
 * 1 - Show Workshop Tab
 * @param {Number} tabNum
 * @param {Function} callback Load image function
 */
 function changeTab(tabNum, callback) {
    if (tabNum == 1) {
        artworkArea.style.setProperty("display", "none");
        workshopArea.style.removeProperty("display");
        tabInfo.currentTab = "#workshop";
        rightPanel.artworkInfo.hide();
        rightPanel.workshopInfo.show();
        if (!tabInfo.workshopLoaded) {
            // workshopShowcase.loadImage();
            callback();
            tabInfo.workshopLoaded = true;
        }
    } else {
        workshopArea.style.setProperty("display", "none");
        artworkArea.style.removeProperty("display");
        tabInfo.currentTab = "#artwork";
        rightPanel.workshopInfo.hide();
        rightPanel.artworkInfo.show();
        if (!tabInfo.artworkLoaded) {
            // artworkShowcase.loadImage();
            callback();
            tabInfo.artworkLoaded = true;
        }
    }
}

module.exports = changeTab;