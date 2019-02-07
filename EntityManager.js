"use strict";

const EntityManager = (function () {

    // PROPERTIES

    const _ENTITIES_BY_ID = new Map();
    const _ENTITIES_BY_SIGNATURE = new Map();
    var _COMPONENT_MANAGER = {};
    var _IDCounter = 1;

    // METHODS

    const _create = function(type) {

        const newEntity = new type(_IDCounter, _COMPONENT_MANAGER, _API, _COMPONENT_MANAGER.COMPONENT_AMOUNT)
        
        _IDCounter++;
        _ENTITIES_BY_ID.set(newEntity.ID, newEntity);
        _addToSignature(newEntity.ID, newEntity.signature);

        return newEntity;
    };

    const _addToSignature = function(id, signature) {
        if (!_ENTITIES_BY_SIGNATURE.has(signature))
            _ENTITIES_BY_SIGNATURE.set(signature, []);
        
        _ENTITIES_BY_SIGNATURE.get(signature).push(id);
    };

    const _delete = function(id) {
        _deleteFromSignature(id, _getById(id).signature);
        _ENTITIES_BY_ID.delete(id);
    };

    const _deleteFromSignature = function(id, signature) {
        if (signature) {
            const signatureGroup = _ENTITIES_BY_SIGNATURE.get(signature) || [];
            console.log(signatureGroup);
            signatureGroup.splice(signatureGroup.indexOf(id), 1);
        }
    };

    const _getById = function(id) {
        if (_ENTITIES_BY_ID.has(id))
            return _ENTITIES_BY_ID.get(id);

        return null;
    };

    const _getByComponents = function(componentTypes) {

        const signature = new Uint8Array(66);
        componentTypes.forEach((typeID)=>{
            signature[typeID] = 1;
        });
        
        return _ENTITIES_BY_SIGNATURE.get(signature.join("")) || null;
    };
    // TODO(thomas): might remove at a later date
    const _exists = function() {

    };

    // Event managers/callbacks

    const _onSignatureChanged = function(id, oldSignature, newSignature) {
        _deleteFromSignature(id, oldSignature);
        _addToSignature(id, newSignature);
    };

    // Constructor

    const _init = function(componentPath) {
        _COMPONENT_MANAGER = new ComponentManager(componentPath);
        return _API;
    };

    const _API = Object.freeze({
        create: _create,
        delete: _delete,
        getById: _getById,
        getByComponents: _getByComponents,
        exists: _exists,
        onSignatureChanged: _onSignatureChanged,
        // TODO(thomas): remove debug code
        debug: [_ENTITIES_BY_ID, _ENTITIES_BY_SIGNATURE]
    });

    return Object.freeze({
        init: _init
    });

})();