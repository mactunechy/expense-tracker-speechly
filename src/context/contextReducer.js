


export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

export const contextReducer = (state, action) => {
    switch (action.type) {
        case DELETE_TRANSACTION:
            const transactions = state.filter(t => t.id !== action.payload)
            localStorage.setItem('transactions', JSON.stringify(transactions))
            return transactions;
        case ADD_TRANSACTION:
            const newTransactions = [action.payload, ...state];
            localStorage.setItem('transactions', JSON.stringify(newTransactions));
            return newTransactions
        default:
            return state
    }
}