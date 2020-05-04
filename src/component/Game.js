import React, { Component } from 'react';
import Board from './Board'

export default class Game extends Component
{
    constructor(props){
        super(props);
        this.state={
            xlsNext :true,
            stepNumber :0,
            history :[
                {squares:Array(9).fill(null) }
            ]
        }
    }

    jumpTo(step)
    {
        this.setState({
            stepNumber: step,
            xlsNext:(step%2)===0
        })
    }

    handleClick(i){
       
        const history = this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if(winner || squares[i]){
            return;
        }
        squares[i] = this.state.xlsNext?'X':'O';
        this.setState({
                history:history.concat({
                    squares:squares
                }),
                xlsNext: !this.state.xlsNext,
                stepNumber: history.length
            });
    }

    render (){
        const history = this.state.history;
        const current=history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step,move)=>{
            const desc = move?'Go to step ' + move:'Start Game';
            return(
                <li key={move}>
                    <button onClick={()=>{this.jumpTo(move)}}>
                       <div className="info">
                       {desc}
                        </div> 
                    </button>
                </li>
            )
        });
        let status;
        if (winner){
            status = 'Winner is '+ winner;
        }else{
            status = 'Next player is ' + (this.state.xlsNext?'X':'O');
        }
        return(
          <div >
              <h1 className="heading">Let's Play Tic-Tac-Toe</h1>
          
        <div className="game">
           
            <div className="game-board">
                <Board onClick={(i)=>this.handleClick(i)} 
                squares={current.squares}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ul>{moves}</ul>
            </div>
        </div>
        </div> 
        )
    }
}

function calculateWinner (squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i=0;i<lines.length;i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a]=== squares[b] && squares[b] === squares[c]){
            return squares[a];
        }

    }
    return null;
}