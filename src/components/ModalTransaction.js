import React, { useState, useEffect } from "react";

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
	Transition,
	Statistic
} from "semantic-ui-react";

import { useWeb3Context } from "web3-react";
import { ethers } from "ethers";

export default function ModalTransaction(props) {
	const [triedInit, changeTriedInit] = useState(false);
	const [transactionSent, changetransactionSent] = useState(false);
	const [transactionComplete, changetransactionComplete] = useState(false);
	const [privateKey, changePrivateKey] = useState("");
	const [validPrivateKey, changeValidPrivateKey] = useState(false);
	const [transactionHash, changeTransactionHash] = useState(null);
	const [errorState, setErrorState] = useState(null);
	const { hide, isToPEG, valPEG, valETH, poolPEG, poolETH } = props;

	const context = useWeb3Context();

	if (!triedInit) {
		context.setFirstValidConnector(["MetaMask", "Infura"]);
		changeTriedInit(true);
	}

	useEffect(() => {
		try {
			new ethers.Wallet(privateKey);
			changeValidPrivateKey(true);
		} catch (e) {
			changeValidPrivateKey(false);
		}
	}, [privateKey]);

	function initTransaction() {
		let pegABI = [
			{
				constant: false,
				inputs: [],
				name: "getPEG",
				outputs: [
					{
						name: "success",
						type: "bool"
					},
					{
						name: "amountReceivedPEG",
						type: "uint256"
					}
				],
				payable: true,
				stateMutability: "payable",
				type: "function"
			},
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
				inputs: [
					{
						name: "tokenOwner",
						type: "address"
					}
				],
				name: "balanceOf",
				outputs: [
					{
						name: "balance",
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
			},
			{
				constant: false,
				inputs: [
					{
						name: "amountGivenPEG",
						type: "uint256"
					}
				],
				name: "getEther",
				outputs: [
					{
						name: "success",
						type: "bool"
					},
					{
						name: "amountReceivedEther",
						type: "uint256"
					}
				],
				payable: false,
				stateMutability: "nonpayable",
				type: "function"
			}
		];

		let PEG = new ethers.Contract(
			"0x3f3dba7a14269f5df35b63bfde72a8c713dc5fee",
			pegABI,
			privateKey === ""
				? context.library.getSigner()
				: new ethers.Wallet(privateKey, context.library)
		);
		try {
			if (isToPEG) {
				window.transactionPromise = PEG.getPEG({
					value: ethers.utils.parseEther(valETH.toString())
				})
					.then(transaction => {
						window.transaction = transaction;
						changeTransactionHash(transaction.hash);
					})
					.catch(e => {
						window.errorState = e;
						setErrorState(e);
					});
			} else {
				window.transactionPromise = PEG.getEther(
					ethers.utils.parseEther(valPEG.toString())
				)
					.then(transaction => {
						window.transaction = transaction;
						changeTransactionHash(transaction.hash);
					})
					.catch(e => {
						window.errorState = e;
						setErrorState(e);
					});
			}
		} catch (e) {
			console.log(e);
			window.errorState = e;
			setErrorState(e);
		}
	}

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
							active={context.active && !transactionSent}
							completed={transactionSent}
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
							disabled={!transactionSent}
							active={transactionSent}
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

					{!transactionSent &&
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
													: "a Public Ethereum Node")
									}`}</Message.Header>
									{`${
										!context.active
											? "Still waiting? There may be an issue with your browser, internet, or Web3 provider."
											: context.connectorName ===
											  "MetaMask"
											? "Great! You're ready to make a conversion transaction immediately."
											: "This means we can't load your accounts from an Injected Web3 Provider such as MetaMask. You'll need to provide your private key to make transactions."
									}`}
								</Message.Content>
							</Message>
						): "")}

					{context.connectorName === "Infura" && !transactionSent && (
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
									icon="key"
									iconPosition="left"
									error={
										!validPrivateKey && privateKey !== ""
									}
									label="Private key"
									onChange={e =>
										changePrivateKey(e.target.value)
									}
									placeholder="0x6afe4791e861cc461e15719355eef9a636a36c3c7b4601bbb22308af99b5ddf9"
								/>
							</Form>
						</>
					)}
					{/* {!transactionSent && (
						<Segment.Group>
							<Segment color="green">
								{`You're making a conversion from ${
									isToPEG ? "ETH" : "PEG"
								} to ${!isToPEG ? "ETH" : "PEG"}.`}
							</Segment>
							<Segment>
								{`You'll be converting ${
									isToPEG ? valETH + " ETH" : valPEG + " PEG"
								} to roughly ${
									!isToPEG ? valETH + " ETH" : valPEG + " PEG"
								}.`}
							</Segment>
						</Segment.Group>
					)} */}

					{transactionSent && !errorState && (
						<Segment
							color={transactionHash ? "green" : "orange"}
							loading={!transactionHash}
							textAlign="center"
						>
							Great news! Your transaction has been placed
							successfully. Depending on the load on the Ethereum
							network, you should see the transaction refelected
							in your wallet soon.
							<br />
							You can view your transaction on the blockchain
							using the button below.
						</Segment>
					)}
					{errorState && (
						<Segment color="red" textAlign="center">
							Unfortunately there's been an error, the details of
							which are below.
							<Divider horizontal>Error Details</Divider>
							{errorState.message}
						</Segment>
					)}

					<Divider horizontal>Transaction Details</Divider>
					<Statistic.Group size="tiny" widths="three">
						<Statistic>
							<Statistic.Value>
								{isToPEG ? valETH : valPEG}
							</Statistic.Value>
							<Statistic.Label>
								{isToPEG ? "ETH" : "PEG"}
							</Statistic.Label>
						</Statistic>

						<Statistic>
							<Statistic.Value>
								<Icon name="right arrow" />
							</Statistic.Value>
							<Statistic.Label>TO</Statistic.Label>
						</Statistic>

						<Statistic>
							<Statistic.Value>
								{!isToPEG
									? Math.round(
											(valPEG / (valPEG + poolPEG)) *
												poolETH *
												Math.pow(10, 5)
									  ) / Math.pow(10, 5)
									: Math.round(
											(valETH / (valETH + poolETH)) *
												poolPEG *
												Math.pow(10, 2)
									  ) / Math.pow(10, 2)}
							</Statistic.Value>
							<Statistic.Label>
								{!isToPEG ? "ETH" : "PEG"}
							</Statistic.Label>
						</Statistic>
					</Statistic.Group>
				</>
			</Modal.Content>
			<Modal.Actions>
				{transactionSent && !errorState && (
					<>
						<Button
							as="a"
							target="_blank"
							loading={!transactionHash}
							disabled={!transactionHash}
							rel="noopener noreferrer"
							color="green"
							href={
								"https://ropsten.etherscan.io/tx/" +
								transactionHash
							}
						>
							<Icon name="external" />
							View on EtherScan
						</Button>
					</>
				)}
				{!transactionSent && (
					<Button
						disabled={
							!context.active ||
							(context.connectorName === "Infura" &&
								!validPrivateKey)
						}
						color={
							!context.active ||
							(context.connectorName === "Infura" &&
								!validPrivateKey)
								? "orange"
								: "green"
						}
						onClick={() => {
							changetransactionSent(true);
							initTransaction();
						}}
					>
						<Icon name="send" />
						Send Transaction
					</Button>
				)}
				<Button
					color={!transactionSent || errorState ? "red" : "green"}
					onClick={hide}
				>
					<Icon name="close" />
					{!transactionSent ? "Cancel" : "Close"}
				</Button>
			</Modal.Actions>
		</Modal>
	);
}
