import React from 'react';
const {div} = React.DOM;
import _ from 'lodash';

export default React.createClass({
    render: function(){
        return div({className: 'chart', ref: 'chart'})
    },
    componentDidMount: function(){
        this.drawChart()
    },
    componentDidUpdate: function(){
        this.drawChart()
    },
    drawChart: function(){
        const stats = _.zip(this.props.persons.map(person => person.name), this.props.weights).map(function(v){
        return {name: v[0], weight: v[1]};
        });

        var data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        data.addColumn('number', 'weight');
        data.addColumn({type: 'string', role: 'tooltip'});

        var row =_.sortBy(stats, 'weight').map(function(person, i){
          return [i, person.weight, person.name];
        })

        data.addRows(row);

        var options = {
          hAxis: {
          },
          vAxis: {
            logScale: true
          }
        };

        var chart = new google.visualization.LineChart(this.refs.chart);
        chart.draw(data, options);
    }
})
