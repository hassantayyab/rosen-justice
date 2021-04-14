import { Form, Formik } from "formik";
import React from "react";
import { navigate } from "gatsby";
import styled, { keyframes } from "styled-components";
import { device } from "../../globalStyles";
import { FormInput } from "../contact/form-input";
import { Button } from "./button";
import { useState } from "react";
import { fadeIn } from "react-animations";
import { animate, View } from "../../animations";
import { useInView } from "react-intersection-observer";
import { Schema, submitForm } from "../utils";
import { StaticImage } from "gatsby-plugin-image";

const fadeInAnimation = keyframes`${fadeIn}`;

const RequestCard = styled.div`
  position: relative;
  display: inline-block;
  padding: 3rem 2.5rem;
  background: rgb(201, 172, 43);
  background: linear-gradient(
    0deg,
    rgba(201, 172, 43, 1) 25%,
    rgba(201, 172, 43, 0.9) 100%
  );
  color: var(--color-light-200);
  width: 24rem;

  @media ${device.sm} {
    width: 100%;
  }

  .static-img {
    position: absolute !important;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .content-wrapper {
    position: relative;
    z-index: 1;
  }

  h4 {
    text-align: center;
    margin-bottom: 2rem;
    opacity: 0;
    &.animate {
      opacity: 1;
      animation: 1.5s ${fadeInAnimation};
    }
  }

  form {
    text-align: center;

    > div {
      margin-bottom: 2rem;
    }

    label,
    input,
    textarea {
      display: block;
      width: 100%;
      text-align: left;
    }

    label {
      text-transform: uppercase;
    }

    input,
    textarea {
      border: none;
      border-bottom: 1px solid var(--color-light-200);
      background-color: var(--color-transparent);
      color: var(--color-light);
    }

    .error {
      position: absolute;
      left: 0;
      color: #ff3f54;
      font-size: 0.85rem;
    }

    #button {
      width: 100%;
    }
  }
`;

const Message = styled.div`
  position: absolute;
  bottom: -6%;
  left: 0;
  right: 0;
  font-size: 0.9rem;
  margin-bottom: 0 !important;
`;

const RequestCardComponent = () => {
  const [ref, inView] = useInView(View);

  const [submit, setSubmit] = useState({
    sent: false,
    error: false,
    message: "",
  });

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    try {
      await submitForm(values, setSubmitting, resetForm);
      navigate("/your-form-was-submitted/");
      resetForm();
    } catch (error) {
      setSubmit({
        sent: true,
        error: true,
        message: "Something went wrong! Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RequestCard id="request-card" ref={ref}>
      <StaticImage
        className="static-img"
        src="../../images/city-bg.jpg"
        alt="request card bg"
      />
      <div className="content-wrapper">
        <h4 className={animate(inView)}>Request A Free Consultation</h4>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          }}
          validationSchema={Schema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values, setSubmitting, resetForm);
          }}
        >
          {({ isSubmitting }) => (
            <Form
              method="post"
              name="contact"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="form-name" value="contact" />

              <FormInput name="firstName" label="First Name" />
              <FormInput name="lastName" label="Last Name" />
              <FormInput name="email" label="Email" type="email" />
              <FormInput name="phone" label="Phone No" type="tel" />
              <FormInput
                name="message"
                label="Describe Your Case"
                className="textarea"
                component="textarea"
                rows="3"
              />
              <Button
                bgColor="var(--color-light-200)"
                color="var(--color-secondary)"
                borderColor="var(--color-light-200)"
                disabled={isSubmitting}
              >
                Request for a free quote
              </Button>

              {submit.sent && (
                <Message error={submit.error}>{submit.message}</Message>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </RequestCard>
  );
};

export { RequestCardComponent as RequestCard };
