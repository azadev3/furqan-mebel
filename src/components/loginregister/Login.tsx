import { Form, Formik, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { useRecoilState } from "recoil";
import { ActiveLoginPageState, ActiveRegisterPageState, UserIsAuthState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { toast } from "react-toastify";
import Loader from "../../uitils/Loader";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const [____, setAuth] = useRecoilState(UserIsAuthState);

  const RegisterSchema = yup.object().shape({
    email: yup.string().email().required("Email doldurulmayıb"),
    password: yup.string().required("Şifrə doldurulmayıb"),
  });

  const [_, setActiveRegister] = useRecoilState(ActiveRegisterPageState);
  const [__, setActiveLogin] = useRecoilState(ActiveLoginPageState);
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <div className="register-form">
      <Formik
        validationSchema={RegisterSchema}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true);
          try {
            const response = await axios.post(`${Baseurl}/login`, values);
            if (response.data || response.status === 200) {
              toast.success("Uğurludur, yönləndirilirsiniz.", {
                position: "top-center",
              });
              const token = response.data?.token;
              const userInfo = response.data?.user;
              const JsonConverter = JSON.stringify(userInfo);
              document.cookie = `accessToken=${token}; Secure; SameSite=None`;
              document.cookie = `userInfo=${encodeURIComponent(JsonConverter)}; Secure; SameSite=None`;
              resetForm();
              const timeout = setTimeout(() => {
                setAuth(true);
                window.location.reload();
              }, 800);
              return () => clearTimeout(timeout);
            } else {
              console.log(response.status);
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              if (error.response?.status === 401) {
                toast.error("Məlumatların düzgünlüyünü yoxlayıb yenidən cəhd edin.", {
                  position: "top-center",
                });
              } else {
                toast.error("Gözlənilməyən xəta, yenidən cəhd edin.", {
                  position: "top-center",
                });
              }
            }
            console.log(error);
          } finally {
            setLoading(false);
          }
        }}
        initialValues={{
          email: "",
          password: "",
        }}>
        {({}) => (
          <Form>
            <div className="field-input">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" placeholder="johnsmith@gmail.com" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="field-input">
              <label htmlFor="password">Şifrə</label>
              <Field type={showPassword ? "text" : "password"} id="password" name="password" placeholder="********" />
              {showPassword ? (
                <GoEye className="eye" onClick={toggleShowPassword} />
              ) : (
                <GoEyeClosed className="eye" onClick={toggleShowPassword} />
              )}
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit">{loading ? <Loader /> : "Daxil ol"}</button>
            <div className="already-account-question">
              <span>Hesabın yoxdur?</span>
              <span
                className="a"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setActiveRegister(true), setActiveLogin(false);
                }}>
                Qeydiyyatdan keç
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
