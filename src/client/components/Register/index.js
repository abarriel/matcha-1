import React from 'react';
import { Logo, Container } from '../widgets';
import styled from 'styled-components';
import { FormField } from '../../fields';
import { withFormik } from 'formik';
import { compose } from 'ramda';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { getValidationSchema, defaultValues, getField } from '../../forms/register';

const RegisterFormStyled = styled.form`
    display: grid;
    margin: auto;
    margin-top: 25px;
    margin-bottom: 25px;
    width: 90%;
    grid-gap: 20px;
    grid-auto-columns: minmax(70px, auto);
    grid-auto-rows: minmax(70px, auto);
    grid-template-areas: 'login' 'email' 'firstName' 'lastName' 'password' 'repeatPassword';
    @media (min-width: 700px) {
      grid-template-areas: 'login email' 'firstName lastName'
        'password repeatPassword';
    }
`;

const StyledFormField = styled(FormField)`
grid-area: ${({ field }) => field.name};
`;

const ContainerStyled = styled(Container)`
  width:350px;
  @media (min-width: 700px) {
    width:550px;
  }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 700px) {
      margin: 25px;
    }
    margin: 18px;
`;

const LinkStyled = styled(Link)`
  padding: 12px 12px;
  max-width:120px;
  min-width:120px;
  @media (min-width: 700px) {
    max-width:215px;
    min-width:215px;
  }
  cursor: pointer;
  user-select: none;
  transition: all 60ms ease-in-out;
  text-align: center;
  white-space: nowrap;
  text-decoration: none !important;
  text-transform: none;
  text-transform: capitalize;
  color: #fff;
  border: 0 none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  -webkit-appearance: none;
  -moz-appearance:    none;
  appearance:         none;
  justify-content: center;
  align-items: center;
  flex: 0 0 160px;
  box-shadow: 2px 5px 10px rgba($dark, .1);
  &:hover {
    transition: all 60ms ease;
    opacity: .85;
  }
    color: #FFFFFF;
    background: #EA5555;
`;

const RegisterForm = ({
    handleSubmit,
    values,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
    type,
  }) => {
    return (
      <RegisterFormStyled id="register" onSubmit={handleSubmit}>
        <StyledFormField
          field={getField('login')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
        <StyledFormField
          field={getField('firstName')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
        <StyledFormField
          field={getField('lastName')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
        <StyledFormField
          field={getField('email')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
        <StyledFormField
          field={getField('password')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
        <StyledFormField
          field={getField('repeatPassword')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
      </RegisterFormStyled>
    );
  };
  
  RegisterForm.propTypes = {
    type: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
  };

const Register= ({
    values,
    isSubmitting,
    isValid,
    dirty,
    handleSubmit,
    handleReset,
    setFieldTouched,
    setFieldValue,
    isCancelDialogOpen,
    showCancelDialog,
    cancel,
    requestCancel,
    ...props
  }) => (
    <ContainerStyled top='25vh' width='350px'>
        <Logo width={200} />
        <RegisterForm
            type="add"
            handleSubmit={handleSubmit}
            values={values}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            {...props}
        />
        <ButtonContainer>
          <LinkStyled to={`/login`}>
            Login
          </LinkStyled>
          <LinkStyled to={`/login`}>
            Register
          </LinkStyled>
        </ButtonContainer>
    </ContainerStyled>
);

export default compose(
  withFormik({
    handleSubmit: (
      {
        login,
      },
      { props },
    ) => {
      console.log('Login')
    },
    validationSchema: getValidationSchema(),
    mapPropsToValues: () => ({
      ...defaultValues,
    }),
  }),
)(Register);
