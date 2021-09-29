import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

import { logout } from '../../../stores/auth/auth-actions';
import axios from 'axios';

const logoutURL = "http://192.168.100.7:8000/api/auth/logout";

const Logout = () => {
  const logoutMutation = useMutation(async (token) => {
    const response = await axios.post(
      logoutURL,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  });
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const from = new URLSearchParams(search).get('from');

  useEffect(() => {
    logoutMutation.mutate(token);
    dispatch(logout());

    history.replace(from);
  }, [dispatch, from, history, logoutMutation, token]);

  return (
    <Spinner animation="border" role="status" class="text-center">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Logout;