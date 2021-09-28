import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { logout } from '../../../stores/auth/auth-actions';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const from = new URLSearchParams(search).get('from');

  useEffect(() => {
    dispatch(logout());

    history.replace(from);
  }, [dispatch, from, history]);

  return (
    <Spinner animation="border" role="status" class="text-center">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Logout;