let pts;
let font;

let xmin = xmax = ymin = ymax = 0;
let padding = 10;

let xTranslate  = yTranslate = 0;

function preload(){
  font = loadFont('../../assets/fonts/RobotoMono/static/RobotoMono-Regular.ttf');
}

function setup() {
    
  pts = font.textToPoints('Fun Stuff', 0, 0, 50,{
    sampleFactor: 0.25,
    simplifyThreshold: 0
  });
  // iterate through pts, getting the smallest x value, largest x value, smallest y value, largest y value - and then store them.
  pts.map(pt => {
      if (pt.x > xmax) xmax = pt.x;
      if (pt.x < xmin) xmin = pt.x;
      if (pt.y > ymax) ymax = pt.y;
      if (pt.y < ymin) ymin = pt.y;
  })
  createCanvas(xmax-xmin + padding * 2, ymax-ymin + padding * 2);
  xTranslate = padding - xmin;
  yTranslate = padding - ymin;
}

function draw() {
  fill(150)
  background(255, 204, 0);

  
//   translate(0, 100);
//   beginShape(POINTS);
//   stroke(0);
//   for(let i =0; i< pts.length; i++){
//    vertex(pts[i].x + sin(frameCount*0.05 + pts[i].y*0.1)*5, pts[i].y);
//   }
//   endShape();
  
//   translate(0, 100);
//   noFill();
//   for(let i =0; i< pts.length; i++){      
//     line(pts[i].x-1, pts[i].y-5, pts[i].x, pts[i].y - noise(frameCount/40 + i/10) * 15);
//   }
  
  translate(xTranslate, yTranslate);
  fill(300)
  beginShape();
  
  
  for(let i =0; i< pts.length; i++){ 
    if (i > 0 ) {
      let distanceCheck = dist(pts[i].x, pts[i].y, pts[i-1].x, pts[i-1].y)
      if (distanceCheck > 5) {
        endShape(CLOSE);
        beginShape();
      }
    }
    
    if (true) {
        const mouseScaleDistance = .5 / (1 + abs(dist(mouseX, mouseY, pts[i].x + xTranslate, pts[i].y + yTranslate)));
        const mouseScaleCap = .1
        
        const mouseScale = mouseScaleDistance > mouseScaleCap ? mouseScaleCap : mouseScaleDistance
        
        const noiseScale = 500
        
        // if the mouse is close to a point, it should be more heavily distorted.
        // base + noise(time + displacement) * noiseScale 
        vertex(
          pts[i].x + (noise(frameCount/40 + i/10) - .5) * noiseScale * mouseScale, 
          pts[i].y + (noise(frameCount/40 + i/10) - .5) * noiseScale * mouseScale
        );
    }
    else {
        vertex(
            pts[i].x, 
            pts[i].y
          );
    }
  
  }
  endShape(CLOSE)
  
  // textFont(font);
  // textSize(120);
  // text('Fun Stuff', 0, 0);
  // fill(255,0,0,30);
  // text('Fun Stuff', -rotX, -rotY);
  
}