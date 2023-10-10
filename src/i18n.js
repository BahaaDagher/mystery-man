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
        subscription : "Subscription"   
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
        subscription : "الاشتراك"   
        
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
