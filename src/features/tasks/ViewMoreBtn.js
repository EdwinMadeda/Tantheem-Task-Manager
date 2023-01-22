import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";

const ViewMoreBtn = ({viewMore, setViewMore}) => {

  return (
    <div className={`Tasks__ViewmoreBtn-Wrapper ${viewMore? 'viewMore':''}`}>
        <button 
            type="button" 
            className="Tasks__ViewmoreBtn"
            onClick={()=> setViewMore(!viewMore)}>

        
        <span>{`view ${!viewMore? 'more' : 'less'}`}</span>
        {viewMore? <BsChevronCompactUp /> : <BsChevronCompactDown />}
        </button>
    </div>
  )
}

export default ViewMoreBtn