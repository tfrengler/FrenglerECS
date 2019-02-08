"use strict";

entities.CircleMover = function(id, componentManager, entityManager, componentAmount) {

    Entity.call(this, id, componentManager, entityManager, componentAmount)
    
    this.addComponent(components.Position);
    this.addComponent(components.Appearance);
    this.addComponent(components.Moveable);

    return Object.seal(this);
};

entities.CircleMover.prototype = Object.create(Entity.prototype);
entities.CircleMover.prototype.TYPE_ID = 0;
entities.CircleMover.TYPE_ID = 0;