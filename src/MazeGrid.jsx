import "./App.css";
import { useState } from "react";

export default function MazeGrid({ width = 10, height = 10 }) {  
  let initialMaze = [
    ["wall", "wall", "wall", "wall"],
    ["start", "path", "path", "wall"],
    ["wall", "wall", "path", "wall"],
    ["wall", "wall", "path", "end"],
    ["wall", "wall", "wall", "wall"],
  ];


  function bfs(startNode) {
    let queue = [startNode];
    let visited = new Set(`${startNode[0]}, ${startNode[1]}`)

    function visitCell([x,y]){
      if(maze[y][x] === "end"){
      console.log("path found!")
      return true
      }
      return false
    }

    
    function step(){
      if(queue.length === 0){
        return
      }
      const [x,y] = queue.shift();
      console.log('new step');
      const dirs = [  //[horizontal direction, vertical direction]
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    
    for( const [dx, dy] of dirs){
      const nx = x + dx;
      const ny  = y + dy;

      if(
        nx >= 0 && 
        nx < width && 
        ny >= 0 && 
        ny >= height && 
        !visited.has(`${nx}, ${ny}`)
        ){
        visited.add(`${nx}, ${ny}`)
        if(maze[nx][ny] === "path" || maze[nx][ny] === "end"){
          if(visitCell(startNode)){
            return true
          }
          queue.push([nx][ny])
        }
      }
    }

    }

    step()
    return false
  }



  /*----------------------------------------------*/

  function dfs(startNode) {
    let stack = [startNode];
    let visited = new Set(`${startNode[0]}, ${startNode[1]}`)

    function visitCell([x,y]){

      //console.log(x,y)

      if(maze[y][x] === "end"){
      console.log("path found!")
      return true
      }
      return false
    }

    
    function step(){
      if(stack.length === 0){
        return;
      }

      const [x,y] = stack.pop();
      console.log('new step');
      const dirs = [  //[horizontal direction, vertical direction]
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    
    for( const [dx, dy] of dirs){
      const nx = x + dx;
      const ny  = y + dy;
      if(nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx}, ${ny}`) ){
        visited.add(`${nx}, ${ny}`)
        if(maze[ny][nx] === "path" || maze[ny][nx] === "end"){
          if(visitCell(startNode)){
            return true
          }
          stack.push([nx][ny])
        }
      }
    }

    }

    step()
    return false
  }






  const [maze, setMaze] = useState(initialMaze);
//first a function to define the height and width
function generateMaze(height, width) {
  let matrix = [];

  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      let cell = Math.random();
        row.push('wall'); 
    }
    matrix.push(row);
  }
  console.log(matrix);
  //the carving function
  
  const dirs = [  //[x, y]
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      function isCellValid(x,y){
        return y >= 0 && x >= 0 && x < width && y < height && matrix[y][x] === "wall" //safely move
      }

    function carvePath(x,y){
      matrix[y][x] = "path"

      const directions = dirs.sort(() => Math.random() - 0.5);
      
      for(let [dx, dy] of directions){
        const nx = x + dx * 2;
        const ny = y + dy * 2;

        if(isCellValid(nx, ny)){
          matrix[y + dy][x + dx] = "path";
          carvePath(nx, ny)
        }
      }
    }

    carvePath(1,1);

    matrix[1][0] = "start"; //matrix[y][x]
    matrix[height - 2][width - 1] = "end";

  setMaze(matrix);
}
  return (
    <div className="maze-grid">
      <button className={"maze-button"} onClick={() => generateMaze(10, 10)}>
        Refresh Maze
      </button>
      <button className={"maze-button"} onClick={() => generateMaze(10, 10)}>
        Breadth-First Search
      </button>
      <button className={"maze-button"} onClick={() => generateMaze(10, 10)}>
        Depth-First Search
      </button>
      <div className={"maze"}>
        {maze.map((row, rowIndex) => (
          <div className="row">
            {row.map((cell, cellIndex) => (
              <div className={`cell ${cell}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
