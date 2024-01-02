/* eslint-disable prefer-const */
"use client";
import React, { useEffect, useState } from "react";

import {
  GoogleMap,
  Polyline,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import { Walk } from "../icons";
import { WalkLoading } from "../common/Loading";
import useWalkTimer from "@hooks/useWalkTimer";
import { MarkerType } from "@/types/walk";

const containerStyle = {
  width: "100%",
  height: "70vh",
};

let polylinePath: any[] = [];

const WalkingMap = () => {
  const [map, setMap] = useState(null);
  const [path, setPath] = useState<any[]>([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [watchId, setWatchId] = useState<any>(null);
  const [distance, setDistance] = useState(0);
  const [markerPosition, setMarkerPosition] = useState<MarkerType | null>(null);
  const [start, setStart] = useState(false);
  const [completeTime, setCompleteTime] = useState(0);

  const walkTime = useWalkTimer(start);

  if (typeof process.env.NEXT_PUBLIC_GOOGLE_API_KEY === "undefined") {
    console.error("Google API Key is missing!");
    return null;
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const onLoad = React.useCallback(
    function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(center);
      map.fitBounds(bounds);
      console.log(map, "map");
      setMap(map);
    },
    [center],
  );

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(currentPosition);
      });
    } else {
      alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  }, []);

  const startTracking = () => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition((position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarkerPosition(currentPosition);
        setCenter(currentPosition);
        polylinePath.push(currentPosition);
        setPath(polylinePath);
      });
      setWatchId(id);
      setStart(true);
    } else {
      alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  };

  const stopTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      calculateDistance();
      setCompleteTime(walkTime);
      setStart(false);
      setMarkerPosition(null);
    }
  };

  const calculateDistance = () => {
    let totalDistance = 0;
    for (let i = 0; i < polylinePath.length - 1; i++) {
      const p1 = new window.google.maps.LatLng(
        polylinePath[i].lat,
        polylinePath[i].lng,
      );
      const p2 = new window.google.maps.LatLng(
        polylinePath[i + 1].lat,
        polylinePath[i + 1].lng,
      );
      totalDistance +=
        window.google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
    }
    setDistance(totalDistance / 1000);
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markerPosition && <Marker position={markerPosition} icon={Walk} />}
        {start && <Polyline path={path} options={{ strokeColor: "#7839EE" }} />}
        {!start && (
          <Polyline path={path} options={{ strokeColor: "#FF0000" }} />
        )}
      </GoogleMap>
      <div className="flex justify-center p-2">
        {start ? (
          <button
            onClick={stopTracking}
            className="p-8 rounded-full bg-red-500 text-2xl font-semibold text-white "
          >
            종료
          </button>
        ) : (
          <button
            onClick={startTracking}
            className="p-8 rounded-full bg-primary text-2xl font-semibold text-white "
          >
            시작
          </button>
        )}
      </div>
      {start ? (
        <p>
          운동 시간: {Math.floor(walkTime / 60)} 분 {walkTime % 60} 초
        </p>
      ) : (
        <p>
          완료한 운동 시간: {Math.floor(completeTime / 60)} 분{" "}
          {completeTime % 60}초
        </p>
      )}
      <p>거리: {distance.toFixed(2)} km</p>
    </div>
  ) : (
    <WalkLoading />
  );
};

export default WalkingMap;
