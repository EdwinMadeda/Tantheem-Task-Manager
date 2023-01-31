import React from "react";

const OrderByBtn = ({ label, onClick, className = "" }) => {
  return (
    <button
      type="button"
      className={`orderByBtn btn ${className}`}
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
};

export default OrderByBtn;
