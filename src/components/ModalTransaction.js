import React, { useState } from "react";

import {
	Button,
	Header,
	Icon,
	Form,
	Modal,
	Divider,
	Segment,
	Step,
	Message,
	Transition
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
					<Step.Group fluid>
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
											? "Still waiting? There may be an issue with your browser, internet, or Web3 provider."
											: context.connectorName ===
											  "MetaMask"
											? "Great! You're ready to make a conversion transaction immediately."
											: "This means we can't load your accounts. You'll need to provide your private key to make transactions."
									}`}
								</Message.Content>
							</Message>
						): "")}

					{context.connectorName === "Infura" && (
						<>
							<Divider horizontal>
								You're going to need your private key
							</Divider>
							<Form warning>
								<Message
									warning
									header="Please be careful with your private key!"
									content="This method of interacting with the blockchain is not advised. While this site will never share your key in any way, fake versions of this site made by those with malicious intent may do so."
								/>
								<Form.Input
									label="Private key"
									placeholder="0x6afe4791e861cc461e15719355eef9a636a36c3c7b4601bbb22308af99b5ddf9"
								/>
							</Form>
						</>
					)}
					{context.active && !transactionComplete && (
						<Segment.Group>
							<Segment color="green">
								{`You're making a conversion from ${
									isToPEG ? "ETH" : "PEG"
								} to ${!isToPEG ? "ETH" : "PEG"}.`}
							</Segment>
							<Segment>
								{`You'll be converting ${
									isToPEG ? ethVal + " ETH" : usdVal + " PEG"
								} to roughly ${
									!isToPEG ? ethVal + " ETH" : usdVal + " PEG"
								}.`}
							</Segment>
						</Segment.Group>
					)}
					<Transition.Group animation="scale" duration={1000}>
						{transactionComplete && (
							<Segment color="green" textAlign="center">
								<Header icon textAlign="center">
									<Icon name="money" color="green" />
									<Header.Content>Success</Header.Content>
								</Header>
								Great news! Your transaction has been placed
								successfully. Depending on the load on the
								Ethereum network, you should see the transaction
								refelected in your wallet soon.
							</Segment>
						)}
					</Transition.Group>
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
				<Button
					color={!transactionComplete ? "red" : "green"}
					onClick={hide}
				>
					<Icon name="close" />
					{!transactionComplete ? "Cancel" : "Close"}
				</Button>
			</Modal.Actions>
		</Modal>
	);
}
