startGame(8, 8, 10);

function startGame(WIDTH, HEIGHT, BOMBES_COUNT){
  const field = document.querySelector('.field');
  const cellsCount = WIDTH * HEIGHT;
  field.innerHTML = '<button></button>'.repeat(cellsCount);
  const cells = [...field.children];

  let closedCount = cellsCount;


  const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5 )
    .slice(0, BOMBES_COUNT);


    field.addEventListener('click', (event) => {
        if(event.target.tagName != 'BUTTON') {
            return;
        }

        const index = cells.indexOf(event.target)
        const colum = index % WIDTH;
        const row = Math.floor(index / WIDTH) ;
        open(row, colum);
    });

    function isValid(row, colum){
        return row >= 0 
        && row < HEIGHT
        && colum >= 0 
        &&colum < WIDTH
    }

    function getCount(row, colum){
        let count = 0;
        for (let x = -1; x <= 1; x++){
            for (let y = -1; y <= 1; y++){
               if(isBomb(row + y, colum + x)){
                   count++
               } 
            }
        }
        return count;
    }

    function open(row, colum ){
        if(!isValid(row, colum)) return;

        const index = row * WIDTH + colum;
        const cell = cells[index];

        if(cell.disabled === true) return;

        cell.disabled = true;

        if (isBomb(row, colum)){
            cell.innerHTML = 'x';
            alert('You Loose')
            return;
        }

        closedCount--;
        if(closedCount <= BOMBES_COUNT) {
            alert('You won!');
            return;
        }


        const count = getCount(row, colum);

        if (count !== 0){
            cell.innerHTML = count;
            return;
        }

        for (let x = -1; x <= 1; x++){
            for (let y = -1; y <= 1; y++){
               open(row + y, colum + x);
            }
        }
    
    }

    function isBomb(row, colum){
        if(!isValid(row, colum)) return false;

        const index = row * WIDTH + colum;

        return bombs.includes(index);
    }
}