import React from 'react';
import moment from 'moment';


export default React.createClass({
	render: function() {
		var market = this.props.model.Markets.findWhere({type: 'MRES'}),
			selectionH = market.Selections.at(0),
			selectionD = market.Selections.at(1),
			selectionA = market.Selections.at(2);
		var attribs = this.props.model.attributes;
		var day  = moment(attribs.eventTime).format('ddd');
		var time = moment(attribs.eventTime).format('HH:mmA');
		return (
			<div className="table-row">
				<div className="table-cell">
					<span className="date">{day}</span>
					<span className="time">{time}</span>
				</div>
				<div className="table-cell align-right">
					{selectionH.get('name')}
				</div>
				<div className="table-cell align-center price">
					{selectionH.get('decimalOdds')}
				</div>
				<div className="table-cell align-center price">
					{selectionD.get('decimalOdds')}
				</div>
				<div className="table-cell align-center price">
					{selectionA.get('decimalOdds')}
				</div>
				<div className="table-cell align-left">
					{selectionA.get('name')}
				</div>
				<div className="table-cell align-center">
					<i className="entypo-chart-bar"></i>
				</div>
				<div className="table-cell align-center price">
					+{attribs.numMarkets}
				</div>
			</div>
		)
	}
});

