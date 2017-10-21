import React from 'react';
import logo from '../../assets/logo.svg';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LogoStyled = styled.img`
    width: ${({ width }) => `${width}px`};
`;

const LogoContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
`;

const Logo = ({ width = 50 }) => (
    <LogoContainer>
        <LogoStyled src={logo} className="App-logo" alt="logo" width={width}/>
    </LogoContainer>
);

Logo.propTypes = {
    width: PropTypes.number,
}

export default Logo;