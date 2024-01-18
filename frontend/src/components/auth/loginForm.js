// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
// import { Button, Box, TextField, Typography } from '@mui/material';
// import { loginUser } from '../../services/userService';

// const LoginFormSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Required'),
//   password: Yup.string().required('Required'),
// });

// function LoginForm() {
//   const navigate = useNavigate();

//   return (
//     <Formik
//       initialValues={{ email: '', password: '' }}
//       validationSchema={LoginFormSchema}
//       onSubmit={(values, actions) => {
//         loginUser(values)
//           .then((response) => {
//             console.log('Login successful:', response);
//             localStorage.setItem('token', response.token);
//             navigate('/dashboard');
//           })
//           .catch((error) => {
//             console.error('Login error:', error);
//             actions.setFieldError('general', 'Invalid email or password');
//           })
//           .finally(() => {
//             actions.setSubmitting(false);
//           });
//       }}
//     >
//       {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
//         <Form>
//           <Box mb={2}>
//             <TextField
//               fullWidth
//               name="email"
//               label="Email"
//               type="email"
//               variant="outlined"
//               value={values.email}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               error={touched.email && Boolean(errors.email)}
//               helperText={touched.email && errors.email}
//             />
//           </Box>
//           <Box mb={2}>
//             <TextField
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               variant="outlined"
//               value={values.password}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               error={touched.password && Boolean(errors.password)}
//               helperText={touched.password && errors.password}
//               autoComplete="current-password"
//             />
//           </Box>
//           <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
//             Log In
//           </Button>
//           {errors.general && (
//             <Box mt={2}>
//               <Typography color="error" align="center">
//                 {errors.general}
//               </Typography>
//             </Box>
//           )}
//         </Form>
//         )}
//     </Formik>
//     );
// }

// export default LoginForm;

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Box, TextField, Typography } from '@mui/material';
import { loginUser } from '../../services/userService';

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

function LoginForm() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginFormSchema}
      onSubmit={(values, actions) => {
        loginUser(values)
          .then((response) => {
            console.log('Login successful:', response);
            localStorage.setItem('token', response.token);
            navigate('/dashboard'); 
          })
          .catch((error) => {
            console.error('Login error:', error);
            actions.setFieldError('general', 'Invalid email or password');
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
              autoComplete="current-password"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
            Log In
          </Button>
          {errors.general && (
            <Box mt={2}>
              <Typography color="error" align="center">
                {errors.general}
              </Typography>
            </Box>
          )}
          <Box mt={2}>
            <Typography variant="body1">
              New? <Link to="/register">Register here!</Link>
            </Typography>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;



