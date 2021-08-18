const Scoreboard = ( props ) => {
  const { sessions, sessionID } = props;
  // scores should be an array of all scores, ordered by ms ascending
  // arr scores = [ { id, startTime, endTime, totalms, userName }, ... ]

  // TODO: sessions.map() displays nothing. Start here next time!

  console.table(sessions);

  return (
    <div className="scoreboard">
      <header>High Scores</header>
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