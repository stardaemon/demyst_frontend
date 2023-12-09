import React, { useState, useRef } from 'react';
import UserDetailsForm from './pages/UserDetailsForm';
import UserReview from './pages/UserReview';
import { balanceSheetReq, fetchBalanceSheet, fetchDecisionMaker } from './api/api';

function App() {
    const [sheet, setSheet] = useState([])
    const [userInput, setuserInput] = useState({})
    const [step, setStep] = useState(1)
    const [applicationResult, setApplicationResult] = useState({
      approvalStatus: '',
      loanAmountApproved: 0,
    })
    const childref = useRef();

    const getBalanceSheet = (data:balanceSheetReq) => {
        setuserInput(data)
        fetchBalanceSheet(data).then((balanceSheet) => {
            setSheet((balanceSheet as any).sheet)
            setStep(2)
        })
    }

    const cancelReview = () => {
        (childref.current as any).clear();
        setStep(1)
    }

    const submitReview = () => {
        fetchDecisionMaker({
            name: (userInput as balanceSheetReq).name,
            establishedYear: (userInput as balanceSheetReq).establishedYear,
            loanAmount: (userInput as balanceSheetReq).loanAmount,
            accountingProvider: (userInput as balanceSheetReq).accountingProvider,
            type: (userInput as balanceSheetReq).accountingProvider,
            sheet: sheet,
        }).then((res) => {
          setApplicationResult(res as any);
          setStep(3);
        })
    }

    return (
        <div className='flex items-center justify-center w-full min-h-screen'>
            {step === 1 && <UserDetailsForm reference={childref} onSubmit={getBalanceSheet}/> } 
            {step === 2  
                && <UserReview
                    userInput={userInput}
                    sheet={sheet}
                    onCancel={cancelReview}
                    onSubmit={submitReview}
                />
            }
            {step === 3
                && <section className='flex flex-col items-center justify-center w-full min-h-screen'>
                      <h3><b>APPLICATION RESULT</b></h3>
                      <p>STATUS: {applicationResult.approvalStatus}</p>
                      <p>ALLOWED LOAN AMOUNT: {applicationResult.loanAmountApproved}</p>
                </section>
            }
        </div>
  );
}

export default App;
