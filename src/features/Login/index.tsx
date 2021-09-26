import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup'
import {FastField, Form, Formik} from 'formik';
import InputField from "../../custom-fields/InputField";
import {Button, FormGroup} from 'reactstrap';
import "./login.scss"
import userApi from "../../api/userApi";
import {useHistory} from "react-router-dom";

interface LoginProps {
   doLogin: Function
}


Login.propTypes = {
   doLogin: PropTypes.func,
};

function Login(props: LoginProps) {
   const {doLogin} = props
   let history = useHistory()
   const initialValues = {
      email: "",
      password: ""

   }
   const validationSchema = Yup.object().shape({
         email: Yup.string().email('Email invalid').required("Email required"),
         password: Yup.string().required("Password required").min(8, "At least 8 characters")
      }
   )

   const handleLogin = () => {

      if (doLogin) {
         userApi.login().then((res: any) => {
            doLogin(res);
            history.replace("/profile")
         }).catch(() => {

         })
      }
   }

   return (
      <div className="login-page">
         <Formik initialValues={initialValues}
                 validationSchema={validationSchema}
                 onSubmit={() => handleLogin()}>
            {(formikProps: any) => {
               return (
                  <Form>
                     <FastField
                        name="email"
                        component={InputField}
                        placeholder="Email"
                     />
                     <FastField
                        name="password"
                        component={InputField}
                        type="password"
                        placeholder="Password"
                     />
                     <FormGroup>
                        <Button type="submit" color="primary">Login</Button>
                     </FormGroup>
                  </Form>
               )
            }}
         </Formik>
      </div>

   );
}

export default Login;
