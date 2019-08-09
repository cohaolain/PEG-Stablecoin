import React, { Component } from "react";

import Particles from "react-particles-js";

export default class Background extends Component {
	render() {
		const particlesConfig = {
			particles: {
				number: {
					value: 250,
					density: {
						enable: true,
						value_area: 800
					}
				},
				color: {
					value: "#ffffff"
				},
				shape: {
					type: "circle",
					stroke: {
						width: 0,
						color: "#000000"
					},
					polygon: {
						nb_sides: 5
					},
					image: {
						src: "img/github.svg",
						width: 100,
						height: 100
					}
				},
				opacity: {
					value: 1,
					random: true,
					anim: {
						enable: true,
						speed: 1,
						opacity_min: 0,
						sync: false
					}
				},
				size: {
					value: 3,
					random: true,
					anim: {
						enable: false,
						speed: 4,
						size_min: 0.3,
						sync: false
					}
				},
				line_linked: {
					enable: true,
					distance: 50,
					color: "#ffffff",
					opacity: 0.4,
					width: 1
				},
				move: {
					enable: true,
					speed: 1,
					direction: "none",
					random: true,
					straight: false,
					out_mode: "out",
					bounce: false,
					attract: {
						enable: false,
						rotateX: 600,
						rotateY: 600
					}
				}
			},
			interactivity: {
				detect_on: "canvas",
				events: {
					onhover: {
						enable: true,
						mode: "bubble"
					},
					onclick: {
						enable: false,
						mode: "repulse"
					},
					resize: true
				},
				modes: {
					grab: {
						distance: 400,
						line_linked: {
							opacity: 1
						}
					},
					bubble: {
						distance: 120,
						size: 0,
						duration: 2,
						opacity: 1,
						speed: 1
					},
					repulse: {
						distance: 60,
						duration: 0.4
					},
					push: {
						particles_nb: 4
					},
					remove: {
						particles_nb: 2
					}
				}
			},
			retina_detect: true
		};
		return (
			<>
				<Particles
					params={particlesConfig}
					style={{
						top: 0,
						left: 0,
						position: "absolute",
						height: "100%",
						width: "100%"
					}}
				/>
			</>
		);
	}
}
