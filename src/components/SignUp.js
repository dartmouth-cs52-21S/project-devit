import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { signUpUser } from '../store/actions';
import DarkBG from './DarkBG';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required Field'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required Field'),
  confirmedPassword: Yup.string().oneOf([Yup.ref('password')], 'Password\'s must match').required('Required Field'),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmedPassword: '',
    },
    validationSchema,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignUpUser = (e) => {
    e.preventDefault();
    const { email } = formik.values;
    const { password } = formik.values;
    dispatch(signUpUser({ email, password }, history));
    history.push('/onboarding');
  };

  return (
    <DarkBG>
      <section className="sign-in form">
        <div className="form__container">
          <h2 className="form__heading">Sign Up</h2>
          <form className="form__form" onSubmit={handleSignUpUser}>
            <label className="form__label" htmlFor="email">
              <p className="form__label-text">Email<span className="form__required">*</span></p>
              <input className="form__label-input"
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
              <input className="form__label-input"
                type="password"
                name="password"
                data-lpignore={process.env.NODE_ENV === 'production' ? 'true' : false}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password ? formik.errors.password : null}
            </label>
            <label className="form__label" htmlFor="password">
              <p className="form__label-text">Confirm Password<span className="form__required">*</span></p>
              <input className="form__label-input"
                type="password"
                name="confirmedPassword"
                data-lpignore={process.env.NODE_ENV === 'production' ? 'true' : false}
                value={formik.values.confirmedPassword}
                onChange={formik.handleChange}
              />
              {formik.errors.confirmedPassword ? formik.errors.confirmedPassword : null}
            </label>
            <button type="submit" className="button form__button" disabled={!(formik.isValid && formik.dirty)}>Sign Up</button>
          </form>
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        </div>
      </section>
    </DarkBG>
  );
};

export default SignUp;
