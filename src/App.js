/* global window */
import React from "react";

import Background from "./components/Background.js";
import Navigation from "./components/NavBar.js";
import Home from "./components/Home.js";
import HowItWorks from "./components/HowItWorks.js";
import Docs from "./components/Docs.js";

import { Router, Route } from "react-router-dom";

import Web3Provider, { Connectors } from "web3-react";

import { createBrowserHistory } from "history";
import ReactGA from "react-ga";

const { InjectedConnector, NetworkOnlyConnector } = Connectors;
const MetaMask = new InjectedConnector();
const Infura = new NetworkOnlyConnector({
	providerURL: "https://mainnet.infura.io/v3/0ca94e8a1ec148038d7461f23bd460fa"
});

const connectors = { MetaMask, Infura };

ReactGA.initialize("UA-127395003-3", {
	gaOptions: {
		siteSpeedSampleRate: 100
	},
	testMode: process.env.NODE_ENV === "test"
});

var updateLocation = location => {
	ReactGA.set({ page: location.pathname });
	ReactGA.pageview(location.pathname);
};
updateLocation(window.location);

const history = createBrowserHistory();
history.listen(updateLocation);

function App() {
	return (
		<Web3Provider connectors={connectors} libraryName="ethers.js">
			<Router history={history}>
				<Background />
				<Navigation>
					<Route exact path="/" component={Home} />
					<Route path="/how_it_works" component={HowItWorks} />
					<Route path="/docs" component={Docs} />
				</Navigation>
			</Router>
		</Web3Provider>
	);
}

export default App;
