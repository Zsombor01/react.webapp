import React from 'react';
import { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import LineChart from './components/LineChart';

export default function TestPriceChart() {
	const [historicalPrices, setHistoricalPrices] = useState([]);
	const [logPrices, setLogPrices] = useState({
		labels: historicalPrices.map((price) => price[1]),
		datasets: [
			{
				label: 'Valami majd lesz itt',
				data: historicalPrices.map((price) => price[0]),
				backgroundColor: [
					'rgba(75,192,192,1)',
					'#ecf0f1',
					'#50AF95',
					'#f3ba2f',
					'#2a71d0',
				],
				borderColor: 'black',
				borderWidth: 2,
			},
		],
	});

	useEffect(() => {
		fetch(
			'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=10&interval=daily'
		)
			.then((res) => res.json())
			.then((data) => {
				setHistoricalPrices(data.prices);
			});
		// if u log inside the useEffect u will se the result of what u logged out in the previous cycle
	}, []);
	console.log(historicalPrices);
	/* Making a chart */

	return (
		<div className='TestPriceChartDiv'>
			<p>THis is a test line </p>
			<div style={{ width: 700 }}>
				<LineChart chartData={logPrices} />
			</div>
		</div>
	);
}
