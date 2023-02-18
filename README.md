# react.webapp

This project is still in process, because i have a ton of plan with it. My main goal with this project is to explore React as deeply as i can and also, make something usefull.

You can find the project's files in the src directory.

Here you can read a small "introduction" of all the components in this project.

App.jsx
This is the 'main' component, where i made 2 API fetchs one for the weather component (which i will talk about later) and one to be able to ask down the webpage user's location. With the help of these 2 APIs I can tell the webpage user's current location (if they allow it ofc.) and the weather in their current location.
Also, here is where i combined all the components to get the current look of the page.

Time.jsx
I made a clock for the head of the website + added some animation to it with CSS.

Weather.jsx
This component writes out the current weather in your current location.
For this I used an API request, which is made in the App.jsx and with help of the so called props (react element used to transfer data from one component to another) I placed this data into the Weather component.
The weather icons change depending on the current temperature also.

Crypto.jsx
This component is responsible for the given current cryptocurrency prices to be written out on the page.  
This component also contains an API usage.

News.jsx
This is basically the second page of this react webb app where the user is able to check on the latest news in the world, with the help of an API. User can select from business, entertainment, general, health, science, sports and technology news. The user also able to choose languages.
I also used a react specific animation library called framer-motion, to make this section a bit cooler.

App.css
This component is responsible for all the styling on the page.

Update:

- Deployed the website successfully (finally), bit turns out the API that i used for the news only works for on the development server (unless i pay for it). I try to search for some sort of solution...

In the works:

- Currently working on a solution to make a chart for each displayed cryptocurrency on the 1st page.
- I want to add more icons to the changing weather icons section of the weather.jsx component.
