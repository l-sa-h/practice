import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const styledButton = styled(NavLink)`
display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  margin: 0px 10%;
  border-radius: 20px;
  font-size: 15px;
  transition: background-color 0.3s;
  margin-block: 3px;
  text-decoration: none;
  color: #ffffff; /* 기본 글자색 */

  background-color : ${(props)=>{
    switch(props.type){
        case 'create' : return '#a8d5ba'; break;
        case 'update' : return '#c3a8d5'; break;
        case 'delete' : return '#921414'; break;
    }
  }};

  &:hover{
    background-color : ${(props)=>{
        switch(props.type){
            case 'create' : return '#8fc1a9'; break;
            case 'update' : return '#9f7ab8'; break;
            case 'delete' : return '#640a2d'; break;
        }
    }}
  }


`;

export default styledButton;