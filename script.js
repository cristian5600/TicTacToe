const gameBoard =( ()=>{   
    let gamestate = [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
    const CONTENT = document.getElementsByClassName(`content`);

    const print = ()=>{
        console.log(gamestate);
    }
    const createBoard = ()=>{
        const BOARD = document.createElement(`div`);
        CONTENT[0].appendChild(BOARD);
        BOARD.classList.add(`board`);
        for(let i =0; i<9 ; i++){
            const box = document.createElement(`div`);
            box.setAttribute(`data-position`,`${i}`);
            box.classList.add(`box`)
            BOARD.appendChild(box);
        }
    }
    const draw = (value,position) =>{
        let squares = document.getElementsByClassName(`box`); //('[data-id="box1"]')       
        for(x of squares){
            if(x.dataset.position === `${position}`){
                if(value === `X`){
                    x.classList.add(`cross`);
                    gamestate[position] = 1;
                }
                else if (value === `O`){
                    x.classList.add(`circle`)
                    gamestate[position] = -1;
            }   
            }
        }
    }
    const remove = ()=>{
        removeAllChildNodes(document.getElementsByClassName(`content`)[0]);
        
        
    }
    const clean = () =>{
        remove();
        createBoard();
        for(let i =0; i < gameBoard.gamestate.length ; i++){
            gameBoard.gamestate[i] = 0;
        }
    }
    return {gamestate,print,createBoard,draw,clean};
})();
const player = (NAME,PICK) =>{
    let name = NAME;
    let pick = PICK;
    let currentState = `inactive`;
    
    
    const getState = () => {
        return currentState;
    }
    return {name,pick,getState,currentState}
    
}
const play = ( ()=>{
    const boxes = document.getElementsByClassName(`box`);
    const SCORE1 = document.getElementsByClassName(`score1`);
    const SCORE2 = document.getElementsByClassName(`score2`);
    //const player1 = player(`player1`,`X`);
    //const player2 = player(`player2`,`O`);
    const tripleX = [ 1, 1, 1];
    const tripleO = [ -1, -1, -1];
    let logicCount = 0 ;
    let score1 = 0;
    let score2 = 0;
    const pick = () => {
        if(logicCount % 2 === 0){
            logicCount++;
            return `X`;
        }
        else {
            logicCount++;
            return `O`;
        }

    }
    const myAlert1 = ()=> {
        setTimeout(alert(`Player1 has won!`),200);
    }
    const myAlert2 = () => {
        setTimeout(alert(`Player2 has won!`),200);
    }
    const myAlert0 = () => {
        setTimeout(alert(`Draw!`),200);
    }
    const activate = (e) =>{
        if(e.path[0].classList.contains(`cross`) === false && e.path[0].classList.contains(`circle`) === false)
            gameBoard.draw(pick(),e.path[0].dataset.position);
        else return;
        if(checkBoard() === 1){
            setTimeout(myAlert1,200);
            stopGame();
            logicCount = 0;
            score1++;
            SCORE1[0].textContent = `${score1}`
        }
        else if (checkBoard() === -1){
            setTimeout(myAlert2,200);
            stopGame();
            score2++;
            logicCount = 0;
            SCORE2[0].textContent = `${score2}`
        }
        else if(checkBoard() === `draw`){
            setTimeout(myAlert0,200);
            stopGame();
            logicCount = 0;
        }

    }

    const startGame = () => {
        
        for(box of boxes){
            box.addEventListener(`click`, activate)
        }
    }
    const stopGame = () => {
        //currentState = `inactive`;
        for(box of boxes)
            box.removeEventListener(`click`, activate);
        
    }

    const checkBoard = ()=>{ //for win or draw
       for(let i = 0;i < 3 ; i++){  ///checking rows
            if      ( arrayEquals(gameBoard.gamestate.slice(i*3,3+i*3),tripleX) )
                return 1;
            else if ( arrayEquals(gameBoard.gamestate.slice(i*3,3+i*3),tripleO) )
                return -1;
        }
       for(let i = 0;i < 3 ; i++){ // checking columns
            let column = [ gameBoard.gamestate[i], gameBoard.gamestate[i + 3] ,gameBoard.gamestate[i + 6]];
            if( arrayEquals(column,tripleX) )
                return 1;
            else if ( arrayEquals(column,tripleO) )
                return -1;
        }
        ///checking cross sections
        if( gameBoard.gamestate[0] === 1 && gameBoard.gamestate[4]===1 && gameBoard.gamestate[8] === 1) 
            return 1;
        if (gameBoard.gamestate[0] === -1 && gameBoard.gamestate[4]===-1 && gameBoard.gamestate[8]===-1)
            return -1;
        if( gameBoard.gamestate[2] === 1 && gameBoard.gamestate[4]===1 && gameBoard.gamestate[6] === 1)
            return 1;
        if (gameBoard.gamestate[2] === -1 && gameBoard.gamestate[4]===-1 && gameBoard.gamestate[6]===-1)
            return -1;
        if(logicCount === 9)
            return `draw`;
        return 0;
    }
    const reset  =   ()=>{
        buton = document.getElementsByClassName(`reset`);
        buton[0].addEventListener(`click`, resetGame);
    }

    const resetGame = ()=>{
        gameBoard.clean();
        startGame();
        
    }
    return {pick,checkBoard,startGame,reset};
})();

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }
gameBoard.createBoard();
play.startGame();
play.reset();
