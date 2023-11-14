import React, { useEffect, useState } from "react";

export interface PositionCoordinates {
  lng: number;
  lat: number;
}

/**
 * @typedef {Object} CoordinatesData - 좌표 데이터 객체
 * @property {PositionCoordinates} position - 좌표 정보
 * @property {boolean} isError - 에러 여부
 */

/**
 * 주소를 받아서 좌표와 에러 여부를 담은 객체를 반환하는 훅
 * @param {string} address - 좌표를 가져올 주소
 * @returns {CoordinatesData} - 좌표 객체와 에러 여부를 담은 객체
 */
export default function useGetCoordinates(address: string) {
  const [isError, setIsError] = useState(false);
  const [position, setPosition] = useState<PositionCoordinates>({
    lng: 0,
    lat: 0,
  });

  useEffect(() => {
    let isMounted = true;

    const getCoordinates = () => {
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
    };

    getCoordinates();

    return () => {
      isMounted = false;
    };
  }, [address]);

  return { position, isError };
}
