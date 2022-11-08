
let newParticle = (x, y, vmax, t) => {
  return {x: x, y: y, vx: 0, vy: 0, fx: random(), fy: random(), 
          h: random(TWO_PI), px: x, py: y, vmax: vmax, t: t};
}

let field = (x, y, t) => {
  return noise(x, y, t) * 2 - 1;
}

let pick = (f, pi) => {
  let val = f.get(
    int(round(pi.x)) % f.width, int(round(pi.y) % f.height)
  );
  return val[0] / 255;
}

let updateParticle = (pi, f, t, ds) => {
  pi.h = field(pi.x * ds, pi.y * ds, pi.t + t);
  pi.vx = sin(pi.h * TWO_PI) * pi.vmax;
  pi.vy = cos(pi.h * TWO_PI) * pi.vmax;
  pi.px = pi.x;
  pi.py = pi.y;
  pi.x += pi.vx * dt;
  pi.y += pi.vy * dt;
  if (pi.x < 0 || pi.px < 0) {
    pi.x = random(width);
    pi.px = pi.x;
    // pi.x = pi.x + width;
    // pi.px = pi.px + width;
  }
  if (pi.y < 0 || pi.py < 0) {
    pi.y = random(width);
    pi.py = pi.y;
    // pi.y = pi.y + height;
    // pi.py = pi.py + height;
  }
  if (pi.x > width || pi.px > width) {
    pi.x = random(width);
    pi.px = pi.x;
    // pi.x = (pi.x + width) % width;
    // pi.px = (pi.px + width) % width;
  }
  if (pi.y > height || pi.py > height) {
    pi.y = random(width);
    pi.py = pi.y;
    // pi.y = (pi.y + height) % height;
    // pi.py = (pi.py + height) % height;
  }
}

let updateParticles = (p, f, t, ds) => {
  for (let i = 0; i < p.length; i++) {
    updateParticle(p[i], f, t, ds);
  }
}

let drawParticle = (pi, f) => {
  let sc = color("#cdf9ff");
  let a = map(pick(f, pi) * 0.99, 0, 1, 180, 5);
  sc.setAlpha(a);
  stroke(sc);
  line(pi.x, pi.y, pi.px, pi.py);
}

let drawParticles = (p, f) => {
  for (let i = 0; i < p.length; i++) {
    drawParticle(p[i], f);
  }
}
