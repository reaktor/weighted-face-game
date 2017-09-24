import React from 'react';
import ReactDom from 'react-dom';
const {div, button} = React.DOM;

import FaceGame from './FaceGame'
import DropData from './DropData'
import config from './config'

class Data {
    constructor(persons) {
        if(typeof persons === 'object') {
            this.persons = persons
            this.save()
        } else {
            this.persons = this.load()
        }
    }
    ready(){
        return this.persons !== null
    }
    load(){
        return JSON.parse(window.localStorage.getItem('persons'))
    }
    save(){
        window.localStorage.setItem('persons', JSON.stringify(this.persons))
    }
}

const Game = React.createClass({
    getInitialState: function(){
        return {
            data: new Data()
        }
    },
    render: function() {
        return div({id: 'game'},[
            (this.state.data.ready()) ?
                React.createElement(FaceGame, {persons: this.state.data.persons, faceUrlFromId: config.faceUrlFromId}) :
                React.createElement(DropData, {setPersons: this.setPersons, import: config.import}),
                this.state.data.ready() ? button({onClick: this.clearData}, 'Clear game data') : null
        ])
    },
    setPersons: function(persons) {
        this.setState({data: new Data(persons)})
    },
    clearData: function() {
        if (window.confirm("Are you sure you want to permanently remove all game data?")) {
            window.localStorage.clear();
            this.setState({data: new Data()});
        }
    }
});

document.addEventListener("DOMContentLoaded", function(event) {
  ReactDom.render(
    React.createElement(Game, {}),
    document.getElementById('gameContainer')
  )
});
