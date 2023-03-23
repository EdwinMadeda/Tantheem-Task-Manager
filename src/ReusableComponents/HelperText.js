import { HiInformationCircle } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import { useState } from 'react';

const HelperText = ({ msg, type = 'error', style = {} }) => {
  const [visible, setVisible] = useState(Boolean(msg));
  return (
    <>
      {visible && (
        <p className={`helperText ${type} `} style={style}>
          <HiInformationCircle className="infoIcon" /> {msg}
          {type !== 'inProgress' && (
            <CgClose
              className="closeIcon"
              onClick={() => {
                setVisible(false);
              }}
            />
          )}
        </p>
      )}
    </>
  );
};

export default HelperText;
