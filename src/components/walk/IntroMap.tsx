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

export default function IntroMap() {
  const initialPosition = { lat: 37.3595704, lng: 127.105399 };
  const [center, setCenter] = useState(initialPosition);

  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentPosition = { lat: latitude, lng: longitude };
        setCenter(currentPosition);
      },
      (error) => {
        console.log(error);
        toast.error("현재 위치를 가져올 수 없습니다. 다시 시도해주세요.");
      },
      { enableHighAccuracy: true },
    );
  };

  useEffect(() => {
    getMyLocation();
  }, []);

  const handleRecenter = () => {
    getMyLocation();
  };

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
