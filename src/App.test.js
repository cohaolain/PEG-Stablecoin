import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import Docs from "./components/Docs";
import HowItWorks from "./components/HowItWorks";
import ModalAboutPEG from "./components/ModalAboutPEG";
import ModalTransaction from "./components/ModalTransaction";

it("home renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<App />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it("docs renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Docs />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it("how it works renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<HowItWorks />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it("about modal renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<ModalAboutPEG />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it("transaction modal renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<ModalTransaction />, div);
	ReactDOM.unmountComponentAtNode(div);
});
