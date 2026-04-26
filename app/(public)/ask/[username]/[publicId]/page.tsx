import AmaPage from "@/components/ama-card";
import { getAmaByPublicId } from "@/repositories/ama.repository";
import { getSession } from "@/repositories/session.repository";

interface AmaSinglePageProps {
    params: Promise<{
        publicId: string,
        username: string
    }>
}

export default async function AmaPublicPage({ params }: AmaSinglePageProps){

    const { publicId, username } = await params;

    const ama = await getAmaByPublicId(publicId)

    if(!ama){
        return <div>AMA not found</div>
    }
    const session = await getSession()

    let isOwner = false;
    let avatarUrl = ""

    if(session.type === "user" && session.user.id === ama.ownerId){
        isOwner = true
        avatarUrl = session.user.avatarUrl!
    }

return(
    <AmaPage amaTitle={ama.title!} isOwner={isOwner} username={username} avatarUrl={avatarUrl} link={ama.link!}/>
)
}