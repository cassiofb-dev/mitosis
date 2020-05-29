class Cell {

	constructor(pos = [width/2, height/2], rad_max = width/10) {
		this.pos = pos;
		this.vel = [random(1),random(1)];
		this.color = [255,255,255,200];
		this.rad = rad_max/2;
		this.rad_max = rad_max;
	}

	move() {
		this.rad *= random(0.999,1.002);
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
	}

	change_vel() {
		if(random(100) < 1) {
			this.vel[random([0,1])] += random([random(1),-random(1)]);
		}
		if(this.pos[0] < 0 || this.pos[0] > width) this.vel[0] = (width/2 - this.pos[0])/1000;
		if(this.pos[1] < 0 || this.pos[1] > height) this.vel[1] = (height/2 - this.pos[1])/1000;
	}

	mitosis() {
		let new_cell = new Cell([this.pos[0], this.pos[1]], this.rad_max);
		new_cell.vel = [random(0.5),random(0.5)];
		this.vel = [-random(0.5),-random(0.5)];
		this.rad = this.rad_max/2;
		this.color[random([0,2])] = random(255);
		return new_cell;
	}

	render() {
		this.color[1] = map(this.rad, this.rad_max/2, this.rad_max, 0, 255);
		fill(this.color);
		circle(this.pos[0], this.pos[1], this.rad);
	}

	run() {
		this.move();
		this.render();
		this.change_vel();
	}
}

class Cells {

	constructor() {
		this.cells = [new Cell()];
	}

	length() {
		return this.cells.length;
	}

	mitosis() {
		let i, max = this.length();
		for(i = 0; i < max; i++) {
			if(dist(mouseX, mouseY, this.cells[i].pos[0], this.cells[i].pos[1]) < this.cells[i].rad - 10) {
				this.cells.push(this.cells[i].mitosis());
			}
		}
	}

	run() {
		if(this.length() > 2048) this.cells = [new Cell()];
		for(const cell of this.cells) {
			cell.run();
			if(cell.rad >= cell.rad_max) this.cells.push(cell.mitosis());
		}
	}
}