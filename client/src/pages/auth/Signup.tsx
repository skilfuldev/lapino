import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Button from 'components/UI/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from 'utils/formValidation';
import { Link } from 'react-router-dom';
import { LOGIN } from 'utils/routes';
import { IAccountCredentiels } from 'types/types';
import { signUpStart } from 'app/slices/authSlice';
import { useDispatch } from 'react-redux';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data: IAccountCredentiels) => {
    dispatch(signUpStart(data));
  };

  return (
    <section className="py-10">
      <h1 className="text-center text-3xl font-main font-bold mb-4">Create An Acoount</h1>
      <div className=" max-w-lg mx-auto bg-white p-4 shadow-md rounded">
        <form className="p-4 mb-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-sm text-primaryDark font-secondary mb-1">Full Name</label>
            <input
              className="w-full px-5 py-2 focus:outline-none focus:border-primaryDark border text-gray-700 bg-gray-200 rounded"
              type="text"
              placeholder="Your fullName"
              aria-label="full name"
              {...register('fullName')}
            />
            <div className="mt-1">
              <span className="text-red-600">{errors?.fullName?.message}</span>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm text-primaryDark font-secondary mb-1">Email</label>
            <input
              className="w-full px-5 py-2 focus:outline-none focus:border-primaryDark border text-gray-700 bg-gray-200 rounded"
              type="email"
              placeholder="Your Email"
              aria-label="Email"
              {...register('email')}
            />
            <div className="mt-1">
              <span className="text-red-600">{errors?.email?.message}</span>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm text-primaryDark font-secondary mb-1">Password</label>
            <div className="relative">
              <input
                className="w-full px-5 py-2 focus:outline-none focus:border-primaryDark border text-gray-700 bg-gray-200 rounded"
                type={showPassword ? 'text' : 'password'}
                placeholder="Your Password"
                aria-label="Password"
                {...register('password')}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer top-1/2 flex items-center justify-center right-2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOutlined className="contents text-xl" />
                ) : (
                  <EyeInvisibleOutlined className="contents text-xl" />
                )}
              </div>
            </div>
            <div className="mt-1">
              <span className="text-red-600">{errors?.password?.message}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <Button theme="btn-large">Create Account</Button>
          </div>
        </form>
        <p className="font-secondary px-4 text-base  font-semibold">
          Already have an acoount ?{' '}
          <Link to={LOGIN} className="underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
