import React, { useContext } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import { AuthContext } from "../../contexts/AuthContext";
import useForm from "../../Hooks/useForm";
import { emailValidator, maxValidator, minValidator, requiredValidator } from "../../validators/rules";
import './Register.css'

const Register = () => {

  const authContextData = useContext(AuthContext)

  console.log(authContextData);

  const[formState,onChangeInputHandler] = useForm({
    name:{
      value:'',
      isValid:false
    },
    username:{
      value:'',
      isValid:false
    },
    phone:{
      value:'',
      isValid:false
    },
    password:{
      value:'',
      isValid:false
    },
  confirmPassword:{
      value:'',
      isValid:false
    },
    email:{
      value:'',
      isValid:false
    },
  },false)

  const registerUser = (event)=>{
    event.preventDefault()
    const newUserRegister ={
    name:formState.inputs.name.value,
    username: formState.inputs.username.value,
    email: formState.inputs.email.value,
    phone: formState.inputs.phone.value,
    password: formState.inputs.password.value,
    confirmPassword: formState.inputs.confirmPassword.value,
   
    }
    if(formState.inputs.password.value === formState.inputs.confirmPassword.value){
      fetch(`http://localhost:4000/v1/auth/register`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(newUserRegister)
      }).then(res => {
        if(res.status === 403){
          swal({
            title:'این شماره تماس مسدود می باشد',
            icon:'error',
            button:'بستن'
          })
        }else{
          return res.json()
        }
      })
      .then(result => authContextData.login(result.user,result.accessToken))
    }
    else{
      alert('پسوردها مطابقت ندارند')
    }
  }
    return (  
        <>
        <Topbar/>
        <Navbar/>
        <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
          <div className="login__new-member">
            <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form">
          <div className="login-form__username">
              <Input
                id='name'
                className="login-form__username-input"
                type="text"
                placeholder="نام و نام خانوادگی"
                element="input"
                onChangeInputHandler={onChangeInputHandler}
                validations={
                  [
                      requiredValidator(),
                      minValidator(6),
                      maxValidator(20)
                  ]
              }
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <Input
                id='username'
                className="login-form__username-input"
                type="text"
                placeholder="نام کاربری"
                element="input"
                onChangeInputHandler={onChangeInputHandler}
                validations={
                  [
                      requiredValidator(),
                      minValidator(8),
                      maxValidator(20)
                  ]
              }
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <Input
                id='phone'
                className="login-form__username-input"
                type="text"
                placeholder="شماره تماس "
                element="input"
                onChangeInputHandler={onChangeInputHandler}
                validations={
                  [
                     
                      minValidator(10),
                      maxValidator(12)
                  ]
              }
              />
              <i className="login-form__username-icon fa fa-phone"></i>
            </div>
            <div className="login-form__password">
              <Input
                id='email'
                className="login-form__password-input"
                type="text"
                placeholder="آدرس ایمیل"
                element="input"
                onChangeInputHandler={onChangeInputHandler}
                validations={
                  [
                      requiredValidator(),
                      emailValidator()
                  ]
              }
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <Input
                id='password'
                className="login-form__password-input"
                type="text"
                placeholder="رمز عبور"
                element="input"
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
            <div className="login-form__password">

            <Input
                id='confirmPassword'
                className="login-form__password-input"
                type="text"
                placeholder="رمز عبور را دوباره وارد کنید"
                element="input"
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
            <Button className={`login-form__btn ${formState.isFormValid ? 'login-form__btn_success':'login-form__btn_error'}`} type="submit"  disabled={!formState.isFormValid}  onClick={registerUser}>
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </Button>
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
 
export default Register;