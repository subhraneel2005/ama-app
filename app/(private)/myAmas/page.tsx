import AmasPageClient from '@/components/all-amas-client';
import { getSession } from '@/repositories/session.repository';
import React from 'react'

export default async function AmasServerSidePage() {

  const session = await getSession()

  if(session.type !== "user"){
    return <div className="text-destructive bg-destructive p-6">No Session found</div>
  }

  return (
    <div>
      <AmasPageClient username={session.user?.username!}/>
    </div>
  )
}
