import AmaClientScreen from "@/components/ama-client-screen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/repositories/session.repository";
import { redirect } from "next/navigation";

export default async function AMAScreen() {
  const result = await getSession();

  if (result.type === "dbError") {
    return (
      <div className="min-h-screen w-full justify-center items-center flex">
        <Card className="w-[400px] text-center">
          <CardHeader>
            <CardTitle>Database Offline</CardTitle>
          </CardHeader>
          <CardContent>Cannot connect to database.</CardContent>
        </Card>
      </div>
    );
  }

  if (result.type === "generalError") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[400px] text-center">
          <CardHeader>
            <CardTitle>Server Error</CardTitle>
          </CardHeader>
          <CardContent>Something went wrong.</CardContent>
        </Card>
      </div>
    );
  }

  if (result.type === "noSession") redirect("/login");

  const user = result.user;

  return (
    <AmaClientScreen {...user}/>
  );
}
