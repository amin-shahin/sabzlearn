import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
    
    if(props.to){
        return (
            <Link  className={props.className} to={props.to}>
           {props.children}
            </Link> )    
    }else if( props.href){
        return (
            <a  className={props.className} href={props.href}>
           {props.children}
            </a> )
    }else{
        return (
            <button  className={props.className} disabled={props.disabled} onClick={props.onClick} type={props.type}>
           {props.children}
            </button> )
    }
}
 
export default Button;