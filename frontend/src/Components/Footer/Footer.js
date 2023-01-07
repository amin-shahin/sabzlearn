import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import useForm from "../../Hooks/useForm";
import { emailValidator } from "../../validators/rules";
import FooterSection from "../FooterSection/FooterSection";
import Button from "../Form/Button";
import Input from "../Form/Input";
import './Footer.css'

const Footer = () => {
  const [formState,onChangeInputHandler] = useForm({
    email:{
        value:'',
        isValid:false
    }
},false)

const addNewEmailUserForNews = (event)=>{
  event.preventDefault()

  const newEmailUser = {
    email:formState.inputs.email.value
  }

  fetch(`http://loclhost:4000/v1/newsletters`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(newEmailUser)
  }).then(res =>{
    console.log(res);
    if(res.ok){
      swal({
        title:'ایمیل شما با موفقیت ثبت شد',
        icon:'success',
        buttons:'بستن'
      })
    }
  })
}


    return ( 
    <footer className="footer">
        <div className="container">
          <div className="footer-widgets">
            
            <div className="row">
            
                <FooterSection  footerSectionTitle='درباره ما' >
                <p className="footer-widgets__text">
                    وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم! و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس در اون رو نداره و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه! این به این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین پشتیبانی خوب و با کیفیت رو به شما میدیم . چرا که مدرسین وب سایت سبزلرن حتی برای پشتیبانی دوره های رایگان شون هم هزینه دریافت میکنند و متعهد هستند که هوای کاربر های عزیز رو داشته باشند !
                  </p>
                </FooterSection>

                <FooterSection  footerSectionTitle='آخرین مطالب' >
                <div className="footer-widgets__links">
                    <a href="#" className="footer-widgets__link">
                      نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                    </a>
                    <a href="#" className="footer-widgets__link">
                      چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن پایتون      
                    </a>
                    <a href="#" className="footer-widgets__link">
                      آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام به گام و تصویری
                    </a>
                    <a href="#" className="footer-widgets__link">
                      بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی معایب و مزایا
                    </a>
                    <a href="#" className="footer-widgets__link">
                      معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزش رایگان
                    </a>
                  </div>
                </FooterSection>


                <FooterSection  footerSectionTitle='درباره ما' >
                <div className="row">
                 
                    
                    <div className="col-6">
                      <a href="#" className="footer-widgets__link">
                        آموزش HTML
                      </a>
                    </div>
  
                    <div className="col-6">
                      <a href="#" className="footer-widgets__link">
                        آموزش CSS
                      </a>
                    </div>
                      
                    <div className="col-6">
                    <a href="#" className="footer-widgets__link">
                        آموزش جاوا اسکریپت
                    </a>
                    </div>

                    <div className="col-6">
                      <a href="#" className="footer-widgets__link">
                        آموزش بوت استرپ
                      </a>
                    </div>

                    <div className="col-6">
                      <a href="#" className="footer-widgets__link">
                        آموزش ریکت
                      </a>
                    </div>
  
                    <div className="col-6">
                      <a href="#" className="footer-widgets__link">
                        آموزش پایتون
                      </a>
                    </div>

                    <div className="col-6">
                      <Link to="/contact" className="footer-widgets__link">
                        ارتباط با ما
                      </Link>
                    </div>
                    <div className="col-12">
              
                        <span className="footer-widgets__title">عضویت در خبرنامه</span>
                        
                        <span className="footer-widgets__text text-center d-block">
                          جهت اطلاع از آخرین اخبار و تخفیف ها عضو شوید
                        </span>
                        <form action="#" className="footer-widgets__form">
                          <Input
                          id="email"
                          validations={[emailValidator()]}
                          element='input'
                          className='footer-widgets__input'
                          type='text'
                          placeholder='ایمیل خود را وارد نمایید'
                          onChangeInputHandler={onChangeInputHandler}
                          />
                          <Button className="footer-widgets__btn" type="submit" onClick={addNewEmailUserForNews}>عضویت </Button>
                        </form>
                    
                    </div>

                  </div>
             
                </FooterSection>


                 </div>
             </div>
         </div>
             <div class="footer__copyright">
                    <span class="footer__copyright-text">
                    کلیه حقوق برای آکادمی آموزش برنامه نویسی سبز لرن محفوظ است.
                    </span>
            </div>
       </footer>

     );
}
 
export default Footer;