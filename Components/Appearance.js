"use strict";

components.Appearance = function(shape, size, fill, outline, lineColor, fillColor) {

    this.shape = shape || "circle";
    this.size = size || 30;
    this.fill = fill || false;
    this.outline = outline || true;
    this.lineColor = lineColor || new Uint8ClampedArray([255,255,255]);
    this.fillColor = fillColor || new Uint8ClampedArray([255,255,255]);

};

components.Appearance.prototype.TYPE_ID = 1;
components.Appearance.TYPE_ID = 1;