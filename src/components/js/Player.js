class Player {
    _number;
    _canvas;
    myTag;
    characters;
    bg;

    constructor(nb, canvas, tag, char, bg) {
        this.number = nb;

        this._canvas = canvas;

        // Tag (custom text)
        this.myTag = tag;

        // Characters
        this.characters = char;

        // Background
        this.bg = bg;
    }

    addToCanvas() {
        // console.log(".. add to canvas", this.tag);
        this.canvas.add(this.bg.rect);
        this.canvas.add(this.myTag.group);

        this.characters.addImg();

        this.canvas.sendToBack(this.bg.rect);
        this.canvas.bringToFront(this.myTag.group);
    }

    align(alignmentH, alignmentV) {
		console.log(".. align tag", alignmentH ? alignmentH : alignmentV, this.tag);
        this.myTag.align(alignmentH, alignmentV);
    }

    flipChar() {
        console.log(".. flip image char", this.tag);
        this.characters.flip();
    }

    renderAll() {
        this.canvas.renderAll();
    }

    get canvas() {
        return this._canvas;
    }
    set canvas(cv) {
        this._canvas = cv;
        this.myTag.canvas = cv;
        this.characters.canvas = cv;
        this.bg.canvas = cv;
        return this.canvas;
    }

    get number() {
        return this._number;
    }  
    set number(nb) {
        this._number = nb;
        return this._number;
    }

    // CHARACTERS
    get filename() {
        return this.characters.filename;
    }
    set filename(filename) {
        if (filename)
            return this.characters.filename = filename;
        else
            return this.characters.filename = null;
    }
    get image() {
        return this.characters.image;
    }

    get colorBg() {
        return this.bg.color;
    }
    set colorBg(pColor) {
        return this.bg.color = pColor;
    }
    get color2Bg() {
        return this.bg.color2;
    }
    set color2Bg(pColor2) {
        return this.bg.color2 = pColor2;
    }

    // TAG
    // TODO comment mieux faire/déléguer ?
    get tag() {
        return this.myTag.txt;
    }
    set tag(txt) {
        return this.myTag.txt = txt;
    }
    get size() {
        return this.myTag.size;
    }
    set size(size) {
        return this.myTag.size = size;
    }
    get bold() {
        return this.myTag.bold;
    }
    set bold(idBold) {
        return this.myTag.bold = idBold;
    }
    get italic() {
        return this.myTag.italic;
    }
    set italic(isItalic) {
        return this.myTag.italic = isItalic;
    }
    get isTagClipPath() {
        return this.myTag.isClipPath;
    }
    set isTagClipPath(isClipP) {
        return this.myTag.isClipPath = isClipP;
    }
    get font() {
        return this.myTag.font;
    }
    set font(pFont) {
        return this.myTag.font = pFont;
    }

    get colorsTagBg() {
        return this.myTag.colors;
    }
    set colorsTagBg(pColors) {
        return this.myTag.colors = pColors;
    }

    get color2TagBg() {
        return this.myTag.color2Bg;
    }
    set color2TagBg(pColor2) {
        return this.myTag.color2Bg = pColor2;
    }

    get color() {
        return this.myTag.color;
    }
    set color(pColor) {
        return this.myTag.color = pColor;
    }
}

export {
    Player
};