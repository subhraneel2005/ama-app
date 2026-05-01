import AmaInboxComp from "@/components/ama-inbox";
import { getAmaWithQuestionsByPublicIdService } from "@/services/ama.service";

interface AmaSingleInboxPageProps {
  params: Promise<{
    username: string;
    publicId: string;
  }>;
}

export default async function AmaInbox({ params }: AmaSingleInboxPageProps) {
  const { username, publicId } = await params;

  const res = await getAmaWithQuestionsByPublicIdService(publicId);

  if (!res.success) {
    return (
      <div className="p-6 bg-red-400 rounded-xl border border-destructive">
        <span className="text-xl font-semibold tracking-tighter text-red-600">
          {res.reason}
        </span>
      </div>
    );
  }

  const ama = res.ama;

  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col">
      <AmaInboxComp username={username} ama={ama} />
    </div>
  );
}
