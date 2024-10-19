import { Form, Formik, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ActiveLoginPageState, ActiveRegisterPageState } from "../../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { toast } from "react-toastify";
import Loader from "../../uitils/Loader";
import { useTranslations } from "../../TranslateContext";

const Register: React.FC = () => {
  const { translations } = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowRePassword = () => setShowRePassword(!showRePassword);

  const RegisterSchema = yup.object().shape({
    name: yup.string().required("Ad doldurulmayıb"),
    surname: yup.string().required("Soyad doldurulmayıb"),
    email: yup.string().email().required("Email doldurulmayıb"),
    phone: yup.string().required("Nömrə doldurulmayıb"),
    password: yup.string().required("Şifrə doldurulmayıb"),
    password_confirmation: yup
      .string()
      .required("Təkrar şifrəni yazın")
      .oneOf([yup.ref("password")], "Şifrələr uyğun deyil"),
    isAgree: yup.boolean().oneOf([true], "Şərtləri qəbul etməlisiniz"),
  });

  const [_, setActiveRegister] = useRecoilState(ActiveRegisterPageState);
  const [__, setActiveLogin] = useRecoilState(ActiveLoginPageState);

  return (
    <div className="register-form">
      <Formik
        validationSchema={RegisterSchema}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true);
          try {
            const response = await axios.post(`${Baseurl}/register`, values);
            if (response.data || response.status === 201) {
              toast.success("Qeydiyyatınız uğurla tamamlandı, lütfən daxil olun.", {
                position: "top-center",
              });
              resetForm();
              const timeout = setTimeout(() => {
                setActiveRegister(false);
                setActiveLogin(true);
              }, 800);
              return () => clearTimeout(timeout);
            } else {
              console.log(response.status);
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              if (error.response?.status === 422) {
                toast.error("Bu istifadəçi artıq qeydiyyatdan keçib.", {
                  position: "top-center",
                });
              } else if (error.response?.status === 422 && error.response.data?.errors.email) {
                toast.error("Bu istifadəçi artıq qeydiyyatdan keçib.", {
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
          name: "",
          surname: "",
          email: "",
          phone: "",
          password: "",
          password_confirmation: "",
          isAgree: '',
        }}>
        {({}) => (
          <Form>
            <div className="field-input">
              <label htmlFor="name">Ad</label>
              <Field type="text" id="name" name="name" placeholder="John" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="field-input">
              <label htmlFor="surname">Soyad</label>
              <Field type="text" id="surname" name="surname" placeholder="Smith" />
              <ErrorMessage name="surname" component="div" className="error" />
            </div>
            <div className="field-input">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" placeholder="johnsmith@gmail.com" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="field-input">
              <label htmlFor="phone">{translations['elaqe_nomresi']}</label>
              <Field type="text" id="phone" name="phone" placeholder="+994 000 00 00" />
              <ErrorMessage name="phone" component="div" className="error" />
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
            <div className="field-input">
              <label htmlFor="password_confirmation">Şifrə təkrar</label>
              <Field
                type={showRePassword ? "text" : "password"}
                id="password_confirmation"
                name="password_confirmation"
                placeholder="********"
              />
              {showRePassword ? (
                <GoEye className="eye" onClick={toggleShowRePassword} />
              ) : (
                <GoEyeClosed className="eye" onClick={toggleShowRePassword} />
              )}
              <ErrorMessage name="password_confirmation" component="div" className="error" />
            </div>
            <div className="field-input-check">
              <div className="check">
                <Field type="checkbox" id="termsAndPolicy" name="termsAndPolicy" />
                <label htmlFor="termsAndPolicy">
                  I agree <Link to="">Terms & Policy</Link>
                </label>
              </div>
              <ErrorMessage name="termsAndPolicy" component="div" className="error" />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? <Loader /> : "Qeydiyyat"}
            </button>
            <div className="already-account-question">
              <span>Hesabın var?</span>
              <span
                className="a"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setActiveRegister(false);
                  setActiveLogin(true);
                }}>
                Daxil ol
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
