import AmaClientScreen from "@/components/ama-client-screen";
import ErrorCard from "@/components/error-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/repositories/session.repository";
import { redirect } from "next/navigation";

export default async function AMAScreen() {
  const result = await getSession();

  if (result.type === "dbError") {
    return (
      <ErrorCard title="Database Offline" message="Cannot connect to database." />
    );
  }

  if (result.type === "generalError") {
    return (
      <ErrorCard title="Server Error" message="Something went wrong." />
    );
  }

  if (result.type === "noSession") redirect("/login");

  const user = result.user;

  return (
    <AmaClientScreen username={user.username!} avatarUrl={user.avatarUrl!} email={user.email!}/>
  );
}
