"use strict";
// Constructor
math.vec2 = function(x, y) {

    this.x = Number.parseFloat(x) || 0.0;
    this.y = Number.parseFloat(y) || 0.0;

    Object.seal(this);
};

math.vec2.prototype.add = function(vector) {
    this.x = this.x + vector.x;
    this.y = this.y + vector.y;

    return this;
};

math.vec2.prototype.sub = function(vector) {
    this.x = this.x - vector.x;
    this.y = this.y - vector.y;

    return this;
};

math.vec2.prototype.div = function(scalar) {
    this.x = this.x / scalar;
    this.y = this.y / scalar;

    return this;
};

math.vec2.prototype.mult = function(scalar) {
    this.x = this.x * Number(scalar);
    this.y = this.y * Number(scalar);

    return this;
};

math.vec2.prototype.mag = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

math.vec2.prototype.normalize = function() {
    const magnitude = this.mag();

    if (magnitude > 0)
        this.div(magnitude)

    return this;
};

math.vec2.prototype.limit = function(max) {
    if (this.mag() > max) {
        this.normalize();
        this.mult(max);
    };
    return this;
};

math.vec2.prototype.copy = function() {
    return new math.vec2(this.x, this.y);
};

// Static, non-instance methods
math.vec2.add = function(vector1, vector2) {
    return new math.vec2(vector1.x, vector1.y).add(vector2)
};

math.vec2.sub = function(vector1, vector2) {
    return new math.vec2(vector1.x, vector1.y).sub(vector2)
};

math.vec2.div = function(vector, scalar) {
    return new math.vec2(vector.x, vector.y).div(scalar)
};

math.vec2.mult = function(vector, scalar) {
    return new math.vec2(vector.x, vector.y).mult(scalar)
};