const rightPanel = require('./rightPanel');

// Used for tracking which tab is selected and which showcase is loaded
const tabInfo = {
    currentTab: '#artwork',
    artworkLoaded: false,
    workshopLoaded: false,
    reset: function() {
        this.artworkLoaded = false;
        this.workshopLoaded = false;
    }
}

// console.log(
//     '%cPowered by spaghetti',
//     `color: black;
//     font-weight: bold;
//     font-size: 20px;
//     background-image: url("https://raw.githubusercontent.com/P1ayer4312/p1ayer4312.github.io/main/steam-crop/steam/spaghetti.gif"); 
//     padding: 0 280px 245px 0`
// );

module.exports = tabInfo;