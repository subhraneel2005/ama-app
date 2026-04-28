    "use server";

    import { getActor } from "@/repositories/actor.repository";

    export async function checkActiveActor() {
    const res = await getActor();

    if (res.type === "actor") {
        return true;
    } else {
        return false;
    }
    }
