import React, { Component } from "react";

import { Grid, Header, Icon, Segment, Placeholder } from "semantic-ui-react";

import Content from "./Content.js";

export default class HowItWorks extends Component {
	render() {
		return (
			<Content>
				<Grid centered verticalAlign="middle">
					<Grid.Column verticalAlign="middle">
						<Header as="h2" icon>
							<Icon name="question" />
							How does it work?
						</Header>
						<Segment>
							<Header>What is PEG?</Header>
							PEG is a decentralized Ethereum-based ERC20
							stablecoin which is pegged to the US dollar. It is
							not backed by any fiat dollars. It is not controlled
							by any external party. Instead, it automatically
							manages its own monetary supply so as to ensure the
							peg.
							<Header>How does it control its own peg?</Header>
							The smart contract permanently holds a pool of Ether
							and a pool of dollar PEG tokens. The ratio between
							the size of these pools is the local exchange rate.
							If Ether becomes more valuable then the smart
							contract “prints” more PEG tokens to restore the
							ratio. If Ether falls in price, then the smart
							contract “burns” PEG tokens, thus ensuring they are
							constantly balanced.
							<Header>
								How does PEG know the value of Ether?
							</Header>
							PEG uses the MAKERDAO oracle price. If the local
							exchange rate differs by more than 1% from the
							oracle price, then 10% of the differential will be
							adjusted each hour, until they differ by less than
							1%.
							<Header>How do I get PEG?</Header>
							If you send Ether to the smart contract, you will
							automatically be sent back the equivalent in PEG
							tokens. Conversely, if you send PEG tokens to the
							contract, then you will automatically be sent back
							the equivalent value in Ether. Thus, a currency swap
							can be achieved in a single transaction.
							<Header>Should I trust this?</Header>
							You can read the smart contract and see that it is
							logically watertight. No need to use the website,
							you can use MyEtherWallet to interact directly with
							the contract. The name of the contract is
							XXXpegstablecoin.ethereumXXX and you can view it
							here XXXXXXX.
							<Header>What are the fees?</Header>
							There are no fees. However, if the liquidity in the
							pools is small relative to the size of your
							transaction, then you will not get a good rate. For
							example, if you add 10% to the Ether pool, then you
							get 10% of the PEG pool back and vice versa.
							<Header>
								Wouldn’t the pools need to be bigger for PEG to
								handle larger transactions?
							</Header>
							The pools will continue to grow larger forever. The
							more PEG is transacted, the faster they will grow.
							Every time somebody imbalances the pools, the
							overall value held in the smart contract grows.
							While there are opportunities for arbers to make
							profits by keeping the pools balanced, they cannot
							reduce the size of the pools.
							<Header>Why is PEG useful?</Header>
							Stablecoins like TrueUSD, Paxos, USDC and even
							Tether are permissioned – your funds can be frozen
							arbitrarily by the authorities controlling the coin.
							In contrast, PEG, like DAI, is completely
							decentralized. PEG is designed to make it as easy as
							possible for Ethereum users to switch in and out of
							dollar-pegged stablecoin with nobody taking any
							fees. Unlike DAI, there is no governing authority
							with the ability to adjust parameters, there is no
							interest rate that needs to be moved around,
							everything about the token is predefined by the
							smart contract. It runs like clockwork, forever,
							unstoppable.
						</Segment>
					</Grid.Column>
				</Grid>
			</Content>
		);
	}
}
