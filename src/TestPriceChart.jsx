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
	const [displayedDays, setDisplayedDays] = useState(30);
	const [displayedCrypto, setDisplayedCrypto] = useState('bitcoin');

	const days = ['1', '7', '30'];
	const cryptos = ['bitcoin', 'ethereum', 'solana', 'chainlink', 'sushi'];

	useEffect(() => {
		fetch(
			`https://api.coingecko.com/api/v3/coins/${displayedCrypto}/market_chart?vs_currency=usd&days=${displayedDays}&interval=fourhour`
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
	}, [displayedCrypto, displayedDays]);

	const data = {
		labels: date,
		datasets: [
			{
				label: 'Price',
				data: price,
				borderColor: 'black',
				backgroundColor: 'rgba(242, 242, 242, 0.1)',
				pointBorderColor: 'black',
				fill: true,
				tension: 0.4, //for the line to be more 'curvier'
			},
		],
	};

	const options = {
		radius: 0,
		hitRadius: 30,
		plugins: {
			legend: {
				labels: false,
			},
		},
		scales: {
			x: {
				ticks: {
					color: 'white',
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
					color: 'white',
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
	/* Making a chart */

	function changeDisplayedCrypto(e) {
		setDisplayedCrypto(e.target.value);
	}
	function changeDisplayedDays(e) {
		setDisplayedDays(e.target.value);
	}

	return (
		<div className='TestPriceChartDiv'>
			<select
				className='cryptoChartSelect'
				value={displayedCrypto}
				onChange={changeDisplayedCrypto}
			>
				{cryptos.map((crypto, index) => {
					return <option key={index}>{crypto}</option>;
				})}
			</select>
			<select
				className='cryptoChartDays'
				value={displayedDays}
				onChange={changeDisplayedDays}
			>
				{days.map((day, index) => {
					return <option key={index}>{day}</option>;
				})}
			</select>
			<div style={{ width: 500 }}>
				<Line data={data} options={options}></Line>
			</div>
		</div>
	);
}
