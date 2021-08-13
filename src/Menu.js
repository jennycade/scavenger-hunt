

const Menu = (props) => {
  // props
  const { pageX, pageY, items } = props;

  const style = {
    position: 'absolute',
    left: pageX,
    top: pageY,
  }

  return (
    <div className="menu" style={style}>
      <header>Choose an item</header>
      <ul>
        { items.map( item => { // { str name, bool found, locus: { minx, miny, maxx, maxy } }
            return (<li key={ item.name }>{ item.name }</li>);
        }) }
      </ul>
    </div>
  );
}

export default Menu;