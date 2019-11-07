import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {clone} from 'lodash';
import Grid from './grid';
import './index.css';



class App extends Component{

    constructor(){
        super();
        this.speed = 150;
        this.rows = 10;
        this.cols = 25;

        this.state = {
            generation: 1,
            playing: false,
            gridFull: this.generateEmptyGrid()
        }
    }

    generateEmptyGrid = () => {
        return Array(this.rows).fill().map(()=> Array(this.cols).fill(false))
    }

    selectBox = (row, col) => {
        let grid = clone(this.state.gridFull);
        grid[row][col] = !grid[row][col];
        this.setState({
            gridFull: grid
        })
    }

    seed = () => {
        let gridCopy = this.generateEmptyGrid();
        
        for (var i = 0; i < this.rows; i++){
            for (var j = 0; j < this.cols; j++){
                if (Math.floor(Math.random() * 4) === 1){
                    gridCopy[i][j] = true;
                }
            }
        }
        this.setState({
            gridFull: gridCopy
        });
    }

    playButtonClicked = () => {
        clearInterval(this.intervalId);
        if (!this.state.playing){
            this.iterate();
            this.intervalId = setInterval(this.iterate, this.speed);
        }
        this.setState({
            playing: !this.state.playing
        })
    }

    iterate = () => {

        let grid = this.state.gridFull;
        let gridCopy = clone(this.state.gridFull);

        for (var i = 0; i < this.rows; i++){
            for (var j = 0; j < this.cols; j++){
                let count = 0;
                //fewer than two, DIES
                //live cells with 2 or 3 live neighbors, LIVES
                //greater than 3 neighbors, DIES
                //dead cells with 3 neighbors, LIVES
                if (i > 0) if (grid[i - 1][j]) count++;
                if (i > 0 && j > 0) if (grid[i - 1][j - 1]) count++;
                if (i > 0 && j < this.cols - 1) if (grid[i - 1][j + 1]) count++;
                if (j < this.cols - 1) if (grid[i][j + 1]) count++;
                if (j > 0) if (grid[i][j - 1]) count++;
                if (i < this.rows - 1) if (grid[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0) if (grid[i + 1][j - 1]) count++;
                if (i < this.rows - 1 && j < this.cols - 1) if (grid[i + 1][j + 1]) count++;
                if (grid[i][j] && (count < 2 || count > 3))
                    gridCopy[i][j] = false;
                if (!grid[i][j] && count === 3) 
                    gridCopy[i][j] = true;
            }
        }

        this.setState({
            gridFull: gridCopy,
            generation: this.state.generation + 1
        })
    }

    render(){
        return (
            <div>

                <h1 style={{width:350}}>The Game of Life</h1>
                <button style={{
                    borderRadius: 15,
                    border: "orange 3px solid",
                    padding: 15
                }}
                    onClick={this.playButtonClicked}>
                    {!this.state.playing ? "Play" : "Pause"}
                </button>

                <button style={{
                    borderRadius: 15,
                    border: "orange 3px solid",
                    padding: 15
                }}
                    onClick={this.seed}>
                    "Random Seed"
                </button>

                <Grid   gridFull={this.state.gridFull}
                        rows={this.rows}
                        cols={this.cols}
                        selectBox={this.selectBox}
                />
                <h2>Generations: {this.state.generation}
                </h2>

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));