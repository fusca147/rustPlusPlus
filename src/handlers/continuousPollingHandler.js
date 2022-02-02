const CargoShip = require('../inGameEvents/cargoShip.js');
const Explosion = require('../inGameEvents/explosion.js');
const LockedCrate = require('../inGameEvents/lockedCrate.js');
const OilRig = require('../inGameEvents/oilRig.js');
const PatrolHelicopter = require('../inGameEvents/patrolHelicopter.js');
const VendingMachine = require('../inGameEvents/vendingMachine.js');

module.exports = {
    continuousPollingHandler: function (rustplus, client) {
        /* Continuous polling of server info, map markers, team info and time. */
        rustplus.getInfo((info) => {
            rustplus.getMapMarkers((mapMarkers) => {
                rustplus.getTeamInfo((teamInfo) => {
                    rustplus.getTime((time) => {
                        module.exports.checkEvents(rustplus, client, info, mapMarkers, teamInfo, time);
                        rustplus.firstPoll = false;
                    });
                });
            });
        });
    },

    checkEvents: function (rustplus, client, info, mapMarkers, teamInfo, time) {
        /* Check in-game events */
        CargoShip.checkEvent(rustplus, client, info, mapMarkers, teamInfo, time);
        PatrolHelicopter.checkEvent(rustplus, client, info, mapMarkers, teamInfo, time);
        Explosion.checkEvent(rustplus, client, info, mapMarkers, teamInfo, time);
        LockedCrate.checkEvent(rustplus, client, info, mapMarkers, teamInfo, time);
        OilRig.checkEvent(rustplus, client, info, mapMarkers, teamInfo, time);
        VendingMachine.checkEvent(rustplus, client, info, mapMarkers, teamInfo, time);
    },
};