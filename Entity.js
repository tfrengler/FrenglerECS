"use strict";

const Entity = function(id, componentManager, entityManager, componentAmount) {

    this.ID = id || -666;
    this.components = componentManager || {ERROR: true};
    this.entityManager = entityManager || {ERROR: true};
    this.componentMask = new Uint8Array(componentAmount) || [null];
    this.signature = new Array(componentAmount).fill(0).join("");

    return this;
};

Entity.prototype.addComponent = function(type, parameters) {
    this.components.add(type, this.ID, parameters || []);
    let oldSignature = this.signature;

    this.componentMask[type.TYPE_ID] = 1;
    this.signature = this.componentMask.join("");
    // TODO(thomas): Use events instead of this direcly coupled callback...?
    this.entityManager.onSignatureChanged(this.ID, oldSignature, this.signature);

    return this;
};

Entity.prototype.removeComponent = function(type) {
    this.components.remove(type, this.ID);
    let oldSignature = this.signature;

    this.componentMask[type.TYPE_ID] = 0;
    this.signature = this.componentMask.join("");
    // TODO(thomas): Use events instead of this direcly coupled callback...?
    this.entityManager.onSignatureChanged(this.ID, oldSignature, this.signature);

    return this;
};

Entity.prototype.getComponent = function(typeID) {
    return this.components.get(typeID, this.ID);
};