let player;
let cursors;
let walls;
let cookies;

export const gameState = {
  setPlayer(newPlayer) {
    player = newPlayer;
  },
  getPlayer() {
    return player;
  },
  
  setCursors(newCursors) {
    cursors = newCursors;
  },
  
  getCursors() {
    return cursors;
  },
  
  setWalls(newWalls) {
    walls = newWalls;
  },
  getWalls() {
    return walls;
  },
  
  setCookies(newCookies) {
    cookies = newCookies;
  },
  getCookies() {
    return cookies;
  },
};