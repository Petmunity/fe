"use client";
import { useState, useEffect } from "react";
import {
  NaverMap,
  Marker,
  Polyline,
  NavermapsProvider,
  Container as MapDiv,
} from "react-naver-maps";
import { Location } from "../icons";
import { useModal } from "@hooks/useModal";
import { calculateDistance, formatTime } from "@/utils";
import Modal from "../common/Modal";
import { useWalkStore } from "@/store/walkStore";
import { useRouter } from "next/navigation";
import Skeleton from "../Skeleton";
import { toast } from "react-toastify";

interface Position {
  lat: number;
  lng: number;
}

export default function Map() {
  const { isOpen, openModal, closeModal } = useModal();
  const {
    center,
    setCenter,
    endPosition,
    setEndPosition,
    totalDistance,
    setTotalDistance,
    startTime,
    setEndTime,
    path,
    setPath,
    setStartTime,
    setTotalTime,
  } = useWalkStore();
  const initialPosition = { lat: 37.3595704, lng: 127.105399 };
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [prevPosition, setPrevPosition] = useState<Position | null>(null);
  const [startPostion, setStartPosition] = useState<Position | null>(
    initialPosition,
  );
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const changeLocation = () => {
    const newLocation = {
      lat: 37.50516316738,
      lng: 127.253240603371,
    };

    setPath((prevPath: Position[]) => [...prevPath, newLocation]);

    if (prevPosition) {
      const distance = calculateDistance(
        prevPosition.lat,
        prevPosition.lng,
        newLocation.lat,
        newLocation.lng,
      );

      setTotalDistance((prevDistance) => prevDistance + distance);
    }

    setCenter(newLocation); // 중심점 갱신
  };

  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position && position.coords) {
          const { latitude, longitude } = position.coords;
          const currentPosition = { lat: latitude, lng: longitude };
          setCenter(currentPosition);
          setStartPosition(currentPosition);
          setIsLoading(false);
        }
      },
      (error) => {
        toast.error(
          "현재 위치를 가져올 수 없습니다. 새로고침 후 다시 시도해주세요.",
        );
        setIsLoading(false);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 },
    );
  };

  const startTracking = () => {
    if (!startTime) {
      setStartTime(new Date());
    }

    const track = () => {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentPosition = { lat: latitude, lng: longitude };

          setPath((prevPath: Position[]) => [...prevPath, currentPosition]);

          if (prevPosition) {
            const distance = calculateDistance(
              prevPosition.lat,
              prevPosition.lng,
              currentPosition.lat,
              currentPosition.lng,
            );

            setTotalDistance((prevDistance) => prevDistance + distance);
          }

          setPrevPosition(currentPosition);
        },
        (error) => {
          toast.error(
            "현재 위치를 가져올 수 없습니다. 새로고침 후 다시 시도해주세요.",
          );
        },
        { enableHighAccuracy: true },
      );

      // 다음 위치 업데이트를 위해 재귀 호출 대신에 한 번만 타이머 설정
      setTimerId(setTimeout(track, 1000));
    };

    // 초기 타이머 설정
    setTimerId(setTimeout(track, 1000));
  };

  const stopTracking = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setEndPosition(center);
    if (startTime) {
      setEndTime(new Date());
      setTotalTime(new Date().getTime() - startTime.getTime());
    }
    router.push("/walk/complete");
  };

  useEffect(() => {
    getMyLocation();
    startTracking();

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <>
        <Skeleton className="w-full h-full" />;
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          현재 위치를 <br />
          가져오는 중입니다.
        </span>
      </>
    );
  }

  return (
    <div className="relative">
      <NavermapsProvider
        ncpClientId={`${process.env.NEXT_PUBLIC_NAVER_API_KEY}`}
      >
        <div className="flex flex-col">
          <Modal isOpen={isOpen} onClose={closeModal}>
            <div className="p-5 flex items-center flex-col">
              <button onClick={closeModal} className="border-b-2 w-full py-2">
                산책 계속하기
              </button>
              <button
                className="border-b-2  w-full py-2"
                onClick={stopTracking}
              >
                산책 종료하기
              </button>
              <button className="w-full py-2" onClick={changeLocation}>
                위치 변경하기(테스트용)
              </button>
            </div>
          </Modal>
          <MapDiv style={{ width: "100%", height: "90vh" }}>
            <div className="relative">
              <button className="absolute top-64 left-2.5 z-10 bg-white flex items-center justify-center p-0.5 border border-black rounded">
                <Location
                  onClick={getMyLocation}
                  className="w-6 h-6 text-gray-800"
                />
              </button>
              <NaverMap defaultZoom={15} center={center} zoomControl={true}>
                {startPostion?.lat && (
                  <Marker
                    position={startPostion}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    }}
                  />
                )}
                {endPosition?.lat && (
                  <Marker
                    position={endPosition}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    }}
                  />
                )}
                {path.length > 0 && (
                  <Polyline path={path} strokeColor={"#FF0000"} />
                )}
              </NaverMap>
            </div>
          </MapDiv>
          <div className="text-gray-800 p-2 absolute right-0 font-semibold text-sm">
            <p>산책 거리: {totalDistance.toFixed(2)} km</p>
            {startTime && (
              <p>
                산책 시간:{" "}
                {formatTime(new Date().getTime() - startTime.getTime())}
              </p>
            )}
          </div>
        </div>
      </NavermapsProvider>
      <section className="absolute z-20 bottom-0 w-full px-20 py-5">
        <button onClick={openModal} form="hook-form" className="button-violet">
          도착
        </button>
      </section>
    </div>
  );
}
