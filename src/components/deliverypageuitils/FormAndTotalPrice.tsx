import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const FormAndTotalPrice: React.FC = () => {
  const navigate = useNavigate();

  const SchemaDeliveryForm = yup.object().shape({
    country: yup.string().required("Ölkə qeyd edilməyib"),
    name: yup.string().required("Ad qeyd edilməyib"),
    surname: yup.string().required("Soyad qeyd edilməyib"),
    adress: yup.string().required("Adres qeyd edilməyib"),
    apartment: yup.string().required("Mənzil qeyd edilməyib"),
    city: yup.string().required("Şəhər qeyd edilməyib"),
    zipcode: yup.string().required("Zip kod qeyd edilməyib"),
    telephone: yup.string().required("Telefon qeyd edilməyib"),
    email: yup.string().required("Email qeyd edilməyib"),
  });

  return (
    <div className="form-and-total-price">
      <div className="top-form">
        <div className="form">
          <h1>Çatdırılma məlumatları</h1>
          <Formik
            validationSchema={SchemaDeliveryForm}
            initialValues={{
              country: "",
              name: "",
              surname: "",
              adress: "",
              apartment: "",
              city: "",
              zipcode: "",
              telephone: "",
              email: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              navigate("/paymentdetails");
            }}>
            {({ handleSubmit, errors }) => (
              <Form onSubmit={handleSubmit}>
                {/* <div className="country">
                  <label>Ölkə</label>
                  <Field
                    style={{ border: errors && errors?.country ? "2px solid red" : "" }}
                    as="select"
                    name="country">
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Turkey">Turkey</option>
                  </Field>
                  <ErrorMessage className="error-msg" name="country" component="span" />
                </div> */}
                <div className="name-surname">
                  <div className="leftname">
                    <label>Ad</label>
                    <Field
                      style={{ border: errors && errors?.country ? "2px solid red" : "" }}
                      type="text"
                      name="name"
                      placeholder="John"
                    />
                    <ErrorMessage className="error-msg" name="name" component="span" />
                  </div>
                  <div className="rightsurname">
                    <label>Soyad</label>
                    <Field
                      style={{ border: errors && errors?.country ? "2px solid red" : "" }}
                      type="text"
                      name="surname"
                      placeholder="Doe"
                    />
                    <ErrorMessage className="error-msg" name="surname" component="span" />
                  </div>
                </div>

                {/* <div className="apartment-adress">
                  <div className="leftname">
                    <label>Adress</label>
                    <Field
                      style={{ border: errors && errors?.country ? "2px solid red" : "" }}
                      type="text"
                      name="adress"
                      placeholder="Xatai 24"
                    />
                    <ErrorMessage className="error-msg" name="adress" component="span" />
                  </div>
                  <div className="rightname">
                    <label>Apartment</label>
                    <Field
                      style={{ border: errors && errors?.country ? "2px solid red" : "" }}
                      type="text"
                      name="apartment"
                      placeholder="5"
                    />
                    <ErrorMessage className="error-msg" name="apartment" component="span" />
                  </div>
                </div> */}

                <div className="zipcode-city">
                  <div className="leftname">
                    <label>Şəhər</label>
                    <Field style={{ border: errors && errors?.country ? "2px solid red" : "" }} as="select" name="city">
                      <option value="Baku">Baku</option>
                      <option value="Istanbul">Istanbul</option>
                      <option value="Baku">Baku</option>
                      <option value="Istanbul">Istanbul</option>
                      <option value="Baku">Baku</option>
                      <option value="Istanbul">Istanbul</option>
                      <option value="Baku">Baku</option>
                      <option value="Istanbul">Istanbul</option>
                    </Field>
                    <ErrorMessage className="error-msg" name="city" component="span" />
                  </div>
                </div>
                <div className="bottom-form">
                  {/* <h2>Əlaqə məlumatları</h2> */}
                  <div className="tel-and-email">
                    <div className="tel">
                      <label>Əlaqə nömrəsi</label>
                      <Field
                        style={{ border: errors && errors?.country ? "2px solid red" : "" }}
                        type="text"
                        name="telephone"
                        placeholder="+994 70 123 45 67"
                      />
                      <ErrorMessage className="error-msg" name="telephone" component="span" />
                    </div>
                    {/* <div className="email">
                      <label>Email</label>
                      <Field
                        style={{ border: errors && errors?.country ? "2px solid red" : "" }}
                        type="email"
                        name="email"
                        placeholder="johndoe@gmail.com"
                      />
                      <ErrorMessage className="error-msg" name="email" component="span" />
                    </div> */}
                  </div>
                </div>
                <div className="button">
                  <button type="submit">
                    <span>Davam et</span>
                    <img src="../eee.svg" alt="continue" />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="total-price">
          <span>Ümumi məbləğ</span>
          <div className="table">
            <div className="itemshipping">
              <article>
                <span>Items</span>
                <span>290.0000 AZN</span>
              </article>
              <article>
                <span>Shipping</span>
                <span>290.0000 AZN</span>
              </article>
            </div>

            <div className="totaltax">
              <article>
                <span>Total Before Tax</span>
                <span>290.0000 AZN</span>
              </article>
              <article>
                <span>Estimated Tax </span>
                <span>290.0000 AZN</span>
              </article>
            </div>

            <div className="total-count">
              <span>Total</span>
              <span>290.0000 AZN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAndTotalPrice;
