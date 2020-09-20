import { Map } from "./entities/map.js";
import { Bot } from "./entities/bot.js";
import { Tank } from "./entities/tank.js";
import { Spawn } from "./entities/spawn.js";
import { Explosion } from "./entities/explosion.js";
import { Renderer } from "./entities/renderer.js";
import { Boost } from "./entities/boost.js";
import { Shield } from "./entities/shield.js";

const cellSize = 32,
  width = 13,
  height = 13;
const app = new PIXI.Application({
  width: width * cellSize,
  height: height * cellSize,
  backgroundColor: 0x000000,
});

app.loader.baseUrl = "assets";
app.loader
  .add("sprite001", "base.png")
  .add("sprite002", "base_destroyed.png")
  .add("sprite003", "big_explosion0.png")
  .add("sprite004", "big_explosion1.png")
  .add("sprite005", "big_explosion2.png")
  .add("sprite006", "big_explosion3.png")
  .add("sprite007", "big_explosion4.png")
  .add("sprite008", "brick.png")
  .add("sprite009", "bullet0.png")
  .add("sprite010", "bullet1.png")
  .add("sprite011", "bullet2.png")
  .add("sprite012", "bullet3.png")
  .add("sprite013", "bullet_explosion0.png")
  .add("sprite014", "bullet_explosion1.png")
  .add("sprite015", "bullet_explosion2.png")
  .add("sprite016", "enemy_armor_0_0_0_0.png")
  .add("sprite017", "enemy_armor_0_0_0_1.png")
  .add("sprite018", "enemy_armor_0_0_1.png")
  .add("sprite019", "enemy_armor_0_0_1_1.png")
  .add("sprite020", "enemy_armor_0_1_0_0.png")
  .add("sprite021", "enemy_armor_0_1_1.png")
  .add("sprite022", "enemy_armor_0_2_0_0.png")
  .add("sprite023", "enemy_armor_0_2_1.png")
  .add("sprite024", "enemy_armor_1_0_0_0.png")
  .add("sprite025", "enemy_armor_1_0_0_1.png")
  .add("sprite026", "enemy_armor_1_0_1.png")
  .add("sprite027", "enemy_armor_1_0_1_1.png")
  .add("sprite028", "enemy_armor_1_1_0_0.png")
  .add("sprite029", "enemy_armor_1_1_1.png")
  .add("sprite030", "enemy_armor_1_2_0_0.png")
  .add("sprite031", "enemy_armor_1_2_1.png")
  .add("sprite032", "enemy_armor_2_0_0_0.png")
  .add("sprite033", "enemy_armor_2_0_0_1.png")
  .add("sprite034", "enemy_armor_2_0_1.png")
  .add("sprite035", "enemy_armor_2_0_1_1.png")
  .add("sprite036", "enemy_armor_2_1_0_0.png")
  .add("sprite037", "enemy_armor_2_1_1.png")
  .add("sprite038", "enemy_armor_2_2_0_0.png")
  .add("sprite039", "enemy_armor_2_2_1.png")
  .add("sprite040", "enemy_armor_3_0_0_0.png")
  .add("sprite041", "enemy_armor_3_0_0_1.png")
  .add("sprite042", "enemy_armor_3_0_1.png")
  .add("sprite043", "enemy_armor_3_0_1_1.png")
  .add("sprite044", "enemy_armor_3_1_0_0.png")
  .add("sprite045", "enemy_armor_3_1_1.png")
  .add("sprite046", "enemy_armor_3_2_0_0.png")
  .add("sprite047", "enemy_armor_3_2_1.png")
  .add("sprite048", "enemy_basic_0_0_0_0.png")
  .add("sprite049", "enemy_basic_0_0_0_1.png")
  .add("sprite050", "enemy_basic_0_0_1.png")
  .add("sprite051", "enemy_basic_0_0_1_1.png")
  .add("sprite052", "enemy_basic_1_0_0_0.png")
  .add("sprite053", "enemy_basic_1_0_0_1.png")
  .add("sprite054", "enemy_basic_1_0_1.png")
  .add("sprite055", "enemy_basic_1_0_1_1.png")
  .add("sprite056", "enemy_basic_2_0_0_0.png")
  .add("sprite057", "enemy_basic_2_0_0_1.png")
  .add("sprite058", "enemy_basic_2_0_1.png")
  .add("sprite059", "enemy_basic_2_0_1_1.png")
  .add("sprite060", "enemy_basic_3_0_0_0.png")
  .add("sprite061", "enemy_basic_3_0_0_1.png")
  .add("sprite062", "enemy_basic_3_0_1.png")
  .add("sprite063", "enemy_basic_3_0_1_1.png")
  .add("sprite064", "enemy_fast_0_0_0_0.png")
  .add("sprite065", "enemy_fast_0_0_0_1.png")
  .add("sprite066", "enemy_fast_0_0_1.png")
  .add("sprite067", "enemy_fast_0_0_1_1.png")
  .add("sprite068", "enemy_fast_1_0_0_0.png")
  .add("sprite069", "enemy_fast_1_0_0_1.png")
  .add("sprite070", "enemy_fast_1_0_1.png")
  .add("sprite071", "enemy_fast_1_0_1_1.png")
  .add("sprite072", "enemy_fast_2_0_0_0.png")
  .add("sprite073", "enemy_fast_2_0_0_1.png")
  .add("sprite074", "enemy_fast_2_0_1.png")
  .add("sprite075", "enemy_fast_2_0_1_1.png")
  .add("sprite076", "enemy_fast_3_0_0_0.png")
  .add("sprite077", "enemy_fast_3_0_0_1.png")
  .add("sprite078", "enemy_fast_3_0_1.png")
  .add("sprite079", "enemy_fast_3_0_1_1.png")
  .add("sprite080", "enemy_power_0_0_0_0.png")
  .add("sprite081", "enemy_power_0_0_0_1.png")
  .add("sprite082", "enemy_power_0_0_1.png")
  .add("sprite083", "enemy_power_0_0_1_1.png")
  .add("sprite084", "enemy_power_1_0_0_0.png")
  .add("sprite085", "enemy_power_1_0_0_1.png")
  .add("sprite086", "enemy_power_1_0_1.png")
  .add("sprite087", "enemy_power_1_0_1_1.png")
  .add("sprite088", "enemy_power_2_0_0_0.png")
  .add("sprite089", "enemy_power_2_0_0_1.png")
  .add("sprite090", "enemy_power_2_0_1.png")
  .add("sprite091", "enemy_power_2_0_1_1.png")
  .add("sprite092", "enemy_power_3_0_0_0.png")
  .add("sprite093", "enemy_power_3_0_0_1.png")
  .add("sprite094", "enemy_power_3_0_1.png")
  .add("sprite095", "enemy_power_3_0_1_1.png")
  .add("sprite096", "gameOver.png")
  .add("sprite097", "logo.png")
  .add("sprite098", "powerup_grenade.png")
  .add("sprite099", "powerup_helmet.png")
  .add("sprite100", "powerup_shovel.png")
  .add("sprite101", "powerup_star.png")
  .add("sprite102", "powerup_tank.png")
  .add("sprite103", "powerup_timer.png")
  .add("sprite104", "shield0.png")
  .add("sprite105", "shield1.png")
  .add("sprite106", "spawn0.png")
  .add("sprite107", "spawn1.png")
  .add("sprite108", "spawn2.png")
  .add("sprite109", "spawn3.png")
  .add("sprite110", "steel.png")
  .add("sprite111", "tank.png")
  .add("sprite112", "tank_0_0_0.png")
  .add("sprite113", "tank_0_0_1.png")
  .add("sprite114", "tank_0_0_2.png")
  .add("sprite115", "tank_0_0_3.png")
  .add("sprite116", "tank_0_1_0.png")
  .add("sprite117", "tank_0_1_1.png")
  .add("sprite118", "tank_0_1_2.png")
  .add("sprite119", "tank_0_1_3.png")
  .add("sprite120", "tank_1_0_0.png")
  .add("sprite121", "tank_1_0_1.png")
  .add("sprite122", "tank_1_0_2.png")
  .add("sprite123", "tank_1_0_3.png")
  .add("sprite124", "tank_1_1_0.png")
  .add("sprite125", "tank_1_1_1.png")
  .add("sprite126", "tank_1_1_2.png")
  .add("sprite127", "tank_1_1_3.png")
  .add("sprite128", "tank_2_0_0.png")
  .add("sprite129", "tank_2_0_1.png")
  .add("sprite130", "tank_2_0_2.png")
  .add("sprite131", "tank_2_0_3.png")
  .add("sprite132", "tank_2_1_0.png")
  .add("sprite133", "tank_2_1_1.png")
  .add("sprite134", "tank_2_1_2.png")
  .add("sprite135", "tank_2_1_3.png")
  .add("sprite136", "tank_3_0_0.png")
  .add("sprite137", "tank_3_0_1.png")
  .add("sprite138", "tank_3_0_2.png")
  .add("sprite139", "tank_3_0_3.png")
  .add("sprite140", "tank_3_1_0.png")
  .add("sprite141", "tank_3_1_1.png")
  .add("sprite142", "tank_3_1_2.png")
  .add("sprite143", "tank_3_1_3.png")
  .add("sprite144", "trees.png")
  .add("sprite145", "wall_brick.png")
  .add("sprite146", "wall_steel.png")
  .add("sprite147", "water0.png")
  .add("sprite148", "water1.png");

