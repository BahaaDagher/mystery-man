import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      label: {},
      error: {},
      message: {},
      text: 
      { 
        empty  :"" , 
        hello: "hello" , 
        company_name : "Company name" ,
        home : "Home" , 
        missions : "Missions" , 
        questionnaires : "Questionnaires" , 
        subscription : "Subscription"  , 
        Company_name : "Company name" ,
        Company_Website : "Company Website" ,
        Company_Email : "Company Email" ,
        Password : "Password" , 
        Confirm_Password : "Confirm Password" ,
        Commercial_Registration_No : "Commercial Registration No" , 
        Copy_of_the_commercial_register : "Copy of the commercial register"  ,
        Upload : "Upload" , 
        Create_Account : "Create Account" , 
        The_application_is_currently_being_reviewed : "The application is currently being reviewed" , 
        We_will_contact_you_to_verify_the_data_and_some_other_information : "We will contact you to verify the data and some other information" , 
        Visit_Site : "Visit Site" , 
        Welcome_back : "Welcome back" , 
        Phone_Number : "Phone Number" , 
        Forget_Password : "Forget Password ?" ,
        Login : "Login" , 
        Didnt_have_an_account : "Didn't have an account" , 
        Register : "Register" , 
        Enter_your_phone_number : "Enter your phone number" , 
        We_need_your_phone_number_to_create_an_account_and_log_in_with_later : "we need your phone number to create an account and log in with later" , 
        confirm :"confirm" , 
        You_will_receive_a_SMS_with_a_verification_code_on : "You will receive a SMS with a verification code on" , 
        Verify : "Verify" , 
        change : "change" , 
        Didnt_receive_anything : "Didn’t receive anything?" , 
        Send_again_after : "Send again after" , 
        seconds :"seconds" ,
        Available_Missions : "Available Missions" , 
        Highest_rating : "Highest rating" , 
        Lowest_rating : "Lowest rating" , 
        New_Missions : "New Missions"
      },
      content: {}
    }
  },
  ar: {
    translation: {
      label: {},
      error: {},
      message: {},
      text: 
      { 
        empty  :"" ,
        hello: "أهلا"  , 
        company_name : "اسم الشركة" ,  
        home : "الصفحة الرئيسية" , 
        missions : "المهمات" , 
        questionnaires : "الاستبيانات" , 
        subscription : "الاشتراك"  , 
        Company_name : "إسم الشركة" ,
        Company_Website : "رابط الموقع الالكتروني للشركة " ,
        Company_Email : "البريد الالكتروني للشركة" ,
        Password : "كلمة المرور" , 
        Confirm_Password : "تأكيد كلمة المرور" ,
        Commercial_Registration_No : "رقم السجل التجاري " , 
        Copy_of_the_commercial_register : "نسخة من السجل التجاري" , 
        Upload: "رفع" , 
        Create_Account : "إنشاء حساب"  , 
        The_application_is_currently_being_reviewed : "طلب التقديم قيد المراجعة حاليًا" , 
        We_will_contact_you_to_verify_the_data_and_some_other_information : "سوف نقوم بالاتصال بك للتحقق من البيانات وبعض المعلومات الأخرى" , 
        Visit_Site : "زيارة الموقع" , 
        Welcome_back : "أهلا بعودتك " , 
        Phone_Number : "رقم الهاتف " , 
        Forget_Password : "نسيت كلمة السر ؟ " ,
        Login : "تسجيل الدخول" , 
        Didnt_have_an_account : " لا تملك حساب ؟ " , 
        Register : " إنشاء حساب " , 
        Enter_your_phone_number : "أدخل رقم الهاتف الخاص بك" , 
        We_need_your_phone_number_to_create_an_account_and_log_in_with_later : "نحتاج إلى رقم هاتفك لإنشاء حساب وتسجيل الدخول به لاحقًا" , 
        confirm :"تأكيد" , 
        You_will_receive_a_SMS_with_a_verification_code_on : "سوف تتلقى رسالة نصية قصيرة تحتوي على رمز التحقق" , 
        Verify : "تأكيد" , 
        change : "تغيير" , 
        Didnt_receive_anything : "لم تتلق أي شيء؟" , 
        Send_again_after : "إرسال مرة أخرى بعد" , 
        seconds : "ثانية" , 
        Available_Missions : "المهمات المتاحة" , 
        Highest_rating : "أعلى تصنيف" , 
        Lowest_rating : "أقل تصنيف" , 
        New_Missions : "المهمات الجديدة " , 
      },
      content: {}
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
