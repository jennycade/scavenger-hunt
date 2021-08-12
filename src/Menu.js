

const Menu = (props) => {
  // props
  const { pageX, pageY } = props;

  const style = {
    position: 'absolute',
    left: pageX,
    top: pageY,
  }

  return (
    <div className="menu" style={style}>
      Oh, hi! x: { pageX }, y: { pageY }
    </div>
  );
}

export default Menu;