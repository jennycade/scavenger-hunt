import { useState, useEffect } from "react";


const Scoreboard = ( props ) => {
  const { sessions, sessionID, hidden } = props;
  // sessions is an array from firestore
  // arr sessions = [ { id, startTime, endTime, totalms, userName }, ... ]

  // TODO: sessions.map() displays nothing unless the timer is running in App.js

  const [scores, setScores] = useState([...sessions]);

  useEffect(() => {
    setScores([...sessions]);
  }, [sessions]);

  return (
    <div className={ 'scoreboard' + (hidden && ' hidden') }>
      <header>High Scores</header>
      <p>{ scores.length } people have completed the game.</p>
      <ul>
        { scores.map( (session) => {
          let className = '';
          if (sessionID === session.id) {
            className = 'self';
          }
          return (<li key={ session.id } className={ className }>
            { session.userName }
            { session.totalms }
          </li>);
        } )}
      </ul>
    </div>
  );
}

export default Scoreboard;