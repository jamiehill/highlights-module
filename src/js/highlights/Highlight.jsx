import React from 'react';
import moment from 'moment';

export default React.createClass({
	render: function() {
		var model  = this.props.model.attributes,
			market = this.props.model.Markets.findWhere({type: 'MRES'});

		return (
			<div className="table-row">
				<div className="table-cell">
					<span className="date">{moment(model.eventTime).format('ddd')}</span>
					<span className="time">{moment(model.eventTime).format('HH:mmA')}</span>
				</div>
				<div className="table-cell align-right">
					{model.participantA}
				</div>
				{market.Selections.map(this.renderItem)}
				<div className="table-cell align-left">
					{model.participantB}
				</div>
				<div className="table-cell align-center">
					<i className="entypo-chart-bar"></i>
				</div>
				<div className="table-cell align-center price">
					+{model.numMarkets}
				</div>
			</div>
		)
	},

	/**
	 * Renders the price display
	 * @param model
	 * @returns {XML}
	 */
	renderItem: function(model) {
		return (
			<div className="table-cell align-center price">
				{model.getOdds()}
			</div>
		)
	}
});

