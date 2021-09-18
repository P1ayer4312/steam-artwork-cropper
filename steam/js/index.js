const workshopArea = document.getElementById("workshopArea");
const artworkArea = document.getElementById("artworkArea");

// Used for tracking which tab is selected and which showcase is loaded
var tabInfo = {
    currentTab: '#artwork',
    artworkLoaded: false,
    workshopLoaded: false,
    reset: function () {
        this.artworkLoaded = false;
        this.workshopLoaded = false;
    }
}

if (window.location.href.includes("#workshop")) {
    workshopArea.style.removeProperty("display");
    tabInfo.currentTab = "#workshop";
    workshopShowcase.fixHeight();
    rightPanel.workshopInfo.show();
} else {
    artworkArea.style.removeProperty("display");
    rightPanel.artworkInfo.show();
}

document.getElementById("workshopLink").onclick = () => {
    artworkArea.style.setProperty("display", "none");
    workshopArea.style.removeProperty("display");
    workshopShowcase.fixHeight();
    tabInfo.currentTab = "#workshop";
    rightPanel.artworkInfo.hide();
    rightPanel.workshopInfo.show();
    if (!tabInfo.workshopLoaded) {
        workshopShowcase.loadImage();
        tabInfo.workshopLoaded = true;
    }
}

document.getElementById("artworkLink").onclick = () => {
    workshopArea.style.setProperty("display", "none");
    artworkArea.style.removeProperty("display");
    tabInfo.currentTab = "#artwork";
    rightPanel.workshopInfo.hide();
    rightPanel.artworkInfo.show();
    if (!tabInfo.artworkLoaded) {
        artworkShowcase.loadImage();
        tabInfo.artworkLoaded = true;
    }
}

console.log('%cHello', 'color: red; background-image: url("steam/spaghetti.jpg"); width: 300px; height: 300px');
