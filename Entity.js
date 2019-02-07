"use strict";

const Entity = function(id, componentManager, entityManager, componentAmount) {

    this.ID = id || -1;
    this.components = componentManager || {ERROR: true};
    this.entityManager = entityManager || {ERROR: true};
    this.componentMask = new Uint8Array(componentAmount) || [];
    this.signature = "";

    return this;
};

Entity.prototype.addComponent = function(typeID) {
    this.components.add(typeID, this.ID);
    let oldSignature = this.signature;
    this.componentMask[typeID] = 1;
    this.signature = this.componentMask.join("");
    
    // TODO(thomas): Use events instead of this direcly coupled callback...?
    this.entityManager.onSignatureChanged(this.ID, oldSignature, this.signature);

    return this;
};

Entity.prototype.removeComponent = function(typeID) {
    this.components.remove(typeID, this.ID);
    let oldSignature = this.signature;
    this.componentMask[typeID] = 0;
    this.signature = this.componentMask.join("");
    
    // TODO(thomas): Use events instead of this direcly coupled callback...?
    this.entityManager.onSignatureChanged(this.ID, oldSignature, this.signature);

    return this;
};

Entity.prototype.getComponent = function(typeID) {
    return this.components.get(typeID, this.ID);
};