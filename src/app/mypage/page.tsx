import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";

export default function Mypage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header title="마이페이지" />
      <h1>Mypage</h1>
      <Navbar />
    </div>
  );
}
