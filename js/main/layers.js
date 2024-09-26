let tmp = {};
tmp.number = E(1);
tmp.multi = E(1);
tmp.statsPerSecond = E(0.01);
tmp.rank = E(1);
tmp.layerRequired = E(5);
tmp.multiRequirement = E(625);
tmp.rankRequirement = E(2);
tmp.layer = "";
let layers = [
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
]
function rainbowTransition(hue,saturation=80,luminence=80) {
  hue = E(hue).floor();
  saturation = Math.floor(saturation);
  luminance = Math.floor(luminence);
  return `hsl(${hue.add(1).mod(360)}, ${Math.floor(saturation)}%, ${Math.floor(luminance)}%)`;
}
function Layer(n) {
  n = n.floor();
  let k = "";
  if (n.gte(E(52).mul(E(53).pow(1e10)))) {
    k = "[" + formatNumber(n.log(53).floor()) + " letters]"
  } else if (n.gte(52*(53**25))) {
    k = "[Layer " + formatNumber(n) + ", " + n.mul(52).log(53).floor() + " letters]"
  } else if (n.gte(52*53)) {
    k = Layer(n.div(53).floor()) + Layer(n.mod(53))
  } else if (n.gte(52)) {
    k = layers[1][n.div(52).floor()] + Layer(n.mod(52))
  } else if (n.gte(0)) {
    k = layers[0][n];
  } else {
    k = " "
  }
  return k;
}
function AbsLayerum(n) {
  return "<small style=\"color: #f77;\">Epilepsy warning when you get high stats!</small> "
  + "<small style=\"color: #7f7;\">This is based of Samir's AFK Incremental in Roblox!</small>"
  + "<p><small>You have </small>"
  + (n.gte(tmp.layerRequired.pow(52*(53**9))) ? "" : formatNumber(n.div(tmp.layerRequired.pow(n.log(tmp.layerRequired).floor()))))
  + "<small style=\"color: "
  + rainbowTransition(n.add(tmp.layerRequired).log(tmp.layerRequired).mul(5).floor().root(1.5))
  + ";\">"
  + Layer(n.log(tmp.layerRequired))
  + ".</small> "
  + (tmp.number.gte(5) ? ("<tiny>This is also " + formatNumber(tmp.number) + " a.</tiny>") : "")
  + " <small>(+" 
  + formatNumber(tmp.statsPerSecond)
  + " stats/sec)</small>"
}
function AbsLayerumNotation(n) {
  return (n.gte(tmp.layerRequired.pow(52*(53**9))) ? "" : formatNumber(n.div(tmp.layerRequired.pow(n.log(tmp.layerRequired).floor()))))
  + Layer(n.log(tmp.layerRequired))
}
function stats() {
  return "<p>"
  + "<small style=\"color: #f99;\">x" + formatNumber(tmp.multi) + " Multiplier</small>"
  + "<button style=\"background-color: #fcc; color: #b88; width: 200px; height: 100px; font-size: 20px;\" onclick=\"multiply()\">"
  + (tmp.number.lt(tmp.multiRequirement) ? "Can't Reset" : ("Reset for x" + formatNumber(tmp.number.log(6).div(tmp.multi.mul(6).log(6)).mul(E(2).pow(tmp.rank.sub(1))).root(2).div(15)) + " Multi")
  + "</button>"
  + "<p>"
  + "<small style=\"color: #9f9;\">Rank " + formatNumber(tmp.rank) + "</small>"
  + "<button style=\"background-color: #cfc; color: #8b8; width: 200px; height: 100px; font-size: 20px;\" onclick=\"rankup()\">"
  + (tmp.multi.lt(tmp.rankRequirement) ? "Can't Rank up" : "Rank up!")
  + "</button>"
}
function multiply() {
  if (tmp.number.gte(tmp.multiRequirement)) {
    tmp.multi = tmp.multi.add(tmp.number.log(6).div(tmp.multi.mul(6).log(6)).mul(E(2).pow(tmp.rank.sub(1))).root(2).div(15));//yes
    tmp.number = E(1); // Reset Back to 1 a.
  }
}
function rankup() {
  if (tmp.multi.gte(tmp.rankRequirement)) {
    tmp.rank = tmp.rank.add(1);
    tmp.rankRequirement = tmp.rankRequirement.mul(8).floor();
    tmp.number = E(1); // Reset Back to 1 a. (again)
    tmp.multi = E(1); // Reset Back to x1 Multi.
  }
}
function update() {
  tmp.number = tmp.number.mul(E(5).pow(tmp.statsPerSecond.div(60)));
  tmp.statsPerSecond = tmp.multi.div(E(10).div(tmp.number.add(6).log(6).log(2))).mul(E(2).pow(tmp.rank.sub(1)))
  tmp.layer = AbsLayerum(tmp.number);
  document.getElementById("app").innerHTML = `${tmp.layer + stats()}`;
}
setInterval(update, 16);
