export default function PlayerPage({ params }: { params: { name: string } }) {
  return <div className="container mx-auto py-8"><h1 className="text-3xl font-bold">Player: {params.name}</h1></div>;
}
