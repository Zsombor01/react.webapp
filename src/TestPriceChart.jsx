import React from 'react';
import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

export default function TestPriceChart() {
	const [historicalPrices, setHistoricalPrices] = useState([]);
	const [justPrices, setJustPrices] = useState([]);

	useEffect(() => {
		fetch(
			'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=10&interval=daily'
		)
			.then((res) => res.json())
			.then((data) => {
				setHistoricalPrices(data.prices);
			});
		console.log(historicalPrices);

		function makingPriceArray() {
			historicalPrices.map((e) => {
				// console.log(e[1]);
				setJustPrices(e[1][1]);
			});
		}
		makingPriceArray();
		console.log(justPrices);
	}, []);

	/* Making a chart */
	makingChart(() => {
		let xArray = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
		let yArray = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

		// Define Data
		const data = [
			{
				x: xArray,
				y: yArray,
				mode: 'lines',
			},
		];

		// Define Layout
		const layout = {
			xaxis: { range: [40, 160], title: 'Square Meters' },
			yaxis: { range: [5, 16], title: 'Price in Millions' },
			title: 'House Prices vs. Size',
		};

		// Display using Plotly
		Plotly.newPlot('myPlot', data, layout);
	});

	return (
		<div className='TestPriceChartDiv'>
			<p>THis is a test line </p>
			<div>{makingChart()}</div>
		</div>
	);
}
