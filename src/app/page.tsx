import Center from "@/components/Center";
import Loading from "@/components/Loading";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Center>
        <Loading />
      </Center>
    </main>
  );
}
