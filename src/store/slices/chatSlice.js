import { createAsyncThunk } from "@reduxjs/toolkit";
import i18n from "../../i18n";
import axios from "axios";
const currentLanguage = localStorage.getItem("language") || "en";

export const getMissions = createAsyncThunk(
    "mission/getMissions", 
    async (values) => {
        console.log("i18n.lang", i18n.language)
        const token = localStorage.getItem('token');
        try {
        const response = await axios.get(
            `https://mystery.cloudy.mohamedmansi.com/api/getMissions` ,{
                headers: {
                    "Authorization" : token , 
                    "lang" : currentLanguage
                },
            }
        );
        return response.data ;
        } catch (error) {
        console.error(error);
        }
    }
    );