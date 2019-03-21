var roleRepairer = require('role.repairer');

var roleBuilder = {
    run: function(creep) {
        console.log(creep.room.find(FIND_CONSTRUCTION_SITES));
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('build');
	    }
	    
	    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	    if(creep.memory.building/* && creep.room.find(FIND_CONSTRUCTION_SITES) == true*/) {
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else if (creep.room.find(FIND_CONSTRUCTION_SITES) == false) {
	        console.log("building not found");
	        roleRepairer.run(creep);
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#984B43'}});
            }
	    }
	}
};

module.exports = roleBuilder;