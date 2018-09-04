import Configs from './config';

class Num {
    constructor(canvas, num) {
        this.num = num;
        this.ticked = 0;

        const minWidth = Configs.pad;
        const maxWidth = canvas.width - Configs.pad;
        const minHeight = Configs.pad;
        const maxHeight = canvas.height - Configs.pad;

        this.x = minWidth + Math.random() * (maxWidth - minWidth);
        this.y = minHeight + Math.random() * (maxHeight - minHeight);
        this.canvas = canvas;
    }

    draw = () => {
        const context = this.canvas.getContext('2d');
        context.fillStyle = Configs.tickColor[this.ticked];
        context.font = Configs.font;
        context.fillText(this.num, this.x, this.y);
    }

    tick = (val) => {
        this.ticked = val;
    }

    isCollision = (x, y) => {
        return (
            x >= this.x
            && x <= this.x + Configs.fontSize
            && y >= this.y - Configs.fontSize
            && y <= this.y
        )
    }
}

export default Num;