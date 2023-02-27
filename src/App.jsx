import './App.css';
import { useState, useEffect } from 'react';
import Time from './Time.jsx';
import Crypto from './Crypto.jsx';
import Weather from './Weather.jsx';
import News from './News';
import TestPriceChart from './TestPriceChart';

function App() {
	const [positionLatitude, setPositionLatitude] = useState();
	const [positionLongitude, setPositionLongitude] = useState();
	const [currentTemperature, setCurrentTemperature] = useState();
	const [currentLocation, setCurrentLocation] = useState();
	const [elementVisible, setElementVisible] = useState(false);

	const BASE_URL = `https://api.open-meteo.com/v1/forecast?latitude=${positionLatitude}&longitude=${positionLongitude}&hourly=temperature_2m&current_weather=true`;

	// fetch the weather API
	// setInterval(() => {
	useEffect(() => {
		function weatherAPI() {
			fetch(BASE_URL)
				.then((res) => res.json())
				.then((data) => {
					const { temperature } = data.current_weather;
					return setCurrentTemperature(temperature);
				})
				.catch((error) => {
					return;
				});
		}
		weatherAPI();
	}, [positionLatitude, positionLongitude, BASE_URL]);
	// }, 60000); /* works but is just don't wanna use it everytime */

	// Getting the user current location (Longitude and Latitude)
	useEffect(() => {
		function getPosition() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(success, error);
			} else {
				alert('You did not allow us to get access to your location :(');
			}
		}
		getPosition();

		function success(position) {
			let lat = position.coords.latitude;
			let long = position.coords.longitude;
			setPositionLongitude(long);
			setPositionLatitude(lat);
		}

		function error() {
			console.log('error');
		}
	}, []); /* to make sure this only runs once */

	// Getting the real Location written out, and asked down from an API
	useEffect(() => {
		function getLocation() {
			fetch(
				`https://api.opencagedata.com/geocode/v1/json?q=${positionLatitude}+${positionLongitude}&key=afad1f85b5214b7baa2230338e67f9d7`
			)
				.then((res) => res.json())
				.then((data) => {
					// fconsole.log(data);
					const location = data.results[0].formatted.split(',', 1);
					setCurrentLocation(location);
				})
				.catch((err) => {
					return;
				});
		}
		getLocation();
	}, [positionLatitude, positionLongitude]);

	return (
		<div className='App'>
			<section>
				<div className='timeWeatherContainer'>
					<Time />
					<Weather
						currentTemperature={currentTemperature}
						currentLocation={currentLocation}
					/>
				</div>
				{elementVisible ? (
					<div>
						<TestPriceChart />
					</div>
				) : null}
				<Crypto
					changeElementVisibility={(elementVisible) =>
						setElementVisible(elementVisible)
					}
				/>
			</section>
			<section>
				<News />
			</section>
			{/* <section>
				<TestPriceChart />
			</section> */}
		</div>
	);
}

export default App;
