import React from "react"; 
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import useForm from "../../Hooks/useForm";
import { 
    requiredValidator,
    minValidator,
    maxValidator,
    emailValidator} from './../../validators/rules'
import './ContactUs.css'


const ContactUs = () => {
    const navigate = useNavigate()
    const [formState, onChangeInputHandler] = useForm(
        {
          name: {
            value: "",
            isValid: false,
          },
          email: {
            value: "",
            isValid: false,
          },
          phone: {
            value: "",
            isValid: false,
          },
          body: {
            value: "",
            isValid: false,
          },
        },
        false
      );

      const addNewContact = (event) => {
        event.preventDefault();
        const bodyMsg = {
            name:formState.inputs.name.value,
            phone:formState.inputs.phone.value,
            email:formState.inputs.email.value,
            body:formState.inputs.body.value,

        }
        fetch(`http://localhost:4000/v1/contact`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(bodyMsg)
        }).then(res =>{
            console.log(res);
            if(res.ok){
                swal(
                    {
                        title:'پیام شما با موفقیت ارسال شد',
                        icon:'success',
                        buttons:'تایید و انتقال به صفحه اصلی'
                    }
                ).then(value =>  navigate('/'))
            }
        })
            }
    

    return ( 
        <>
        <Topbar/>
        <Navbar/>
        <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ارتباط با ما</span>
          <span className="login__subtitle">
            نظر، پیشنهاد یا انتقادتو بنویس برامون :)
          </span>
          <form action="#" className="login-form">
            <div className="login-form__username login-form__parent">
              <Input
                onChangeInputHandler={onChangeInputHandler}
                element="input"
                id="name"
                className="login-form__username-input"
                type="text"
                placeholder="نام و نام خانوادگی"
                validations={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(20),
                ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password login-form__parent">
              <Input
                onChangeInputHandler={onChangeInputHandler}
                element="input"
                id="email"
                className="login-form__password-input"
                type="text"
                placeholder="آدرس ایمیل"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(40),
                  emailValidator(),
                ]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__phone-number login-form__parent">
              <Input
                onChangeInputHandler={onChangeInputHandler}
                element="input"
                id="phone"
                className="login-form__password-input"
                type="text"
                placeholder="شماره تماس"
                validations={[
                  requiredValidator(),
                  minValidator(10),
                  maxValidator(11),
                ]}
              />
              <i className="login-form__password-icon fa fa-phone"></i>
            </div>
            <div className="login-form__text login-form__parent">
              <Input
                onChangeInputHandler={onChangeInputHandler}
                element="textarea"
                id="body"
                className="login-form__text-input"
                placeholder="متن خود را وارد کنید"
                validations={[requiredValidator(), minValidator(10)]}
              />
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid === true
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type="submit"
              onClick={addNewContact}
              disabled={!formState.isFormValid}
            >
              <span className="login-form__btn-text">ارسال</span>
            </Button>
          </form>
        </div>
      </section>
        <Footer/>
        </>
     );
}
 
export default ContactUs;