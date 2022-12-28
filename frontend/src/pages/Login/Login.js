import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import { AuthContext } from "../../contexts/AuthContext";
import useForm from "../../Hooks/useForm";
import { emailValidator, maxValidator, minValidator, requiredValidator } from "../../validators/rules";
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import './Login.css'




const Login = () => {

    const authContextData = useContext(AuthContext)
    const navigate = useNavigate()

    const[isRecaptchaGoogleVerify,setIsRecaptchaGoogleVerify] =useState(false)

    const onChangeRecaptcha =()=>{
      setIsRecaptchaGoogleVerify(true)
    }

    const [formState,onChangeInputHandler] = useForm({
        username:{
            value:'',
            isValid:false
        },
        password:{
            value:'',
            isValid:false
        }
    },false)
console.log(formState);
    const loginUser = (event)=>{
    event.preventDefault()

      const userInfoForLogin ={
        identifier:formState.inputs.username.value,
        password:formState.inputs.password.value
      }
        fetch(`http://localhost:4000/v1/auth/login`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(userInfoForLogin)
      }).then( res => {
        if(!res.ok){
         return res.text().then( text =>{
          throw new Error(text)
         })
        }
        else{
          return res.json()
        }
      })
      .then(result =>{
        console.log(result);
        authContextData.login({},result.accessToken)
        swal(
          {
            title:'با موفقیت وارد شدید',
            icon:'success',
            buttons:'ورود به پنل'
           }).then(value => navigate('/'))
        
      }).catch(error =>{
       swal(
        {
          title:'همچین کاربری وجود ندارد',
          icon:'error',
          buttons:'تلاش دوباره'
         }
       )
      })
    }

    return ( 
        <>
        <Topbar/>
        <Navbar/>
        <section className="login-register">
        <div className="login">
          <span className="login__title">ورود به حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link" to="/register">
              ثبت نام
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                className="login-form__username-input"
                type="text"
                placeholder="نام کاربری یا آدرس ایمیل"
                element="input"
                id="username"
                onChangeInputHandler={onChangeInputHandler}
                validations={[
                        requiredValidator(),
                        minValidator(8),
                        maxValidator(20),
                        // emailValidator()
                    ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                className="login-form__password-input"
                type="text"
                placeholder="رمز عبور"
                element="input"
                id="password"
                onChangeInputHandler={onChangeInputHandler}
                validations={
                    [
                        requiredValidator(),
                        minValidator(8),
                        maxValidator(18)
                    ]
                }
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <div className="login-form__recaptcha">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onChangeRecaptcha}
                 />
            </div>
            <Button className={`login-form__btn ${(formState.isFormValid) && isRecaptchaGoogleVerify ? 'login-form__btn_success':'login-form__btn_error'}`} type="submit" onClick={loginUser} disabled={(!formState.isFormValid) || isRecaptchaGoogleVerify }>
              <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span className="login-form__btn-text">ورود</span>
            </Button>
            <div className="login-form__password-setting">
              <label className="login-form__password-remember">
                <input className="login-form__password-checkbox" type="checkbox" />
                <span className="login-form__password-text">
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label className="login-form__password-forget">
                <Button className="login-form__password-forget-link" href="#">
                  رمز عبور را فراموش کرده اید؟
                </Button>
              </label>
            </div>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>
        <Footer/>
        </>
     );
}
 
export default Login;