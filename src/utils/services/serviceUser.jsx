import { useEffect } from 'react';

// import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { useParams } from 'react-router-dom';
  // const getCookie = () => {
  //   const token = Cookies.get('token');
  //   const decodedToken = jwtDecode(token);
  //   dispatch(addUser(decodedToken))
  // }
  // useEffect(()=>{
  //   getCookie();
  // }, []);

  // const dispatch = useDispatch();
  // const user = useSelector(state => state.user);
  // const getParams = () => {
  //   const { token } = useParams();
  //   const decodedToken = jwtDecode(token);
  //   dispatch(addUser(decodedToken));
  // };

  // useEffect(() => {
  //   getParams();
  // }, [user]);