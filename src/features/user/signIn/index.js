import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SignInSignUp from '../../../layouts/signInSignUp.js';
import CustomLink from '../../../reusableComponents/CustomLink';
import { InputSubmit, InputText } from '../../../reusableComponents/Form';
import HelperText from '../../../reusableComponents/HelperText';
import LoadingSpinner from '../../../reusableComponents/LoadingSpinner';
// import { selectUser, signIn } from '../userSlice';

const SignIn = () => {
  //   const user = useSelector(selectUser);
  const user = {};
  const [signInStatus, setSignInStatus] = useState('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nameOrEmail: user?.email ?? '',
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formResponse, setFormResponse] = useState(false);

  const submit = async ({ nameOrEmail, password }) => {
    // setSignInStatus('pending');
    // try {
    //   await dispatch(signIn({ nameOrEmail, password })).unwrap();
    //   setFormResponse({ msg: 'Login Successful', type: 'success' });
    //   setTimeout(() => navigate('/'), 1000);
    // } catch (err) {
    //   setFormResponse({ msg: err, type: 'error' });
    // }
  };

  return (
    <>
      {signInStatus === 'pending' && <LoadingSpinner />}
      <SignInSignUp>
        {formResponse && <HelperText {...formResponse} />}
        <form
          className="SignInSignUp__Form inputsRounded placeholder-hidden"
          onSubmit={handleSubmit(submit)}
        >
          <InputText
            label="Name Or Email"
            name="nameOrEmail"
            type="text"
            errors={errors}
            register={register}
            rules={{
              required: 'This field is required.',
              minLength: {
                value: 2,
                message: "This field shouldn't be less than 2 characters.",
              },
            }}
          />

          <InputText
            label="Password"
            name="password"
            type="password"
            errors={errors}
            register={register}
            rules={{
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: "Password shouldn't be less than 6 characters.",
              },
            }}
          />

          <InputSubmit label="Sign In" onClick={handleSubmit(submit)} />
          <p>
            Don't have an account? <CustomLink to="/signup">Sign-up</CustomLink>
          </p>
        </form>
      </SignInSignUp>
    </>
  );
};
export default SignIn;
