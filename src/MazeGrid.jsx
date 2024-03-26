import "./App.css";
import { useState } from "react";

export default function MazeGrid() {
  let initialMaze = [
    ["wall", "wall", "wall", "wall"],
    ["start", "path", "path", "wall"],
    ["wall", "wall", "path", "wall"],
    ["wall", "wall", "path", "end"],
    ["wall", "wall", "wall", "wall"],
  ];
  
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
    
    const dirs = [  //[horizontal direction, vertical direction]
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
        console.log(directions);

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





    
    

  //   function isCellValid(x, y) {
  //     if (y >= 0 && x >= 0 && y < height && x < width) {
  //       console.log(matrix[y][x]); 
  //       return matrix[x][y] === "wall";
  //     } else {
  //       return false; 
  //     }
  //   }

  //   function carvePath(x, y) {
  //    matrix[x][y] = "path";

  //     const directions = dirs.sort(() => Math.random() - 0.5);
  //     console.log('dirs', directions)

  //     for (let [dx, dy] of directions) {
  //       const nx = x + dx * 2;
  //       const ny = y + dy * 2;
  //       console.log("nx:", nx, "ny:", ny); 
  //       if (isCellValid(nx, ny)) {
  //         matrix[y + dy][x + dx] = "path";
  //         carvePath(nx, ny);
  //       }
  //     }
  //   }
  //   carvePath(1, 1);
    
  //   matrix[1][0] = "start";
  //   matrix[height - 2][width - 1] = "end";
  //   setMaze(matrix);
  // }

  return (
    <div className="maze-grid">
      <button className={"maze-button"} onClick={() => generateMaze(10, 10)}>
        Refresh Maze
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
