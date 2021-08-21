const ScavengerHuntImage = ( props ) => {
  const { onClick, src, alt } = props;

  return (
    <img onClick={ onClick } className="scavengerhunt" src={ src } alt={ alt } />
  );

}

export default ScavengerHuntImage;