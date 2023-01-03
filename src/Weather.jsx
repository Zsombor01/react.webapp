import React from 'react';
import { useState } from 'react';

export default function Weather(props) {
	const { currentTemperature, currentLocation } = props;
	const [weatherIcon, setWeatherIcon] = useState(
		'https://cdn-icons-png.flaticon.com/512/7133/7133384.png'
	);
	//
	//that is the basic of the Icons state.

	//just some icons but not all of them
	function handleWeatherIcons() {
		if (currentTemperature <= -1) {
			setWeatherIcon('https://cdn-icons-png.flaticon.com/128/2529/2529995.png');
		} else if (currentTemperature >= -1 && currentTemperature <= 0.5) {
			setWeatherIcon('https://cdn-icons-png.flaticon.com/512/7174/7174840.png');
		} else if (currentTemperature >= 0.5 && currentTemperature <= 3) {
			setWeatherIcon('https://cdn-icons-png.flaticon.com/512/7133/7133384.png');
		} else if (currentTemperature <= 12) {
			setWeatherIcon('https://cdn-icons-png.flaticon.com/128/66/66275.png');
		}
		console.log(currentTemperature);
	}

	return (
		<div className='weatherContainer'>
			<img
				className='weatherPicture'
				src={weatherIcon}
				alt='here should be the weather icons'
			/>
			<p onChange={handleWeatherIcons} className='Temperature'>
				{currentTemperature} °C
			</p>
			<p className='location'>{currentLocation}</p>
		</div>
	);
}
