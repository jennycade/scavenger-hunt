const ItemBorder = ( props ) => {
  // destructure props
  const { item, imgRectangle, dim, captureImgClick, visible } = props;

  // ahhhhh geometry
  const imgWidth = imgRectangle.right - imgRectangle.left;
  const imgHeight = imgRectangle.bottom - imgRectangle.top;

  const xscale = imgWidth / dim.width;
  const yscale = imgHeight / dim.height;
  const xoffset = imgRectangle.left;
  const yoffset = imgRectangle.top;

  // style
  const style = {
    position: 'absolute',
    top: item.miny * yscale + yoffset,
    left: item.minx * xscale + xoffset,
    height: (item.maxy - item.miny) * yscale,
    width: (item.maxx - item.minx) * xscale,
  }

  return (
    <div style={ style } className={ visible ? "itemBorder" : 'hidden' } onClick={ captureImgClick }><label>{ item.name }</label></div>
  );
}

export default ItemBorder;