function game(array){
    let board = [['false', 'false', 'false'],
    ['false', 'false', 'false'],
    ['false', 'false', 'false']];

    // new Array(3);
    // board.fill(['false', 'false', 'false'],0,3);
    let player ='';
    let winner = '';
    let counter=0;
    let row =0;
    let col=0;
    for(let position of array){
        row=Number(position[0]);
        col = Number(position[2]);
        if(board[row][col]!='false'){
            console.log('This place is already taken. Please choose another!');
            continue;
        }
        if(counter%2==0){
            player='X';
        }else{
            player='O';
        }
        
        board[row][col]=player;
       if(CheckIfWins(board, player)){
           console.log(`Player ${player} wins!`);
           winner=player;
           break;
       }
      if(counter++==8){
          break;
      }
    }
    if(winner==""){
        console.log(`The game ended! Nobody wins :(`);
    }
    PrintBoard(board);

    function CheckIfWins(board, player){
       if(board[0][0]==player && board[0][1]== player && board[0][2]==player){
           return true;
        }
        if(board[1][0]==player && board[1][1]== player && board[1][2]==player){
            return true;
        }
        if(board[2][0]==player && board[2][1]== player && board[2][2]==player){
            return true;
        }
        if(board[0][0]==player && board[1][0]== player && board[2][0]==player){
            return true;
        }
        if(board[0][1]==player && board[1][1]== player && board[2][1]==player){
            return true;
        }
        if(board[0][2]==player && board[1][2]== player && board[2][2]==player){
            return true;
        }
        if(board[0][0]==player && board[1][1]== player && board[2][2]==player){
            return true;
        }
        if(board[2][0]==player && board[1][1]== player && board[0][2]==player){
            return true;
        }
        return false;
    }

    function PrintBoard(board){
        for(let item of board){
            console.log(item.join('\t'));
        }
    }
}
game(["0 1",
"0 0",
"0 2",
"2 0",
"1 0",
"1 2",
"1 1",
"2 1",
"2 2",
"0 0"]);