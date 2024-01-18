import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Box, TextField, Typography } from '@mui/material';
import { registerUser } from '../../services/userService';

const RegisterFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

function RegisterForm() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={RegisterFormSchema}
      onSubmit={(values, actions) => {
        registerUser(values)
          .then((response) => {
            console.log('Registration successful:', response);
            navigate('/login');
          })
          .catch((error) => {
            console.error('Registration error:', error);
            actions.setFieldError('general', 'Registration failed, please try again later.');
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
    >
      {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
        <Form>
          <Box mb={2}>
            <TextField
              fullWidth
              name="username"
              label="Username"
              variant="outlined"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              autoComplete="new-password"
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              autoComplete="new-password"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
            Register
          </Button>
          {errors.general && <Typography color="error" align="center">{errors.general}</Typography>}
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;

  

