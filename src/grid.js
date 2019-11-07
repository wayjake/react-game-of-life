import React, {Component} from 'react';
import Box from './box';

export default class Grid extends Component{

    render(){
        let style = {
            margin: '0 auto',
            width: this.props.cols * 16
        }
        var rowsArr = [];

        for (var i = 0; i < this.props.rows; i++){
            for (var j = 0; j < this.props.cols; j++){
                let boxId = i + "_" + j;

                let isOn = !!this.props.gridFull[i][j];
                rowsArr.push(
                    <Box
                        isOn={isOn}
                        key={boxId}
                        boxId={boxId}
                        row={i}
                        col={j}
                        selectBox={this.props.selectBox}
                        />

                )
            }
        }

        return (
            <div style={style}>
                {rowsArr}
            </div>
        )
    }
}
