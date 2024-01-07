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
        noMissions : "there is no missions" , 
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
        Didnt_have_an_account : "Didn't have an account ?" , 
        Register : "Register" , 
        Enter_your_phone_number : "Enter your phone number" , 
        We_need_your_phone_number_to_create_an_account_and_log_in_with_later : "we need your phone number to create an account and log in with later" , 
        confirm :"confirm" , 
        You_will_receive_an_email_with_a_verification_code_on : "You will receive an email with a verification code on" , 
        Verify : "Verify" , 
        change : "change" , 
        Didnt_receive_anything : "Didn’t receive anything?" , 
        Send_again_after : "Send again after" , 
        seconds :"seconds" ,
        Available_Missions : "Available Missions" , 
        Highest_rating : "Highest rating" , 
        Lowest_rating : "Lowest rating" , 
        New_Missions : "New Missions" , 
        published : "published" , 
        Support : "Support" , 
        Messages : "Messages" ,
        Mystery_Support : "Mystery Support" ,
        select_a_message_from_the_side_bar : "select a message from the side bar" ,
        Send : "Send" ,
        Enter_Message : "Enter Message" ,
        Post_Mission : "Post Mission" ,
        Title : "Title" ,
        Focus : "Focus" ,
        Branch : "Branch" ,
        Date : "Date" ,
        Time : "Time" ,
        from : "from" , 
        to : "to"  , 
        Purchase_voucher : "Purchase voucher" ,
        Questionnaire : "Questionnaire" ,
        total_balance : "total balance" ,
        SAR : "SAR" ,
        New_Mission : "New Mission" ,
        type_what_you_want_him_her_to_focus_on : "type what you want him/her to focus on!" , 
        Include_Purchase_voucher : "Include Purchase voucher" ,
        Notes : "Notes" ,
        Next : "Next" ,
        previous : "previous" ,
        Add_Question : "Add Question" ,
        Questions : "Questions" ,
        Save : "Save" ,
        SaveAdmin : "Save Admin Questionnaire" ,
        Take_photos : "Take photos" ,
        Yes : "Yes" ,
        No : "No" ,
        Review_Requests : "Review Requests" ,
        Accept : "Accept" ,
        Mission_Details : "Mission Details" ,
        OVERALL_PERFORMANCE : "OVERALL PERFORMANCE" ,
        YOUR_PERFORMANCE : "General Rating" ,
        SECTION_SUMMARY : "SECTION SUMMARY" ,
        Comments : "Comments" ,
        Questions_Answers : "Questions Answers" ,
        show_Report : "show Report" ,
        Print_Report : "Print Report" ,
        New_Mission : "New Mission" ,
        Wait_Requests : "Wait Requests" , 
        Pending_user_Acceptance : "Pending user Acceptance" ,
        Current_Missions : "Current Missions" ,
        Complete_Missions : "Complete Missions" ,
        CanceledMissions : "Canceled Missions" ,
        update : "Update" ,
        visitor_Rating : "Visitor Rating" ,
        MysteryProfile : "Mystery Profile" ,
        MissionDetails : "Mission Details" ,
        Cancel : "Cancel" ,
        Delete : "Delete" ,
        Focus : "Focus" ,
        locationAndTime : "location And Time" ,
        ReviewRequests : "Review Requests" ,
        RateTheVisitor  : "Rate The Visitor" ,
        Confirm : "Confirm" ,
        VisitorName : "Visitor Name" ,
        VisitorGender : "Visitor Gender" , 
        VisitorPhone :"Visitor Phone" , 
        VisitorEmail : "Visitor Email" , 
        CompanyName : "Company Name" ,
        MissionDate : "Mission Date" ,
        MissionTime : "Mission Time" ,
        BranchAddress : "Branch Address" ,
        CompanyWebsite : "Company Website" ,
        CommercialRegistrationNo : "Commercial Registration No" ,
        AvailableMissions : "Available Missions" ,
        totalBalance : "total Balance" ,
        NewBranch : "New Branch" ,
        Add : "Add" ,
        Required : "Required" ,
        Optional : "Optional" ,
        EnterAnewAnswer : "Enter A new Answer" ,
        RatingOfAnswerBetween0100 : "Rating Of Answer Between 0-100" ,
        EnterYourQuestion : "Enter Your Question" ,
        Yes : "Yes" ,
        No : "No" ,
        hint : "hint" ,
        TakePhotos : "Take Photos" ,
        chooseAQuestionType : "choose A Question Type" ,
        SingleChoice : "Single Choice" ,
        multiChoice : "multi Choice" ,
        yesOrNo : "yesOrNo" ,
        rating : "rating" ,
        open : "open" ,
        uploadImages : "upload Images" ,
        headLine : "headLine" ,
        Create_New_Questionnaire : "Create New Questionnaire" ,
        Saved_Questioners : "Saved Questioners" ,
        Saved_admin_Questioners : "Admin Questioners" ,
        are_you_sure_you_want_to_save_this_Questionnaire  : "are you sure you want to save this Questionnaire ?" ,
        are_you_sure_you_want_to_delete_this_Questionnaire : "are you sure you want to delete this Questionnaire ?" ,
        Changes_are_not_saved : "Changes are not saved" ,
        edited_successfully : "edited successfully" ,
        branch_deleted_successfully : "branch deleted successfully" ,
        are_you_sure_you_want_to_add_this_mission : "are you sure you want to add this mission ?" ,
        mission_added_successfully : "mission added successfully" ,
        please_fill_all_the_fields : "please fill all the fields" ,
        are_you_sure_you_want_to_delete_this_branch : "are you sure you want to delete this branch ?" ,
        branch_deleted_successfully : "branch deleted successfully" ,
        are_you_sure_you_want_to_accept_this_visitor : "are you sure you want to accept this visitor ?" ,
        are_you_sure_you_want_to_cancel_this_mission : "are you sure you want to cancel this mission ?" ,
        type_here : "type here" ,
        Will_Available_Soon : "Will Available Soon" ,
        Send_again : "Send again" ,
        Enter_your_email : "Enter your email" ,
        Please_enter_your_email_address_to_search_for_your_account : "Please enter your email address to search for your account" ,
        email : "Email" ,
        Please_enter_your_email : "Please enter your email" ,
        change_password : "Change Password" ,
        Please_enter_your_new_password_and_confirm_it_to_change_it : "Please enter your new password and confirm it to change it" ,
        password : "Password" ,
        confirm_password : "Confirm Password" ,
        please_fill_all_fields : "please fill all fields" ,
        password_and_confirmation_are_not_identical : "password and confirmation are not identical" ,
        Are_you_sure_you_want_to_logout : "Are you sure you want to logout ?" ,
        Logout_successfully : "Logout successfully" ,
        print : "print" ,
        Branches_Report : "Branches Report" ,
        Missions : "Missions" ,
        rate  : "rate" ,
        Error : "Error" ,
        You_dont_have_enough_money_to_create_a_new_mission : "please recharge your wallet to be able to create new mission" ,
        Please_enter_a_new_answer : "Please enter a new answer" ,
        Please_enter_a_new_answer_rate : "Please enter a new answer rate" ,
        Rating_must_be_between_0_and_100 : "Rating must be between 0 and 100" ,
        please_add_step_first : "please add step first" ,
        PrintingTime : "Printing Time", 
        General_rate : "General rate" ,
        Number_of_Missions : "Number of Missions" ,
        The_data_has_been_registered_successfully_and_is_awaiting_admin_approval : "The data has been registered successfully and is awaiting admin approval"
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
        Phone_Number : " رقم الهاتف " , 
        Forget_Password : "نسيت كلمة السر ؟ " ,
        Login : "تسجيل الدخول" , 
        Didnt_have_an_account : " لا تملك حساب ؟ " , 
        Register : " إنشاء حساب " , 
        Enter_your_phone_number : "أدخل رقم الهاتف الخاص بك" , 
        We_need_your_phone_number_to_create_an_account_and_log_in_with_later : "نحتاج إلى رقم هاتفك لإنشاء حساب وتسجيل الدخول به لاحقًا" , 
        confirm :"تأكيد" , 
        You_will_receive_an_email_with_a_verification_code_on :  "ستتلقى رسالة بريد إلكتروني تحتوي على رمز التحقق على" , 
        Verify : "تأكيد" , 
        change : "تغيير" , 
        Didnt_receive_anything : "لم تتلق أي شيء؟" , 
        Send_again_after : "إرسال مرة أخرى بعد" , 
        seconds : "ثانية" , 
        Available_Missions : "المهمات المتاحة" , 
        Highest_rating : "أعلى تصنيف" , 
        Lowest_rating : "أقل تصنيف" , 
        New_Missions : "المهمات الجديدة " , 
        published : "نشرت" , 
        noMissions : "لا يوجد اي مهمات " , 
        Support : "الدعم الفني " , 
        Messages : "الرسائل" ,
        Mystery_Support : "دعم ميستري" , 
        select_a_message_from_the_side_bar : "اختر رسالة من الشريط الجانبي" ,
        Send : "إرسال" ,
        Enter_Message : "أدخل رسالة" ,
        Post_Mission : "نشر المهمة" ,
        Title : "العنوان" ,
        Focus : "التركيز" ,
        Branch : "الفرع" ,
        Date : "التاريخ" ,
        Time : "الوقت" ,
        from : "من" ,
        to : "إلى" ,
        Purchase_voucher : "قسيمة شراء" ,
        Questionnaire : "الاستبيان" ,
        total_balance : "الرصيد الكلي" ,
        SAR : "ريال" ,
        New_Mission : "مهمة جديدة" ,
        type_what_you_want_him_her_to_focus_on : "اكتب ما تريد أن يركز عليه ! " ,
        Include_Purchase_voucher : "تضمين قسيمة شراء" ,
        Notes : "ملاحظات" ,
        Next : "التالي" ,
        previous : "السابق" ,
        Add_Question : "إضافة سؤال" ,
        Save : "حفظ" ,
        SaveAdmin : "حفظ استبيان الادمن" ,
        Questions : "الأسئلة" ,
        Take_photos : "التقط الصور" ,
        Yes : "نعم" ,
        No : "لا" ,
        Review_Requests : "مراجعة الطلبات" ,
        Accept : "قبول" ,
        Mission_Details : "تفاصيل المهمة" ,
        OVERALL_PERFORMANCE : "الأداء العام" ,
        YOUR_PERFORMANCE : "التقييم العام " ,
        SECTION_SUMMARY : "ملخص القسم" ,
        Comments : "التعليقات" ,
        Questions_Answers : "الأسئلة والأجوبة" ,
        show_Report : "عرض التقرير" ,
        Print_Report : "طباعة التقرير" ,
        New_Mission : "مهمة جديدة" ,
        Wait_Requests : "انتظار الطلبات" ,
        Pending_user_Acceptance : "انتظار قبول المستخدم" ,
        Current_Missions : "المهمات الحالية" ,
        Complete_Missions : "المهمات المكتملة" ,
        CanceledMissions : "المهمات الملغية" ,
        update : "تحديث" ,
        visitor_Rating : "تقييم الزائر" ,
        MysteryProfile : "ملف الزائر" ,
        MissionDetails : "تفاصيل المهمة" ,
        Cancel : "إلغاء" ,
        Delete : "حذف" ,
        Focus : "التركيز" ,
        locationAndTime : "الموقع والوقت" ,
        ReviewRequests : "مراجعة الطلبات" ,
        RateTheVisitor  : "قيم الزائر" ,
        Confirm : "تأكيد" ,
        VisitorName : "اسم الزائر" ,
        VisitorGender : "جنس الزائر" , 
        VisitorPhone : "جوال الزائر" ,  
        VisitorEmail : "ايميل الزائر" , 
        CompanyName : "اسم الشركة" ,
        MissionDate : "تاريخ المهمة" ,
        MissionTime : "وقت المهمة" ,
        BranchAddress : "عنوان الفرع" ,
        CompanyWebsite : "الموقع الالكتروني للشركة" ,
        CommercialRegistrationNo : "رقم السجل التجاري" ,
        AvailableMissions : "مهمة متاحة" ,
        totalBalance : "الرصيد الكلي" ,
        NewBranch : "فرع جديد" ,
        Add : "أضف" ,
        Required : "مطلوب" ,
        Optional : "اختياري" ,
        EnterAnewAnswer : "أدخل إجابة جديدة" ,
        RatingOfAnswerBetween0100 : "تقييم الإجابة من 0-100" ,
        EnterYourQuestion : "أدخل سؤالك" ,
        Yes : "نعم" ,
        No : "لا" ,
        hint : "تلميح" ,
        TakePhotos : "التقط الصور" ,
        chooseAQuestionType : "اختر نوع السؤال" ,
        SingleChoice : "اختيار واحد" ,
        multiChoice : "اختيار متعدد" ,
        yesOrNo : "نعم أو لا" ,
        rating : "تقييم" ,
        open : "مفتوح" ,
        uploadImages : "تحميل صور" ,
        headLine : "عنوان" ,
        Create_New_Questionnaire : "إنشاء استبيان جديد" ,
        Saved_Questioners : "الاستبيانات المحفوظة" ,
        Saved_admin_Questioners : " استبيانات الادمن" ,
        are_you_sure_you_want_to_save_this_Questionnaire : "هل أنت متأكد أنك تريد حفظ هذا الاستبيان؟" , 
        are_you_sure_you_want_to_delete_this_Questionnaire : "هل أنت متأكد أنك تريد حذف هذا الاستبيان؟" ,
        Changes_are_not_saved : "التغييرات غير محفوظة" ,
        edited_successfully : "تم التعديل بنجاح" ,
        branch_deleted_successfully : "تم حذف الفرع بنجاح" ,
        are_you_sure_you_want_to_add_this_mission : "هل أنت متأكد أنك تريد إضافة هذه المهمة؟" ,
        mission_added_successfully : "تمت إضافة المهمة بنجاح" ,
        please_fill_all_the_fields : "يرجى ملء جميع الحقول" ,
        are_you_sure_you_want_to_delete_this_branch : "هل أنت متأكد أنك تريد حذف هذا الفرع؟" ,
        branch_deleted_successfully : "تم حذف الفرع بنجاح" ,
        are_you_sure_you_want_to_accept_this_visitor : "هل أنت متأكد أنك تريد قبول هذا الزائر؟" ,
        are_you_sure_you_want_to_cancel_this_mission : "هل أنت متأكد أنك تريد إلغاء هذه المهمة؟" ,
        Will_Available_Soon : "سيتوفر قريبا  " ,
        type_here : "اكتب هنا" ,
        Send_again : "إرسال مرة أخرى" ,
        Enter_your_email : "أدخل بريدك الإلكتروني" ,
        Please_enter_your_email_address_to_search_for_your_account : "يرجى إدخال عنوان بريدك الإلكتروني للبحث عن حسابك" ,
        email : "البريد الإلكتروني" ,
        Please_enter_your_email : "الرجاء إدخال بريدك الإلكتروني" ,
        change_password : "تغيير كلمة المرور" ,
        Please_enter_your_new_password_and_confirm_it_to_change_it : "الرجاء إدخال كلمة المرور الجديدة وتأكيدها لتغييرها" ,
        password : "كلمة المرور" ,
        confirm_password : "تأكيد كلمة المرور" ,
        please_fill_all_fields : "يرجى ملء جميع الحقول" ,
        password_and_confirmation_are_not_identical : "كلمة المرور والتأكيد غير متطابقين" ,
        Are_you_sure_you_want_to_logout : "هل أنت متأكد أنك تريد تسجيل الخروج؟" ,
        Logout_successfully : "تم تسجيل الخروج بنجاح" ,
        print : "طباعة" , 
        Branches_Report : "تقرير الفروع" ,
        Missions : "مهمة" ,
        rate  : "التقييم" ,
        Error : "خطأ" ,
        You_dont_have_enough_money_to_create_a_new_mission : " يرجي شحن محفظتك لتتمكن من انشاء المهمات" ,
        Please_enter_a_new_answer : "الرجاء إدخال إجابة جديدة" ,
        Please_enter_a_new_answer_rate : "الرجاء إدخال تقييم للإجابة جديدة" ,
        Rating_must_be_between_0_and_100 : "يجب أن يكون التقييم بين 0 و 100" ,
        please_add_step_first : "يرجى إضافة خطوة أولا" ,
        PrintingTime : "وقت الطباعة" , 
        General_rate : "التقييم العام" , 
        Number_of_Missions : "عدد المهمات" ,
        The_data_has_been_registered_successfully_and_is_awaiting_admin_approval : "تم تسجيل البيانات بنجاح وفي انتظار موافقه الادمن"
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