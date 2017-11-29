import React, { Component } from 'react';
import { Header, Container, Avatar, InputButton } from '../widgets';
import { FormField } from '../../fields';
import { withFormik } from 'formik';
import { map, isNil, upperFirst } from 'lodash';
import { connect } from 'react-redux';
import { withHandlers, withStateHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { compose } from 'ramda';
import { Link } from 'react-router';
import { reqUpdateUser } from '../../request';
import { getValidationSchema, defaultValues, getField } from '../../forms/editProfil';
import styled from 'styled-components';
import { getUser } from '../../selectors/user';

const MainContainer = styled.div`
  display:flex;
  flex-direction:column;
  min-height:100vh;
  background-color:rgb(240,240,240);
`;

const Content = styled.div`
  background-color:white;
  border-radius:0px;
  display: grid;
  grid-auto-columns: minmax(70px, auto);
  grid-auto-rows: minmax(70px, auto);
  grid-template-areas: 'profil' 'suggestion';
`;

const EditProfilFormStyled  = styled.form`
  display: grid;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 100%;
  grid-gap: 20px;
  grid-auto-columns: minmax(70px, auto);
  grid-auto-rows: minmax(70px, auto);
  grid-template-areas: 'firstname' 'lastname' 'email' 'sexe' 'sexualorientation' 'interest' 'bio';
  @media (min-width: 700px) {
    grid-template-areas: 'firstname lastname' 'email sexe' 'sexualorientation sexualorientation' 'interest interest' 'bio bio';
  }
`;

const HeaderContainer = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex:1;
  min-height:300px;
`;

const Name = styled.p`
  font-size: 1.3em;
  color:white;
  margin-top:20px;
`;

const ProfilHeader = styled.div`
  display:flex;
  flex-direction:wrap;
  justify-content: center;
  align-items: center;
  width:100%;
  background:${({ background }) => `url(${background}.jpg)`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ContainerStyled = styled(Container)`
  width:100%;
  margin-top:65px;
  background-color:white;
  border-radius:0px;
`;

const Title = styled.p`
  margin: 15px;
  color:#EA5555;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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

const StyledFormField = styled(FormField)`
  grid-area: ${({ field }) => field.name};
`;


const EditProfilForm = ({
  handleSubmit,
  values,
  touched,
  errors,
  setFieldTouched,
  setFieldValue,
  type,
}) => {
  return (
    <EditProfilFormStyled  id="editProfil" onSubmit={handleSubmit}>
      <StyledFormField
        field={getField('firstname')}
        values={values}
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValue}
      />
      <StyledFormField
        field={getField('lastname')}
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
        field={getField('sexe')}
        values={values}
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValue}
      />
      <StyledFormField
        field={getField('sexualorientation')}
        values={values}
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValue}
      />
      <StyledFormField
        field={getField('interest')}
        values={values}
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValue}
      />
      <StyledFormField
        field={getField('bio')}
        values={values}
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValue}
      />
    </EditProfilFormStyled >
  );
};

class EditProfil extends Component {
  render () {
    const {
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
      user,
      ...props
    } = this.props;

    if(!user) return null;
    const { photo_1, photo_2, photo_3, photo_4, photo_5 } = user;
    user.picture = [photo_1, photo_2, photo_3, photo_4, photo_5].filter(picture => picture !== 'undefined' && picture !== 'null' && !isNil(picture));
    return (
      <MainContainer>
        <Header
          displaySearchBar={false}
        />
        <Content>
          <ContainerStyled>
            <ProfilHeader background={user.picture[0]}>
              <HeaderContainer>
                  <Avatar user={user}/>
                  <Name>{`${upperFirst(user.firstname)} ${upperFirst(user.lastname)}`}</Name>
              </HeaderContainer>
            </ProfilHeader>
            <EditProfilForm
              type="edit"
              handleSubmit={handleSubmit}
              values={values}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              {...props}
            />
            <ButtonContainer>
              <InputButton type="submit" form="editProfil" value="Update" />
            </ButtonContainer>
          </ContainerStyled>
        </Content>
      </MainContainer>
    );
  };
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const actions = {};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    handleSubmit: (user,
      { props },
    ) => {
     const { bio, age, email, firstname, interest, lastname, lookingFor, sexualorientation } = user;
      reqUpdateUser(({ bio, age, email, firstname, interest, lastname, lookingFor, sexualorientation })).then((res) => {
        alert('info update see by yourself');
        location.reload();
      }).catch(err => {
        console.log(err);
      })
    },
    validationSchema: getValidationSchema(),
    mapPropsToValues: ({ user }) => {
      return ({
      ...user,
      firstname: user.firstname,
      lastname: user.lastname,
      sexe: user.sexe,
      lookingFor: user.sexualorientation,
      bio: user.bio || '',
      interest: user.interest || '',
    })
  },
  }),
)(EditProfil);
