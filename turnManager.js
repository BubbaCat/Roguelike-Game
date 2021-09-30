const tm = {
	interval: 150,
	lastCall: Date.now(),
	entities: new Set(),

	addEntity: (entity)=> tm.entities.add(entity),

	removeEntity: (entity) => tm.entities.remove(entity),

	over :()=>[...tm.entities].every(entity=>entity.over()),

	refresh: ()=>tm.entities.forEach(entity=>entity.refresh()),

	turn(){
		let now = Date.now();
		let limit = tm.lastCall + tm.interval;
		for(let entity of tm.entities){
			if(now>limit){
				if(!entity.over())
				{
					entity.turn();
					break;
				}
			}
			tm.lastCall=Date.now();
		}
	}
}

export default tm;