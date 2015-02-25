/**
 * Created by Dean Panayotov Local on 8.2.2015 г..
 */

var Maze = function(){

    this.generateMaze = function(width, height) {
        var totalCells = width * height - 1;
        var x, y;
        var horizontal =[]; for (x = 0; x < width + 1; x++) horizontal[x] = [];
        var vertical =[]; for (y = 0; y < height + 1; y++) vertical[y] = [];
        var here = [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
        var path = [here];
        var unvisited = [];
        var next;
        for (x = 0; x < width + 2; x++) {
            unvisited[x] = [];
            for (y = 0; y < height + 1; y++)
                unvisited[x].push(
                        x > 0 &&
                        x < width + 1 &&
                        y > 0 &&
                        (
                            x != here[0] + 1 ||
                            y != here[1] + 1
                        )
                );
        }
        while (0 < totalCells) {
            var potential = [[here[0] + 1, here[1]],
                             [here[0], here[1] + 1],
                             [here[0] - 1, here[1]],
                            [here[0], here[1] - 1]];
            var neighbors = [];
            for (x = 0; x < 4; x++)
                if (unvisited[potential[x][0] + 1][potential[x][1] + 1])
                    neighbors.push(potential[x]);
            if (neighbors.length) {
                totalCells--;
                next = neighbors[Math.floor(Math.random() * neighbors.length)];
                unvisited[next[0] + 1][next[1] + 1] = false;
                if (next[0] == here[0])
                    horizontal[next[0]][(next[1] + here[1] - 1) / 2] = true;
                else
                    vertical[(next[0] + here[0] - 1) / 2][next[1]] = true;
                path.push(here = next);
            } else
                here = path.pop();
        }
        return {width: width, height: height, horizontal: horizontal, vertical: vertical};
    };

    this.parseMaze = function(m) {
        var cells = [];
        var x, y;
        for (x = 0; x < m.width * 2 + 1; x++) {
            var line= [];
            if (0 == x % 2)
                for (y = 0; y < m.height * 2 + 1; y++)
                    if (0 == y % 2)
                        line[y] = new Cell(x, y, Cell.WALL_JOINT);
                    else
                    if (x > 0 && m.vertical[x / 2 - 1][Math.floor(y / 2)])
                        line[y] = undefined;
                    else
                        line[y] = new Cell(x, y, Cell.VERTICAL_WALL);
            else
                for (y = 0; y < m.height * 2 + 1; y++)
                    if (0 == y % 2)
                        if (y > 0 && m.horizontal[(x - 1) / 2][y / 2 - 1])
                            line[y] = undefined;
                        else
                            line[y] = new Cell(x, y, Cell.HORIZONTAL_WALL);
                    else
                        line[y] = undefined;
            cells[x] = line;
        }

        this.wreckWalls(cells);
        return cells;
    };

    this.wreckWalls = function(m){
        var numberWallsToWreck = MAZE_SIZE * MAZE_SIZE * WRECK_PERCENTAGE;
        var x, y;
        while (numberWallsToWreck > 0) {
            x = (numberWallsToWreck % 2 == 0 ? oddRange(MAZE_SIZE) : evenRange(MAZE_SIZE));
            y = (numberWallsToWreck % 2 == 0 ? evenRange(MAZE_SIZE) : oddRange(MAZE_SIZE));
            if (m[x][y] != undefined) {
                m[x][y] = undefined;
                numberWallsToWreck--;
            }
        }
    };


    function oddRange(num){
        return Math.floor(Math.random() * num) * 2 + 1;
    }

    function evenRange(num) {
        return Math.floor(Math.random() * (num - 1)) * 2 + 2;
    }

    this.render = function (ctx) {
        for (var x = 0; x < MAZE_SIZE * 2 + 1; x++) {
            for (var y = 0; y < MAZE_SIZE * 2 + 1; y++) {
                if (this.cells[x][y]) {
                    this.cells[x][y].render(ctx);
                }
            }
        }
    };

    this.cells = this.parseMaze(this.generateMaze(MAZE_SIZE, MAZE_SIZE));

};