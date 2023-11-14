"use client";

import useGetCoordinates from "@/hooks/useGetCoordinates";
import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  address: string;
}

export default function KakaoMap({ address }: KakaoMapProps) {
  const { position, isError } = useGetCoordinates(address);

  return (
    <Map center={position} className="w-full h-[320px] rounded-lg" level={4}>
      <MapMarker position={position}></MapMarker>
    </Map>
  );
}
