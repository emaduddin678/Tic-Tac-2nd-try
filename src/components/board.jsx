import React from "react";
import Square from "./square";

function Board(props) {
    return (
        <div>
            <div className="board-row">
                <Square value= "1" />
                <Square value= "2" />
                <Square value= "3" />
            </div>
        </div>
    );
};


export default Board;