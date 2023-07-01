type TranslationKeys = {
  [key: string]: {
    [language: string]: string;
  };
};

export const translation: TranslationKeys = {
  title: {
    English: "Plant with purpose, reap rewards",
    Hindi: "उद्देश्य से पौधे, अनंत पुरस्कार",
    Bangla: "উদ্দেশ্য সহ উদ্ভিদ, পুরষ্কার পুনরায় কাটা",
  },
  login: {
    English: "Login",
    Hindi: "लॉग इन",
    Bangla: "লগইন",
  },
  register: {
    English: "Register",
    Hindi: "रजिस्टर",
    Bangla: "নিবন্ধন করুন",
  },
  selectLanguage: {
    English: "Select Language",
    Hindi: "भाषा चुनें",
    Bangla: "ভাষা নির্বাচন করুন",
  },
  createnew_acc: {
    English: "Create new account",
    Hindi: "नया अकाउंट बनाएँ",
    Bangla: "নতুন অ্যাকাউন্ট তৈরি করুন",
  },
  forgot_pwd: {
    English: "Forgot Password?",
    Hindi: "पासवर्ड भूल गए?",
    Bangla: "পাসওয়ার্ড ভুলে গেছেন?",
  },
  login_title: {
    English: "Login here",
    Hindi: "यहां लॉगिन करें",
    Bangla: "এখানে লগইন করুন",
  },
  login_descript: {
    English: "Welcome Back",
    Hindi: "वापसी पर स्वागत है",
    Bangla: "স্বাগতম ফিরে",
  },
  login_opt: {
    English: "or continue with",
    Hindi: "या यहाँ से जारी रखें",
    Bangla: "বা চালিয়ে যান",
  },
  create_acc:{
    English: "Create account",
    Hindi: "अकाउंट बनाएं",
    Bangla: "অ্যাকাউন্ট তৈরি করুন",
  },
  acc_already:{
    English: "Already have an account",
    Hindi: "पहले से एक अकाउंट है",
    Bangla: "ইতিমধ্যে একটি অ্যাকাউন্ট আছে",
  }
};

export const getTranslation = (key: string, selectedLang: number): string => {
  return translation[key][
    selectedLang === 0
      ? "English"
      : selectedLang === 1
      ? "Bangla"
      : selectedLang === 2
      ? "Hindi"
      : ""
  ];
};
