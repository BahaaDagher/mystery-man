import styled from '@emotion/styled';
import { Drawer } from '@mui/material';
import React, { useState } from 'react'
import { Colors } from '../Theme';


const Warning = ({text , openWarning , setOpenWarning}) => {
  return (
    <>
    <Drawer
        anchor= "left"
        variant="temporary"
        open={openWarning}
        onClose={()=> setOpenWarning(false)}
        ModalProps={{
            keepMounted: true,
        }}
        sx={{
            display : "flex" ,
            justifyContent : "center" ,
            alignItems : "center" ,
            "& .MuiDrawer-paper": {
                width: "500px",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "30px",
                textAlign: "center",
                borderRadius: "10px",
                color: Colors.second,
                position: "relative",
                margin : "0 20px"

            },
        }}
        >
            {text}
    </Drawer>
    </>
  )
}

export default Warning