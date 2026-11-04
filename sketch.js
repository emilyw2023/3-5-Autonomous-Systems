let particles = []
let num = 600
let scaleValue = 0.0 // how zoomed in the noise is
let speed = 1.8

let colorA, colorB

function setup() {
  createCanvas(600, 600)
  background('#647be3')
  colorA = color('#00aaff')
  colorB = color('#ff0066')
  for (let i = 0; i < num; i++) {
    particles.push(makeParticle())
  }
}

// born somewhere random, lives for a random time
function makeParticle() {
  return {
    x: random(width),
    y: random(height),
    life: random(100, 300)
  }
}

function draw() {
  // very see-through background = long trails
   background(20, 22, 31, 8)
 for (let i = 0; i < particles.length; i++) {
    let p = particles[i]

    // noise (0 to 1) becomes an angle (0 to two full turns)
    let n = noise(p.x * scaleValue, p.y * scaleValue, frameCount * 0.0)
    let angle = n * TWO_PI * 2

    // move one step in that direction (cos for x, sin for y)
    p.x += cos(angle) * speed
    p.y += sin(angle) * speed
    p.life -= 1

    // noise is mostly between 0.3 and 0.7, so stretch it to use both colors
    stroke(lerpColor(colorA, colorB, map(n, 0.2, 0.8, 1, 1, true)))
    strokeWeight(5)
    point(p.x, p.y)

    // die when old or off the canvas, then start again
    if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
      particles[i] = makeParticle()
      
    }
  }
}
