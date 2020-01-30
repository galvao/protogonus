/**
 * Protogonus - A simple JavaScript timer
 *
 * @version 0.1.0
 * @author Er Galvão Abbott <galvao@galvao.eti.br>
 * @link https://github.com/galvao/protogonus
 * @license MIT
 */

'use strict';

class Protogonus
{
    begin;
    direction;
    elapsed;
    handler;
    running;
    target;

    constructor(direction = 'up', begin = 0, target)
    {
        if (typeof direction !== 'string') {
            throw new TypeError('direction must be a string');
        }

        if (direction !== 'up' && direction !== 'down') {
            throw new Error('direction must be either up or down');
        }

        if (direction === 'up' && target < begin) {
            throw new Error('direction is upwards, but target is lower than begin.');
        }

        if (direction === 'down' && target > begin) {
            throw new Error('direction is downwards, but target is higher than begin.');
        }

        if (typeof begin !== 'number') {
            throw new TypeError('begin must be a number');
        }

        if (typeof target !== 'number') {
            throw new TypeError('target is required and must be a number');
        }

        this.running   = false;
        this.begin     = parseInt(begin);
        this.direction = direction;
        this.elapsed   = this.begin;
        this.target    = parseInt(target);
    }

    start()
    {
        this.running = true;
        this.handler = self.setInterval(this.tick.bind(this), 1000);
    }

    tick()
    {
        if (this.direction == 'up') {
            this.elapsed++;
        } else {
            this.elapsed--;
        }

        if (this.elapsed === this.target) {
            this.stop();
        }
    }

    stop()
    {
        this.running = false;
        self.clearInterval(this.handler);
    }

    reset()
    {
        this.stop();
        this.elapsed = 0;
    }

    query()
    {
        return this.elapsed;
    }
}
