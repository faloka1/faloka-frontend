import React, { useState, useEffect } from 'react';
import { Link, useHistory, Prompt } from 'react-router-dom';
import { Form, Button, Container, Spinner, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import "yup-phone";

import './Register.scss';

import postRegisterData from '../../../helpers/api/post-register-data';

import { ReactComponent as UserIcon } from '../../../components/SVG/user.svg';
import { ReactComponent as GenderIcon } from '../../../components/SVG/gender.svg';
import { ReactComponent as EmailIcon } from '../../../components/SVG/email.svg';
import { ReactComponent as PhoneIcon } from '../../../components/SVG/phone.svg';
import { ReactComponent as PasswordIcon } from '../../../components/SVG/key.svg';

const Register = () => {
  const [formIsFilled, setFormIsFilled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const registerMutation = useMutation(async registerData => {
    const response = await postRegisterData(registerData);
    
    if (response.data.message){
      setIsSuccess(true);
    }

    return response.data;
  }, {
      onSuccess: data => {
        Swal.fire({   
          icon: 'success',  
          text: data.message,  
          showConfirmButton: false,  
          backdrop : true,
          timer: 2500  
        }).then(function (result) {
          if (true) {
            history.replace('/login');
          }
        }); 
      },
      onError: error => {
        if (error.response.data.error) {
          setErrorMessage(Object.values(error.response.data.error)[0][0]);
        } else {
          setErrorMessage('Terjadi kesalahan! Silakan coba sesaat lagi.');
        }
      }
  });
  
  const formValidation = useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        gender: ''
      },
      validationSchema: Yup.object({
        name: Yup.string().required('Name required.'),
        email: Yup.string().email('Invalid email address.').required('Email required.'),
        password: Yup.string().min(6, "Password must be 6 characters long.").required('Password required.'),
        password_confirmation: Yup.string().test('passwords-match', 'Passwords must match.', function(value){
            return this.parent.password === value
        }).required('Password Confirmation required.'),
        phone_number: Yup.string().phone('ID', false, 'Phone number is invalid').required('Phone number required.'),
        gender: Yup.string().oneOf(['L', 'P'], 'Select valid gender.').required('Gender required.')
      }),
      onSubmit: values => {
        registerMutation.mutate(values);
      },
  });

  useEffect(() => {
      if (!isInitial && !formIsFilled) {
        setFormIsFilled(true);
      }
  }, [formValidation.values.name, formValidation.values.email, formValidation.values.password, formValidation.values.password_confirmation, formValidation.values.phone_number, formValidation.values.gender]);

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
                {registerMutation.isError && <Alert variant="danger">{errorMessage}</Alert>}
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
                    <GenderIcon className="icon" />
                    </div>
                    <Form.Select 
                    id="gender" name="gender" required
                    onChange={formValidation.handleChange}
                    onBlur={formValidation.handleBlur}
                    value={formValidation.values.gender}
                    className={`${formValidation.touched.gender &&
                        formValidation.errors.gender ? ("register-error") : ``}`}>
                        <option value="" disabled defaultValue hidden>Jenis Kelamin</option>
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
                    <PhoneIcon className="icon" />
                    </div>
                    <Form.Control id="phone_number" name="phone_number" type="text" placeholder="Nomor Telepon" required
                    onChange={formValidation.handleChange}
                    onBlur={formValidation.handleBlur}
                    value={formValidation.values.phone_number}
                    className={`${formValidation.touched.phone_number &&
                        formValidation.errors.phone_number ? ("register-error") : ``}`}
                    />
                </div>
                {formValidation.touched.phone_number && formValidation.errors.phone_number ? (
                    <small className="register-error">{formValidation.errors.phone_number}</small>
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
                    <Form.Control id="password_confirmation" name="password_confirmation" type="password" placeholder="Konfirmasi Password" required
                    onChange={formValidation.handleChange}
                    onBlur={formValidation.handleBlur}
                    value={formValidation.values.password_confirmation}
                    className={`${formValidation.touched.password_confirmation &&
                        formValidation.errors.password_confirmation ? ("register-error") : ``}`}
                    />
                </div>
                {formValidation.touched.password_confirmation && formValidation.errors.password_confirmation ? (
                    <small className="register-error">{formValidation.errors.password_confirmation}</small>
                ) : null}
                </Form.Group>
                <div className="d-grid mt-5">
                <Button
                    variant={'primary'}
                    type={'submit'}
                    className={'btn-flat'}
                    disabled={registerMutation.isLoading}>
                    {registerMutation.isLoading
                    ? (<Spinner animation="border" role="status" className="login-loading">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>)
                    : 'Daftar'}
                </Button>
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