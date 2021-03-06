import React, { Component } from 'react';
import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { HeaderTitle } from '@react-navigation/stack';
import { connect } from 'react-redux';

import addSite from '../../actions/addSite';
import { fetchSiteData } from '../../actions';

import Authorize from '../../components/Setup/Authorize';
import StartScreen from '../../components/Setup/Start';
import InstallConnect from '../../components/Setup/InstallConnect';

const styles = StyleSheet.create( {
	container: {
		backgroundColor: '#FFFFFF',
		padding: 20,
		flex: 1,
		alignItems: 'stretch',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headerText: {
		marginLeft: 60,

	},
	main: {
		flexGrow: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	closeButton: {
		alignSelf: 'flex-end',
		color: 'dodgerblue',
		fontSize: 16,
	},
} );

const STEP = {
	START: 'START',
	INSTALL_CONNECT: 'INSTALL_CONNECT',
	AUTHORIZE: 'AUTHORIZE',
};

class Add extends Component {
	state = {
		step: STEP.START,
		index: null,
	};

	onConnect = async index => {
		// Store the index for future use.
		this.setState( { index } );

		// Does the site have App Connect installed?
		if ( ! ( 'connect' in index.authentication ) ) {
			this.setState( {
				index,
				step: STEP.INSTALL_CONNECT,
			} );
		} else {
			this.setState( {
				index,
				step: STEP.AUTHORIZE,
			} );
		}
	};

	onInstall = async index => {
		this.setState( {
			// Update the index.
			index,

			// Move to authorization.
			step: STEP.AUTHORIZE,
		} );
	};

	onAuthorize = ( id, token ) => {
		const { index } = this.state;
		const url = index.routes['/']._links.self;
		this.props.addSite( url, index, {
			client: {
				id: id,
			},
			token: {
				public: token,
			},
		} );

		// We're done, go home!
		this.props.navigation.navigate( 'SitesList' );
	};

	render() {
		const { index, step } = this.state;

		return (
			<KeyboardAvoidingView
				behavior="height"
				style={ styles.container }
			>
				<View style={ styles.header }>
					<View />
					<HeaderTitle style={ styles.headerText }>Add New Site</HeaderTitle>
					<TouchableOpacity onPress={ () => this.props.navigation.goBack() }>
						<Text style={ styles.closeButton }>Cancel</Text>
					</TouchableOpacity>
				</View>
				{ step === STEP.START ? (
					<StartScreen onConnect={ this.onConnect } />
				) : step === STEP.INSTALL_CONNECT ? (
					<InstallConnect index={ index } onInstall={ this.onInstall } />
				) : step === STEP.AUTHORIZE ? (
					<Authorize
						authentication={ index.authentication }
						onAuthorize={ this.onAuthorize }
					/>
				) : null }
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = state => ( {
	newSite: state.newSite,
} );
const mapDispatchToProps = dispatch => ( {
	addSite: ( ...args ) => {
		const addSiteAction = addSite( ...args );
		dispatch( addSiteAction );
		dispatch( fetchSiteData() );
	},
} );

export default connect( mapStateToProps, mapDispatchToProps )( Add );
