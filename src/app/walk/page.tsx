import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import WalkingMap from "@/components/walk/WalkingMap";

export default function WalkPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header title="산책" />
      <main className="p-4">
        <WalkingMap />
      </main>

      <Navbar />
    </div>
  );
}
