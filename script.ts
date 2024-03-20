let canvas = <HTMLCanvasElement> document.getElementById("thing");
let ctx = canvas.getContext("2d");

/*
let pixels = ctx.createImageData(500, 500);
console.log(pixels.data.length)
let d = pixels.data;

for (let i = 0; i < d.length; i++){
  if (i % 4 == 0) d[i] = 255;
  if (i % 4 == 1) d[i] = 255;
  if (i % 4 == 2) d[i] = 0;
  if (i % 4 == 3) d[i] = 255;
}
console.log(pixels.data);

ctx.putImageData(pixels, 0, 0);

ctx.beginPath();
ctx.moveTo(75, 50);
ctx.lineTo(100, 75);
ctx.lineTo(100, 25);
ctx.lineTo(75, 50);
ctx.stroke();
*/


function ball(x, y, ballX, ballY) {
  return 1/Math.sqrt(Math.pow(x-ballX, 2) + Math.pow(y-ballY, 2));
}

function metaball(x, y) {
  let ans = 0;
  balls.forEach((v) => {
    ans += ball(x, y, v.x, v.y);
  });
  ans -= 0.1;
  return ans;
}

const RES = 1;
const WIDTH = 1000;
const HEIGHT = 1000;

function renderImplicitFunction(f) {

  let fVals = new Array(Math.ceil(WIDTH / RES));

  for (let x = 0; x < WIDTH; x += 1) {
    fVals[x] = new Array(Math.ceil(HEIGHT / RES));
    for (let y = 0; y < HEIGHT; y += 1) {
      fVals[x][y] = f(x * RES, y * RES);
    }
  }

  //console.log(fVals);

  let points = [];

  for (let x = 0; x < WIDTH - 1; x += 1) {
    for (let y = 0; y < HEIGHT - 1; y += 1) {
      let tl = fVals[x][y];
      let tr = fVals[x + 1][y];
      let bl = fVals[x][y + 1];
      let br = fVals[x + 1][y + 1];
      let itl = fVals[x][y] <= 0;
      let itr = fVals[x + 1][y] <= 0;
      let ibl = fVals[x][y + 1] <= 0;
      let ibr = fVals[x + 1][y + 1] <= 0;
      let tp = { x: x * RES + RES / 2, y: y * RES };
      let lp = { x: x * RES, y: y * RES + RES / 2 };
      let rp = { x: x * RES + RES, y: y * RES + RES / 2 };
      let bp = { x: x * RES + RES / 2, y: y * RES + RES };
      if ((itl && !itr && !ibl && !ibr) || (!itl && itr && ibl && ibr)) {
        points.push([tp, lp]);
      }
      if ((!itl && itr && !ibl && !ibr) || (itl && !itr && ibl && ibr)) {
        points.push([tp, rp]);
      }
      if ((!itl && !itr && ibl && !ibr) || (itl && itr && !ibl && ibr)) {
        points.push([lp, bp]);
      }
      if ((!itl && !itr && !ibl && ibr) || (itl && itr && ibl && !ibr)) {
        points.push([rp, bp]);
      }
      if (itl && itr && !ibl && !ibr) {
        points.push([rp, lp]);
      }
      if (!itl && !itr && ibl && ibr) {
        points.push([rp, lp]);
      }
      if (itl && !itr && ibl && !ibr) {
        points.push([tp, bp]);
      }
      if (!itl && itr && !ibl && ibr) {
        points.push([tp, bp]);
      }
    }
  }


  /*
  ctx.beginPath();
  
  ctx.moveTo(0, 0);
  for (let x = 0; x <= WIDTH; x += RES){
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
  }
  
  for (let y = 0; y <= HEIGHT; y += RES){
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
  }
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(0, 0, 100, 0, Math.PI / 2);
  ctx.strokeStyle = "#0000ff";
  ctx.stroke();
  */

  //console.log(points);
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    ctx.moveTo(points[i][0].x, points[i][0].y);
    ctx.lineTo(points[i][1].x, points[i][1].y);
  }
  ctx.strokeStyle = "#ff0000";
  ctx.stroke();

}

function createBall() {
  return {
    x: Math.random() * WIDTH,
    y: Math.random() * HEIGHT,
    dx: Math.random() * (0.2 - 0.1) + 0.1,
    dy: Math.random() * (0.2 - 0.1) + 0.1,
  }
}

let balls = new Array(10).fill(null).map(() => createBall());
console.log(balls);
let oldTime = 0;

ctx.imageSmoothingEnabled= false;

function render(time) {
  let deltaTime = time - oldTime;
  oldTime = time;
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 1, 1);
  //renderImplicitFunction(metaball);
  
  //ctx.fillStyle = "red";
  //ctx.fill();
  balls = balls.map((v) => {
    return {
      x: v.x+v.dx * deltaTime,
      y: v.y+v.dy * deltaTime,
      dx: ((v.x >= WIDTH && v.dx > 0) || (v.x <= 0 && v.dx < 0)) ? -v.dx : v.dx,
      dy: ((v.y >= HEIGHT && v.dy > 0) || (v.y <= 0 && v.dy < 0)) ? -v.dy : v.dy,
    }
  })
  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);