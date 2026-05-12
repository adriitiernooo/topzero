"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { LatLngExpression, PathOptions } from "leaflet";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import "leaflet/dist/leaflet.css";

type ValenciaMapProps = {
  recommended: string[];
};

type DistrictProperties = {
  codigo?: string | number;
  cod_dist?: string | number;
  distrito?: string | number;
  coddistrit?: string | number;
  COD_DIST?: string | number;
  CODDIST?: string | number;
};

const VALENCIA_CENTER: LatLngExpression = [39.4699, -0.3763];

export default function ValenciaMap({ recommended }: ValenciaMapProps) {
  const [geoData, setGeoData] =
    useState<FeatureCollection<Geometry, DistrictProperties> | null>(null);

  useEffect(() => {
    fetch("/maps/valencia-districts.geojson")
      .then((res) => res.json())
      .then((data: FeatureCollection<Geometry, DistrictProperties>) =>
        setGeoData(data)
      );
  }, []);

  const getColor = (district: string) => {
    const index = recommended.indexOf(district);

    if (index === 0) return "#071827";
    if (index === 1) return "#315b74";
    if (index === 2) return "#b9a98d";

    return "#d9d2c7";
  };

  const getDistrictCode = (properties: DistrictProperties = {}) => {
    const value =
      properties.codigo ??
      properties.cod_dist ??
      properties.distrito ??
      properties.coddistrit ??
      properties.COD_DIST ??
      properties.CODDIST ??
      "";

    return String(value).padStart(2, "0");
  };

  const districtStyle = (
    feature?: Feature<Geometry, DistrictProperties>
  ): PathOptions => {
    const district = getDistrictCode(feature?.properties);
    const districtStyle = (
  feature?: Feature<Geometry, DistrictProperties>
): PathOptions => {
  console.log("PROPERTIES MAPA:", feature?.properties);

  const district = getDistrictCode(feature?.properties);

  return {
    fillColor: getColor(district),
    weight: 2,
    opacity: 1,
    color: "#fffaf2",
    fillOpacity: 0.85,
  };
};
    return {
      fillColor: getColor(district),
      weight: 2,
      opacity: 1,
      color: "#fffaf2",
      fillOpacity: 0.85,
    };
  };

  return (
    <div className="overflow-hidden rounded-[36px] border border-[#ddd3c4] bg-[#fffaf2] shadow-xl shadow-[#b9a98d]/20">
      <MapContainer
        center={VALENCIA_CENTER}
        zoom={11}
        scrollWheelZoom={false}
        className="h-[520px] w-full"
      >
        <TileLayer
          attribution={"© OpenStreetMap contributors"}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoData && <GeoJSON data={geoData} style={districtStyle} />}
      </MapContainer>

      <div className="flex flex-wrap gap-4 p-6 text-sm text-[#5f6773]">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#071827]" />
          Mejor recomendación
        </span>

        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#315b74]" />
          Segunda opción
        </span>

        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#b9a98d]" />
          Tercera opción
        </span>
      </div>
    </div>
  );
}