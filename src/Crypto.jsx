import React from 'react';
import { useState } from 'react';

export default function Crypto() {
	const [btc, setBtc] = useState();
	const [eth, setEth] = useState();
	const [sol, setSol] = useState();
	const [link, setLink] = useState();
	const [sushi, setSushi] = useState();

	const refreshTime = 3600000;

	function getCryptoPrices() {
		fetch(
			'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Csolana%2Cchainlink%2Cmatic-network%2Csushi&vs_currencies=usd'
		)
			.then((res) => res.json())
			.then((data) => {
				setBtc(data.bitcoin.usd.toFixed(2));
				setEth(data.ethereum.usd.toFixed(2));
				setSol(data.solana.usd.toFixed(2));
				setLink(data.chainlink.usd.toFixed(2));
				setSushi(data.sushi.usd.toFixed(2));
			});
	}

	getCryptoPrices();

	setInterval(() => {
		getCryptoPrices();
	}, refreshTime);

	return (
		<div className='mainCryptoContainer'>
			<div className='cryptoContainer'>
				<div className='cryptos'>
					<div>
						<p className='cryptoName'>Bitcoin</p>
						<span className='prices'>${btc}</span>
					</div>
					<img
						className='logos'
						src='https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579'
						alt='Btc'
					/>
				</div>
				<div className='cryptos'>
					<div>
						<p className='cryptoName'>Ethereum</p>
						<span className='prices'>${eth}</span>
					</div>
					<img
						className='logos'
						src='https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880'
						alt='Eth'
					/>
				</div>
				<div className='cryptos'>
					<div>
						<p className='cryptoName'>Solana</p>
						<span className='prices'>${sol}</span>
					</div>
					<img
						className='logos'
						src='https://assets.coingecko.com/coins/images/4128/thumb/solana.png?1640133422'
						alt='Sol'
					/>
				</div>
				<div className='cryptos'>
					<div>
						<p className='cryptoName'>Chainlink</p>
						<span className='prices'>${link}</span>
					</div>
					<img
						className='logos'
						src='https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png?1547034700'
						alt='Link'
					/>
				</div>
				<div className='cryptos'>
					<div>
						<p className='cryptoName'>Sushi</p>
						<span className='prices'>${sushi}</span>
					</div>
					<img
						className='logos'
						src='https://assets.coingecko.com/coins/images/12271/thumb/512x512_Logo_no_chop.png?1606986688'
						alt='Sushi'
					/>
				</div>
			</div>
		</div>
	);
}
