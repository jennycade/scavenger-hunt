const ProgressBar = ( props ) => {
  const { numerator, denominator } = props;

  const outerStyle={
    width: '100%',
  };

  const innerStyle={
    width: `${numerator / denominator * 100}%`,
    backgroundColor: 'green',
  };

  return (
    <div className="progressBar outer" style={ outerStyle }>
      <div className="progressBar inner" style={ innerStyle }>
        &nbsp;
      </div>
    </div>
  );
}

export default ProgressBar;