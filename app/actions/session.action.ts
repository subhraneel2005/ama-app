"use server"

import { deleteSession, getSession } from "@/repositories/session.repository";

export async function logout(){
    return await deleteSession()
}

export async function checkActiveSession(){
    const result = await getSession()
    if(result.type === "user"){
        return true
    } else {
        return false
    }
}