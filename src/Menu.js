const Menu = (props) => {
  // props
  const { pageX, pageY, imgRectangle, items, tagItem } = props;

  // filter out non-unique and found items
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const menuItems = items
    .filter( (itemObj) => ! itemObj.found) // filter out found items
    .map( (itemObj) => itemObj.name) // extract name
    .filter(onlyUnique);

  // style
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
        { menuItems.map( item => { // { str name, bool found, int minx, int miny, int maxx, int maxy }
            return (<li onClick={ () => tagItem(item) } key={ item }>{ item }</li>);
        }) }
      </ul>
    </div>
  );
}

export default Menu;