import React from 'react';
const {div, span, form, input, img} = React.DOM;
import _ from 'lodash';

import WeightDistributionChart from './WeightDistributionChart'

const weightedSample = function(v, weights){
  const sum = _.sum(weights);
  const r = _.random(sum, true);
  let s = 0, i = 0;

  while (!((r > s) && (r <= s + weights[i])) && s < sum) {
    s += weights[i];
    i++;
  }

  return v[i];
};

const pointsToWeights = (persons) => {
  return Object.values(persons).map((points) => 1/Math.pow(2, points));
};

const initialWeights = (persons) => {
  return _.zipObject(persons.map((person) => person.uid), _.times(persons.length, _.constant(0)));
};

const FaceGame = React.createClass({
  render: function() {
    return div({id: 'face-game'},[
      div({className: 'persons'}, [
        div({className: 'person'}, [
          img({src: this.props.faceUrlFromId(this.state.targetPerson.uid), className: 'face'}),
          form({className: 'name', onSubmit: this.onSubmit}, [
            input({key: 'nameGuess', className: 'nameGuess', ref: 'nameGuess'})
          ])
        ]),
        div({className: ['person', this.state.previousPerson && this.state.previousPerson.correct ? ' guess-correct' : ' guess-wrong'].join(' ')}, this.state.previousPerson ? [
          img({src: this.props.faceUrlFromId(this.state.previousPerson.uid), className: 'face'}),
          span({className: 'name'}, this.state.previousPerson.name)
        ] : null)
      ]),
      React.createElement(WeightDistributionChart, {persons: this.props.persons, weights: pointsToWeights(this.state.points)})
    ])
  },
  getInitialState: function() {
    return {
      points: JSON.parse(window.localStorage.getItem('face-game-points')) || initialWeights(this.props.persons),
      targetPerson: _.sample(this.props.persons),
      previousPerson: null
    }
  },
  onSubmit: function(event) {
    event.preventDefault();
    const nameGuess = this.refs.nameGuess.value.toLowerCase();
    const targetFullName = this.state.targetPerson.name.toLowerCase();
    const guessIsCorrect = nameGuess === targetFullName;
    this.updatePoints(guessIsCorrect);
    this.newPerson(guessIsCorrect);
    this.refs.nameGuess.value = ''
  },
  updatePoints: function(correct){
    var newPoints = this.state.points;
    const points = correct ? 1 : -1;
    newPoints[this.state.targetPerson.uid] = _.clamp(this.state.points[this.state.targetPerson.uid] + points,
        -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    window.localStorage.setItem('face-game-points', JSON.stringify(newPoints));
    this.setState({
      points: newPoints
    });
  },
  newPerson: function(correct) {
    const previousPerson = Object.assign(this.state.targetPerson, {correct});
    let targetPerson = null;
    let weights = pointsToWeights(this.state.points);
    do {
        targetPerson = weightedSample(this.props.persons, weights)
    } while (targetPerson.uid === this.state.targetPerson.uid );
    this.setState({
      targetPerson,
      previousPerson
    })
  }
});

export default FaceGame