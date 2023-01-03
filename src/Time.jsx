import React from 'react';
import { useState } from 'react';

export default function Time() {
	const [newDate, setNewDate] = useState();
	const refreshTime1 = 1000; //1s
	const date = new Date().toLocaleDateString();

	function getTime() {
		setNewDate(new Date().toLocaleTimeString());
	}

	setInterval(() => {
		getTime();
	}, refreshTime1);

	return (
		<div className='timeContainer'>
			<span className='time'>{newDate}</span>
		</div>
	);
}
