import { nanoid } from '@reduxjs/toolkit';

const CheckBox = ({ checked, onChange = false }) => {
  const id = nanoid();

  return (
    <label htmlFor={`checkbox${id}`} className="checkBox__label">
      <input
        type="checkbox"
        id={`checkbox${id}`}
        defaultChecked={checked}
        onChange={() => onChange(!checked)}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBox;
