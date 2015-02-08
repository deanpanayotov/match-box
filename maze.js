/**
 * Created by Dean Panayotov Local on 8.2.2015 г..
 */

var Maze = function(){

    this.generateMaze = function(x, y) {
        var n = x * y - 1;
        var j;
        if (n < 0) { alert("illegal generateMaze dimensions"); return; }
        var horizontal =[]; for (j = 0; j < x + 1; j++) horizontal[j] = [];
        var vertical =[]; for (j = 0; j < y + 1; j++) vertical[j] = [];
        var here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)];
        var path = [here];
        var unvisited = [];
        var next;
        for (j = 0; j < x + 2; j++) {
            unvisited[j] = [];
            for (var k = 0; k < y + 1; k++)
                unvisited[j].push(j > 0 && j < x + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
        }
        while (0 < n) {
            var potential = [[here[0] + 1, here[1]], [here[0], here[1] + 1],
                [here[0] - 1, here[1]], [here[0], here[1] - 1]];
            var neighbors = [];
            for (j = 0; j < 4; j++)
                if (unvisited[potential[j][0] + 1][potential[j][1] + 1])
                    neighbors.push(potential[j]);
            if (neighbors.length) {
                n = n-1;
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
        return {x: x, y: y, horiz: horizontal, verti: vertical};
    }

    this.parseMaze = function(m) {
        var mazeArray = [];
        var k;
        for (var j = 0; j < m.x * 2 + 1; j++) {
            var line= [];
            if (0 == j % 2)
                for (k = 0; k < m.y * 2 + 1; k++)
                    if (0 == k % 2)
                        line[k] = new Cell(j, k, Cell.WALL_JOINT);
                    else
                    if (j > 0 && m.verti[j / 2 - 1][Math.floor(k / 2)])
                        line[k] = undefined;
                    else
                        line[k] = new Cell(j, k, Cell.VERTICAL_WALL);
            else
                for (k = 0; k < m.y * 2 + 1; k++)
                    if (0 == k % 2)
                        if (k > 0 && m.horiz[(j - 1) / 2][k / 2 - 1])
                            line[k] = undefined;
                        else
                            line[k] = new Cell(j, k, Cell.HORIZONTAL_WALL);
                    else
                        line[k] = undefined;
            mazeArray[j] = line;
        }

        this.wreckWalls(mazeArray);
        return mazeArray;
    }

    this.wreckWalls = function(m){
        var numberWallsToWreck = MAZE_WIDTH * MAZE_HEIGHT * WRECK_PERCENTAGE;
        var x, y;
        while (numberWallsToWreck > 0) {
            x = (numberWallsToWreck % 2 == 0 ? oddRange(MAZE_WIDTH) : evenRange(MAZE_WIDTH));
            y = (numberWallsToWreck % 2 == 0 ? evenRange(MAZE_HEIGHT) : oddRange(MAZE_HEIGHT));
            if (m[x][y] != undefined) {
                m[x][y] = undefined;
                numberWallsToWreck--;
            }
        }
    }

    this.render = function (ctx) {
        for (var x = 0; x < MAZE_WIDTH * 2 + 1; x++) {
            for (var y = 0; y < MAZE_HEIGHT * 2 + 1; y++) {
                if (this.cells[x][y]) {
                    this.cells[x][y].render(ctx);
                }
            }
        }
    }

    this.cells = this.parseMaze(this.generateMaze(MAZE_WIDTH, MAZE_HEIGHT));

};