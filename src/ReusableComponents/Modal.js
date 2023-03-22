import { useState, useRef } from 'react';
import useTargetAction from '../customHooks/useTargetAction';

const Modal = ({ options, className, children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const ref = useRef(null);

  useTargetAction(setModalVisible, ref, 'click');

  const onOptionClick = (value, callback) => {
    setModalVisible(false);
    callback(value);
  };

  const Options = () => {
    return (
      <>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => onOptionClick(option.item, option.onClick)}
            className="modal__Option"
          >
            <p className="modal__Option__Item">{option.item}</p>
          </li>
        ))}
      </>
    );
  };

  return (
    <div className={`modal ${className}`} ref={ref}>
      <div
        className="modal__Target"
        onClick={() => setModalVisible(!modalVisible)}
      >
        {children}
        {modalVisible && (
          <ul
            className="modal__Content"
            style={{
              display: `${options.length === 0 ? 'none' : 'block'}`,
            }}
          >
            <Options />
          </ul>
        )}
      </div>
    </div>
  );
};

export default Modal;
