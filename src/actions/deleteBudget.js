// RRD imports 
import { redirect } from "react-router-dom";

// Library imports
import { toast } from "react-toastify";

// Helper functions
import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteBudget({params}) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
        });

        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id
        })

        associatedExpenses.forEach((expense) => {
            deleteItem({
                key: "expenses",
                id: expense.id
            })
        })

        toast.success("Budget deleted succesfully")
    } catch(e) {
        throw new Error("THere was a problem deleting your budget")
    }
    return redirect("/")
}
