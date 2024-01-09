"use client";

import { useEffect, useState } from "react";
import {
  NavermapsProvider,
  Container as MapDiv,
  NaverMap,
  Marker,
} from "react-naver-maps";
import { toast } from "react-toastify";
import { Location } from "../icons";
import Skeleton from "../Skeleton";

export default function IntroMap() {
  const initialPosition = { lat: 37.3595704, lng: 127.105399 };

  const [center, setCenter] = useState(initialPosition);
  const [isLoading, setIsLoading] = useState(true);

  const getMyLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentPosition = { lat: latitude, lng: longitude };
          setCenter(currentPosition);
          setIsLoading(false);
          resolve(currentPosition);
        },
        (error) => {
          console.error(error);
          setIsLoading(false);
          reject(
            toast.error("현재 위치를 가져올 수 없습니다. 다시 시도해주세요."),
          );
        },
        { enableHighAccuracy: true },
      );
    });
  };

  const handleRecenter = async () => {
    await getMyLocation();
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleRecenter();
  }, []);

  if (isLoading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  return (
    <div className="text-center font-semibold text-xl relative">
      <button className="absolute top-72 left-2.5 z-10 bg-white flex items-center justify-center p-0.5 border border-black rounded">
        <Location onClick={handleRecenter} className="w-6 h-6 text-gray-800 " />
      </button>

      <NavermapsProvider
        ncpClientId={`${process.env.NEXT_PUBLIC_NAVER_API_KEY}`}
      >
        <MapDiv style={{ width: "100%", height: "400px" }}>
          <NaverMap defaultZoom={15} center={center} zoomControl={true}>
            <Marker key="myLocation" position={center} />
          </NaverMap>
        </MapDiv>
      </NavermapsProvider>
    </div>
  );
}
