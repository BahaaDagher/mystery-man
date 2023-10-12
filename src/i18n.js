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
        hello: "hello" , 
        company_name : "Company name" ,
        home : "Home" , 
        missions : "Missions" , 
        questionnaires : "Questionnaires" , 
        subscription : "Subscription"  , 
        Company_name : "Company name" ,
        Company_Website : "Company Website" ,
        Company_Location : "Company Location" ,
        Password : "Password" , 
        Confirm_Password : "Confirm Password" ,
        Commercial_Registration_No : "Commercial Registration No" , 
        Copy_of_the_commercial_register : "Copy of the commercial register"  ,
        Upload : "Upload" , 
        Create_Account : "Create Account" , 
        The_application_is_currently_being_reviewed : "The application is currently being reviewed" , 
        We_will_contact_you_to_verify_the_data_and_some_other_information : "We will contact you to verify the data and some other information" , 
        Visit_Site : "Visit Site"
        
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
        hello: "أهلا"  , 
        company_name : "اسم الشركة" ,  
        home : "الصفحة الرئيسية" , 
        missions : "المهمات" , 
        questionnaires : "الاستبيانات" , 
        subscription : "الاشتراك"  , 
        Company_name : "إسم الشركة" ,
        Company_Website : "رابط الموقع الالكتروني للشركة " ,
        Company_Location : "موقع الشركة" ,
        Password : "كلمة المرور" , 
        Confirm_Password : "تأكيد كلمة المرور" ,
        Commercial_Registration_No : "رقم السجل التجاري " , 
        Copy_of_the_commercial_register : "نسخة من السجل التجاري" , 
        Upload: "رفع" , 
        Create_Account : "إنشاء حساب"  , 
        The_application_is_currently_being_reviewed : "طلب التقديم قيد المراجعة حاليًا" , 
        We_will_contact_you_to_verify_the_data_and_some_other_information : "سوف نقوم بالاتصال بك للتحقق من البيانات وبعض المعلومات الأخرى" , 
        Visit_Site : "زيارة الموقع" 
        
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
