import React, { Component } from 'react'
import NavBar from '../../components/General/NavBar'

export default class ListNavBar extends Component {
	onCreateSite() {
		this.props.dispatch( {
			type: 'ROUTER_PUSH',
			payload: {
				name: 'add-site',
			},
		} )
	}
	render() {
		return <NavBar title="Sites" rightIcon="plus" onRightPress={() => this.onCreateSite()} />
	}
}