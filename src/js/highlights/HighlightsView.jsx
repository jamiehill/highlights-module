import React from 'react';
import mixin from 'core/system/react/BackboneMixin';
import HighlightsPanel from './HighlightsPanel.jsx!';
import Highlight from './Highlight.jsx!';

import Component from 'core/system/react/BackboneComponent';
import EventFactory from 'core/model/factory/EventFactory';

export default class HighlightsView extends Component {
	constructor(props) {
		super(props);

		this.factory = this.props.factory;
		this.factory.fetch('MRES', undefined, '0,1,2,3,4,5,6,7,8,9');
	}


	render() {
		var collection = this.props.collection,
			highlights = collection.map(function(model) {
				return <Highlight key={model.get('id')} model={model}/>;
			});
		return (
			<div className="cell cell-4 highlights">
				<HighlightsPanel>
					{highlights}
				</HighlightsPanel>
			</div>
		)
	}
};

