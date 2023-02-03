import React from "react";

const NoItemsMsg = ({ customMsg = false }) => {
  return (
    <p className="no-Items-msg">
      {customMsg ? customMsg : "No Items on display"}
    </p>
  );
};

export default NoItemsMsg;
