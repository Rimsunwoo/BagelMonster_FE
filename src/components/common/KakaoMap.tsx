"use client";

import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  address: string;
}

export default function KakaoMap({ address }: KakaoMapProps) {
  const [position, setPosition] = useState({
    lng: 0,
    lat: 0,
  });

  useEffect(() => {
    const getLocation = () => {
      window.kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            setPosition({ lng: +data[0].x, lat: +data[0].y });
          }
        });
      });
    };

    getLocation();
  }, []);

  return (
    <>
      <Map center={position} className="w-full h-[320px] rounded-lg" level={4}>
        <MapMarker position={position}></MapMarker>
      </Map>
    </>
  );
}
