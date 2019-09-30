import React, { Component } from "react";

import {
	Button,
	Container,
	Grid,
	Header,
	Icon,
	Segment,
	Form,
	Divider,
	Statistic
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
			valETH: 1,
			valPEG: 1,
			conversion: -1,
			transactionActive: false,
			isToPEG: true,
			poolPEG: null,
			poolETH: null
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
			valPEG: Math.round(x.target.value * this.state.conversion * 100) / 100,
			valETH: Math.round(x.target.value * 10000) / 10000
		});
	};

	onUpdateUSD = x => {
		this.setState({
			valPEG: Math.round(x.target.value * 100) / 100,
			valETH:
				Math.round((x.target.value * 10000) / this.state.conversion) / 10000
		});
	};

	hideTransationModal = () => {
		this.setState({
			transactionActive: false
		});
	};

	setPoolSizes = value => {
		this.setState({
			poolETH:
				value.balanceETH
					.div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(13)))
					.toNumber() / Math.pow(10, 5),
			poolPEG:
				value.balancePEG
					.div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(16)))
					.toNumber() / Math.pow(10, 2)
		});
	};

	render() {
		const {
			valETH,
			valPEG,
			transactionActive,
			isToPEG,
			poolETH,
			poolPEG
		} = this.state;

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
								} else if (!(poolETH && poolPEG)) {
									let pegABI = [
										{
											constant: true,
											inputs: [],
											name: "getPoolBalances",
											outputs: [
												{
													name: "balanceETH",
													type: "uint256"
												},
												{
													name: "balancePEG",
													type: "uint256"
												}
											],
											payable: false,
											stateMutability: "view",
											type: "function"
										},
										{
											constant: true,
											inputs: [],
											name: "getPriceETH_USD",
											outputs: [
												{
													name: "priceETH_USD",
													type: "uint256"
												}
											],
											payable: false,
											stateMutability: "view",
											type: "function"
										}
									];

									let PEG = new ethers.Contract(
										process.env.REACT_APP_PEG_ADDRESS,
										pegABI,
										context.library
									);

									PEG.getPoolBalances().then(this.setPoolSizes);
								}
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
													value={Math.round(valETH * 10000) / 10000}
													onInput={this.onUpdateETH}
												/>
												<Form.Input
													label="Amount of PEG"
													type="number"
													value={Math.round(valPEG * 100) / 100}
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
													if (context.connectorName !== "MetaMask") {
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
													if (context.connectorName !== "MetaMask") {
														context.unsetConnector();
													}
												}}
												negative
											>
												PEG to ETH
											</Button>
										</Button.Group>
										<Segment color="green" loading={!context.active}>
											{`${
												context.connectorName
													? "Connected with " +
													  (context.connectorName === "MetaMask"
															? "an Injected Web3 Provider"
															: "Infura")
													: "Connecting to blockchain..."
											} `}
											<Icon name="check" />
										</Segment>
										{poolPEG && (
											<Container>
												<Divider horizontal>Pool Statistics</Divider>
												<Statistic.Group size="small" widths={3}>
													<Statistic>
														<Statistic.Value>
															{Math.round(poolETH * 100) / 100}
														</Statistic.Value>
														<Statistic.Label>ETH</Statistic.Label>
													</Statistic>
													<Statistic>
														<Statistic.Value>
															{Math.round(poolPEG)}
														</Statistic.Value>
														<Statistic.Label>PEG</Statistic.Label>
													</Statistic>
													<Statistic>
														<Statistic.Value>
															{Math.round((poolPEG / poolETH) * 100) / 100}
														</Statistic.Value>
														<Statistic.Label>IMPLIED $/ETH</Statistic.Label>
													</Statistic>
												</Statistic.Group>
												<Segment>
													Address:
													<a
														href={`https://etherscan.io/token/${process.env.REACT_APP_PEG_ADDRESS}`}
														target="_blank"
														rel="noopener noreferrer"
													>
														{` ${process.env.REACT_APP_PEG_ADDRESS.substr(
															0,
															16
														)}...`}
													</a>
												</Segment>
											</Container>
										)}
										<Divider />
										<ModalAboutPEG />
										{transactionActive && (
											<ModalTransaction
												valPEG={valPEG}
												valETH={valETH}
												poolETH={poolETH}
												poolPEG={poolPEG}
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
