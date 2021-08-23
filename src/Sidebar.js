const Sidebar = ( props ) => {
  const { time, items, setDisplay } = props;

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

  return (
    <div className="sidebar">
      <div className="info">
        <p>Time: { formatTime(time) }</p>
        <p>Items found: { items.filter(item => item.found).length } / { items.length }</p>
        <p><button onClick={ () => setDisplay('scores') } >High Scores</button></p>
      </div>
      <div className="itemList">
        <header>Items to find</header>
        <ul>
        { items.map( item => { // { str name, bool found, int minx, int miny, int maxx, int maxy }
            return (<li className={item.found ? 'foundItem' : 'unfoundItem'} key={ item.name }>{ item.name }</li>);
        }) }
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;