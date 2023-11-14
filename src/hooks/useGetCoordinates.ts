import React, { useEffect, useState } from "react";

export interface PositionCoordinates {
  lng: number;
  lat: number;
}

export default function useGetCoordinates(address: string) {
  const [isError, setIsError] = useState(false);
  const [position, setPosition] = useState<PositionCoordinates>({
    lng: 0,
    lat: 0,
  });

  useEffect(() => {
    const getCoordinates = () => {
      window.kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            setIsError(false);
            setPosition({ lng: +data[0].x, lat: +data[0].y });
          } else setIsError(true);
        });
      });
    };

    getCoordinates();
  }, []);

  return { position, isError };
}
