import React, { Component } from "react";

import {
	Accordion,
	Button,
	Card,
	Grid,
	Header,
	Icon,
	Image,
	Modal
} from "semantic-ui-react";

import { Link } from "react-router-dom";

/* import LogoMU from "../assets/mulogo.png"; */
import Phil from "../assets/phil-avatar.svg";
import Ciaran from "../assets/ciaran-avatar.svg";

export default class ModalAboutPEG extends Component {
	constructor(props) {
		super(props);
		this.state = { showModal: false };
	}

	close = () => {
		this.setState({ showModal: false });
	};

	render() {
		const { showModal } = this.state;
		const pegDetails = [
			{
				key: "what-is-peg",
				title: "What is PEG?",
				content: [
					"PEG is a decentralized dollar-pegged stablecoin that allows you to switch from Ether into PEG and vice versa.",
					"This is achieved in a single transaction and there are no fees."
				].join(" ")
			},
			{
				key: "how-it-does-it",
				title: "How does it do it?",
				content:
					"The PEG smart contract automatically adjusts the size of the pool to maintain the peg."
			},
			{
				key: "what-do-i-do",
				title: "So what do I do?",
				content: [
					"If you send Ether to pegstablecoin.eth (with sufficient gas, 40000 normally, ~60000 once per hour max),",
					"you will automatically get back PEG, and if you send PEG you will automatically get back Ether."
				].join(" ")
			}
		];
		return (
			<Modal
				trigger={
					<Button
						color="blue"
						onClick={() =>
							this.setState({
								showModal: true
							})
						}
					>
						<Icon name="book" />
						About PEG
					</Button>
				}
				open={showModal}
				closeIcon={<Icon name="close" onClick={this.close} />}
				onClose={this.close}
				size="small"
			>
				<Header icon="ethereum" content="PEG Stablecoin" />
				<Modal.Content>
					<Grid stackable container>
						<Grid.Column width={9}>
							<Accordion
								fluid
								styled
								panels={pegDetails}
								exclusive={false}
							/>
							{/* <Image src={LogoMU} size="small" centered /> */}
						</Grid.Column>
						<Grid.Column width={7}>
							<Card color="red" fluid>
								<Card.Content>
									<Image
										size="tiny"
										floated="left"
										src={Phil}
									/>
									<Card.Header>Dr Phil Maguire</Card.Header>
									<Card.Meta>Creator</Card.Meta>
									<Card.Description>
										Dr Phil Maguire is an assistant
										professor in Computer Science and
										Crypto-Economics at Maynooth University
										(National University of Ireland,
										Maynooth), and is the co-director of the
										BSc in Computational Thinking.
									</Card.Description>
								</Card.Content>
							</Card>
							<Card color="green" fluid>
								<Card.Content>
									<Image
										size="tiny"
										floated="left"
										src={Ciaran}
									/>
									<Card.Header>Ciarán Ó hAoláin</Card.Header>
									<Card.Meta>Developer</Card.Meta>
									<Card.Description>
										Ciarán Ó hAoláin is a student at
										Maynooth University (National University
										of Ireland, Maynooth) currently in his
										final year of studies for his BSc in
										Computational Thinking.
									</Card.Description>
								</Card.Content>
							</Card>
						</Grid.Column>
					</Grid>
				</Modal.Content>
				<Modal.Actions>
					<Button
						color="red"
						as={Link}
						to="/how_it_works"
						onClick={() =>
							this.setState({
								showModal: false
							})
						}
					>
						<Icon name="book" /> Learn more about PEG
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}
