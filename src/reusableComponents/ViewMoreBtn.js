import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";

const ViewMoreBtn = ({ viewMore, setViewMore, itemsCount = false }) => {
  const isHidden = itemsCount && itemsCount <= 1;

  return (
    <div
      className={`ViewmoreBtn-Wrapper ${viewMore ? "viewMore" : ""} ${
        isHidden ? "hidden" : ""
      }`}
    >
      <button
        type="button"
        className={`ViewmoreBtn`}
        onClick={() => setViewMore(!viewMore)}
      >
        <span>{`view ${!viewMore ? "more" : "less"}`}</span>
        {viewMore ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
      </button>
    </div>
  );
};

export default ViewMoreBtn;
