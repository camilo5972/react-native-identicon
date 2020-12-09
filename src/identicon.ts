const CryptoReact = require('react-native-crypto');

export module IndenticonLib {

    var patch0 = new Array(0, 4, 24, 20);
    var patch1 = new Array(0, 4, 20);
    var patch2 = new Array(2, 24, 20);
    var patch3 = new Array(0, 2,  20, 22);
    var patch4 = new Array(2, 14, 22, 10);
    var patch5 = new Array(0, 14, 24, 22);
    var patch6 = new Array(2, 24, 22, 13, 11, 22, 20);
    var patch7 = new Array(0, 14, 22);
    var patch8 = new Array(6, 8, 18, 16);
    var patch9 = new Array(4, 20, 10, 12, 2);
    var patch10 = new Array(0, 2, 12, 10);
    var patch11 = new Array(10, 14, 22);
    var patch12 = new Array(20, 12, 24);
    var patch13 = new Array(10, 2, 12);
    var patch14 = new Array(0, 2, 10);

    var patchTypes = new Array(patch0, patch1, patch2, patch3, patch4, patch5, patch6, patch7, patch8, patch9, patch10, patch11, patch12, patch13, patch14, patch0);
    var centerPatchTypes = new Array(0, 4, 8, 15);

    function render_identicon_patch (ctx: any, x: number, y: number, size: number, patch: any, turn: any, invert: boolean, foreColor: string, backColor: string) {

    patch %= patchTypes.length;
    turn %= 4;
    if (patch == 15) {
        invert = !invert;
    }

    var vertices = patchTypes[patch];
    var offset = size / 2;
    var scale = size / 4;

    ctx.save();

    // paint background
    ctx.fillStyle = invert ? foreColor : backColor;
    ctx.fillRect(x, y, size, size);

    // build patch path
    ctx.translate(x + offset, y + offset);
    ctx.rotate(turn * Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo((vertices[0] % 5 * scale - offset), (Math.floor(vertices[0] / 5) * scale - offset));
    for (var i = 1; i < vertices.length; i++)
    ctx.lineTo((vertices[i] % 5 * scale - offset), (Math.floor(vertices[i] / 5) * scale - offset));
    ctx.closePath();

    // offset and rotate coordinate space by patch position (x, y) and
    // 'turn' before rendering patch shape

    // render rotated patch using fore color (back color if inverted)
    ctx.fillStyle = invert ? backColor : foreColor;
    ctx.fill();

    // restore rotation
    ctx.restore();
    }

    function render_identicon (ctx: any, code: any, size: number) {

    var patchSize = size / 3;
    var middleType = centerPatchTypes[code & 3];
    var middleInvert = ((code >> 2) & 1) != 0;
    var cornerType = (code >> 3) & 15;
    var cornerInvert = ((code >> 7) & 1) != 0;
    var cornerTurn = (code >> 8) & 3;
    var sideType = (code >> 10) & 15;
    var sideInvert = ((code >> 14) & 1) != 0;
    var sideTurn = (code >> 15) & 3;
    var blue = (code >> 16) & 31;
    var green = (code >> 21) & 31;
    var red = (code >> 27) & 31;
    var foreColor = 'rgb(' + (red << 3) + ',' + (green << 3) + ',' + (blue << 3) + ')';
    var backColor = 'rgb(255,255,255)';

    // middle patch
    render_identicon_patch(ctx, patchSize, patchSize, patchSize, middleType, 0, middleInvert, foreColor, backColor);

    // side patchs, starting from top and moving clock-wise
    render_identicon_patch(ctx, patchSize, 0, patchSize, sideType, sideTurn++, sideInvert, foreColor, backColor);
    render_identicon_patch(ctx, patchSize * 2, patchSize, patchSize, sideType, sideTurn++, sideInvert, foreColor, backColor);
    render_identicon_patch(ctx, patchSize, patchSize * 2, patchSize, sideType, sideTurn++, sideInvert, foreColor, backColor);
    render_identicon_patch(ctx, 0, patchSize, patchSize, sideType, sideTurn++, sideInvert, foreColor, backColor);

    // corner patchs, starting from top left and moving clock-wise
    render_identicon_patch(ctx, 0, 0, patchSize, cornerType, cornerTurn++, cornerInvert, foreColor, backColor);
    render_identicon_patch(ctx, patchSize * 2, 0, patchSize, cornerType, cornerTurn++, cornerInvert, foreColor, backColor);
    render_identicon_patch(ctx, patchSize * 2, patchSize * 2, patchSize, cornerType, cornerTurn++, cornerInvert, foreColor, backColor);
    render_identicon_patch(ctx, 0, patchSize * 2, patchSize, cornerType, cornerTurn++, cornerInvert, foreColor, backColor);
    }

    function _gen(canvas: any, str: any, size: number, callback?: Function) {
    var hash = CryptoReact.createHash('sha1').update(Buffer.from(str, 'utf8')).digest('binary');
    var code = (hash.charCodeAt(0) << 24) | (hash.charCodeAt(1) << 16) |
    (hash.charCodeAt(2) << 8) | hash.charCodeAt(3);

    var ctx = canvas.getContext('2d');

    render_identicon(ctx, code, size);

    if (callback && typeof callback === 'function') {
        if (!canvas.toBuffer) {
            var imageData = ctx.getImageData(0, 0, size, size);
            callback(null, canvas.toDataURL('image/png'));
            return;
        }
        return canvas.toBuffer(function (err: any, buffer: any) {
            callback(err, buffer);
        });
    }
    else {
        if (!canvas.toBuffer) {
            return canvas.toDataURL('image/png');
        }
        return canvas.toBuffer();
    }
    }

    export function generate(canvas: any, str: {id: string, size: number} | string, size: any, callback: Function) {
        if (typeof str === 'object' && typeof size === 'function') {
            return _gen(canvas, str.id, str.size, size);
        }

        return _gen(canvas, str, size, callback);
    }

    export function generateSync(canvas: any, str: {id: string, size: number} | string, size: number) {
        if (typeof str === 'object') {
            return _gen(canvas, str.id, str.size);
        }

        return _gen(canvas, str, size);
    }

}