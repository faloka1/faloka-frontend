import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container} from 'react-bootstrap';
import { useFormik} from 'formik';
import * as Yup from 'yup';

import { ReactComponent as EmailIcon } from '../../../components/SVG/email.svg';
import { ReactComponent as PasswordIcon } from '../../../components/SVG/key.svg';

import './Login.scss';

const Login = () => {
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
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <div className="login-form">
          <Form onSubmit={formValidation.handleSubmit}>
            <h2 className="login-title">Login</h2>
            <Form.Group className="mb-3">
              <div className="inner-addon left-addon">
                <div className="icon-placeholder">
                  <EmailIcon className="icon"/>
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
                  <PasswordIcon className="icon"/>
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
              <Button variant={'primary'} type={'submit'} className={'btn-flat'}>Masuk</Button>
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