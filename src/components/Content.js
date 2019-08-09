import React, { Component } from "react";

import { Transition, Container } from "semantic-ui-react";

import { isBrowser } from "react-device-detect";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}

	componentDidMount() {
		this.setState({ visible: true });
	}

	render() {
		const { visible } = this.state;
		return (
			<Transition.Group animation="fly up" duration={500}>
				{visible && (
					<Container className="page-content">
						{this.props.children}
					</Container>
				)}
			</Transition.Group>
		);
	}
}
