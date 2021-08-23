import { useState, useEffect } from "react";


const Scoreboard = ( props ) => {
  const { sessions, sessionID, hidden, closefn } = props;
  // sessions is an array from firestore
  // arr sessions = [ { id, startTime, endTime, totalms, userName }, ... ]

  const [scores, setScores] = useState([...sessions]);

  useEffect(() => {
    setScores([...sessions]);
  }, [sessions]);

  return (
    <div className={ 'scoreboard' + (hidden ? ' hidden' : '') }>
      <header>High Scores</header>
      <p>{ scores.length } people have completed the game.</p>
      <ul>
        <li className="titles">
          <span className="rank">Rank</span>
          <span className="username">Name</span>
          <span className="totalms">Milliseconds to complete</span>
        </li>
        { scores.map( (session, index) => {
          let className = '';
          if (sessionID === session.id) {
            className = 'self';
          }
          return (<li key={ session.id } className={ className }>
            <span className="rank">{ index + 1 }</span>
            <span className="username">{ session.userName }</span>
            <span className="totalms">{ session.totalms }</span>
          </li>);
        } )}
      </ul>
      <button onClick={ closefn }>Close</button>
    </div>
  );
}

export default Scoreboard;