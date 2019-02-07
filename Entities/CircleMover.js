"use strict";

entities.CircleMover = function(id, componentManager, entityManager, componentAmount) {

    Entity.call(this, id, componentManager, entityManager, componentAmount)
    
    this.addComponent(1);
    this.addComponent(3);

    return Object.seal(this);
};

entities.CircleMover.prototype = Object.create(Entity.prototype);
entities.CircleMover.prototype.TYPE_ID = 1;
entities.CircleMover.TYPE_ID = 1;