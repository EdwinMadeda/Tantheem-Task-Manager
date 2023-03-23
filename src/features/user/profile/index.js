import Form, { InputText, InputSubmit } from '../../../reusableComponents/Form';
import UserAvatar from '../../../reusableComponents/UserAvatar';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, selectUser } from '../userSlice';
import EditBtn from '../../../reusableComponents/EditBtn';
import './profile.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Profile = () => {
  const {
    info: userInfo,
    status: { editProfile: editProfileStatus },
  } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [helperResponse, setHelperResponse] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...userInfo,
    },
  });

  const onSubmit = async ({ name, email }) => {
    try {
      await dispatch(editProfile({ name, email })).unwrap();
    } catch (err) {
      setHelperResponse({
        msg: 'Profile edit failed',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (editProfileStatus === 'pending') {
      setHelperResponse({
        msg: 'Profile edit in progress...Please wait!',
        type: 'inProgress',
      });
    } else if (editProfileStatus === 'succeeded') {
      setHelperResponse({
        msg: 'Profile edit in was a success!',
        type: 'success',
      });
    }
  }, [editProfileStatus]);

  return (
    <>
      <section className="Profile AddNewItem main">
        <Form
          className="Profile__Form User-Info"
          title="Profile"
          helperResponse={helperResponse}
        >
          <div className="User-avatar__Wrapper">
            <Link to="/profile/avatar">
              <UserAvatar
                style={{ height: '200px', width: '200px' }}
                src={userInfo?.avatar ?? null}
              />
            </Link>
            <EditBtn
              className="SinglePage__Ctrl-Btn Toggle-AvatarEditBtn"
              title="Edit Avatar"
              path="/profile/avatar"
            />
          </div>

          <InputText
            label="Username"
            name="name"
            type="text"
            errors={errors}
            register={register}
            rules={{
              required: 'Username is required.',
              minLength: {
                value: 2,
                message: "Username shouldn't be less than 2 characters.",
              },
              pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/,
                message: 'Username is Invalid',
              },
            }}
            disabled={false}
          />
          <InputText
            label="Email"
            name="email"
            type="email"
            errors={errors}
            register={register}
            rules={{
              required: 'Email is required.',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Invalid Email.',
              },
            }}
          />

          <InputSubmit label="Save" onClick={handleSubmit(onSubmit)} />
        </Form>
      </section>
    </>
  );
};

export default Profile;
