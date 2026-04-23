import { getSession } from "@/repositories/session.repository";

export const authMiddleware = async() => {
    try {
        const user = await getSession()
        if(user.type === "noSession") return false;
        if(user.type === "generalError") return false;
        if(user.type === "dbError") return false;

    
        if(user.type === "user" && user.user.googleOauthId){
            return true
        }
        
    } catch (error) {
        console.error(error)
        return false
    }
}