import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SignInSignUp from '../../../layouts/signInSignUp.js';
import CustomLink from '../../../reusableComponents/CustomLink';
import { InputSubmit, InputText } from '../../../reusableComponents/Form';
import HelperText from '../../../reusableComponents/HelperText';
import { useDispatch, useSelector } from 'react-redux';
// import { signUp } from '../userSlice';
import LoadingSpinner from '../../../reusableComponents/LoadingSpinner';
import { useNavigate } from 'react-router';
import { selectUser, signUp } from '../userSlice.js';

const SignUp = () => {
  const { status: signUpStatus } = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formResponse, setFormResponse] = useState(false);

  const submit = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      setFormResponse({ msg: "Passwords don't match", type: 'error' });
      return;
    }

    try {
      await dispatch(
        signUp({
          name,
          email,
          password,
        })
      ).unwrap();
      setFormResponse({ msg: 'Sign Up Successful', type: 'success' });
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      setFormResponse({ msg: err, type: 'error' });
    }
  };

  return (
    <>
      {signUpStatus === 'pending' && <LoadingSpinner />}
      <SignInSignUp>
        <form className="SignInSignUp__Form inputsRounded placeholder-hidden">
          <HelperText {...formResponse} shortAlert={false} />
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
          <InputText
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            errors={errors}
            register={register}
            rules={{
              required: 'Confirm Password is required.',
              minLength: {
                value: 6,
                message:
                  "Confirm Password shouldn't be less than 6 characters.",
              },
            }}
          />
          <InputSubmit label="Join Us" onClick={handleSubmit(submit)} />
          <p>
            Already have an account?{' '}
            <CustomLink to="/signin">Sign-in</CustomLink>
          </p>
        </form>
      </SignInSignUp>
    </>
  );
};
export default SignUp;
