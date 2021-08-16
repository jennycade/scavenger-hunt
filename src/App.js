import { useEffect, useState } from 'react';

// components
import Menu from './Menu';
import ItemBorder from './ItemBorder';

import './App.css';

import internet from './the-internet.jpg';
import FadingMessage from './FadingMessage';

import { firebase, app, db } from './Config';

function App() {
  // constants
  const dim = { width: 1200, height: 1840 };

  // state variables // TODO: cull these!
  const [coord, setCoord] = useState([]);
  const [imgRectangle, setImgRectangle] = useState([]);
  const [relCoord, setRelCoord] = useState([]);
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);

  const [items, setItems] = useState([]);
  // const [items, setItems] = useState([ // { str name, bool found, int minx, int miny, int maxx, int maxy }
  //   // {name: 'The death of print', found: false, },
  //   {name: 'Audible', found: false, minx: 617, miny: 980, maxx: 685, maxy: 1027},
  //   {name: 'Reddit robot', found: false, minx: 194, miny: 1103, maxx: 280, maxy: 1209},
  //   {name: 'Amazon\'s expanding brand', found: false, minx: 519, miny: 1200, maxx: 837, maxy: 1408},
  //   // {name: 'Uber', found: false, },
  //   // {name: 'Nine cats', found: false, },
  //   // {name: 'Twitch', found: false, },
  //   // {name: 'Rabbit hole', found: false, },
  //   // {name: 'Windows', found: false, },
  //   // {name: 'Lyft', found: false, },
  //   // {name: 'Ask Jeeves', found: false, },
  //   // {name: 'Viagra', found: false, },
  //   // {name: 'Trump', found: false, },
  //   // {name: 'Trumpet', found: false, },
  //   // {name: 'Aaron Zonka\'s initials', found: false, },
  //   // {name: 'Apple', found: false, },
  //   // {name: 'Goodreads', found: false, },
  //   // {name: 'Owl with a hat', found: false, },
  //   {name: 'IMDb', found: false, minx: 910, miny: 1252, maxx: 996, maxy: 1332},
  //   // {name: 'YouTube', found: false, },
  //   // {name: 'Bernie Sanders', found: false, },
  //   // {name: 'Beyoncé', found: false, },
  //   // {name: 'Netflix', found: false, },
  //   // {name: 'Pinterest', found: false, },
  //   // {name: 'Snapchat', found: false, },
  //   // {name: 'Bitcoin', found: false, },
  //   {name: 'Google\'s lofty heights', found: false, minx: 55, miny: 297, maxx: 378, maxy: 317}, // TODO: Fix the y coords!
  //   // {name: 'Earbuds', found: false, },
  //   // {name: 'Corgi butt', found: false, },
  //   // {name: 'Sandwich', found: false, },
  //   // {name: 'Twitter', found: false, },
  //   // {name: 'Lol', found: false, },
  //   // {name: 'Firefox', found: false, },
  //   // {name: 'Instagram', found: false, },
  //   // {name: 'Poop emoji', found: false, },
  //   // {name: 'Facebook', found: false, },
  //   // {name: 'The dark web', found: false, },
  //   // {name: 'Antiquated browsers', found: false, },
  //   // {name: 'Spotify', found: false, },
  //   // {name: 'topleft', found: true, minx: 0, miny: 0, maxx: 100, maxy: 100},
  //   // {name: 'topright', found: true, minx: 1200-100, miny: 0, maxx: 1200, maxy: 100},
  //   // {name: 'bottomleft', found: true, minx: 0, miny: 1840-100, maxx: 100, maxy: 1840},
  //   // {name: 'bottomright', found: true, minx: 1200-100, miny: 1840-100, maxx: 1200, maxy: 1840},
  // ]);
  const [display, setDisplay] = useState('image');
  const [time, setTime] = useState(0);

  const [message, setMessage] = useState('bloop');

  const [phase, setPhase] = useState('playing');
  const [sessionID, setSessionID] = useState('');

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState();

  // test firebase
  const firebaseApp = firebase.apps[0];

  // SESSION START
  useEffect(() => {
    // add a game session in firebase
    db.collection('sessions').add({
      startTime: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      // retrieve the id and set state
      setSessionID(docRef.id);
    });
  }, []);

  // GET ITEMS
  useEffect(() => {
    const newItems = [];
    // get items from database
    db.collection('items').get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          newItems.push(doc.data());
        });
      });
    setItems(newItems);
  }, [firebaseApp]); // TODO: rewrite this to update based on sessions

  // TIMER
  useEffect(() => {
    let interval = setInterval(() => {
      setTime(time => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  // TAGGING
  const tagItem = (itemName) => {
    // get the right item
    const newItems = [...items];
    const foundItem = newItems.filter(item => item.name === itemName)[0] // TODO: Rewrite for multiple matches (cats!)
    const foundIndex = items.indexOf(foundItem);
    // TODO: check coordinates (& not already found)
    if (!foundItem.found) { // not already found
      // calculate relative coords
      if (
        foundItem.minx / dim.width < relCoord[0] &&
        foundItem.maxx / dim.width > relCoord[0] &&
        foundItem.miny / dim.height < relCoord[1] &&
        foundItem.maxy / dim.height > relCoord[1]
      ) {
        console.log(`You found ${foundItem.name}`);
        // assign item found: true
        foundItem.found = true;

        // update the items state variable
        newItems.splice(foundIndex, 1, foundItem);
        setItems(newItems);
      } else {
        displayMessage(`Nope, ${foundItem.name} isn't there. Try again.`);
      }
    }
    // update display
    setDisplay('image')

    // check for win
    if (items.filter(item => item.found).length === items.length) {
      win();
      console.log(startTime);
      console.log(endTime);
    }
  }

  // display message
  const displayMessage = (message) => {
    setMessage(message);
  }

  // WINNING
  const win = () => {
    displayMessage(`You won!`);

    // record end time in firebase
    const sessionRef = db.collection('sessions').doc(sessionID);
    sessionRef.update({
      endTime: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      // get start and end times
      sessionRef.get()
      .then((doc) => {
        setStartTime(doc.data().startTime.toDate());
        setEndTime(doc.data().endTime.toDate());
      })
    })
  }

  // DISPLAY CHANGE ON CLICKS
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

  // FORMAT TIME
  const formatTime = (seconds) => {
    if (seconds < 60) { // seconds
      return `${seconds}`.padStart(3, ':00'); // TODO: Make this match format 00:00 without screwing up time >= 60

    } else if (seconds < 60 * 60) { // minutes
      const remainder = seconds % 60;
      return `${(seconds - remainder) / 60}${formatTime(remainder)}`.padStart(5, '0');
    } else { // hours
      const remainder = seconds % (60*60);
      return `${(seconds - remainder) / (60*60)}:${formatTime(remainder)}`;
    }
  }

  // RENDER
  return (
    <div className="App" onClick={ escapeMenu }>
      <FadingMessage message={ message } delay={ 5000 } />

      <img onClick={ captureImgClick } className="scavengerhunt" src={internet} alt="Scaveger hunt"></img>

      <div className="info">
        <p>Time: { formatTime(time) }</p>
        <p>Items found: { items.filter(item => item.found).length } / { items.length }</p>
        <p>Session ID: { sessionID }</p>
        
      </div>
      
      { items.filter( item => item.found ).map( item => <ItemBorder key={ item.name } item={ item } imgRectangle={ imgRectangle } dim={ dim } />) }

      { display === 'menu' ? <Menu pageX={ pageX } pageY={ pageY } items={ items } tagItem={ tagItem } /> : undefined }

    </div>
  );
}

export default App;
