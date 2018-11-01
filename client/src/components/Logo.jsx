import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoH1 = styled.h1`
  font-family: 'Cabin Sketch', cursive;
  font-size: 3.5rem;
  text-shadow: rgb(26, 31, 52) 0.0059307px 0.0059307px 0px,
    rgb(26, 31, 53) 1.00593px 1.00593px 0px,
    rgb(27, 32, 53) 2.00593px 2.00593px 0px,
    rgb(27, 32, 54) 3.00593px 3.00593px 0px,
    rgb(27, 33, 55) 4.00593px 4.00593px 0px,
    rgb(28, 33, 55) 5.00593px 5.00593px 0px,
    rgb(28, 34, 56) 6.00593px 6.00593px 0px,
    rgb(28, 34, 57) 7.00593px 7.00593px 0px,
    rgb(29, 34, 57) 8.00593px 8.00593px 0px,
    rgb(29, 35, 58) 9.00593px 9.00593px 0px,
    rgb(29, 35, 59) 10.0059px 10.0059px 0px;
  margin: 25px 25px 0px 25px;
  text-align: center;
  a {
    color: #9099b7;
    text-decoration: none;
    :hover {
      color: #c6cce1;
    }
  }
`;


const Logo = () => {
  return <LogoH1><Link to='/'>Pangolin chat</Link></LogoH1>;
};

export default Logo;
