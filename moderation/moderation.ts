import { checkIfStringIsUrl } from "./check-url";

interface UserTextProps {
    text: string,
    deviceId: string,
}

export async function moderationHandler({ text, deviceId }: UserTextProps){
    if(text === "" || deviceId === ""){
        return {
            message: "no data provided for moderation engine to run"
        }
    }

    const isTextUrl = checkIfStringIsUrl(text)

    if(isTextUrl) return {
        message: "this is a url. therefore question is invalid and spam."
    }

    

}