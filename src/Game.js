import Num from './Num';
import setupChannel from './Channel';
import Configs from './config';

class Game {
    constructor() {
        this.channel = setupChannel();
        this.canvas = document.querySelector('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext('2d');
        this.currentNumber = 1;

        this.arrNums = [];
        for (let i = 0; i < Configs.noOfNum; i++) {
            const num = new Num(this.canvas, i + 1);
            this.arrNums.push(num);
        }

        // render
        this.render();

        this.canvas.addEventListener('click', (e) => {
            const found = this.arrNums.find(num => num.isCollision(e.offsetX, e.offsetY));

            if (found && found.num === this.currentNumber) {
                found.tick(1);
                this.render();
                this.currentNumber++;
                this.channel.push('found_num', { num: found.num });
            }
        });

        this.channel.on("found_num", payload => {
            console.log('received', payload);
            this.otherPlayerTick(payload.num);
        });
    }

    render = () => {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.arrNums.forEach(num => num.draw());
    }

    otherPlayerTick = (num) => {
        if (num !== this.currentNumber) return;

        const found = this.arrNums.find(o => o.num === num);
        if (found && found.ticked === 0) {
            found.tick(-1);
            this.render();
            this.currentNumber++;
        }
    }
}

export default Game;