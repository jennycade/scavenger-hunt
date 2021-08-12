import { useState } from 'react';

// components
import Menu from './Menu';

import './App.css';

import internet from './the-internet.jpg';

function App() {
  const [coord, setCoord] = useState([]);
  const [imgRectangle, setImgRectangle] = useState([]);
  const [relCoord, setRelCoord] = useState([]);
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);

  const [display, setDisplay] = useState('image');

  const dim = { width: 1200, height: 1840 };
  const items = [ // { name, locus: { minx, miny, maxx, maxy } }
    // {name: 'The death of print', locus: [], },
    {name: 'Audible', locus: {minx: 617, miny: 980, maxx: 685, maxy: 1027}, },
    {name: 'Reddit robot', locus: {minx: 194, miny: 1103, maxx: 280, maxy: 1209}, },
    {name: 'Amazon\'s expanding brand', locus: {minx: 519, miny: 1200, maxx: 837, maxy: 1408}, }, // relative: 0.4325	0.652173913	0.6975	0.7652173913
    // {name: 'Uber', locus: [], },
    // {name: 'Nine cats', locus: [], },
    // {name: 'Twitch', locus: [], },
    // {name: 'Rabbit hole', locus: [], },
    // {name: 'Windows', locus: [], },
    // {name: 'Lyft', locus: [], },
    // {name: 'Ask Jeeves', locus: [], },
    // {name: 'Viagra', locus: [], },
    // {name: 'Trump', locus: [], },
    // {name: 'Trumpet', locus: [], },
    // {name: 'Aaron Zonka\'s initials', locus: [], },
    // {name: 'Apple', locus: [], },
    // {name: 'Goodreads', locus: [], },
    // {name: 'Owl with a hat', locus: [], },
    {name: 'IMDb', locus: {minx: 910, miny: 1252, maxx: 996, maxy: 1332}, },
    // {name: 'YouTube', locus: [], },
    // {name: 'Bernie Sanders', locus: [], },
    // {name: 'Beyoncé', locus: [], },
    // {name: 'Netflix', locus: [], },
    // {name: 'Pinterest', locus: [], },
    // {name: 'Snapchat', locus: [], },
    // {name: 'Bitcoin', locus: [], },
    {name: 'Google\'s lofty heights', locus: {minx: 55, miny: 317, maxx: 378, maxy: 297}, },
    // {name: 'Earbuds', locus: [], },
    // {name: 'Corgi butt', locus: [], },
    // {name: 'Sandwich', locus: [], },
    // {name: 'Twitter', locus: [], },
    // {name: 'Lol', locus: [], },
    // {name: 'Firefox', locus: [], },
    // {name: 'Instagram', locus: [], },
    // {name: 'Poop emoji', locus: [], },
    // {name: 'Facebook', locus: [], },
    // {name: 'The dark web', locus: [], },
    // {name: 'Antiquated browsers', locus: [], },
    // {name: 'Spotify', locus: [], },
  ];

  const captureClick = (event) => {
    // click
    const newCoord = [event.clientX, event.clientY]
    setCoord(newCoord);

    // read in position of image, in case of resize or scroll
    const newImgRectangle = event.target.getBoundingClientRect()
    setImgRectangle(newImgRectangle);
    console.log(newImgRectangle);

    // page position
    setPageX(event.pageX);
    setPageY(event.pageY);

    // calculate relative position
    const newRelCoord = [
      (newCoord[0] - newImgRectangle.left) / newImgRectangle.width,
      (newCoord[1] - newImgRectangle.top) / newImgRectangle.height
    ];
    setRelCoord(newRelCoord);

    // change display to open menu
    setDisplay('menu');
  }

  return (
    <div className="App">
      <p>You clicked on ({ coord[0] }, { coord[1] })</p>
      <p>Relative to the image: ({ relCoord[0] }, { relCoord[1] })</p>
      <p>Image coordinates:</p>
      <ul>
        <li>top: { imgRectangle.top }</li>
        <li>bottom: { imgRectangle.bottom }</li>
        <li>left: { imgRectangle.left }</li>
        <li>right: { imgRectangle.right }</li>
      </ul>
      <img onClick={ captureClick } className="scavengerhunt" src={internet} alt="Scaveger hunt"></img>
      { display === 'menu' ? <Menu pageX={ pageX } pageY={ pageY } items={ items } /> : undefined }
    </div>
  );
}

export default App;
