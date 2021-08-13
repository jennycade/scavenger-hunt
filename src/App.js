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
  const [items, setItems] = useState([ // { name, found, locus: { minx, miny, maxx, maxy } }
    // {name: 'The death of print', locus: [], },
    {name: 'Audible', found: false, locus: {minx: 617, miny: 980, maxx: 685, maxy: 1027}, },
    {name: 'Reddit robot', found: false, locus: {minx: 194, miny: 1103, maxx: 280, maxy: 1209}, },
    {name: 'Amazon\'s expanding brand', found: false, locus: {minx: 519, miny: 1200, maxx: 837, maxy: 1408}, }, // relative: 0.4325	0.652173913	0.6975	0.7652173913
    // {name: 'Uber', found: false, locus: [], },
    // {name: 'Nine cats', found: false, locus: [], },
    // {name: 'Twitch', found: false, locus: [], },
    // {name: 'Rabbit hole', found: false, locus: [], },
    // {name: 'Windows', found: false, locus: [], },
    // {name: 'Lyft', found: false, locus: [], },
    // {name: 'Ask Jeeves', found: false, locus: [], },
    // {name: 'Viagra', found: false, locus: [], },
    // {name: 'Trump', found: false, locus: [], },
    // {name: 'Trumpet', found: false, locus: [], },
    // {name: 'Aaron Zonka\'s initials', found: false, locus: [], },
    // {name: 'Apple', found: false, locus: [], },
    // {name: 'Goodreads', found: false, locus: [], },
    // {name: 'Owl with a hat', found: false, locus: [], },
    {name: 'IMDb', found: false, locus: {minx: 910, miny: 1252, maxx: 996, maxy: 1332}, },
    // {name: 'YouTube', found: false, locus: [], },
    // {name: 'Bernie Sanders', found: false, locus: [], },
    // {name: 'Beyoncé', found: false, locus: [], },
    // {name: 'Netflix', found: false, locus: [], },
    // {name: 'Pinterest', found: false, locus: [], },
    // {name: 'Snapchat', found: false, locus: [], },
    // {name: 'Bitcoin', found: false, locus: [], },
    {name: 'Google\'s lofty heights', found: false, locus: {minx: 55, miny: 317, maxx: 378, maxy: 297}, },
    // {name: 'Earbuds', found: false, locus: [], },
    // {name: 'Corgi butt', found: false, locus: [], },
    // {name: 'Sandwich', found: false, locus: [], },
    // {name: 'Twitter', found: false, locus: [], },
    // {name: 'Lol', found: false, locus: [], },
    // {name: 'Firefox', found: false, locus: [], },
    // {name: 'Instagram', found: false, locus: [], },
    // {name: 'Poop emoji', found: false, locus: [], },
    // {name: 'Facebook', found: false, locus: [], },
    // {name: 'The dark web', found: false, locus: [], },
    // {name: 'Antiquated browsers', found: false, locus: [], },
    // {name: 'Spotify', found: false, locus: [], },
  ]);

  // TODO: write function that marks item as found
  // TODO: pass ^ function to <Menu />

  const [display, setDisplay] = useState('image');

  const dim = { width: 1200, height: 1840 };

  const escapeMenu = (event) => {
    if (event.target.className === 'App') { // clicked outside the image and menu
      setDisplay('image');
    }
  }

  const captureClick = (event) => {
    // click
    const newCoord = [event.clientX, event.clientY]
    setCoord(newCoord);

    // read in position of image, in case of resize or scroll
    const newImgRectangle = event.target.getBoundingClientRect()
    setImgRectangle(newImgRectangle);

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
    <div className="App" onClick={ escapeMenu }>
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
