import { HiInformationCircle } from 'react-icons/hi';

const HelperText = ({ msg, type = 'error', style = {} }) => {
  return (
    <>
      {msg && (
        <p className={`helperText ${type} `} style={style}>
          <HiInformationCircle className="infoIcon" /> {msg}
        </p>
      )}
    </>
  );
};

export default HelperText;
