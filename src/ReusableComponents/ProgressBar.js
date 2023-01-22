const ProgressBar = ({completeItems, totalItems}) => {
  const percentage = (completeItems / totalItems) * 100;

  return (
    <div className="Progress-bar__Wrapper">
        <p className="Progress-bar__Bar">
            <span className="Progress-bar__Indicator" style={{width: `${percentage}%`}}></span>
        </p>
        <p className="Progress-bar__Value">{completeItems}/{totalItems}</p>
    </div>
  )
}

export default ProgressBar