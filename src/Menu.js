

const Menu = (props) => {
  // props
  const { pageX, pageY, items, tagItem } = props;

  const style = {
    position: 'absolute',
    left: pageX,
    top: pageY,
  }

  return (
    <div className="menu" style={style}>
      <header>Choose an item</header>
      <ul>
        { items.map( item => { // { str name, bool found, int minx, int miny, int maxx, int maxy }
            return (<li className={item.found ? 'foundItem' : 'unfoundItem'} onClick={ () => tagItem(item.name) } key={ item.name }>{ item.name }</li>);
        }) }
      </ul>
    </div>
  );
}

export default Menu;