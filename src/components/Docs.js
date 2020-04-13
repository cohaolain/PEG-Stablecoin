import React, { Component } from "react";

import { Grid, Header, Icon, Segment, Table } from "semantic-ui-react";

import Content from "./Content.js";

import docs from "../assets/docs.json";

export default class HowItWorks extends Component {
	getMethodElements = () => {
		let elements = [];
		for (let key in docs.methods) {
			elements.push(
				<Segment key={key}>
					<h4>{key}</h4>
					{docs.methods[key].params ? (
						<Table celled>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>
										Parameters
									</Table.HeaderCell>
									<Table.HeaderCell>
										Explanation
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{Object.keys(docs.methods[key].params).map(
									(k) => (
										<Table.Row key={k}>
											<Table.Cell>{k}</Table.Cell>
											<Table.Cell>
												{docs.methods[key].params[k]}
											</Table.Cell>
										</Table.Row>
									)
								)}
							</Table.Body>
						</Table>
					) : (
						""
					)}
					<p>{docs.methods[key].details}</p>
					{docs.methods[key].returns ? (
						<Table celled>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>
										Return value
									</Table.HeaderCell>
									<Table.HeaderCell>
										Explanation
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{Object.keys(docs.methods[key].returns).map(
									(k) => (
										<Table.Row key={k}>
											<Table.Cell>{k}</Table.Cell>
											<Table.Cell>
												{docs.methods[key].returns[k]}
											</Table.Cell>
										</Table.Row>
									)
								)}
							</Table.Body>
						</Table>
					) : (
						""
					)}
				</Segment>
			);
		}
		return elements;
	};

	render() {
		window.docs = docs;
		return (
			<Content>
				<Grid centered verticalAlign="middle" style={{ maxWidth: 750 }}>
					<Grid.Column verticalAlign="middle">
						<Header as="h2" icon>
							<Icon name="book" />
							Documentation
						</Header>
						<Segment
							style={{
								textAlign: "left",
							}}
						>
							<h1>{docs.title}</h1>
							{this.getMethodElements()}
						</Segment>
					</Grid.Column>
				</Grid>
			</Content>
		);
	}
}
