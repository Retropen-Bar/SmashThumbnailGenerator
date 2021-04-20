import { fabric } from "fabric";
// import { FontFaceObserver } from "fontfaceobserver";
import { CustomRect } from "./CustomRect";
var FontFaceObserver = require('fontfaceobserver');

class CustomText {

    /* Fabric components */
    _canvas;
    text;
    bgTag;
    group;
    clipPath;

    _txt = 'Player X';

    _size = 40;
    _x = 0;
    _y = 0;
    // TODO rotation angle
    // TODO bordure radius

    _isClipPath = true;

    _alignmentX = 'center';
    _alignmentY = 'middle';

    _color = {hex: 'black'};

    _font = 'Open Sans';

    _bold = false;
    _italic = false;
    _index = 1;

    constructor(canvas, tagOptions, bgTagOptions, clipPath) {
        var self = this;
        this._canvas = canvas;

        this._index = tagOptions.index || this._index;

        // Txt
        this._txt = tagOptions.tag || this._txt;

        // Position (middle by default)
        this._x = tagOptions.x || this._x;
        this._y = tagOptions.y || this._y;

        // Alignment
        this._alignmentX = tagOptions.alignmentX || this._alignmentX;
        this._alignmentY = tagOptions.alignmentY || this._alignmentY;

        // Font Properties
        // TODO Font
        this._size = tagOptions.size || this._size;
        // Color Font
        this._color = tagOptions.color || this._color;
        // TODO Other ? Comment mieux faire ?
        this._bold = tagOptions.bold || this._bold;
        this._italic = tagOptions.italic || this._italic;

        // Fabric object : Text
        this.text = new fabric.Text(this._txt, {
            left: this._x,
            top: this._y,
            fontSize: this._size,
            fill: this._color
        });

        // Custom object : CustomRect
        this.bgTag = new CustomRect(this.canvas, bgTagOptions);

        // Group
        this.group = new fabric.Group([this.bgTag.rect, this.text], {
            left: 0 + this._x,
            top: 0 + this._y,
            strokeWidth: 0,
        });
        this.group.on('scaling', function () {
            var rect = this.item(1),
                scaleX = this.width / (this.width * this.scaleX),
                scaleY = this.height / (this.height * this.scaleY);
            rect.scaleX = scaleX;
            rect.scaleY = scaleY;
            self.align();
        });

        if (clipPath) {
            // TODO on/off
            // TODO povoir le déplacer ?
            this.group.clipPath = clipPath;
            this.clipPath = clipPath;
            this._isClipPath = true;
        }

        this.align('center', 'middle');
    }

    get canvas() {
        return this._canvas;
    }
    set canvas(cv) {
        this._canvas = cv;
        this.bgTag.canvas = cv;
        return this.canvas;
    }

    get txt() {
        return this._txt;
    }
    set txt(txt) {
        this._txt = txt;
        this.text.set('text', txt);
        this.align();
        return this._txt;
    }
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = size;
        this.text.set('fontSize', size);
        this.canvas.renderAll()
        return this._size;
    }
    get bold() {
        return this._bold;
    }
    set bold(isBold) {
        this._bold = isBold;
        this.text.set('fontWeight', isBold ? 'bold' : 'normal');
        this.canvas.renderAll();
        return this._bold;
    }
    get italic() {
        return this._italic;
    }
    set italic(isItalic) {
        this._italic = isItalic;
        this.text.set('fontStyle', isItalic ? 'italic' : 'normal');
        this.canvas.renderAll();
        return this._italic;
    }
    get font() {
        return this._font;
    }
    set font(pFont) {
        this._font = pFont;
        /* this.text.set("fontFamily", pFont);
            this.canvas.renderAll(); */
        // eslint-disable-next-line no-unused-vars
        var self = this;
        var myfont = new FontFaceObserver(pFont);
        myfont.load().then(function () {
            // when font is loaded, use it.
            self.text.set("fontFamily", pFont);
            self.canvas.renderAll();
            console.log('font loaded', pFont);

            self.align();
        }).catch(function(e) {
            console.log('font loading failed', pFont, e);
        });
        return pFont;
    }

    get colors() {
        return this.bgTag.colors;
    }
    set colors(pColors) {
        return this.bgTag.colors = pColors;
    }

    get colorDirection() {
        return this.bgTag.colorDirection;
    }
    set colorDirection(pDir) {
        return this.bgTag.colorDirection = pDir
    }

    get color2Bg() {
        return this.bgTag.color2;
    }
    set color2Bg(pColor2) {
        return this.bgTag.color2 = pColor2;
    }

    get color() {
        return this._color;
    }
    set color(pColor) {
        this.text.set('fill', pColor);
        this.canvas.renderAll();
        this._color = pColor;
        return this._color;
    }

    get isClipPath() {
        return this._isClipPath;
    }
    set isClipPath(isClipP) {
        this._isClipPath = isClipP;
        if (isClipP) {
            this.group.clipPath = this.clipPath;
        } else {
            this.group.clipPath = null;
            var tmpColors = this.bgTag.colors;
            this.bgTag.colors = tmpColors;
        }
        this.canvas.renderAll();
        return this._isClipPath;
    }

    align(alignmentH, alignmentV) {
        if (alignmentH)
            this._alignmentX = alignmentH;
        if (alignmentV)
            this._alignmentY = alignmentV;

        // var textW = this.text.width,
        var textW = this.text.getScaledWidth(),
            textH = this.text.getScaledHeight();
        var rectW = this.bgTag.rect.width,
            rectH = this.bgTag.rect.height;

        switch (this._alignmentX) {
            case 'left':
                this.text.set('left', -rectW / 2);
                break;
            case 'center':
                this.text.set('left', -(textW / 2));
                break;
            case 'right':
                this.text.set('left', rectW / 2 - textW);
                break;
        }
        switch (this._alignmentY) {
            case 'top':
                this.text.set('top', -rectH / 2);
                break;
            case 'middle':
                this.text.set('top', -(textH / 2));
                break;
            case 'bottom':
                this.text.set('top', rectH / 2 - textH);
                break;
            default:
                break;
        }

        if (this.canvas)
            this.canvas.renderAll();
    }
}

export {
    CustomText
};