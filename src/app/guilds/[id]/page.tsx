export default function GuildPage({ params }: { params: { id: string } }) {
  return <div className="container mx-auto py-8"><h1 className="text-3xl font-bold">Guild: {params.id}</h1></div>;
}
