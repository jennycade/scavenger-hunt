const Scoreboard = ( props ) => {
  const { sessions, sessionID } = props;
  // sessions is an array from firestore
  // arr sessions = [ { id, startTime, endTime, totalms, userName }, ... ]

  // TODO: sessions.map() displays nothing unless the timer is running in App.js

  return (
    <div className="scoreboard">
      <header>High Scores</header>
      <p>{ sessions.length } people have completed the game.</p>
      <ul>
        { sessions.map( (session) => {
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