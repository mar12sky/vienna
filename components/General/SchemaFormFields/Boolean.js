import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Switch } from 'react-native';

import FormRow from '../FormRow';

export default class Boolean extends Component {
	static propTypes = {
		value: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
	};
	render() {
		return (
			<FormRow label={ this.props.name }>
				<Switch
					value={ this.props.value }
					onValueChange={ value => {
						this.props.onChange( value );
						this.props.onSave();
					} }
				/>
			</FormRow>
		);
	}
}
