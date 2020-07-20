import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import moment from "moment";
import "moment-timezone";
import cityTimezones from "city-timezones";

import { Grommet, Box, Button, Image, Text } from "grommet";

function App() {
	const string = window.location.pathname.substring(1)
	const infos = string.split("-")
	console.log('string: ', string);

	const time = infos.find(i => {
		if (i.includes("pm") || i.includes("am")) {
			return i
		}
	})
	console.log(time)
	let lastIn = false
	const city = infos.find(i => {
		if (i == "in") {
			lastIn = true
			return
		}
		if (lastIn) {
			return true
		}
	})

	const cityInfo = cityTimezones.lookupViaCity(city).sort((a,b) => b.pop - a.pop).shift()
	console.log('cityInfo: ', cityInfo);

	const timeOriginal = moment(time, "ha")

	const timeLocal = moment.tz(time, "ha", cityInfo.timezone).local();
	const myTz = Intl.DateTimeFormat().resolvedOptions().timeZone



	const myTheme = {
		global: {
			background: "white"
		}
	};
	return (
		<div className="App">
			<div pad="large">
				<div weight={200} size="70px">When time is <span weight={800} size="100px">{timeOriginal.format("h:mm a")}</span> in {cityInfo.city} ({cityInfo.timezone}) ...</div>
				<div weight={200} size="70px">... it is <span weight={800} size="100px">{timeLocal.format("h:mm a")}</span> in your local time ({myTz})</div>
			</div>
			<div>
				{/* <span color="gray">Original: {time} in timezone: {city}</span> */}
			</div>
		</div>
	);
}

export default App;
