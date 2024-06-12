document.addEventListener('DOMContentLoaded', function() {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const emptyTile = document.querySelector('.empty');
    const puzzle = document.getElementById('puzzle');
    const puzzleWidth = 3;
    const puzzleHeight = 3;
    let emptyTileIndex = 8;
    const winningCombination = ['tile-1', 'tile-2', 'tile-3', 'tile-4', 'tile-5', 'tile-6', 'tile-7', 'tile-8', 'empty'];
    let isSolved = false;

    // Initialize the puzzle
    function initializePuzzle() {
      tiles.forEach(function(tile, index) {
        tile.addEventListener('click', function() {
          if (!isSolved) {
            moveTile(index);
          }
        });
      });

      window.addEventListener('keydown', function(event) {
        if (!isSolved) {
          const keyCode = event.keyCode;
          if (keyCode === 37) {
            moveTile(emptyTileIndex + 1); // Move right
          } else if (keyCode === 38) {
            moveTile(emptyTileIndex + puzzleWidth); // Move down
          } else if (keyCode === 39) {
            moveTile(emptyTileIndex - 1); // Move left
          } else if (keyCode === 40) {
            moveTile(emptyTileIndex - puzzleWidth); // Move up
          }
        }
      });

      checkSolution();
    }

    function moveTile(tileIndex) {
      if (isAdjacent(tileIndex, emptyTileIndex)) {
        swapTiles(tileIndex, emptyTileIndex);
        emptyTileIndex = tileIndex;
        checkSolution();
      }
    }

    function isAdjacent(index1, index2) {
      const row1 = Math.floor(index1 / puzzleWidth);
      const col1 = index1 % puzzleWidth;
      const row2 = Math.floor(index2 / puzzleWidth);
      const col2 = index2 % puzzleWidth;
      return (
        (Math.abs(row1 - row2) === 1 && col1 === col2) ||
        (Math.abs(col1 - col2) === 1 && row1 === row2)
      );
    }

    function swapTiles(index1, index2) {
      const tempClass = tiles[index1].classList.value;
      tiles[index1].classList.value = tiles[index2].classList.value;
      tiles[index2].classList.value = tempClass;

      const tempContent = tiles[index1].innerHTML;
      tiles[index1].innerHTML = tiles[index2].innerHTML;
      tiles[index2].innerHTML = tempContent;
    }

    function checkSolution() {
      const currentCombination = tiles.map(tile =>
        tile.classList.contains('empty') ? 'empty' : tile.classList[1]
      );
      isSolved = JSON.stringify(currentCombination) === JSON.stringify(winningCombination);
        
      if (isSolved) {
        puzzle.classList.add('solved');
        fadeInEmptyTile();
        const puzzleDone = true;  
        localStorage.setItem("puzzleDone", puzzleDone);
        setTimeout(() => {
          window.open("viruses.html");
        }, 2000);
        
      } else {
        puzzle.classList.remove('solved');
      }
    }

    function fadeInEmptyTile() {
      puzzleDone= true;
      const emptyTileImage = document.querySelector(".empty img");
      emptyTileImage.style.opacity = 0; 

      const intervalId = setInterval(function() {
        let opacity = parseFloat(emptyTileImage.style.opacity);
        opacity += 0.1; 
        emptyTileImage.style.opacity = opacity;

        if (opacity >= 1) {
          clearInterval(intervalId);
        }
      }, 100);
    }



    initializePuzzle();
  });

  function Points(){
    const puzzleisDone = localStorage.getItem('puzzleDone') === 'true';
    document.addEventListener("DOMContentLoaded", () => {
        const container = document.getElementById('puzzle');
        const points = [];
        const numPoints = 50; // Total de pontos

    
        // Função para gerar um número aleatório entre min e max
        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }
    
    
        // Cria pontos com posições e direções aleatórias
        for (let i = 0; i < numPoints; i++) {
            const point = document.createElement('div');
            point.classList.add('point');
            container.appendChild(point);

    
            points.push({
                element: point,
                x: getRandom(0, window.innerWidth - 20),
                y: getRandom(0, window.innerHeight - 20),
                dx: getRandom(-3, 3), // Garantir que dx não seja 0
                dy: getRandom(-3, 3)   // Garantir que dy não seja 0
            });
        }
    
        function movePoints() {
          
            points.forEach(point => {
                // Move o ponto
                point.x += point.dx;
                point.y += point.dy;
    
                // Verifica colisão com as bordas do contêiner
                if (point.x <= 0 || point.x >= window.innerWidth - 20) {
                    point.dx *= -1; // Inverte a direção no eixo x
                }
                if (point.y <= 0 || point.y >= window.innerHeight - 20) {
                    point.dy *= -1; // Inverte a direção no eixo y
                }
    
                // Atualiza a posição do elemento ponto
                point.element.style.left = `${point.x}px`;
                point.element.style.top = `${point.y}px`;
                if(puzzleisDone == true){
                  point.element.style.background = "#119822";
                  
                }else {
                  point.element.style.background = "#E30613";
                }

            });
    
            requestAnimationFrame(movePoints);
            
        }
    
        movePoints();
    });




    }
    



   



  Points();
  

 