import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid}} = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    mode: "onChange"
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchReister(values));

    if(!data.payload){
      return alert("Failed to sign up!");
    }

    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if(isAuth){
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create an account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
            {... register('name', {required: "Enter your fullname"})}
            className={styles.field} label="name" fullWidth />
        <TextField type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {... register('email', {required: "Enter your email"})}
            className={styles.field} label="E-Mail" fullWidth />
        <TextField type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {... register('password', {required: "Enter your password"})}
            className={styles.field} label="password" fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Register
        </Button>
      </form>
    </Paper>
  );
};
