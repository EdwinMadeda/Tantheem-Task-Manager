import { useState } from 'react';
import Form, { InputSubmit } from '../../../reusableComponents/Form';
import UserAvatar, {
  AvatarSelector,
} from '../../../reusableComponents/UserAvatar';
import { BsUpload } from 'react-icons/bs';

const Avatar = () => {
  const [helperResponse, setHelperResponse] = useState(null);
  const [preview, setPreview] = useState(null);
  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (pv) => {
    setPreview(pv);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 5000000) {
      setHelperResponse({ msg: 'File is too big', type: 'error' });
      elem.target.value = '';
    }
  };

  const onFileLoad = (file) => {
    // console.log(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="SinglePage AddNewItem Profile main">
      <Form
        className="Profile__Form User-Avatar"
        title="Avatar"
        helperResponse={helperResponse}
      >
        <AvatarSelector
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          onFileLoad={onFileLoad}
          label="Choose an image to upload"
          onImageLoad={(file) => console.log(file)}
        />
        <div className="UserAvatar__Wrappper">
          <UserAvatar src={preview} width={200} height={200} />
          <InputSubmit label="Save" onClick={onSubmit} Icon={<BsUpload />} />
        </div>
      </Form>
    </section>
  );
};
export default Avatar;
