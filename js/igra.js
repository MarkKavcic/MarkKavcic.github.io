//canvas
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");

//spremenljivke in constante
const PLOSCA_WIDTH = 100;
const PLOSCA_MARGIN_BOTTOM = 50;
const PLOSCA_HEIGHT = 20;
const ZOGA_POLMER = 8;
let LIFE = 3;
let levaPuscica = false;
let desnaPuscica = false;

//border
cvs.style.border = "1px solid red";
ctx.lineWidth = 2;

//ustvarimo plosco
const plosca = {
	x : cvs.width/2 - PLOSCA_WIDTH/2,
	y : cvs.height - PLOSCA_MARGIN_BOTTOM - PLOSCA_HEIGHT,
	width : PLOSCA_WIDTH,
	height : PLOSCA_HEIGHT,
	dx : 5
}

//narisemo plosco
function narisiPlosco(){
	ctx.fillStyle = "black";
	ctx.fillRect(plosca.x, plosca.y, plosca.width, plosca.height);
	
	ctx.strokeStyle = "red";
	ctx.strokeRect(plosca.x, plosca.y, plosca.width, plosca.height);
}

//ustvarimo zogo
const zoga = {
	x : cvs.width/2,
	y : plosca.y - ZOGA_POLMER,
	radius : ZOGA_POLMER,
	speed : 4,
	dx : 3 * (Math.random() * 2 - 1),
	dy : -3
}

//narisemo zogo
function narisiZogo(){
	ctx.beginPath();
	ctx.arc(zoga.x, zoga.y, zoga.radius, 0, Math.PI*2);
	ctx.fillStyle = "#ff9900";
	ctx.fill();
	ctx.strokeStyle = "#ff6600";
	ctx.stroke();
	ctx.closePath();
}

//premikanje zoge
function premikanjeZoge(){
	zoga.x += zoga.dx;
	zoga.y += zoga.dy;
}

//zid in zoga
function zogaZid(){
	if(zoga.x + zoga.radius > cvs.width || zoga.x - zoga.radius < 0){
		zoga.dx = - zoga.dx;
	}
	
	if(zoga.y - zoga.radius < 0){
		zoga.dy = - zoga.dy;
	}
	
	if(zoga.y + zoga.radius > cvs.height){
		LIFE--;
		resetZoga();
	}
}

//resetiranje zoge
function resetZoga(){
	zoga.x = cvs.width/2;
	zoga.y = plosca.y - ZOGA_POLMER;
	zoga.dx = 3 * (Math.random() * 2 - 1);
	zoga.dy = -3;
}

//zoga in plosca
function zogaPlosca(){
	if(zoga.x < plosca.x + PLOSCA_WIDTH && zoga.x > plosca.x && plosca.y 
	< plosca.y + PLOSCA_HEIGHT && zoga.y > plosca.y){
		
		//kje zoga zadane plosco
		let tocka = zoga.x - (plosca.x + PLOSCA_WIDTH/2);
		tocka = tocka / (PLOSCA_WIDTH/2);
		
		//izracunamo kot zoge
		let kot = tocka * Math.PI/3;
		
		zoga.dx = zoga.speed * Math.sin(kot);
		zoga.dy = - zoga.speed * Math.cos(kot);
	}
}

//posodobitev igre
function update(){
	premikanjePlosce();
	premikanjeZoge();
	zogaZid();
	zogaPlosca();
}

//risanje elementov
function draw(){
	narisiPlosco();
	narisiZogo();
}

function loop(){
	ctx.drawImage(ozadje_slika, 0, 0);
	draw();
	update();
	requestAnimationFrame(loop);
}
loop();

//nadziranje plosce
document.addEventListener("keydown", function(event){
	if(event.keyCode == 37){
		levaPuscica = true;
	}
	else if(event.keyCode == 39){
		desnaPuscica = true;
	}
});
document.addEventListener("keyup", function(event){
	if(event.keyCode == 37){
		levaPuscica = false;
	}
	else if(event.keyCode == 39){
		desnaPuscica = false;
	}
});

//premikanje plosce
function premikanjePlosce(){
	if(desnaPuscica && plosca.x + PLOSCA_WIDTH < cvs.width){
		plosca.x += plosca.dx;
	}
	else if(levaPuscica && plosca.x > 0){
		plosca.x -= plosca.dx;
	}
}
