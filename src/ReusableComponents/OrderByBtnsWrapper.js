import OrderByBtn from "./OrderByBtn";

const OrderByBtnsWrapper = ({onDueDateClick, onPriorityClick, onAlphabeticallyClick}) => {
  return (
    <div className="OrderByBtns__Wrapper">
        <p className="OrderByTitle">Order By</p>
        <OrderByBtn label="Due Date" onClick={()=>onDueDateClick()} />
        <OrderByBtn label="Priority" onClick={()=>onPriorityClick()} />
        <OrderByBtn label="Alphabetically" onClick={()=>onAlphabeticallyClick()} />
    </div>  
  )
}

export default OrderByBtnsWrapper