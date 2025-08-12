import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";
const currentLanguage = localStorage.getItem("language") || "en";
export const addBranch = createAsyncThunk(
"branch/addBranch", 
async (values) => {
    try {
        const token = localStorage.getItem('token');
    const response = await axios.post(
        "https://test.secretvisitor.co/dashboard/api/addBranch" ,{
            name:values.name,
            address:values.address , 
            lat : values.lat ,
            long : values.long
        },{
            headers: {
                "Authorization" : token , 
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
export const deleteBranch = createAsyncThunk(
    "branch/deleteBranch", 
    async (values) => {
        const token = localStorage.getItem('token');
        try {
        const response = await axios.get(
            `https://test.secretvisitor.co/dashboard/api/deleteBranch?branch_id=${values.id}` ,{
                headers: {
                    "Authorization" : token , 
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

export const getBranches = createAsyncThunk(
    "branch/getBranches", 
    async (values) => {
        const token = localStorage.getItem('token');
        try {
        const response = await axios.get(
            "https://test.secretvisitor.co/dashboard/api/getBranches" ,{
                headers: {
                    "Authorization" : token , 
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

export const updateBranch = createAsyncThunk(
    "branch/updateBranch", 
    async (values) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                "https://test.secretvisitor.co/dashboard/api/updateBranch" ,{
                    name: values.name,
                    address: values.address, 
                    lat: values.lat,
                    long: values.long,
                    branch_id: values.branch_id
                },{
                    headers: {
                        "Authorization" : token , 
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


const branchSlice = createSlice({
name: "branch",
initialState: {
    addBranchData: {},
    getBranchesData : {} ,
    getBranchesDataLoading : false ,
    deleteBranchData : {} ,
    deleteBranchLoading : false , 
    updateBranchData: {},
    updateBranchLoading: false,
    
},
extraReducers: (builder) => {
    builder
    .addCase(addBranch.fulfilled, (state, action) => {
        state.addBranchData = action.payload;
    }) 

    .addCase(getBranches.fulfilled, (state, action) => {
        state.getBranchesData = action.payload;
        state.getBranchesDataLoading = false;
    }) 
    .addCase(getBranches.pending, (state, action) => {
        state.getBranchesDataLoading = true;
    }) 
    .addCase(getBranches.rejected , (state, action) => {
        state.getBranchesDataLoading = false;
    })

    .addCase(deleteBranch.fulfilled , (state, action) => {
        state.deleteBranchData = action.payload;
        state.deleteBranchLoading = false;
    }) 
    .addCase(deleteBranch.pending, (state, action) => {
        state.deleteBranchLoading = true;
    }) 
    .addCase(deleteBranch.rejected , (state, action) => {
        state.deleteBranchLoading = false;
    })

    .addCase(updateBranch.fulfilled , (state, action) => {
        state.updateBranchData = action.payload;
        state.updateBranchLoading = false;
    }) 
    .addCase(updateBranch.pending, (state, action) => {
        state.updateBranchLoading = true;
    }) 
    .addCase(updateBranch.rejected , (state, action) => {
        state.updateBranchLoading = false;
    })

}
});

export default branchSlice.reducer;