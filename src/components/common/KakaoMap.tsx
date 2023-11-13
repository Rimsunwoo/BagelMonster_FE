"use client";

import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  return (
    <>
      <Map center={{ lat: 33.450701, lng: 126.570667 }} style={{ width: "100%", height: "250px" }}>
        <MapMarker
          position={{
            lat: 33.450701,
            lng: 126.570667,
          }}
        ></MapMarker>
      </Map>
    </>
  );
}
