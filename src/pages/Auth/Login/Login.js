import React, { useState, useEffect } from 'react';
import { Link, useHistory, Prompt } from 'react-router-dom';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import './Login.scss';

import { ReactComponent as EmailIcon } from '../../../components/SVG/email.svg';
import { ReactComponent as PasswordIcon } from '../../../components/SVG/key.svg';
import { login } from '../../../stores/auth/auth-actions';
import axios from 'axios';

const loginURL = "http://192.168.100.7:8000/api/auth/login";

const Login = () => {
  const [formIsFilled, setFormIsFilled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const loginMutation = useMutation(async loginData => {
    try {
      const response = await axios.post(
        loginURL,
        loginData,
        {
          timeout: 5000,
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        setErrorMessage('Login gagal. Pastikan email dan password benar!');
        throw new Error(JSON.stringify(error.response.data));
      } else {
        setErrorMessage('Terjadi kesalahan! Silakan coba sesaat lagi.');
        throw new Error();
      }
    }
  }, {
    onSuccess: (result, variables, context) => {
      dispatch(login(result.access_token, result.expires_in));
      setIsSuccess(true);

      history.replace('/');
    },
    onError: (error, variables, context) => {
      console.log(error);
    },
  });

  const formValidation = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address.').required('Email required.'),
      password: Yup.string().required('Password required.')
    }),
    onSubmit: values => {
      const loginData = values;
      loginMutation.mutate(loginData);
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
        <div className="login-form">
          <Form onSubmit={formValidation.handleSubmit}>
            <h2 className="login-title">Login</h2>
            <Form.Group className="mb-3">
              <div className="inner-addon left-addon">
                <div className="icon-placeholder">
                  <EmailIcon className="icon" />
                </div>
                <Form.Control id="email" name="email" type="email" placeholder="Masukan Email"
                  onChange={formValidation.handleChange}
                  onBlur={formValidation.handleBlur}
                  value={formValidation.values.email}
                  className={`${formValidation.touched.email &&
                    formValidation.errors.email ? ("login-error") : ``}`}
                />
              </div>
              {formValidation.touched.email && formValidation.errors.email ? (
                <small className="login-error">{formValidation.errors.email}</small>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-2">
              <div className="inner-addon left-addon">
                <div className="icon-placeholder">
                  <PasswordIcon className="icon" />
                </div>
                <Form.Control id="password" name="password" type="password" placeholder="Masukan Password"
                  onChange={formValidation.handleChange}
                  onBlur={formValidation.handleBlur}
                  value={formValidation.values.password}
                  className={`${formValidation.touched.password &&
                    formValidation.errors.password ? ("login-error") : ``}`}
                />
              </div>
              {formValidation.touched.password && formValidation.errors.password ? (
                <small className="login-error">{formValidation.errors.password}</small>
              ) : null}
            </Form.Group>
            <Form.Text className="login-forgot">
              <Link to="/forgot">Lupa Password?</Link>
            </Form.Text>
            <div className="d-grid mt-5">
              <Button
                variant={'primary'}
                type={'submit'}
                className={'btn-flat'}
                disabled={loginMutation.isLoading}>
                {loginMutation.isLoading
                  ? (<Spinner animation="border" role="status" className="login-loading">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>)
                  : 'Masuk'}
              </Button>
              {loginMutation.isError && <small className="login-error text-center">{errorMessage}</small>}
            </div>
          </Form>
          <div className="form-footer">
            Belum punya akun? <Link to="/register">Daftar</Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;