const ItemBorder = ( props ) => {
  // destructure props
  const { item, imgRectangle } = props;

  // ahhhhh geometry
  const itemWidth = item.maxx - item.minx;
  const itemHeight = item.maxy - item.miny;

  const imgWidth = imgRectangle.right - imgRectangle.left;
  const imgHeight = imgRectangle.bottom - imgRectangle.top;

  const scale = itemWidth / imgWidth; // TODO: Make this state variable to work with resizing?
  const xoffset = imgRectangle.left;
  const yoffset = imgRectangle.top;

  // style
  const style = {
    position: 'absolute',
    border: '1px solid red',
    top: item.miny * scale + yoffset,
    left: item.minx * scale + xoffset,
    height: (item.maxy - item.miny) * scale,
    width: (item.maxx - item.minx) * scale,
  }

  return (
    <div style={ style } className="itemBorder">{ item.name }</div>
  );
}

export default ItemBorder;