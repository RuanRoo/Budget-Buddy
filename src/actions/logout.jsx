import { redirect } from "react-router-dom";

// Library
import { toast } from "react-toastify";

// Helpers
import { deleteItem } from "../helpers";

export async function logoutAction() {
    // delete user
    deleteItem({
        key: "userName"
    })
    deleteItem({
        key: "budgets"
    })
    deleteItem({
        key: "expenses"
    })
    
    toast.success("You have succesfully deleted your account")

    // return redirect
    return redirect("/")
}
