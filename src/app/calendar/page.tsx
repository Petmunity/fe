import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";

export default function CalendarPage() {
  //   const { data, error } = useQuery('calendar', () => {
  //     return fetch('http://localhost:3000/api/calendar').then((res) =>
  //       res.json()
  //     );
  //   });

  //   if (error) {
  //     return <div>Error loading calendar</div>;
  //   }

  //   if (!data) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="캘린더" />
      <h1>Calendar</h1>
      <Navbar />
    </div>
  );
}