app.loader.onProgress.add(showProgress);
app.loader.onComplete.add(doneLoading);
app.loader.onError.add(reportError);
app.loader.load();
function showProgress(e) {
  console.log(e.progress);
}
function doneLoading(e) {
  console.log("Done Loading!!");
  gamestart();
}
function reportError(e) {
  console.error("Error: " + e.message);
}

function gamestart() {
  const gameBoard = new PIXI.Container();

  // let shot = false;
  let map = new Map();
  let p2 = new Tank(12, 8, 0, 0);
  let p1 = new Tank(12, 4, 0, 0),
    gameLoop1,
    gameLoop2,
    gameLoop3;
  let sh1 = new Shield(p1.y, p1.x),
    sh2 = new Shield(p2.y, p2.x);
  let players = [],
    shields = [sh1, sh2],
    timerused = false,
    shieldon = [true, true];
  let boosters = new Array();
  // let shields[0] = false;
  players.push(p1);
  players.push(p2);
  // console.log(players);

  app.stage.addChild(map.body);
  app.stage.addChild(gameBoard);
  gameBoard.addChild(sh1);
  gameBoard.addChild(sh2);
  players.forEach((player) => {
    gameBoard.addChild(player.body);
  });
  document.body.appendChild(app.view);

  var keyState = {};
  window.addEventListener(
    "keydown",
    function (e) {
      // if (e.keyCode != 32 && e.which != 32) {
      //   console.log('here');
      //   for (let i = 37; i < 41; i++) keyState[i] = false;
      // }
      keyState[e.keyCode || e.which] = true;
    },
    true
  );
  window.addEventListener(
    "keyup",
    function (e) {
      keyState[e.keyCode || e.which] = false;
      if (e.keyCode == 32 || e.which == 32) players[0].shot = false;
      if (e.keyCode == 90 || e.which == 90) players[1].shot = false;

      // if (e.keyCode == 32 || e.which == 32) shot = false;
    },
    true
  );
  let new_bot,
    cnt = 50,
    bots = [],
    choose = 0,
    bullets = [],
    botX = [6, 12, 0];

  function botMoveLoop() {
    if (timerused) return;
    //moves: left, up, right, down
    if (cnt == 70 && bots.length < 4) {
      let spawn = new Spawn(0, botX[choose]);
      gameBoard.addChild(spawn);
      setTimeout(() => {
        gameBoard.removeChild(spawn);
      }, 500);
    }
    if (cnt == 99 && bots.length < 4) {
      // let speed = Math.floor(Math.random() * 2);
      // speed++;
      // console.log(speed);
      new_bot = new Bot(0, botX[choose], 2, 2);
      bots.push(new_bot);
      gameBoard.addChild(new_bot.body);
      choose++;
      choose %= botX.length;
    }
    let num = 0;
    if (cnt % 10 == 0) {
      bots.forEach((bot) => {
        let shoot_check = Math.floor(Math.random() * 3);
        if (shoot_check == 1) {
          let bullet = bot.fire(num++);
          if (bullet != null) {
            bullets.push(bullet);
            gameBoard.addChild(bullet.body);
          }
        }
      });
    }
    // if (cnt % 2 == 0) {
    bots.forEach((bot) => {
      if (!bot.freeze) {
        // console.log(cnt, bot.speed);
        if (cnt % bot.speed == 0) {
          bot.move(map, players, bots);
        }
      } else {
        setTimeout(() => {
          bot.freeze = 0;
        }, 5000);
      }
    });
    // }
    // else if (keyState[68]) players[1].move(app.stage, bots, 4, map);
    // else if (keyState[87]1 players[1].move(app.stage, bots, 0, map);
    cnt++;
    cnt %= 100;
    1; // console.log(keyState);
  }

  function playerMoveLoop() {
    let answer = false;
    if (keyState[37]) {
      if (
        players[0].move(
          app.stage,
          bots,
          3,
          map,
          boosters,
          gameBoard,
          shields[0]
        )
      )
        answer = true;
    }
    if (keyState[38]) {
      if (
        players[0].move(
          app.stage,
          bots,
          0,
          map,
          boosters,
          gameBoard,
          shields[0]
        )
      )
        answer = true;
    }
    if (keyState[39]) {
      if (
        players[0].move(
          app.stage,
          bots,
          1,
          map,
          boosters,
          gameBoard,
          shields[0]
        )
      )
        answer = true;
    }
    if (keyState[40]) {
      if (
        players[0].move(
          app.stage,
          bots,
          2,
          map,
          boosters,
          gameBoard,
          shields[0]
        )
      )
        answer = true;
    }
    if (keyState[65]) {
      if (
        players[1].move(
          app.stage,
          bots,
          3,
          map,
          boosters,
          gameBoard,
          shields[1]
        )
      )
        answer = true;
    }
    if (keyState[87]) {
      if (
        players[1].move(
          app.stage,
          bots,
          0,
          map,
          boosters,
          gameBoard,
          shields[1]
        )
      )
        answer = true;
    }
    if (keyState[68]) {
      if (
        players[1].move(
          app.stage,
          bots,
          1,
          map,
          boosters,
          gameBoard,
          shields[1]
        )
      )
        answer = true;
    }
    if (keyState[83]) {
      if (
        players[1].move(
          app.stage,
          bots,
          2,
          map,
          boosters,
          gameBoard,
          shields[1]
        )
      )
        answer = true;
    }
    if (answer) {
      timerused = answer;
      setTimeout(() => {
        timerused = false;
      }, 5000);
    }

    if (players[0].helmet != 0) {
      if (!shieldon[0]) {
        gameBoard.addChild(shields[0]);
        shieldon[0] = true;
      }
      players[0].helmet -= 20;
    } else {
      if (shieldon[0]) {
        shieldon[0] = false;
        gameBoard.removeChild(shields[0]);
      }
    }
    if (players[1].helmet != 0) {
      if (!shieldon[1]) {
        shieldon[1] = true;
        gameBoard.addChild(shields[1]);
      }
      players[1].helmet -= 20;
    } else {
      if (shieldon[1]) {
        shieldon[1] = false;
        gameBoard.removeChild(shields[1]);
      }
    }
  }

  let gege = new Boost(0, 0);
  boosters.push(gege);
  gameBoard.addChild(gege.body);

  function BulletMoveLoop() {
    // console.log(players[0].shot);
    if (keyState[32] && !players[0].shot) {
      // console.log('here');
      let bullet = players[0].fire();
      if (bullet != null) {
        players[0].shot = true;
        bullets.push(bullet);
        gameBoard.addChild(bullet.body);
      }
    }
    if (keyState[90] && !players[1].shot) {
      let bullet = players[1].fire();
      if (bullet != null) {
        players[1].shot = true;
        bullets.push(bullet);
        gameBoard.addChild(bullet.body);
      }
    }
    for (let i = 0; i < bullets.length; i++) {
      let bullet = bullets[i];
      bullet.move();
      let answer = bullet.collision(
        app.stage,
        map,
        bots,
        players,
        bullets,
        gameBoard,
        boosters,
        shields
      );
      if (answer[2]) {
        gameOver(gameLoop1, gameLoop2, gameLoop3);
        return;
      }
      if (answer[0]) {
        if (!answer[3]) {
          let explosion = new Explosion(bullet.y, bullet.x, "bullet");
          gameBoard.addChild(explosion);
          setTimeout(() => {
            gameBoard.removeChild(explosion);
          }, 500);
        }
        gameBoard.removeChild(bullet.body);
        // console.log(bullet.owner, bullet.owner.leftBullet, 'to ');
        bullet.owner.leftBullet++; // ?????
        if (bullet.owner.leftBullet > bullet.owner.bulletmax) {
          bullet.owner.leftBullet = bullet.owner.bulletmax;
        }
        answer[1][i] = true;

        // console.log(answer[1]);
        let temp = bullet;
        // if (answer[1] != -1) {
        // }
        // let rm = 0;
        // for (let m = 0; m < answer[1].length; i++) {
        //   if (answer[1][m]) {
        //     let tmp = bullets[m - rm];
        //     bullets[m - rm] = bullets[bullets.length];
        //     bullets[bullets.length] = tmp;
        //   }
        // }
        bullets[i] = bullets[bullets.length - 1];
        bullets[bullets.length - 1] = temp;
        bullets.pop();
        // i -= answer[1];
        i--;
      }
    }
  }
  window.requestAnimationFrame(BulletMoveLoop);
  window.requestAnimationFrame(playerMoveLoop);
  window.requestAnimationFrame(botMoveLoop);
  gameLoop1 = setInterval(BulletMoveLoop, 25);
  gameLoop2 = setInterval(playerMoveLoop, 20);
  gameLoop3 = setInterval(botMoveLoop, 20);
  function gameOver(loop1, loop2, loop3) {
    clearInterval(loop1);
    clearInterval(loop2);
    clearInterval(loop3);
    // alert();
    let gameOverElement = Renderer(
      200,
      100,
      0,
      (width * cellSize - 200) / 2,
      "gameOver"
    );
    gameBoard.addChild(gameOverElement);
    app.stage.children.forEach((el) => {
      app.stage.removeChild(el);
      if (el == PIXI.Container) {
        el.children.forEach((el1) => {
          el.removeChild(el);
        });
      }
    });
    console.log(height, cellSize);
    let lastInterval = setInterval(() => {
      gameOverElement.y++;
      // console.log(gameOverElement.y, height * cellSize / 2);
      if (gameOverElement.y == (height * cellSize - 100) / 2)
        clearInterval(lastInterval);
    }, 10);
  }
}
