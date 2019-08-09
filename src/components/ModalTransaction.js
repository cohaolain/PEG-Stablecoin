import React, { Component, useEffect, useState } from "react";

import {
	Button,
	Header,
	Icon,
	Label,
	Modal,
	Dimmer,
	Loader,
	Segment,
	Step,
	Message
} from "semantic-ui-react";

import { useWeb3Context } from "web3-react";

export default function ModalTransaction(props) {
	const [transactionComplete, changeTransactionComplete] = useState(false);
	const { hide, isToPEG, usdVal, ethVal } = props;

	const context = useWeb3Context();

	context.setFirstValidConnector(["MetaMask", "Infura"]);

	return (
		<Modal
			open
			closeIcon={<Icon name="close" onClick={hide} />}
			onClose={hide}
			size="small"
		>
			<Header
				icon="ethereum"
				content={
					isToPEG ? "Converting ETH to PEG" : "Converting PEG to ETH"
				}
			/>
			<Modal.Content>
				<>
					<Step.Group stackable fluid>
						<Step
							completed={context.active}
							active={!context.active}
						>
							<Icon name="spinner" loading={!context.active} />
							<Step.Content>
								<Step.Title>{`Connect${
									context.active ? "ed" : ""
								}`}</Step.Title>
								<Step.Description>
									To the blockchain
								</Step.Description>
							</Step.Content>
						</Step>

						<Step
							active={context.active && !transactionComplete}
							completed={transactionComplete}
						>
							<Icon name="send" />
							<Step.Content>
								<Step.Title>Send</Step.Title>
								<Step.Description>
									Your transaction
								</Step.Description>
							</Step.Content>
						</Step>

						<Step
							disabled={!transactionComplete}
							active={transactionComplete}
						>
							<Icon name="ethereum" />
							<Step.Content>
								<Step.Title>Receive</Step.Title>
								<Step.Description>
									Your funds soon
								</Step.Description>
							</Step.Content>
						</Step>
					</Step.Group>

					{!transactionComplete &&
						((
							<Message
								icon
								color={
									!context.active
										? "grey"
										: context.connectorName === "MetaMask"
										? "green"
										: "orange"
								}
							>
								<Icon
									name={
										!context.active
											? "circle notched"
											: context.connectorName ===
											  "MetaMask"
											? "plug"
											: "warning"
									}
									loading={!context.active}
								/>
								<Message.Content>
									<Message.Header>{`${
										!context.active
											? "Connecting"
											: "Connected via " +
											  (context.connectorName ===
											  "MetaMask"
													? "an Injected Web3 Provider"
													: "a public Ethereum node")
									}`}</Message.Header>
									{`${
										!context.active
											? "Still waiting? There may be an issue with your browser or injected Web3 provider."
											: context.connectorName ===
											  "MetaMask"
											? "Great! You're ready to make a conversion transaction immediately."
											: "This means we can't load your accounts. You'll need to provide your private key to make transactions."
									}`}
								</Message.Content>
							</Message>
						): "")}
				</>
			</Modal.Content>
			<Modal.Actions>
				{!transactionComplete && (
					<Button
						disabled={!context.active}
						color="green"
						onClick={() => changeTransactionComplete(true)}
					>
						<Icon name="send" />
						Send Transaction
					</Button>
				)}
				<Button color="red" onClick={hide}>
					<Icon name="close" />
					Cancel
				</Button>
			</Modal.Actions>
		</Modal>
	);
}
