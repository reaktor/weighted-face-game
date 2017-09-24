import React from 'react';
const {div} = React.DOM;

const DropData = React.createClass({
    getInitialState: function() {
        return {hover: false}
    },
    render: function() {
        return div({id: 'drop-data', className: this.state.hover === true ? 'hover' : '', onDragOver: this.onDragOver, onDragLeave: this.onDragLeave, onDragEnter: this.onDragEnter, onDrop: this.onDrop},
            'Drag and drop JSON data file here!');
    },
    onDragOver: function(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({hover: true});
        return false;
    },
    onDragLeave: function(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({hover: false});
        return false;
    },
    onDragEnter: function(e) {
        e.stopPropagation();
        e.preventDefault();
        return false;
    },
    onDrop: function(e){
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = JSON.parse(event.target.result);
            this.props.setPersons(this.props.import(data))
        };
        console.log(file);
        reader.readAsText(file);
        e.preventDefault();
        return false
    }
});
export default DropData
