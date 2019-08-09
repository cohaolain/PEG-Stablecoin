import React, { Component } from "react";

import {
	Button,
	Grid,
	Header,
	Icon,
	Segment,
	Form,
	Divider
} from "semantic-ui-react";

import Content from "./Content.js";
import ModalAboutPEG from "./ModalAboutPEG.js";
import ModalTransaction from "./ModalTransaction.js";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ethVal: 1,
			usdVal: 12315,
			conversion: -1,
			transactionActive: true
		};
		fetch(
			"https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=5617820d3ec69aedb8b334b97dd61d4f19cfc097b5a7ce37fc870c6419cc8bba"
		)
			.then(response => response.json())
			.then(json => {
				this.setState({ conversion: json.USD });
				this.setState({ usdVal: this.state.conversion });
			});
	}

	componentDidMount() {}

	onUpdateETH = x => {
		this.setState({
			usdVal: x.target.value * this.state.conversion,
			ethVal: x.target.value
		});
	};

	onUpdateUSD = x => {
		this.setState({
			usdVal: x.target.value,
			ethVal: x.target.value / this.state.conversion
		});
	};

	initToPEG = () => {
		this.setState({
			transactionActive: true,
			isToPEG: true
		});
	};

	initToETH = () => {
		this.setState({
			transactionActive: true,
			isToPEG: false
		});
	};

	hideTransationModal = () => {
		this.setState({
			transactionActive: false
		});
	};

	render() {
		const { ethVal, usdVal, transactionActive, isToPEG } = this.state;
		return (
			<Content>
				<Grid centered verticalAlign="middle" className="home-content">
					<Grid.Column verticalAlign="middle">
						<Header as="h2" icon>
							<Icon name="ethereum" />
							Welcome to PEG Stablecoin
						</Header>
						<Segment>
							<p>What would you like to do?</p>
							<Form>
								<Form.Group widths="equal">
									<Form.Input
										label="Amount of ETH"
										type="number"
										value={
											Math.round(ethVal * 10000) / 10000
										}
										onInput={this.onUpdateETH}
									/>
									<Form.Input
										label="Amount of PEG"
										type="number"
										value={Math.round(usdVal * 100) / 100}
										onInput={this.onUpdateUSD}
									/>
								</Form.Group>
							</Form>
							<Button.Group>
								<Button onClick={this.initToPEG} positive>
									ETH to PEG
								</Button>
								<Button.Or />
								<Button onClick={this.initToETH} negative>
									PEG to ETH
								</Button>
							</Button.Group>
							<Divider />

							<ModalAboutPEG />
							{transactionActive && (
								<ModalTransaction
									usdVal={usdVal}
									ethVal={ethVal}
									isToPEG={isToPEG}
									hide={this.hideTransationModal}
								/>
							)}
						</Segment>
					</Grid.Column>
				</Grid>
			</Content>
		);
	}
}

