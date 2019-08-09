import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Divider, Icon, Input, Menu, Sidebar } from "semantic-ui-react";

import { BrowserView, MobileView } from "react-device-detect";

export default class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: window.location.href.includes("how")
				? "How It Works"
				: window.location.href.includes("doc")
				? "API Docs"
				: "Pool Exchange",
			sidebarVisible: false
		};
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		const { activeItem, sidebarVisible } = this.state;

		const navigationItems = (
			<>
				<Menu.Item
					as={Link}
					to="/"
					name="Pool Exchange"
					active={activeItem === "Pool Exchange"}
					onClick={this.handleItemClick}
				/>
				{/* <Menu.Item
					as={Link}
					to="/how_it_works"
					name="How It Works"
					active={activeItem === "How It Works"}
					onClick={this.handleItemClick}
				/> */}
				<Menu.Item
					as={Link}
					to="/docs"
					name="API Docs"
					active={activeItem === "API Docs"}
					onClick={this.handleItemClick}
				/>
			</>
		);
		const smartContract = (
			<Menu.Item
				as="a"
				href="https://etherscan.io/address/0x13007042a95CD4679E4BF080F755446150CeA081#code"
				target="_blank"
				rel="noopener noreferrer"
				name="Smart Contract"
				active={activeItem === "Smart Contract"}
				onClick={this.handleItemClick}
			/>
		);

		return (
			<>
				<BrowserView>
					<Menu fixed="top" size="huge">
						{navigationItems}
						<Menu.Menu position="right">
							<Menu.Item>
								<Input
									icon="search"
									placeholder="Search the docs..."
								/>
							</Menu.Item>
							{smartContract}
						</Menu.Menu>
					</Menu>
					{this.props.children}
				</BrowserView>
				<MobileView>
					<Menu fixed="top" size="huge">
						<Menu.Item
							position="left"
							onClick={() =>
								this.setState({
									sidebarVisible: !sidebarVisible
								})
							}
						>
							<Icon name="content" />
						</Menu.Item>
						<Menu.Item>
							PEG Stablecoin
							<Icon name="ethereum" />
						</Menu.Item>
					</Menu>
					<Sidebar.Pushable className="sidebar-navigation">
						<Sidebar
							as={Menu}
							animation="overlay"
							icon="labeled"
							vertical
							onHide={() =>
								this.setState({
									sidebarVisible: !sidebarVisible
								})
							}
							visible={sidebarVisible}
							width="thin"
						>
							<Divider horizontal>PEG</Divider>
							{navigationItems}
							<Divider horizontal>Smart Contract</Divider>
							{smartContract}
						</Sidebar>
						<Sidebar.Pusher dimmed={sidebarVisible}>
							{this.props.children}
						</Sidebar.Pusher>
					</Sidebar.Pushable>
				</MobileView>
			</>
		);
	}
}
