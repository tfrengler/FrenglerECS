"use strict";

const ComponentManager = function(componentPath) {

    // PROPERTIES

    this.COMPONENT_PATH = "";
    this.COMPONENT_AMOUNT = 0;
    this.COMPONENTS_BY_ENTITY_ID = new Map();

    // METHODS

    this.add = function(type, entityID, parameters) {

        const newComponent = new type(...parameters);

        if (!this.COMPONENTS_BY_ENTITY_ID.has(entityID))
            this.COMPONENTS_BY_ENTITY_ID.set(entityID, new Array(this.COMPONENT_AMOUNT).fill(0));

        this.COMPONENTS_BY_ENTITY_ID.get(entityID)[newComponent.TYPE_ID] = newComponent;
    };

    this.get = function(componentType, entityID) {
        if (this.COMPONENTS_BY_ENTITY_ID.has(entityID))
            return this.COMPONENTS_BY_ENTITY_ID.get(entityID)[componentType];

        return null;
    };

    // Constructor

    this.COMPONENT_PATH = componentPath || Object.create(null);
    this.COMPONENT_AMOUNT = Object.keys(componentPath).length;

    return Object.seal(this);
};