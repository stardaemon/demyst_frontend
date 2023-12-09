const UserReview = ({ userInput, sheet, onSubmit, onCancel }) => {
    return(
        <section className='flex flex-col rounded-xl border-2 border-solid p-10'>
            <p>BUSINESS NAME: {userInput.name}</p>
            <p>ESTABLISHED YEAR: {userInput.establishedYear}</p>
            <p>LOAN AMOUNT: {userInput.loanAmount}</p>
            <p>ACCOUNTING PROVIDER: {userInput.accountingProvider}</p>
            <br/>
            <pre>BALANCE SHEET</pre>
            <table>
                <tbody>
                    <tr>
                        <th>YEAR</th>
                        <th>MONTH</th>
                        <th>PROFIT/LOSS</th>
                        <th>ASSETS VALUE</th>
                    </tr>
                    {sheet.length > 0 
                        ? sheet.map((monthDetail: any) => (
                            <tr key={monthDetail}>
                                <td>{monthDetail.year}</td>
                                <td>{monthDetail.month}</td>
                                <td>{monthDetail.profitOrLoss}</td>
                                <td>{monthDetail.assetsValue}</td>
                            </tr>))
                        : <tr>
                            <td>No Data</td>
                            <td>No Data</td>
                            <td>No Data</td>
                            <td>No Data</td>
                        </tr>
                    }
                </tbody>
            </table>
            <button className='bg-red-700 w-96 mt-10 text-white p-2' type='submit' onClick={onCancel}>Cancel</button>
            <button className='bg-green-700 w-96 mt-10 text-white p-2' type='submit' onClick={onSubmit} >Confirm</button>
        </section>
    )
};

export default UserReview;