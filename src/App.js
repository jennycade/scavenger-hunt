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

import { firebase, db } from './Config';

function App() {
  // constants
  const dim = { width: 1200, height: 1840 };

  // state variables
  const [imgRef, setImgRef] = useState('');
  const [imgRectangle, setImgRectangle] = useState([]);
  const [relCoord, setRelCoord] = useState([]);
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);

  const [items, setItems] = useState([]);

  const [display, setDisplay] = useState('image');
  const [playing, setPlaying] = useState(true);

  // timer
  const [runTimer, setRunTimer] = useState(false);
  const [time, setTime] = useState(0);

  const [message, setMessage] = useState('');

  const [sessionID, setSessionID] = useState('');

  // scores
  const [totalms, setTotalms] = useState(Infinity);
  const [userName, setUserName] = useState('Anonymous');
  const [sessions, setSessions] = useState([]);

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
    db.collection('items')
      .orderBy("name", "asc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          newItems.push({id: doc.id, ...doc.data()});
        });
      });
    setItems(newItems);
  }, [sessionID]); // TODO: rewrite this to update based on sessions

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
  const tagItem = (itemName) => { // called when user clicks on an item from the <Menu />
    // get the right item
    const newItems = [...items];

    // filter items to matching name(s)
    const foundItems = newItems.filter(item => item.name === itemName) // TODO: Rewrite for multiple matches (cats!)

    let success = false;

    for (let i=0; i<foundItems.length; i++ ) {
      
      const foundIndex = items.indexOf(foundItems[i]);
      // check coordinates (& not already found)
      if (!foundItems[i].found) { // not already found -- shouldn't actually need to check this
        // calculate relative coords
        if (
          foundItems[i].minx / dim.width < relCoord[0] &&
          foundItems[i].maxx / dim.width > relCoord[0] &&
          foundItems[i].miny / dim.height < relCoord[1] &&
          foundItems[i].maxy / dim.height > relCoord[1]
        ) {
          success = true;

          // assign item found: true
          foundItems[i].found = true;
  
          // update the items state variable
          newItems.splice(foundIndex, 1, foundItems[i]);
          setItems(newItems);
          break;
        }
      }
    }

    // failed to find it
    if (! success) {
      displayMessage(`Nope, ${itemName} isn't there. Try again.`);
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

    // update state
    setPlaying(false);

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
  

  useEffect(() => {
    const escapeMenu = (event) => {
      if (event.target.id === 'root') { // clicked outside the image and menu
        setDisplay('image');
      }
    }
    window.addEventListener('click', escapeMenu);
    // clean up
    return () => {
      window.removeEventListener('click', escapeMenu);
    }
  })

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

    let newImgRectangle;

    // set imgRef on first click
    if (imgRef === '') { // NOTE: This will break if an ItemBorder is clicked before the image is clicked -- but that should be impossible.
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
    <div className="App">
      <FadingMessage message={ message } delay={ 5000 } />

      { display === 'submit score' ? (
        <div className="submitScore">
          <label>Submit your name to the high scores list</label>
          <input type='text' value={ userName } onChange={ handleUserNameChange } />
          <button onClick={ submitUserName }>Submit</button>
        </div>
      ) : undefined }

      <Scoreboard sessionID={ sessionID } sessions={ sessions } hidden={ display!=='scores' } closefn={ displayImage } />

      <ScavengerHuntImage onClick={ playing && captureImgClick } className="scavengerhunt" src={internet} alt="Scavenger hunt"/>

      <Sidebar time={ time } items={ items } setDisplay={ setDisplay } playing={ playing } />
      
      { items.filter( item => item.found ).map( item => <ItemBorder key={ item.id } item={ item } imgRectangle={ imgRectangle } dim={ dim } captureImgClick={ captureImgClick } />) }

      { display === 'menu' ? <Menu pageX={ pageX } pageY={ pageY } imgRectangle={ imgRectangle } items={ items } tagItem={ tagItem } /> : undefined }

    </div>
  );
}

export default App;
