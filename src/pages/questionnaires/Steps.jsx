import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Colors } from '../../Theme'
import { FlexSpaceBetween } from '../../components/FlexSpaceBetween';
import { Flex } from '../../components/Flex';
import { useDispatch, useSelector } from 'react-redux';
import { addStep, getSteps, updateStep, deleteStep } from '../../store/slices/stepSlice';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import editIcon from '../../assets/icons/editIcon.svg';
import deleteIcon from '../../assets/icons/deleteIcon.svg';

const PreviousQuestionnaire = styled(FlexSpaceBetween)(({ theme }) => ({
  borderRadius : "10px" ,
  padding : "10px" ,
  width : "96%" ,
  alignItems : "center" ,
  marginBottom : "10px" ,
  backgroundColor : Colors.bg  ,
  margin : "5px auto" ,
  
}));

const QuestionnaireName = styled("div")(({ theme }) => ({
  fontSize : "20px" ,
}));

const IconDiv = styled("div")(({ theme }) => ({
  width: "34px" , 
  height: "34px",
  padding: "5px",
  borderRadius: "5px",
  gap: "10px",
  backgroundColor : Colors.red , 
  display : "flex" , 
  justifyContent : "center" , 
  alignItems : "center" , 
  margin : "0 5px" ,
  cursor : "pointer" ,
  transition : "all 0.3s ease-in-out" ,
  "&:hover" : {
    backgroundColor : "#b9001d" 
  }
}));

const EditIconDiv = styled(IconDiv)(({ theme }) => ({
  backgroundColor : Colors.main , 
  "&:hover" : {
    backgroundColor : "#0056b3" 
  }
}));

const Steps = () => {
  const { t } = useTranslation();
  const [allSteps, setAllSteps] = useState([])
  const [firstTime, setFirstTime] = useState(true)
  
  const dispatch = useDispatch();

  const getStepsData = useSelector(state => state.stepData.getStepsData);
  const getStepsDataLoading = useSelector(state => state.stepData.getStepsLoading);
  const addStepData = useSelector(state => state.stepData.addStepData);
  const addStepLoading = useSelector(state => state.stepData.addStepLoading);
  const updateStepData = useSelector(state => state.stepData.updateStepData);
  const updateStepLoading = useSelector(state => state.stepData.updateStepLoading);
  const deleteStepData = useSelector(state => state.stepData.deleteStepData);
  const deleteStepLoading = useSelector(state => state.stepData.deleteStepLoading);

  useEffect(() => {
    dispatch(getSteps())
  }, [])

  useEffect(() => {
    if (getStepsData?.status) {
      setAllSteps(getStepsData?.data?.steps)
    }
  }, [getStepsData])

  const handleAddStep = () => {
    Swal.fire({
      title: 'Add New Step',
      input: 'text',
      inputLabel: 'Step Name',
      inputPlaceholder: 'Enter step name...',
      showCancelButton: true,
      confirmButtonText: 'Add Step',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write a step name!'
        }
      },
      showLoaderOnConfirm: true,
      preConfirm: (stepName) => {
        setFirstTime(false)
        return dispatch(addStep({name: stepName}))
        .then((result) => {
          if (result.error) {
            Swal.showValidationMessage(`Request failed: ${result.error.message}`)
          }
          return result
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`)
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        // The API call is handled in the preConfirm function
      }
    })
  }

  useEffect(() => {
    if (addStepData?.status && !firstTime) {
      Swal.fire({
        title: 'Success',
        text: 'Step added successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      // Refresh the steps list after adding
      dispatch(getSteps())
    }
  }, [addStepData])

  const handleUpdateStep = (step) => {
    Swal.fire({
      title: 'Update Step',
      input: 'text',
      inputLabel: 'Step Name',
      inputValue: step.name,
      inputPlaceholder: 'Enter step name...',
      showCancelButton: true,
      confirmButtonText: 'Update Step',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write a step name!'
        }
      },
      showLoaderOnConfirm: true,
      preConfirm: (stepName) => {
        return dispatch(updateStep({id: step.id, name: stepName}))
        .then((result) => {
          if (result.error) {
            Swal.showValidationMessage(`Request failed: ${result.error.message}`)
          }
          return result
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`)
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        // The API call is handled in the preConfirm function
      }
    })
  }

  const handleDeleteStep = (step) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete step "${step.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStep({id: step.id}))
      }
    })
  }

  useEffect(() => {
    if (updateStepData?.status) {
      Swal.fire({
        title: 'Success',
        text: 'Step updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      // Refresh the steps list after updating
      dispatch(getSteps())
    }
  }, [updateStepData])

  useEffect(() => {
    if (deleteStepData?.status) {
      Swal.fire({
        title: 'Success',
        text: 'Step deleted successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      // Refresh the steps list after deleting
      dispatch(getSteps())
    }
  }, [deleteStepData])

  return (
    <>
      {addStepLoading || getStepsDataLoading || updateStepLoading || deleteStepLoading ? <Loading/> : null}
      
      <div className='bg-white rounded-[12px]'>
        <div className='flex justify-between items-center text-[30px] font-bold bg-main rounded-[12px] text-white m-2 text-center mb-4 p-2'>
          <div>{t('text.Steps')}</div>
          <div className='text-main text-[18px] bg-white rounded-[100%] w-[30px] h-[30px] flex items-center justify-center cursor-pointer' onClick={() => {handleAddStep()}}>+</div>
        </div>
        <div className='p-4 overflow-y-auto max-h-[500px]'>
          {allSteps?.map((step, index) => (
            <PreviousQuestionnaire key={step.id}>
              <QuestionnaireName>{step.name}</QuestionnaireName>
              <Flex>
                <div className='cursor-pointer me-2' onClick={() => handleUpdateStep(step)}>
                  <img src={editIcon} alt="Edit" />
                </div>
                <div className='cursor-pointer' onClick={() => handleDeleteStep(step)}>
                  <img src={deleteIcon} alt="Delete" />
                </div>
              </Flex>
            </PreviousQuestionnaire>
          ))}
          {!allSteps || allSteps.length === 0 ? (
            <div className='text-center text-gray-500 py-8'>
              {t('text.No_steps_available')}
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Steps