import dungeon from "./dungeon.js";

export default class PlayerCharacter {
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.movementPoints=1;
		this.sprite=29
		this.cursors = dungeon.scene.input.keyboard.createCursorKeys();
		dungeon.map.putTileAt(this.sprite, this.x, this.y)
	}


	refresh(){
		this.movementPoints = 1;
	}

	turn(){
		let oldX = this.x;
		let oldY = this.y;
		let moved =false;
		if(this.movementPoints>0){
			if (this.cursors.left.isDown) {
                this.x -= 1
                moved = true
            }

            if (this.cursors.right.isDown) {
                this.x += 1
                moved = true
            }

            if (this.cursors.up.isDown) {
                this.y -= 1
                moved = true
            }

            if (this.cursors.down.isDown) {
                this.y += 1
                moved = true
            }

            if (moved) {
                this.movementPoints -= 1
            }
		}

		let tileAtDestination = dungeon.map.getTileAt(this.x,this.y);

		if(tileAtDestination.index === dungeon.sprites.wall){
			this.x=oldX;
			this.y=oldY;
		}

		if(this.x != oldX || this.y != oldY){
			dungeon.map.putTileAt(this.sprite, this.x, this.y)
            dungeon.map.putTileAt(dungeon.sprites.floor, oldX, oldY)
		}
	}

	over() {
        return this.movementPoints == 0;
    }
}