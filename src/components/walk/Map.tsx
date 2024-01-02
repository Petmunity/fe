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
import { useWalkStore } from "@/store/store";
import { useRouter } from "next/navigation";

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

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [prevPosition, setPrevPosition] = useState<Position | null>(null);

  const router = useRouter();

  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentPosition = { lat: latitude, lng: longitude };
        setCenter(currentPosition);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 },
    );
  };

  const startTracking = () => {
    if (!startTime) {
      setStartTime(new Date());
    }

    const track = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentPosition = { lat: latitude, lng: longitude };

          if (prevPosition && prevPosition !== center) {
            setPath((prevPath: Position[]) => [...prevPath, currentPosition]);

            const distance = calculateDistance(
              currentPosition.lat,
              currentPosition.lng,
              prevPosition.lat,
              prevPosition.lng,
            );
            setTotalDistance((prevDistance: number) => prevDistance + distance);
          }

          setPrevPosition(currentPosition);

          setTimerId(setTimeout(track, 1000));
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true },
      );
    };

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

  return (
    <div>
      <NavermapsProvider
        ncpClientId={`${process.env.NEXT_PUBLIC_NAVER_API_KEY}`}
      >
        <div className="flex flex-col">
          <Modal isOpen={isOpen} onClose={closeModal}>
            <div className="p-5 flex items-center flex-col">
              <button
                onClick={closeModal}
                className="border-b w-full border-b-primary-300 py-2 rounded-md "
              >
                산책 계속하기
              </button>
              <button className="w-full py-2" onClick={stopTracking}>
                산책 종료하기
              </button>
            </div>
          </Modal>
          <MapDiv style={{ width: "100%", height: "100vh" }}>
            <div className="relative">
              <button className="absolute top-64 left-2.5 z-10 bg-white flex items-center justify-center p-0.5 border border-black rounded">
                <Location
                  onClick={getMyLocation}
                  className="w-6 h-6 text-gray-800"
                />
              </button>
              <NaverMap defaultZoom={15} center={center} zoomControl={true}>
                {center.lat !== 0 && (
                  <Marker
                    position={center}
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
      <section className="absolute z-20 bottom-0 w-full ">
        <button onClick={openModal} form="hook-form" className="button-violet">
          도착
        </button>
      </section>
    </div>
  );
}
