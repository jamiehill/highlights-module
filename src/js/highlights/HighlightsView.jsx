import React from 'react';
import moment from 'moment';

import Component from 'core/system/react/BackboneComponent';
import factory from 'core/model/factory/EventFactory';

export default class HighlightsView extends Component {
	constructor() {
		super();

		factory.fetch('MRES', undefined, '0,1,2,3,4,5,6,7,8,9');
		_.bindAll(this, 'renderEvent', 'renderPrice');
	}


	/**
	 * Handle price clicks
	 */
	onPriceSelect(e) {
		var blah = "blah";
	}


	/**
	 * Show event stats
	 * @param e
	 */
	onShowStats(e) {

	}


	/**
	 * Show all markets
	 * @param e
	 */
	onShowMarkets(e) {

	}


	/**
	 * Renders grid or Event rows
	 * @returns {XML}
	 */
	render() {
		return (
			<div className="cell cell-4 highlights">
				<div className="inner-cell">
					<h4>Highlights</h4>
					<div className="table regular-table">
						{this.props.collection.map(this.renderEvent)}
					</div>
				</div>
			</div>
		)
	}


	/**
	 * Renders a single event row
	 * @param model
	 * @returns {XML}
	 */
	renderEvent(model) {
		var attribs = model.attributes,
			market  = model.Markets.findWhere({type: 'MRES'});

		return (
			<div key={model.id} className="table-row">
				<div className="table-cell">
					<span className="date">{moment(attribs.eventTime).format('ddd')}</span>
					<span className="time">{moment(attribs.eventTime).format('HH:mmA')}</span>
				</div>
				<div className="table-cell align-right">
					{attribs.participantA}
				</div>
				{market.Selections.map(this.renderPrice)}
				<div className="table-cell align-left">
					{attribs.participantB}
				</div>
				<div className="table-cell align-center" onClick={this.onShowStats.bind(this)}>
					<i className="entypo-chart-bar"></i>
				</div>
				<div className="table-cell align-center price" onClick={this.onShowMarkets.bind(this)}>
					+{attribs.numMarkets}
				</div>
			</div>
		)
	}


	/**
	 * Renders the price display
	 * @param model
	 * @returns {XML}
	 */
	renderPrice(model) {
		return (
			<div key={model.id} className="table-cell align-center price" onClick={this.onPriceSelect.bind(this)}>
				{model.getOdds()}
			</div>
		)
	}
};

// set default props
HighlightsView.defaultProps = { collection: factory.collection };
