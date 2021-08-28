import ProgressBar from './ProgressBar';

import formatTime from './formatTime';

const Sidebar = ( props ) => {
  const { time, items, setDisplay, playing } = props;

  // FORMAT TIME

  const numFoundItems = items.filter(item => item.found).length;
  const numTotalItems = items.length;

  return (
    <div className="sidebar">
      <div className="info">
        <p>Time: { formatTime(time, 's') }</p>
        <p>Items found: { numFoundItems } / { numTotalItems }</p>
        <p>{ !playing && <button onClick={ () => setDisplay('scores') } >High Scores</button> }</p>
        { props.children }
      </div>
      <ProgressBar numerator={ numFoundItems } denominator={ numTotalItems } />
      <div className="itemList">
        <ul>
        { items.map( item => { // { str name, bool found, int minx, int miny, int maxx, int maxy }
            return (<li className={item.found ? 'foundItem' : 'unfoundItem'} key={ item.id }>{ item.name }</li>);
        }) }
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;