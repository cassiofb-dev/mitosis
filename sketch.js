let width = screen.width, height = screen.height;
let cells;

function setup() {
	createCanvas(width, height);
	cells = new Cells();
}

function draw() {
	background(0);
	cells.run();
	drawNumOfCells(); // thanks Daniel Kaye
}

function mousePressed() {
	fullscreen(true);
	cells.mitosis();
}

function drawNumOfCells() {
	noStroke();
	textSize(18);
	fill('white');
	textAlign(LEFT);
	text('number of cells: ' + cells.length(), 10, 20);
}