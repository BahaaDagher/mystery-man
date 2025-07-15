import React, { useRef } from 'react'
import { Colors } from '../../../Theme';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setFocusedStep } from '../../../store/slices/questionierSlice';

const Input = styled("input")(({ theme }) => ({
    backgroundColor : "transparent" ,
    width : "80%" ,
    border: "1px solid transparent" , 
    borderBottom: `1px solid ${Colors.input}` , 
    outline : "none" ,
    fontSize : "20px" ,
    "::placeholder": {
      color: Colors.gray_l
    },
    padding : "0 10px" ,
  }));

const QuestionInput = ({ question, setQuestion }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleClickStep = () => {
    dispatch(setFocusedStep(-1));
  };

  const handleChange = (e) => {
    const { selectionStart, selectionEnd } = e.target;
    setQuestion(e.target.value);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(selectionStart, selectionEnd);
      }
    }, 0);
  };

  return (
    <Box margin="20px 0">
      <Input
        ref={inputRef}
        onClick={handleClickStep}
        placeholder={t("text.EnterYourQuestion")}
        type="text"
        value={question.title}
        onChange={handleChange}
      />
    </Box>
  );
}

export default QuestionInput;
