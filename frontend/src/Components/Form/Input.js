import React, { useReducer } from "react";
import { useEffect } from "react";
import './Input.css'
import validator from '../../validators/validator'
const inputReducer = (state,action) =>{
    switch(action.type){
        case 'CHANGE' :{
            return{
                ...state,
                value:action.value,
                isValid:validator(action.value,action.validations)
            }
        }
            default:{
                return state
            }
        }
    }


const Input = (props) => {



    const onChangeHandler = (event) =>{
       dispatch({
        type:'CHANGE',
        value:event.target.value,
        isValid : true,
        validations : props.validations
       })
    }
    


    const [mainInput,dispatch] = useReducer(inputReducer,{
        value:'',
        isValid:false
    })

    const {onChangeInputHandler,id} = props
    const {value,isValid} = mainInput

    useEffect(()=>{
        onChangeInputHandler(id,value,isValid)
    },[value])

    const element = props.element === 'input' ? (
        <input
        type={props.type}
        placeholder ={props.placeholder}
        className = {`${props.className} ${mainInput.isValid ? 'success':'error'}`}
        onChange={onChangeHandler}
        value={mainInput.value}
        />
    ): (
        <textarea
        placeholder ={props.placeholder}
        className = {`${props.className} ${mainInput.isValid ? 'success':'error'}`}
        onChange={onChangeHandler}
        value={mainInput.value}

        />
    )


    return ( 
    <div>
        {element}
    </div>
     );
}
 
export default Input;