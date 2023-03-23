import { useEffect, useState } from 'react';
import Form, { InputSubmit } from '../../../reusableComponents/Form';
import UserAvatar, {
  AvatarSelector,
} from '../../../reusableComponents/UserAvatar';
import { BsUpload } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setCacheUserImg, uploadUserAvatar } from '../userSlice';
import LoadingSpinner from '../../../reusableComponents/LoadingSpinner';

const Avatar = () => {
  const {
    info: userInfo,
    status: { uploadUserAvatar: uploadStatus },
    cacheUserImg,
  } = useSelector(selectUser);
  const [helperResponse, setHelperResponse] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();

  const onClose = () => {
    setPreview(null);
    dispatch(setCacheUserImg(null));
  };

  const onCrop = async (pv) => {
    setPreview(pv);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 5000000) {
      setHelperResponse({ msg: 'File is too big', type: 'error' });
      elem.target.value = '';
    }
  };

  const onFileLoad = (file) => {
    dispatch(setCacheUserImg(URL.createObjectURL(file)));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(uploadUserAvatar(preview)).unwrap();
    } catch (err) {
      setHelperResponse({
        msg: err,
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (uploadStatus === 'pending') {
      setHelperResponse({
        msg: 'Upload in progress. Please wait!',
        type: 'inProgress',
      });
    }
    if (uploadStatus === 'succeeded') {
      setHelperResponse({
        msg: 'Upload was a success!',
        type: 'success',
      });
    }
  }, [dispatch, uploadStatus]);

  return (
    <>
      {uploadStatus === 'pending' && <LoadingSpinner />}
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
            label={
              uploadStatus === 'pending'
                ? 'Uploading...'
                : 'Choose an image to upload'
            }
          />
          <div className="UserAvatar__Wrappper">
            <UserAvatar
              src={preview ?? userInfo?.avatar ?? null}
              width={200}
              height={200}
            />
            {preview && (
              <InputSubmit
                label="Save"
                onClick={onSubmit}
                Icon={<BsUpload />}
              />
            )}
          </div>
        </Form>
      </section>
    </>
  );
};
export default Avatar;
