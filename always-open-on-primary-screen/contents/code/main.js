/*
KWin Script Always Open on Primary Screen
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/

// primary screen is 0'th
primaryScreen = 0;

// when a client is added
workspace.clientAdded.connect(function(client) {
    if (!client || client.resourceClass == "plasmashell" || client.resourceClass == "krunner") return;
    if (client.screen == primaryScreen) return;

    // move client to primary screen
    console.debug("sending client", client.caption, "to primary screen", primaryScreen);
    workspace.sendClientToScreen(client, primaryScreen);

    // clip and move client into bounds of screen dimensions
    if (!(client.moveable && client.resizeable)) return;
    area = workspace.clientArea(KWin.MaximizeArea, client);
    // window width/height maximally screen width/height
    client.geometry.width = Math.min(client.width, area.width);
    client.geometry.height = Math.min(client.height, area.height);
    // left/top window edge between left and right/top and bottom screen edges
    client.geometry.x = Math.max(area.x, Math.min(area.x + area.width - client.width, client.x));
    client.geometry.y = Math.max(area.y, Math.min(area.y + area.height - client.height, client.y));
});
