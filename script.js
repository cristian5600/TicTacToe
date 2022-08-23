const gameBoard =( ()=>{
    let gamestate = [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
    const CONTENT = document.getElementsByClassName(`content`);


    // mmethods 
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
        console.log(squares);
        for(x of squares){
            //console.log(x.dataset.position);
            if(x.dataset.position === `${position}`){
                if(value === `X`){
                    x.classList.add(`cross`);
                    gamestate[position] = 1;
                }
                else if (value === `O`){
                    x.classList.add(`circle`)}
                    gamestate[position] = -1;
            }   
        }
    }
    const remove = ()=>{
        removeAllChildNodes(document.getElementsByClassName(`content`)[0]);
        gamestate = [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
        
    }
    const clean = () =>{
        remove();
        createBoard();
    }
    return {gamestate,print,createBoard,draw,clean};
})();
const player = (NAME,PICK) =>{
    let name = NAME;
    let pick = PICK;
    let score = 0;
    const boxes = document.getElementsByClassName(`box`);
    const activate = (e)=>{
        console.log(e.path[0].dataset.position);
        gameBoard.draw(pick,e.path[0].dataset.position);
        stopInput();
    }

    const startInput = ()=> {
        for(box of boxes){
            box.addEventListener(`click`, activate)
        }
    }
    const stopInput = () => {
        for(box of boxes)
            box.removeEventListener(`click`, activate)
    }
    return {name,pick,score,startInput,stopInput}
    
}
const play = ( ()=>{
    const player1 = player(`player1`,`X`);
    const player2 = player(`player2`,`O`);
    const tripleX = [ 1, 1, 1];
    const tripleO = [ -1, -1, -1];
    const pick = (player1,player2)=>{

    }

    const switchPlayer = ()=>{

    }
    const checkBoard = ()=>{ //for win or draw
       console.log( gameBoard.gamestate.slice(0,3) );
       for(let i = 0;i < 3 ; i++)
            switch(gameBoard.gamestate.slice(i,3+i*3)){  ///checking rows
                case tripleX:
                    return 1;
                    
                case tripleO:
                    return -1;           
       }

       for(let i = 0;i < 3 ; i++){
            let column = [ gameBoard.gamestate[i], gameBoard.gamestate[i + 3] ,gameBoard.gamestate[i + 6]];
            console.log({row,tripleO,tripleX});
            switch(column){  ///checking columns
                case tripleX:
                    console.log(`FOUND IT`);
                    return 1;
                    
                case tripleO:
                    return -1;           
            }
        }
    }


    return {pick,switchPlayer,checkBoard};
})();

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}