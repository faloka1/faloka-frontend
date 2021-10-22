import React, { useState, useEffect } from 'react';
import { Link, useHistory, Prompt } from 'react-router-dom';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import './Register.scss';

import { ReactComponent as UserIcon } from '../../../components/SVG/user.svg';
import { ReactComponent as GenderIcon } from '../../../components/SVG/gender.svg';
import { ReactComponent as EmailIcon } from '../../../components/SVG/email.svg';
import { ReactComponent as PasswordIcon } from '../../../components/SVG/key.svg';

const Register = () => {
  const [formIsFilled, setFormIsFilled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  // const registerMutation = useMutation(async registerData => {
  //   try {
  //     await dispatch(register(registerData));

  //     setIsSuccess(true);
  //     history.replace('/');
  //   } catch (error) {
  //     if (error.response) {
  //       setErrorMessage('Register gagal. Pastikan email dan password benar!');
  //       throw new Error(JSON.stringify(error.response.data));
  //     } else {
  //       setErrorMessage('Terjadi kesalahan! Silakan coba sesaat lagi.');
  //       throw new Error();
  //     }
  //   }
  // }, {
  //   onError: (error, variables, context) => {
  //     console.log(error);
  //   },
  // });

  const formValidation = useFormik({
    initialValues: {
      name: '',
      email: '',
      gender: '',
      password: '',
      repassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name required.'),
      email: Yup.string().email('Invalid email address.').required('Email required.'),
      gender: Yup.string().oneOf(['L', 'P'], 'Select valid gender.').required('Gender required.'),
      password: Yup.string().min(6, "Password must be 6 characters long.").required('Password required.'),
      repassword: Yup.string().test('passwords-match', 'Passwords must match.', function(value){
        return this.parent.password === value
      }).required('Password Confirmation required.')
    }),
    onSubmit: values => {
      // registerMutation.mutate(values);
    },
  });

  useEffect(() => {
    if (!isInitial && !formIsFilled) {
      setFormIsFilled(true);
    }
  }, [formValidation.values.email, formValidation.values.password]);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return (
    <>
      <Prompt
        when={formIsFilled && !isSuccess}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      <Container className="d-flex align-items-center justify-content-center">
        <div className="register-form">
          <Form onSubmit={formValidation.handleSubmit}>
            <h2 className="register-title">Daftar</h2>
            <Form.Group className="mb-3">
              <div className="inner-addon left-addon">
              <div className="icon-placeholder">
                  <UserIcon className="icon" />
              </div>
              <Form.Control id="name" name="name" type="text" placeholder="Nama" required
                  onChange={formValidation.handleChange}
                  onBlur={formValidation.handleBlur}
                  value={formValidation.values.name}
                  className={`${formValidation.touched.name &&
                  formValidation.errors.name ? ("register-error") : ``}`}
              />
              </div>
              {formValidation.touched.name && formValidation.errors.name ? (
              <small className="register-error">{formValidation.errors.name}</small>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="inner-addon left-addon">
                <div className="icon-placeholder">
                  <EmailIcon className="icon" />
                </div>
                <Form.Control id="email" name="email" type="email" placeholder="Email" required
                  onChange={formValidation.handleChange}
                  onBlur={formValidation.handleBlur}
                  value={formValidation.values.email}
                  className={`${formValidation.touched.email &&
                    formValidation.errors.email ? ("register-error") : ``}`}
                />
              </div>
              {formValidation.touched.email && formValidation.errors.email ? (
                <small className="register-error">{formValidation.errors.email}</small>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="inner-addon left-addon">
                <div className="icon-placeholder">
                  <GenderIcon className="icon" />
                </div>
                <Form.Select 
                  id="gender" name="gender" required
                  onChange={formValidation.handleChange}
                  onBlur={formValidation.handleBlur}
                  value={formValidation.values.gender}
                  className={`${formValidation.touched.gender &&
                    formValidation.errors.gender ? ("register-error") : ``}`}>
                    <option value="" disabled selected hidden>Jenis Kelamin</option>
                    <option value="L">Laki-Laki</option>
                    <option value="P">Perempuan</option>
                </Form.Select>
              </div>
              {formValidation.touched.gender && formValidation.errors.gender ? (
                <small className="register-error">{formValidation.errors.gender}</small>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="inner-addon left-addon">
                <div className="icon-placeholder">
                  <PasswordIcon className="icon" />
                </div>
                <Form.Control id="password" name="password" type="password" placeholder="Password" required
                  onChange={formValidation.handleChange}
                  onBlur={formValidation.handleBlur}
                  value={formValidation.values.password}
                  className={`${formValidation.touched.password &&
                    formValidation.errors.password ? ("register-error") : ``}`}
                />
              </div>
              {formValidation.touched.password && formValidation.errors.password ? (
                <small className="register-error">{formValidation.errors.password}</small>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="inner-addon left-addon">
                <div className="icon-placeholder">
                  <PasswordIcon className="icon" />
                </div>
                <Form.Control id="repassword" name="repassword" type="password" placeholder="Konfirmasi Password" required
                  onChange={formValidation.handleChange}
                  onBlur={formValidation.handleBlur}
                  value={formValidation.values.repassword}
                  className={`${formValidation.touched.repassword &&
                    formValidation.errors.repassword ? ("register-error") : ``}`}
                />
              </div>
              {formValidation.touched.repassword && formValidation.errors.repassword ? (
                <small className="register-error">{formValidation.errors.repassword}</small>
              ) : null}
            </Form.Group>
            <div className="d-grid mt-5">
              <Button
                variant={'primary'}
                type={'submit'}
                className={'btn-flat'}
                // disabled={registerMutation.isLoading}
                >
                {/* {registerMutation.isLoading
                  ? (<Spinner animation="border" role="status" className="register-loading">
              k      <span className="visually-hidden">Loading...</span>
                  </Spinner>)
                  : 'Masuk'} */}
                  Daftar
              </Button>
              {/* {registerMutation.isError && <small className="register-error text-center">{errorMessage}</small>} */}
            </div>
          </Form>
          <div className="form-footer">
            Sudah punya akun? <Link to="/login">Login</Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;