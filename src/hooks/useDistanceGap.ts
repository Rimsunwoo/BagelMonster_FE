import { useState } from "react";

import { getDistanceFromLatLonInKm } from "@/utils/distance";

const { kakao } = window;

export interface DistanceGap {
  [key: string]: number;
}

export default function useDistanceGap() {
  const [distanceGap, setDistanceGap] = useState<DistanceGap>({});

  const getDistanceGap = (storeId: number, address: string) => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (window.kakao) {
        const { latitude: currentLat, longitude: currentLng } = position.coords;

        window.kakao.maps.load(() => {
          const geocoder = new kakao.maps.services.Geocoder();

          geocoder.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const distanceGap = getDistanceFromLatLonInKm(+result[0].y, +result[0].x, currentLat, currentLng);
              setDistanceGap((prev) => ({ ...prev, [storeId]: distanceGap }));
            } else {
              setDistanceGap((prev) => ({ ...prev, [storeId]: 0 }));
            }
          });
        });
      }
    });
  };

  return { distanceGap, getDistanceGap };
}
