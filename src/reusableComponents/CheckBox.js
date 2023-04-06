import { nanoid } from '@reduxjs/toolkit';

const CheckBox = ({ id = null, name, value, checked, onChange, disabled }) => {
  const checkId = id ?? `checkbox${nanoid()}`;

  return (
    <label htmlFor={checkId} className="checkBox__label">
      <input
        type="checkbox"
        id={checkId}
        name={name}
        defaultChecked={checked}
        onChange={() => {
          onChange(!checked);
        }}
        value={value}
        disabled={disabled}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBox;
