import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { signInUser } from '../store/actions';
import DarkBG from './DarkBG';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required Field'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required Field'),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
  });

  const handleSignInUser = (e) => {
    e.preventDefault();
    const { email } = formik.values;
    const { password } = formik.values;
    dispatch(signInUser({ email, password }, history));
  };

  return (
    <DarkBG>
      <section className="sign-in form">
        <div className="form__container">
          <h2 className="form__heading">Sign In</h2>
          <form className="form__form" onSubmit={handleSignInUser}>
            <label className="form__label" htmlFor="email">
              <p className="form__label-text">Email<span className="form__required">*</span></p>
              <input
                className="form__label-input"
                type="text"
                name="email"
                data-lpignore={process.env.NODE_ENV === 'production' ? 'true' : false}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? formik.errors.email : null}
            </label>
            <label className="form__label" htmlFor="password">
              <p className="form__label-text">Password<span className="form__required">*</span></p>
              <input
                className="form__label-input"
                type="password"
                name="password"
                data-lpignore={process.env.NODE_ENV === 'production' ? 'true' : false}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password ? formik.errors.password : null}
            </label>
            <button type="submit" className="button form__button">Sign In</button>
          </form>
          <p>Do not have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </section>
    </DarkBG>
  );
};

export default SignIn;
