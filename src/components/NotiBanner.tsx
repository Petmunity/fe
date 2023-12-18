interface NotiBannerProps {
  content: string;
  time: string;
}
// TODO: api 연결해야함

export default function NotiBanner({ content, time }: NotiBannerProps) {
  return (
    <div className="bg-gray-100 rounded-lg flex items-center justify-between p-3 mb-3">
      <div className="flex space-x-2">
        <h1 className="text-primary text-sm">알림-</h1>
        <p className="text-sm">{content}</p>
      </div>

      <span className="text-xs opacity-30">{time} 전</span>
    </div>
  );
}
