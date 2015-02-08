/**
 * Created by Dean Panayotov Local on 8.2.2015 г..
 */
var Cell = function(x, y, type){

    this.renderx = x * STEP;
    this.rendery = y * STEP;
    this.type = type;

    switch (this.type){
        case Cell.VERTICAL_WALL:
            this.image = a_i_wall_wh_v;
            break;
        case Cell.HORIZONTAL_WALL:
            this.image = a_i_wall_wh_h;
            break;
        case Cell.WALL_JOINT:
            this.image = a_i_wall_wh_x;
            break;
        default:
            this.image = undefined;
    }

    this.render = function(ctx){
        ctx.drawImage(this.image, this.renderx, this.rendery, Cell.SIZE, Cell.SIZE);
    }
}

Cell.SIZE = STEP;

Cell.VERTICAL_WALL = '|';
Cell.HORIZONTAL_WALL = '-';
Cell.WALL_JOINT = '+';
Cell.EMPTY = ' ';