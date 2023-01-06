import React from 'react';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
//with useAnimation we can start and stop an animation.
import { useInView } from 'react-intersection-observer';
import { renderMatches } from 'react-router-dom';

export default function News() {
	// https://newsapi.org/docs/endpoints/top-headlines
	// API key: 3cf06040992d4a18bff78670704b4ce7
	const [news, setNews] = useState([]);
	const [changeCategoryOfNews, setChangeCategoryOfNews] = useState('business'); //examples: business entertainment general health science sports technology
	const [country, setCountry] = useState();
	const { ref, inView } = useInView({
		threshold: 0.05, // a number between 0 and 1, it means the given element's 10% should be visible before the animation starts.
	});
	//inView has a boolean value which specifies if a thing is in view or not. ref -> we have to assign it to the element that we want to monitor.
	const animation = useAnimation();
	const animation2 = useAnimation();
	const animation3 = useAnimation();
	useEffect(() => {
		fetch(
			`https://newsapi.org/v2/top-headlines?country=us&category=${changeCategoryOfNews}&apiKey=3cf06040992d4a18bff78670704b4ce7`
		)
			.then((res) => res.json())
			.then((data) => {
				setNews(data.articles);
			});
	}, [changeCategoryOfNews]);

	//The animations are done with framer-motion package
	//https://www.framer.com/docs/introduction/
	//in the package.json u can see the downloaded packages.
	//we want that the animation only starts when we view that part of the page. for that we need npm install react-intersection-observer --save.
	//the animation should only start when the given element is in the given view referenced by {ref}
	useEffect(() => {
		if (inView) {
			animation.start({
				x: 0,
				opacity: 1,
				transition: {
					duration: 1,
				},
			});
			animation2.start({
				x: 0,
				opacity: 1,
				transition: {
					duration: 1,
					delay: 0.6,
				},
			});
			animation3.start({
				x: 0,
				opacity: 1,
				transition: {
					duration: 1,
					delay: 1.6,
				},
			});
		}
		if (!inView) {
			animation.start({
				x: '-70vw',
				opacity: 0,
			});
			animation2.start({
				x: '-70vw',
				opacity: 0,
			});
			animation3.start({
				opacity: 0,
			});
		}
	}, [inView]);

	function newsSelect(e) {
		setChangeCategoryOfNews(e.target.value);
	}

	return (
		<div ref={ref} className='mainNewsContainer'>
			<motion.div
				animate={animation} // to trigger the animation on this specific element
				className='news'
			>
				News
			</motion.div>
			{/* business entertainment general health science sports technology */}
			<motion.select
				className='newsSelect'
				animate={animation3}
				value={changeCategoryOfNews}
				onChange={newsSelect}
			>
				<option className='options' value='business'>
					Business
				</option>
				<option className='options' value='entertainment'>
					Entertainment
				</option>
				<option className='options' value='general'>
					General
				</option>
				<option className='options' value='health'>
					Health
				</option>
				<option className='options' value='science'>
					Science
				</option>
				<option className='options' value='sports'>
					Sports
				</option>
				<option className='options' value='technology'>
					Technology
				</option>
			</motion.select>
			{news.map((news, index) => {
				return (
					<motion.div
						animate={animation2}
						className='newsContainer'
						key={index}
					>
						<p className='title'>{news.title}</p>
						<p className='article'>{news.content}</p>
						<a className='link' href={news.url} target='_blank'>
							{news.url}
						</a>
						<span className='source'>Source: {news.source.name}</span>
					</motion.div>
				);
			})}
		</div>
	);
}
