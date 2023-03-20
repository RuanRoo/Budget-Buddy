export const wait = () => new Promise(res => setTimeout(res, Math.random() * 1000))


// Generate random color
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
};

// Get all items
export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value)
}


// Create budget
export const createBudget = ({name, amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

// Create Expense
export const createExpense = ({name, amount, budgetId}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

// Delete expense
export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key);
    if(id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

// Total spent by budget
export const calculateSpentBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const BudgetSpent = expenses.reduce((acc, expense) => {
        // check if expense.id === budgetId passed in
        if(expense.budgetId !== budgetId) return acc

        // add current amount to total
        return acc += expense.amount
    }, 0)
    return BudgetSpent;
}

// Formatting

// Currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "ZAR"
    })
}

// Percentage
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}

export const formatDateToLocaleString = (epoch) => 
    new Date(epoch).toLocaleString();