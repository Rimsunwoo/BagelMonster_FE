"use client";

import React, { useEffect, useRef, useState } from "react";

interface KakaoMapProps {
  address: string;
}

export interface PositionCoordinates {
  lng: number;
  lat: number;
}

const KAKAO_MAP_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services&autoload=false`;

export default function KakaoMap({ address }: KakaoMapProps) {
  const [isError, setIsError] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const kakaoScript = document.createElement("script");
    kakaoScript.src = KAKAO_MAP_URL;
    document.head.appendChild(kakaoScript);

    let isMounted = true;

    kakaoScript.onload = () => {
      window.kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (data, status) => {
          if (mapRef.current !== null) {
            if (status === kakao.maps.services.Status.OK) {
              setIsError(false);
              const center = new window.kakao.maps.LatLng(+data[0].y, +data[0].x);
              const options = { center, lever: 4 };
              const map = new window.kakao.maps.Map(mapRef.current, options);
              new window.kakao.maps.Marker({ map, position: center });
            } else {
              setIsError(true);
            }
          }
        });
      });
    };

    return () => {
      isMounted = false;
    };
  }, [mapRef]);

  return <div id="container" ref={mapRef} className="w-full h-[320px] rounded-lg"></div>;
}
