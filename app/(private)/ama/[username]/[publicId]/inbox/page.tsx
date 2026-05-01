interface AmaSingleInboxPageProps {
    params: Promise<{
        username: string,
        publicId: string
    }>
}

export default async function AmaInbox({ params }: AmaSingleInboxPageProps) {

    const { username, publicId } = await params
  return (
    <div>page</div>
  )
}
