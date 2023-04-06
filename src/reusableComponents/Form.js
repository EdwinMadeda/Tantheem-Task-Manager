import Bell from './Bell';
import BackBtn from './BackBtn';
import HelperText from './HelperText';
import CheckBox from './CheckBox';

const Form = (props) => {
  const formTitles = {
    View: 'View',
    Edit: 'Edit ',
    Add: 'Add New ',
  };

  return (
    <form
      className={`form ${props.className}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="Form__TopContainer">
        <BackBtn onClick={props?.onBackBtnClick ?? false} />
        <h2 className="form-title">
          <p className="form-title__Text">
            {(formTitles[props.mode] ?? '') + props.title}
          </p>
        </h2>
      </div>
      {props.helperResponse && (
        <HelperText
          {...props.helperResponse}
          style={{ margin: '8px', justifyContent: 'center' }}
        />
      )}
      {props.children}
    </form>
  );
};

export const InputText = ({
  label,
  name,
  type = 'text',
  errors = {},
  register = () => ({}),
  rules,
  disabled = false,
}) => {
  return (
    <div className="form-control">
      {errors[name] && <HelperText msg={errors[name]?.message} type="error" />}

      <input
        type={type}
        id={name}
        name={name}
        className={`${Boolean(errors[name]) ? 'error' : ''}`}
        {...register(name, rules)}
        disabled={disabled}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export const InputTextArea = ({
  label,
  name,
  errors = {},
  register = () => ({}),
  rules,
  disabled = false,
  value,
}) => {
  return (
    <div className="form-control">
      <HelperText msg={errors[name]?.message || false} />
      <textarea
        name={name}
        id={name}
        cols="30"
        rows="5"
        {...register(name, rules)}
        defaultValue={value}
        disabled={disabled}
        className={`${Boolean(errors[name]) ? 'error' : ''}`}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export const InputDate = ({
  label,
  name,
  errors = {},
  register = () => ({}),
  rules,
  disabled = false,
}) => {
  return (
    <div className="form-control">
      <HelperText msg={errors[name]?.message || false} />
      <input
        type="date"
        id={name}
        name={name}
        className={`${Boolean(errors[name]) ? 'error' : ''}`}
        disabled={disabled}
        {...register(name, rules)}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export const InputSelect = ({
  label,
  id,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="form-control-check">
      <label htmlFor={id}>{label}</label>
      <select id={id}>
        <option>1</option>
        <option>1</option>
        <option>1</option>
        <option>1</option>
        <option>1</option>
      </select>
    </div>
  );
};

export const InputCheckBox = ({
  id,
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="form-control-check">
      <CheckBox
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(checked) => onChange({ checked, value })}
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export const InputBell = ({ label, value, onChange, disabled = false }) => {
  return (
    <div className="form-control-check ">
      <p className="label__title">{label}</p>
      <Bell
        status={value}
        onClick={(inputVal) => onChange(inputVal)}
        disabled={disabled}
      />
      <p style={{ marginLeft: '6px' }}>{value ? 'ON' : 'OFF'}</p>
    </div>
  );
};

export const InputRadio = ({
  label,
  name,
  options = [],
  defaultValue,
  onChange,
  disabled = false,
}) => {
  const RadioContainer = ({ option }) => {
    return (
      <div className="radio__container">
        <label
          htmlFor={`${name}${option?.name}`}
          className={`checkBox__label ${disabled ? 'disabled' : ''}`}
        >
          <input
            type="radio"
            name={name}
            id={`${name}${option?.name}`}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />

          <span className="checkmark"></span>
        </label>

        <label className={`radio__label ${disabled ? 'disabled' : ''}`}>
          {option?.name}
        </label>
      </div>
    );
  };

  return (
    <div className=" form-control">
      <div className="radioBtns__wrapper">
        {options.map((option, index) => (
          <RadioContainer key={index} option={option} />
        ))}
      </div>
      <p className={`label__title`}>{label}</p>
    </div>
  );
};

export const InputSubmit = ({ label, onClick, disabled = false, Icon }) => {
  return (
    <div className="form-control submit-btn__Wrapper">
      {!disabled && (
        <>
          <button className="btn submit-btn" type="button" onClick={onClick}>
            {Icon}
            {label}
          </button>
        </>
      )}
    </div>
  );
};

export default Form;
