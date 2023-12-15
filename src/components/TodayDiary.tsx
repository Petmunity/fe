import Image from "next/image";

interface TodayDiaryProps {
  name: string;
  userName: string;
}

interface AvatarProps {
  id?: number;
  src: string;
}
interface AvatarGroupProps {
  avatars: AvatarProps[];
}

// TODO: api 연결해야함
const AvatarCount: AvatarProps[] = [
  {
    id: 1,
    src: "/assets/avatar.png",
  },
  {
    id: 2,
    src: "/assets/avatar.png",
  },
  {
    id: 3,
    src: "/assets/avatar.png",
  },
  {
    id: 4,
    src: "/assets/avatar.png",
  },
  {
    id: 5,
    src: "/assets/avatar.png",
  },
];

export default function TodayDiary({ name, userName }: TodayDiaryProps) {
  return (
    <main className="flex flex-col px-4 pt-5 pb-7 rounded-xl space-y-5 shadow-sm bg-primary-100 border border-[#EAECF0]">
      <div className="flex justify-between">
        <span className="text-primary-300 text-sm">귀염둥이 {name}네 </span>
        <AvatarGroup avatars={AvatarCount} />
      </div>
      <div className="space-y-3">
        <div className="text-xl font-medium">
          {userName}님,
          <br />곧 영양제 챙겨줄 시간이네요!
        </div>
        <div className="flex justify-center">
          <Image
            src="/assets/dogBirthday.png"
            alt="dog"
            width={124}
            height={160}
          />
        </div>
      </div>
      <div className="flex  justify-between text-center px-3 items-center">
        <div className="flex flex-col">
          <span className="font-medium">1.8Km</span>
          <span className="text-xs">산책</span>
        </div>
        <div className="w-0.5 h-8 bg-primary-900"></div>
        <div className="flex flex-col">
          <span className="font-medium">3회</span>
          <span className="text-xs">밥</span>
        </div>
        <div className="w-0.5 h-8 bg-primary-900"></div>
        <div className="flex flex-col">
          <span className="font-medium">3회</span>
          <span className="text-xs">간식</span>
        </div>
        <div className="w-0.5 h-8 bg-primary-900"></div>
        <div className="flex flex-col">
          <span className="font-medium">5회</span>
          <span className="text-xs">화장실</span>
        </div>
      </div>
    </main>
  );
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <div className="rounded-full  border border-gray-200">
      <Image src={src} alt="avatar" width={24} height={24} />
    </div>
  );
};

const AvatarGroup = ({ avatars }: AvatarGroupProps) => {
  const maxVisibleAvatars = 2;
  const avatarsToDisplay = avatars.slice(0, maxVisibleAvatars);
  const remainingAvatarsCount = Math.max(0, avatars.length - maxVisibleAvatars);

  return (
    <div className="flex items-center">
      {avatarsToDisplay.map((avatar: AvatarProps, index: number) => (
        <div
          key={avatar.id}
          className="relative"
          style={{ marginLeft: index > 0 ? "-10px" : 0 }}
        >
          <Avatar src={avatar.src} />
        </div>
      ))}
      {remainingAvatarsCount > 0 && (
        <div className="relative">
          <div className="rounded-full border border-[#F5F8FD] flex items-center justify-center bg-[#F5F8FD] w-6 h-6 -ml-2.5">
            <span className="text-2xs font-medium text-primary">
              +{remainingAvatarsCount}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
