import React from 'react';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale, //x axis
	LinearScale, //y axis
	PointElement,
	Legend,
	Tooltip,
	Colors,
	Filler,
} from 'chart.js';

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Legend,
	Tooltip,
	Colors,
	Filler
);

export default function TestPriceChart() {
	const [date, setDate] = useState([]);
	const [price, setPrice] = useState([]);
	const data = {
		labels: date,
		datasets: [
			{
				label: 'Previous prices',
				data: price,
				borderColor: 'black',
				backgroundColor: 'rgba(242, 242, 242, 0.2)',
				pointBorderColor: 'black',
				fill: true,
				tension: 0.4, //for the line to be more 'curvier'
			},
		],
	};

	const options = {
		radius: 0,
		hitRadius: 30,
		backgroundColor: 'black',
		plugins: {
			legend: {
				labels: false,
			},
		},
		scales: {
			x: {
				ticks: {
					color: 'red',
					size: 10,
				},
				grid: {
					display: false,
				},
				border: {
					color: 'black',
					width: 2,
				},
			},
			y: {
				ticks: {
					color: 'red',
				},
				grid: {
					display: false,
				},
				border: {
					color: 'black',
					width: 2,
				},
			},
		},
	};

	useEffect(() => {
		fetch(
			'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=fourhour'
		)
			.then((res) => res.json())
			.then((data) => {
				setDate(
					data.prices.map((date) => {
						return new Date(date[0]).getDate();
					})
				);
				setPrice(
					data.prices.map((price) => {
						return price[1];
					})
				);
			});
		// if u log inside the useEffect u will see the result of what u logged out in the previous cycle
	}, []);
	// console.log(date);
	// console.log(price);

	/* Making a chart */

	return (
		<div className='TestPriceChartDiv'>
			<p>THis is a test line </p>
			<div style={{ width: 700 }}>
				<Line data={data} options={options}></Line>
			</div>
		</div>
	);
}
