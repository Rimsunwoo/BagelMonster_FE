"use client";

import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  address: string;
}

export interface PositionCoordinates {
  lng: number;
  lat: number;
}

export default function KakaoMap({ address }: KakaoMapProps) {
  const [isError, setIsError] = useState(false);
  const [position, setPosition] = useState<PositionCoordinates>({
    lng: 0,
    lat: 0,
  });

  useEffect(() => {
    let isMounted = true;

    window.kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (data, status) => {
        if (isMounted) {
          if (status === kakao.maps.services.Status.OK) {
            setIsError(false);
            setPosition({ lng: +data[0].x, lat: +data[0].y });
          } else {
            setIsError(true);
          }
        }
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Map center={position} className="w-full h-[320px] rounded-lg" level={4}>
      <MapMarker position={position}></MapMarker>
    </Map>
  );
}
