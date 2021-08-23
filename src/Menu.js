

const Menu = (props) => {
  // props
  const { pageX, pageY, imgRectangle, items, tagItem } = props;

  const style = {
    position: 'absolute',
    left: pageX,
    top: pageY,
    maxHeight: imgRectangle.bottom - pageY - 2,
    overflowY: 'auto',
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