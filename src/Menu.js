import { useState, useLayoutEffect, useRef } from "react";

const Menu = (props) => {
  // props
  const { pageX, pageY, imgRectangle, items, tagItem } = props;

  // state
  const [anchor, setAnchor] = useState('click');

  // ref
  const menuDiv = useRef(null);

  // constants
  const pointerHeight = 10;

  // Set positioning (based on click or image top?)
  useLayoutEffect( () => {
    if (menuDiv) {
      // get a handle on the height
      const menuHeight = menuDiv.current.getBoundingClientRect().height;
  
      if (pageY + menuHeight > imgRectangle.bottom) {
        setAnchor('bottom');
      } else {
        setAnchor('click');
      }

      // TODO: Set pointY
    }
    
  }, [setAnchor, pageY, imgRectangle.bottom]);

  const makeStyle = () => {
    const style = {
      position: 'absolute',
      left: pageX + pointerHeight - 1,
      maxHeight: '50%',
      overflowY: 'auto',
    }
    if (anchor === 'click') {
      style.top = pageY - pointerHeight;
    } else {
      style.bottom = 0;
    }
    return style;
  }

  const makePointerStyle = () => {
    const style = {
      position: 'absolute',
      left: pageX,
      top: pageY - pointerHeight / 2,
    }
    return style;
  }

  // filter out non-unique and found items (from https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates)
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const menuItems = items
    .filter( (itemObj) => ! itemObj.found) // filter out found items
    .map( (itemObj) => itemObj.name) // extract name
    .filter(onlyUnique);

  return (
    <div className="menuContainer">
      <div className="menuPointer" style={ makePointerStyle() }></div>

      <div ref={ menuDiv } className="menu" style={ makeStyle() }>
        <header>Choose an item</header>
        <ul>
          { menuItems.map( item => { // { str name, bool found, int minx, int miny, int maxx, int maxy }
              return (<li onClick={ (event) => tagItem(item, event.timeStamp) } key={ item }>{ item }</li>);
          }) }
        </ul>
      </div>
    </div>
  );
}

export default Menu;