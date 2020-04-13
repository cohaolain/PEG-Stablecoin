import React, { Component } from "react";

import { Grid, Header, Icon, Segment } from "semantic-ui-react";

import Content from "./Content.js";

export default class Docs extends Component {
	render() {
		return (
			<Content>
				<Grid centered verticalAlign="middle" style={{maxWidth: 750}}>
					<Grid.Column verticalAlign="middle">
						<Header as="h2" icon>
							<Icon name="question" />
							How does it work?
						</Header>
						<Segment style={{ textAlign: "left" }}>
							<Header>What is PEG?</Header>
							PEG is a decentralized, Ethereum-based ERC20
							stablecoin which is pegged to USD. It is not backed
							by a fiat reserve, or controlled by any external
							party. Instead, it automatically manages its own
							monetary supply so as to ensure the peg.
							<Header>How does it maintain a peg?</Header>
							The smart contract permanently holds a pool of ETH
							and a pool of PEG tokens. The ratio between the size
							of these pools is the implicit exchage rate. The
							contract is capable of inflating or deflating the
							size of the PEG pool in order to bring the implicit
							exchange rate in line with the actual exchage rate
							betwen ETH and USD.
							<Header>
								How does PEG know the value of Ether?
							</Header>
							PEG uses a combination of the effects of arbitrage
							and the MakerDAO oracle exchange rate. If the oracle
							provices a valid value and the local exchange rate
							differs by more than 1% from the oracle price, then
							10% of the differential will be adjusted at most
							every six hours.
							<Header>How do I get PEG?</Header>
							If you send ETH to the smart contract, you will
							automatically be sent back the equivalent in PEG
							tokens. Conversely, if you send PEG tokens to the
							contract, then you will automatically be sent back
							the equivalent value in ETH. Thus, a currency swap
							can be achieved in a single transaction.
							<Header>
								How is the amount of currency I receive
								calculated?
							</Header>
							The amount of currency you receive is ratio of your
							contribution to the new overall pool size times the
							size of the pool you're receiving funds from. So if
							the PEG pool contains 100 PEG, the ETH pool contains
							1 ETH, and you give 0.025 ETH, you receive
							(0.025/(1+0.025))*100 = 2.44 PEG.
							<Header>Why should I trust this?</Header>
							You can read the smart contract and see that it is
							logically watertight. This contract cannot be
							modified in any way, and is therefore guaranteed to
							behave as designed.
							<Header>What are the fees?</Header>
							There are no fees. However, if the size of your
							transaction is large relative to the size of the
							pool, you will not get a good effective exchange
							rate.
							<Header>
								Wouldn’t the pools need to be bigger for PEG to
								handle larger transactions?
							</Header>
							The pools will continue to grow larger forever. The
							more PEG is transacted, the faster they will grow.
							Every time somebody imbalances the pools, the
							overall value held in the smart contract grows.
							While there are opportunities for arbitrageurs to
							make profits by keeping the pools balanced, they
							cannot reduce the size of the pools.
							<Header>Why is PEG useful?</Header>
							Stablecoins like TrueUSD, Paxos, USDC and even
							Tether are permissioned – your funds can be frozen
							arbitrarily by the authorities controlling the coin.
							In contrast, PEG is completely decentralized. PEG is
							designed to make it as easy as possible for Ethereum
							users to switch in and out of dollar-pegged
							stablecoin with nobody taking any fees. Unlike DAI,
							there is no governing authority with the ability to
							adjust parameters, there is no interest rate that
							needs to be moved around, everything about the token
							is predefined by the smart contract.
							<br />
							It runs like clockwork, forever, unstoppable.
						</Segment>
					</Grid.Column>
				</Grid>
			</Content>
		);
	}
}
