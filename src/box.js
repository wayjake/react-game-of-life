import React, {Component} from "react";

export default class Box extends Component{

    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col);
    }

    render(){
        let style = {
            display: 'inline-block',     
            border: '1px solid black',
            width: 15,
            height: 15,
            marginLeft: -1,
            marginBottom: 0,
            marginTop: 0,
            backgroundColor: this.props.isOn ? "green" : "lightgray"
        }
        return (
            <div
                className={this.props.boxClass}
                style={style}
                id={this.props.id}
                onMouseDown={this.selectBox}>
            </div>
        )
    }
}