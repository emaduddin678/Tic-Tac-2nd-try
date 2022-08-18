import React from "react";
import Board from "./board";

class Game extends React.Component {
    render() {
        return (
          <div>
            <h1>Game Component</h1>
            <Board />
          </div>
        );
    }
}


export default Game;