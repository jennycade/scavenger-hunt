import { useState } from 'react';

// components
import Menu from './Menu';
import ItemBorder from './ItemBorder';

import './App.css';

import internet from './the-internet.jpg';

function App() {
  // constants
  const dim = { width: 1200, height: 1840 };

  // state variables // TODO: cull these!
  const [coord, setCoord] = useState([]);
  const [imgRectangle, setImgRectangle] = useState([]);
  const [relCoord, setRelCoord] = useState([]);
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);
  const [items, setItems] = useState([ // { str name, bool found, int minx, int miny, int maxx, int maxy }
    // {name: 'The death of print', },
    {name: 'Audible', found: false, minx: 617, miny: 980, maxx: 685, maxy: 1027},
    {name: 'Reddit robot', found: false, minx: 194, miny: 1103, maxx: 280, maxy: 1209},
    {name: 'Amazon\'s expanding brand', found: false, minx: 519, miny: 1200, maxx: 837, maxy: 1408}, // relative: 0.4325	0.652173913	0.6975	0.7652173913
    // {name: 'Uber', found: false, },
    // {name: 'Nine cats', found: false, },
    // {name: 'Twitch', found: false, },
    // {name: 'Rabbit hole', found: false, },
    // {name: 'Windows', found: false, },
    // {name: 'Lyft', found: false, },
    // {name: 'Ask Jeeves', found: false, },
    // {name: 'Viagra', found: false, },
    // {name: 'Trump', found: false, },
    // {name: 'Trumpet', found: false, },
    // {name: 'Aaron Zonka\'s initials', found: false, },
    // {name: 'Apple', found: false, },
    // {name: 'Goodreads', found: false, },
    // {name: 'Owl with a hat', found: false, },
    {name: 'IMDb', found: false, minx: 910, miny: 1252, maxx: 996, maxy: 1332},
    // {name: 'YouTube', found: false, },
    // {name: 'Bernie Sanders', found: false, },
    // {name: 'Beyoncé', found: false, },
    // {name: 'Netflix', found: false, },
    // {name: 'Pinterest', found: false, },
    // {name: 'Snapchat', found: false, },
    // {name: 'Bitcoin', found: false, },
    {name: 'Google\'s lofty heights', found: false, minx: 55, miny: 317, maxx: 378, maxy: 297},
    // {name: 'Earbuds', found: false, },
    // {name: 'Corgi butt', found: false, },
    // {name: 'Sandwich', found: false, },
    // {name: 'Twitter', found: false, },
    // {name: 'Lol', found: false, },
    // {name: 'Firefox', found: false, },
    // {name: 'Instagram', found: false, },
    // {name: 'Poop emoji', found: false, },
    // {name: 'Facebook', found: false, },
    // {name: 'The dark web', found: false, },
    // {name: 'Antiquated browsers', found: false, },
    // {name: 'Spotify', found: false, },
  ]);
  const [display, setDisplay] = useState('image');

  // TODO: Write component for FoundItem. Rendered as items.filter(found === true).map(item => <FoundItem .../>)

  // TODO: write function that marks item as found
  // TODO: pass ^ function to <Menu />
  const tagItem = (itemName) => {
    // TODO: check coordinates (& not already found)

    // change state
    const newItems = [...items];

    // get the right item
    const foundItem = newItems.filter(item => item.name === itemName)[0] // TODO: Rewrite for multiple matches (cats!)
    const foundIndex = items.indexOf(foundItem);

    // assign item found: true
    foundItem.found = true;

    // update the items state variable
    newItems.splice(foundIndex, 1, foundItem);
    setItems(newItems);

    // update display
    setDisplay('image')

  }


  // 

  // DISPLAY CHANGING WITH CLICKS
  const escapeMenu = (event) => {
    if (event.target.className === 'App') { // clicked outside the image and menu
      setDisplay('image');
    }
  }
  const captureImgClick = (event) => {
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

  // RENDER
  return (
    <div className="App" onClick={ escapeMenu }>
      {/* <p>You clicked on ({ coord[0] }, { coord[1] })</p>
      <p>Relative to the image: ({ relCoord[0] }, { relCoord[1] })</p>
      <p>Image coordinates:</p>
      <ul>
        <li>top: { imgRectangle.top }</li>
        <li>bottom: { imgRectangle.bottom }</li>
        <li>left: { imgRectangle.left }</li>
        <li>right: { imgRectangle.right }</li>
      </ul> */}
      <img onClick={ captureImgClick } className="scavengerhunt" src={internet} alt="Scaveger hunt"></img>
      { display === 'menu' ? <Menu pageX={ pageX } pageY={ pageY } items={ items } tagItem={ tagItem } /> : undefined }
      { items.filter( item => item.found ).map( item => <ItemBorder key={ item.name } item={ item } imgRectangle={ imgRectangle } />) }
    </div>
  );
}

export default App;
