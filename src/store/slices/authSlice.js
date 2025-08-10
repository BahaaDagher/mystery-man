import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
const currentLanguage = localStorage.getItem("language") || "en";



export const userLogin = createAsyncThunk(
  "auth/userLogin", 
  async (values) => {
    
    try {
      const response = await axios.post(
        "https://test.secretvisitor.co/dashboard/api/loginMission" ,{
            phone:values.phone,
            password:values.password
        } , 
        {
          headers: {
            "lang" : currentLanguage ,
          },
        }
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});
export const userLogout = createAsyncThunk(
  "auth/userLogout", 
  async (values) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        "http://secretvisitor.co/dashboard/api/logout" ,{
            phone:values.phone,
            password:values.password
        },
        {
          headers: {
            "lang" : currentLanguage ,
            Authorization : token , 
          },
        }
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});
export const userRegister = createAsyncThunk(
  "auth/userRegister", 
  async (values) => {
      
      try {
        const response = await axios.post(
          "https://test.secretvisitor.co/dashboard/api/registerMission" ,
            values, 
            {
              headers: {
                "lang" : currentLanguage ,
              },
            }
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
  });
  
  export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp", 
    async (values) => {
        try {
          const response = await axios.post(
            "https://test.secretvisitor.co/dashboard/api/verifyOtpMission" ,
              values, 
              {
                headers: {
                  "lang" : currentLanguage ,
                },
              }
          );
          return response.data ;
        } catch (error) {
          console.error(error);
        }
  });
  export const resendOtp = createAsyncThunk(
    "auth/resendOtp", 
    async (values) => {
        try {
          const response = await axios.post(
            "https://test.secretvisitor.co/dashboard/api/resendOtp" ,
              values, 
              {
                headers: {
                  "lang" : currentLanguage ,
                },
              }
          );
          return response.data ;
        } catch (error) {
          console.error(error);
        }
  });
  export const forgetPassword = createAsyncThunk(
    "auth/forgetPassword",
    async (values) => {
        try {
          const response = await axios.post(
            "https://test.secretvisitor.co/dashboard/api/forgetPasswordMission" ,
              values, 
              {
                headers: {
                  "lang" : currentLanguage ,
                },
              }
          );
          console.log("response bahaa ",response)
          return response.data ;
        } catch (error) {
          console.error(error);
        }
  });
  export const verifyOtpPassword = createAsyncThunk(
    "auth/verifyOtpPassword", 
    async (values) => {
        try {
          const response = await axios.post(
            "https://test.secretvisitor.co/dashboard/api/verifyOtpPasswordMIssion" ,
              values, 
              {
                headers: {
                  "lang" : currentLanguage ,
                },
              }
          );
          return response.data ;
        } catch (error) {
          console.error(error);
        }
  });
  export const changePassword = createAsyncThunk(
    "auth/changePassword", 
    async (values) => {
        try {
          const response = await axios.post(
            "https://test.secretvisitor.co/dashboard/api/changePasswordMission" ,
              values, 
              {
                headers: {
                  "lang" : currentLanguage ,
                },
              }
          );
          return response.data ;
        } catch (error) {
          console.error(error);
        }
  });

  export const getCategories = createAsyncThunk(
    "branch/getCategories", 
    async (values) => {
        try {
        const response = await axios.get(
            "https://test.secretvisitor.co/dashboard/api/categories" ,{
                headers: {
                    "lang" : currentLanguage , 
                },
            }
        );
        return response.data ;
        } catch (error) {
            console.error(error);
        }
    }
    );
  

const authSlice = createSlice({
  name: "auth",
  initialState: {
    RegisterData: {},
    RegisterDataLoading: false, 
    LoginData: {},
    LoginDataLoading: false,
    userLogoutData: {},
    verifyOtpData: {},
    verifyOtpDataLoading: false,
    resendOtpData: {},
    resendOtpDataLoading: false,

    forgetPasswordData: {},
    forgetPasswordDataLoading: false,

    verifyOtpPasswordData: {},
    verifyOtpPasswordDataLoading: false,
    
    changePasswordData: {},
    changePasswordDataLoading: false,

    getCategoriesData : [],
    categoriesLoading : false,
  },
  extraReducers: (builder) => {
    builder
    // register
      .addCase(userRegister.fulfilled, (state, action) => {
        state.RegisterData = action.payload;
        state.RegisterDataLoading = false;
      }) 
      .addCase(userRegister.pending, (state, action) => {
        state.RegisterDataLoading = true;
      }) 
      .addCase(userRegister.rejected, (state, action) => {
        state.RegisterDataLoading = false;
      }) 
      // login
      .addCase(userLogin.fulfilled, (state, action) => {
        state.LoginData = action.payload;
        state.LoginDataLoading = false;
      })
      .addCase(userLogin.pending, (state, action) => {
        state.LoginDataLoading = true;
      }) 
      .addCase(userLogin.rejected, (state, action) => {
        state.LoginDataLoading = false;
      }) 
      //verify Otp
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.verifyOtpData = action.payload;
        state.verifyOtpDataLoading = false;
      })
      .addCase(verifyOtp.pending, (state, action) => {
        state.verifyOtpDataLoading = true;
      }) 
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifyOtpDataLoading = false;
      }) 
      //resend Otp
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.resendOtpData = action.payload;
        state.resendOtpDataLoading = false;
      })
      .addCase(resendOtp.pending, (state, action) => {
        state.resendOtpDataLoading = true;
      }) 
      .addCase(resendOtp.rejected, (state, action) => {
        state.resendOtpDataLoading = false;
      }) 
      //forget Password
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.forgetPasswordData = action.payload;
        state.forgetPasswordDataLoading = false;
      })
      .addCase(forgetPassword.pending, (state, action) => {
        state.forgetPasswordDataLoading = true;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.forgetPasswordDataLoading = false;
      })
      //verify Otp Password
      .addCase(verifyOtpPassword.fulfilled, (state, action) => {
        state.verifyOtpPasswordData = action.payload;
        state.verifyOtpPasswordDataLoading = false;
      })
      .addCase(verifyOtpPassword.pending, (state, action) => {
        state.verifyOtpPasswordDataLoading = true;
      })
      .addCase(verifyOtpPassword.rejected, (state, action) => {
        state.verifyOtpPasswordDataLoading = false;
      })
      //change Password
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePasswordData = action.payload;
        state.changePasswordDataLoading = false;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.changePasswordDataLoading = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordDataLoading = false;
      })
      //get Categories
      .addCase(getCategories.fulfilled, (state, action) => {
        state.getCategoriesData = action?.payload?.data?.categories;
        state.categoriesLoading = false;
      })
      .addCase(getCategories.pending, (state, action) => {
        state.categoriesLoading = true;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
      })

  }
});

export default authSlice.reducer;