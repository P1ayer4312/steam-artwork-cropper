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

window.onhashchange = function () {
    if (window.location.href.includes("#workshop")) {
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
    } else { // #artwork
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
}

console.log(
    '%cPowered by spaghetti', 
    `color: black;
    font-weight: bold;
    font-size: 20px;
    background-image: url("https://raw.githubusercontent.com/P1ayer4312/p1ayer4312.github.io/main/steam-crop/steam/spaghetti.gif"); 
    padding: 0 280px 245px 0`
);