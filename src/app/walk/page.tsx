import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";

export default function WalkPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header title="산책" />
      <h1>WalkPage</h1>
      <Navbar />
    </div>
  );
}
