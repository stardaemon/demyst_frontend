import { getConfig } from '../config';

const config = getConfig();

export interface balanceSheetReq {
    name: String;
    establishedYear: String;
    loanAmount: any;
    accountingProvider: String;
    type: null | String
}

export interface decisionReq extends balanceSheetReq {
    sheet: Array<never | Object>
}

export const fetchAccountingProviders = async (): Promise<string[]> => {
    const response = await fetch(`${config.baseUrl}/api/v1/accounting_providers`);
    const data = await response.json();
    return data.accountingProviders;
};

export const fetchBalanceSheet = async (data: balanceSheetReq): Promise<string[]> => {
    data.loanAmount = Number(data.loanAmount);
    data.type = data.accountingProvider;
    const response = await fetch(`${config.baseUrl}/api/v1/balance_sheet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}

export const fetchDecisionMaker = async(data:decisionReq): Promise<string[]> => {
    const response = await fetch(`${config.baseUrl}/api/v1/decision_maker`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}