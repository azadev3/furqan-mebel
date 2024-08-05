import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { Baseurl } from "../../api/Baseurl";
import { toast } from "react-toastify";

const LeftContact: React.FC = () => {
  const ContactSchema = yup.object().shape({
    name: yup.string().required("Ad doldurulmayıb"),
    surname: yup.string().required("Soyad doldurulmayıb"),
    email: yup.string().required("Email doldurulmayıb"),
    message: yup.string().required("Lütfən, mesajınızı yazın"),
  });

  return (
    <div className="left-contact">
      <div className="toptitle-contact">
        <h1>Bizimlə əlaqə</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Sed amet pulvinar cursus volutpat dolor. Lorem ipsum dolor sit amet
          consectetur. Sed amet pulvinar cursus volutpat dolor
        </p>
      </div>

      <div className="form-area">
        <Formik
          validationSchema={ContactSchema}
          initialValues={{
            name: "",
            surname: "",
            email: "",
            message: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              const response = await axios.post(`${Baseurl}/contact_post`, values);
              if (response.data) {
                toast.success("Təşəkkür edirik! Sizinlə ən qısa zamanda əlaqə saxlanılacaq", {
                  position: "top-center",
                });
                resetForm();
              }
            } catch (error) {
              console.log(error);
            }
          }}>
          {(props) => (
            <Form>
              <div className="field-name-surname">
                <div className="name">
                  <label>Ad</label>
                  <Field
                    style={{ border: props.errors?.name ? "4px solid rgb(234, 78, 78)" : "" }}
                    type="text"
                    name="name"
                    placeholder="John"
                  />
                  {props && props.errors?.name && <ErrorMessage name="name" component="span" className="error-msg" />}
                </div>
                <div className="surname">
                  <label>Soyad</label>
                  <Field
                    style={{ border: props.errors?.surname ? "4px solid rgb(234, 78, 78)" : "" }}
                    type="text"
                    name="surname"
                    placeholder="Doe"
                  />
                  {props && props.errors?.surname && (
                    <ErrorMessage name="surname" component="span" className="error-msg" />
                  )}
                </div>
              </div>
              <div className="email">
                <label>Email</label>
                <Field
                  style={{ border: props.errors?.email ? "4px solid rgb(234, 78, 78)" : "" }}
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                />
                {props && props.errors?.email && <ErrorMessage name="email" component="span" className="error-msg" />}
              </div>
              <div className="message">
                <label>Mesaj</label>
                <Field
                  style={{ border: props.errors?.message ? "4px solid rgb(234, 78, 78)" : "" }}
                  as="textarea"
                  name="message"
                  placeholder="johndoe@gmail.com"
                />
                {props && props.errors?.message && (
                  <ErrorMessage name="message" component="span" className="error-msg" />
                )}
              </div>

              <button type="submit">Göndər</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LeftContact;
