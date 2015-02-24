/**
 * Created by Dean Panayotov Local on 8.2.2015 г..
 */
var Cell = function(x, y, type){

    this.renderx = x * STEP;
    this.rendery = y * STEP;
    this.type = type;

    switch (this.type){
        case Cell.VERTICAL_WALL:
            this.image = images.wall_vertical;
            break;
        case Cell.HORIZONTAL_WALL:
            this.image = images.wall_horizontal;
            break;
        case Cell.WALL_JOINT:
            this.image = images.wall_intersection;
            break;
        default:
            this.image = undefined;
    }

    if(Cell.RENDER_STYLE === Cell.RENDER_POLYGON){

        if(Cell.POLYGON_STYLE === Cell.POLYGON_STYLE_1){
            this.JOINT_RADIUS = Cell.SIZE / 2;
        }else if(Cell.POLYGON_STYLE === Cell.POLYGON_STYLE_2){
            this.JOINT_RADIUS = Cell.SIZE / 4;
        }
        this.WALL_THICKNESS = Cell.SIZE /2;
        this.HALF_A_WALL = this.WALL_THICKNESS / 2;
        this.HALF_A_CELL = Cell.SIZE / 2;

        this.render_WALL_JOINT = function(ctx){
            var centerx = this.renderx + this.HALF_A_CELL,
                centery = this.rendery + this.HALF_A_CELL;
            ctx.beginPath();
            ctx.moveTo(centerx, centery);
            ctx.arc(centerx, centery, this.JOINT_RADIUS, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        };

        this.render_HORIZONTAL_WALL = function(ctx){
            ctx.fillRect(this.renderx - this.HALF_A_CELL, this.rendery + this.HALF_A_CELL - this.HALF_A_WALL, Cell.SIZE * 2, this.WALL_THICKNESS);
        };

        this.render_VERTICAL_WALL = function(ctx){
            ctx.fillRect(this.renderx + this.HALF_A_CELL - this.HALF_A_WALL, this.rendery - this.HALF_A_CELL, this.WALL_THICKNESS, Cell.SIZE * 2);
        };
        this.render = function(ctx){
            ctx.fillStyle = Cell.COLOR;
            switch(this.image){
                case images.wall_intersection:
                    this.render_WALL_JOINT(ctx);
                    break;
                case images.wall_horizontal:
                    this.render_HORIZONTAL_WALL(ctx);
                    break;
                case images.wall_vertical:
                    this.render_VERTICAL_WALL(ctx);
                    break;
            }
        }
    }else if(Cell.RENDER_STYLE === Cell.RENDER_IMAGE){
        this.render = function(ctx){
            ctx.drawImage(this.image, this.renderx, this.rendery, Cell.SIZE, Cell.SIZE);
        }
    }
}

Cell.COLOR = "#FFCC66";

Cell.RENDER_IMAGE = 0;
Cell.RENDER_POLYGON = 1;
Cell.RENDER_STYLE = Cell.RENDER_POLYGON;

Cell.POLYGON_STYLE_1 = 1;
Cell.POLYGON_STYLE_2 = 2;
Cell.POLYGON_STYLE = Cell.POLYGON_STYLE_2;

Cell.SIZE = STEP;

Cell.VERTICAL_WALL = '|';
Cell.HORIZONTAL_WALL = '-';
Cell.WALL_JOINT = '+';
