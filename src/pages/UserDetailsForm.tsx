import React, { useState, useEffect } from 'react';
import { fetchAccountingProviders } from '../api/api';

const UserDetailsForm = (props) => {
    const [accountingProviders, setAccountingProviders] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        establishedYear: '',
        loanAmount: '',
        accountingProvider: ''
    });

    useEffect(() => {
        fetchAccountingProviders().then((providers) => {
          setAccountingProviders(providers);
        });
      }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.onSubmit(formData);
    };

    const clear = () => {
        setFormData({
            name: '',
            establishedYear: '',
            loanAmount: '',
            accountingProvider: ''
        })
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col rounded-xl border-2 border-solid p-10'>
            <select name='accountingProvider' value={formData.accountingProvider} required className='flex' onChange={handleChange}>
                <option value='' disabled selected>Accounting Provider</option>
                {accountingProviders.map((provider) => (
                    <option key={provider} value={provider}>{provider}</option>
                ))}
            </select>
            <input name='name' className='mt-3 rounded-sm border-1 border-solid p-1' required type='text' value={formData.name} onChange={handleChange} placeholder='Business Name'/>
            <input name='establishedYear' className='mt-3 rounded-sm border-1 border-solid p-1' required type='number' value={formData.establishedYear} onChange={handleChange} placeholder='Established Year' min='1000' max='2099' />
            <input name='loanAmount' className='mt-3 rounded-sm border-1 border-solid p-1' required type='number' value={formData.loanAmount} min='0' onChange={handleChange} placeholder='Loan Amount' />
            <button className='bg-green-700 w-96 mt-10 text-white p-2' type='submit'>Submit</button>
        </form>
    );
};

export default UserDetailsForm;