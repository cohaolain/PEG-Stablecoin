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

import { Web3Consumer } from "web3-react";

import { ethers } from "ethers";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ethVal: 1,
			valPEG: 1,
			conversion: -1,
			transactionActive: false,
			isToPEG: true
		};
		fetch(
			"https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=5617820d3ec69aedb8b334b97dd61d4f19cfc097b5a7ce37fc870c6419cc8bba"
		)
			.then(response => response.json())
			.then(json => {
				this.setState({ conversion: json.USD });
				this.setState({ valPEG: this.state.conversion });
			});
	}

	onUpdateETH = x => {
		this.setState({
			valPEG:
				Math.round(x.target.value * this.state.conversion * 100) / 100,
			ethVal: Math.round(x.target.value * 10000) / 10000
		});
	};

	onUpdateUSD = x => {
		this.setState({
			valPEG: Math.round(x.target.value * 100) / 100,
			ethVal:
				Math.round((x.target.value * 10000) / this.state.conversion) /
				10000
		});
	};

	hideTransationModal = () => {
		this.setState({
			transactionActive: false
		});
	};

	render() {
		const { ethVal, valPEG, transactionActive, isToPEG } = this.state;
		return (
			<Content>
				<Grid centered verticalAlign="middle" className="home-content">
					<Grid.Column verticalAlign="middle">
						<Header as="h2" icon>
							<Icon name="ethereum" />
							Welcome to PEG Stablecoin
						</Header>
						<Web3Consumer>
							{context => {
								if (!context.active) {
									context.setFirstValidConnector(["Infura"]);
								}
								window.reth = context;
								window.ethers = ethers;
								return (
									<Segment>
										<p>What would you like to do?</p>
										<Form>
											<Form.Group widths="equal">
												<Form.Input
													min={0}
													label="Amount of ETH"
													type="number"
													step={0.001}
													value={
														Math.round(
															ethVal * 10000
														) / 10000
													}
													onInput={this.onUpdateETH}
												/>
												<Form.Input
													label="Amount of PEG"
													type="number"
													value={
														Math.round(
															valPEG * 100
														) / 100
													}
													onInput={this.onUpdateUSD}
												/>
											</Form.Group>
										</Form>
										<Button.Group>
											<Button
												onClick={() => {
													this.setState({
														transactionActive: true,
														isToPEG: true
													});
													if (
														context.connectorName !==
														"MetaMask"
													) {
														context.unsetConnector();
													}
												}}
												positive
											>
												ETH to PEG
											</Button>
											<Button.Or />
											<Button
												onClick={() => {
													this.setState({
														transactionActive: true,
														isToPEG: false
													});
													if (
														context.connectorName !==
														"MetaMask"
													) {
														context.unsetConnector();
													}
												}}
												negative
											>
												PEG to ETH
											</Button>
										</Button.Group>
										<Segment.Group>
											<Segment
												color="green"
												loading={!context.active}
											>
												{`${
													context.connectorName
														? "Connected with " +
														  (context.connectorName ===
														  "MetaMask"
																? "an Injected Web3 Provider"
																: "Infura")
														: "Connecting to blockchain..."
												} `}
												<Icon name="check" />
											</Segment>
										</Segment.Group>
										<Divider />
										<ModalAboutPEG />
										{transactionActive && (
											<ModalTransaction
												valPEG={valPEG}
												ethVal={ethVal}
												isToPEG={isToPEG}
												hide={this.hideTransationModal}
											/>
										)}
									</Segment>
								);
							}}
						</Web3Consumer>
					</Grid.Column>
				</Grid>
			</Content>
		);
	}
}
