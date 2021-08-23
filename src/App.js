import { useEffect, useState } from 'react';

// components
import ScavengerHuntImage from './ScavengerHuntImage';
import Sidebar from './Sidebar';
import Menu from './Menu';
import ItemBorder from './ItemBorder';
import Scoreboard from './Scoreboard';

import './App.css';

import internet from './the-internet.jpg';
import FadingMessage from './FadingMessage';

import { firebase, app, db } from './Config';

function App() {
  // constants
  const dim = { width: 1200, height: 1840 };

  // state variables // TODO: cull these!
  const [imgRef, setImgRef] = useState('');
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

  // timer
  const [runTimer, setRunTimer] = useState(false);
  const [time, setTime] = useState(0);

  const [message, setMessage] = useState('');

  const [sessionID, setSessionID] = useState('');

  // scores
  const [totalms, setTotalms] = useState(Infinity);
  const [userName, setUserName] = useState('Anonymous');
  const [sessions, setSessions] = useState([]);

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

      // start the timer
      setRunTimer(true);
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
    if (runTimer) {
      let interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time, runTimer]);

  // TAGGING
  const tagItem = (itemName) => {
    // get the right item
    const newItems = [...items];
    const foundItem = newItems.filter(item => item.name === itemName)[0] // TODO: Rewrite for multiple matches (cats!)
    const foundIndex = items.indexOf(foundItem);
    // check coordinates (& not already found)
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
    }
  }

  // display message
  const displayMessage = (message) => {
    setMessage(message);
  }

  // WINNING
  const win = () => {
    displayMessage(`You won!`);
    setDisplay('submit score');
    // stop the clock
    setRunTimer(false);

    // record end time in firebase
    const sessionRef = db.collection('sessions').doc(sessionID);
    sessionRef.update({
      endTime: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      // get start and end times
      sessionRef.get()
      .then((doc) => {
        // calculate score
        const newTotalms = doc.data().endTime.toDate() - doc.data().startTime.toDate()
        setTotalms( newTotalms );
      });
    });
  }

  // effect to update firebase with totalms
  useEffect(() => {
    if (totalms < Infinity) {
      // write to db
      const sessionRef = db.collection('sessions').doc(sessionID);
      sessionRef.update({
        totalms: totalms,
      });
    }
  }, [totalms, sessionID]);

  // input
  const handleUserNameChange = (e) => {
    const newValue = e.target.value;
    setUserName(newValue);
  }

  // effect to update scores
  useEffect(() => {
    if (display === 'scores') {
      
      db.collection('sessions')
        .orderBy('totalms', 'asc')
        .get()
      .then((querySnapshot) => {
        const newSessions = [];
        querySnapshot.forEach((doc) => {
          const session = { id: doc.id, ...doc.data() };
          newSessions.push(session);
        })
        return newSessions;
      })
      .then((newSessions) => {
        setSessions(newSessions);
      });
    }
  }, [display, setSessions]);

  const submitUserName = () => {
    const sessionRef = db.collection('sessions').doc(sessionID);
    sessionRef.update({
      userName: userName,
    })
    .then(() => {
      setDisplay('scores')
    });
  }

  // DISPLAY CHANGE ON CLICKS
  const escapeMenu = (event) => {
    if (event.target.className === 'App') { // clicked outside the image and menu
      if (display !== 'scores') {
        setDisplay('image');
      }
    }
  }

  const displayImage = () => {
    setDisplay('image');
  }

  // effect to re-render ItemBorders with resize

  // debounce - don't re-render too often
  const debounce = (fn, ms) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arguments)
      }, ms);
    };
  }
  useEffect(() => {
    const debounceHandleResize = debounce(function handleResize() {
      if (imgRef) {
        // call getBoundingClientRect() on the image
        const newImgRectangle = imgRef.getBoundingClientRect()
        setImgRectangle(newImgRectangle);
      }
    }, 500);
    // attach listener
    window.addEventListener('resize', debounceHandleResize);
    // clean up
    return () => {
      window.removeEventListener('resize', debounceHandleResize);
    }
  })

  // CAPTURE CLICK (on image)
  const captureImgClick = (event) => { // TODO: change so this works when ItemBorder is clicked too
    // click
    const newCoord = [event.clientX, event.clientY] // relative to viewport
    setCoord(newCoord);

    let newImgRectangle;

    // set imgRef on first click
    if (imgRef === '') { // NOTE: This breaks if an ItemBorder is clicked before the image is clicked -- which should be impossible.
      setImgRef(event.target);

      // read in position of image, in case of resize or scroll
      newImgRectangle = event.target.getBoundingClientRect()
      setImgRectangle(newImgRectangle);
    } else {
      newImgRectangle = imgRectangle;
    }

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
      <FadingMessage message={ message } delay={ 5000 } />

      { display === 'submit score' ? (
        <div className="submitScore">
          <label>Submit your name to the high scores list</label>
          <input type='text' value={ userName } onChange={ handleUserNameChange } />
          <button onClick={ submitUserName }>Submit</button>
        </div>
      ) : undefined }

      <Scoreboard sessionID={ sessionID } sessions={ sessions } hidden={ display!=='scores' } closefn={ displayImage } />

      <ScavengerHuntImage onClick={ captureImgClick } className="scavengerhunt" src={internet} alt="Scavenger hunt"/>

      <Sidebar time={ time } items={ items } setDisplay={ setDisplay } />
      
      { items.filter( item => item.found ).map( item => <ItemBorder key={ item.name } item={ item } imgRectangle={ imgRectangle } dim={ dim } captureImgClick={ captureImgClick } />) }

      { display === 'menu' ? <Menu pageX={ pageX } pageY={ pageY } imgRectangle={ imgRectangle } items={ items } tagItem={ tagItem } /> : undefined }

    </div>
  );
}

export default App;
