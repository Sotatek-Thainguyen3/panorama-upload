import React from "react";
import {
  ReactPhotoSphereViewer,
  type PluginConfig,
  type ViewerAPI,
} from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/plan-plugin/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import "leaflet/dist/leaflet.css";
import type { Viewer } from "@photo-sphere-viewer/core";
import PanoramaForm from "./PanoramaForm";

const PANOS = [
  "https://srv.eliusoutdoor.com/ws/api/immersive/images/?n=gran-sasso-1&t=p",
  "https://srv.eliusoutdoor.com/ws/api/immersive/images/?n=mondeval&t=p",
];

const plugins: PluginConfig[] | undefined = [];

function PanoramaView() {
  const photoSphereRef = React.useRef<ViewerAPI>(null);

  const handleClick = () => {
    photoSphereRef.current?.animate({
      yaw: 0,
      pitch: 0,
      zoom: 55,
      speed: "10rpm",
    });
  };

  const yaw = 0.8414429682353795; // rad
  const distance = 10; // meters

  // 1 độ vĩ độ ≈ 111320m
  const deltaLng = (distance * Math.sin(yaw)) / 111320; // ≈ 0.0000479
  const deltaLat = (distance * Math.cos(yaw)) / 111320; // ≈ -0.0000413

  // Vị trí mới:
  const gpsNode2 = [deltaLng, deltaLat, 3];
  console.log(gpsNode2);

  const handleReady = (instance: Viewer) => {
    const markersPlugs = instance.getPlugin(MarkersPlugin);
    if (!markersPlugs) return;
    console.log(markersPlugs);
    markersPlugs.addEventListener("select-marker", () => {
      console.log("asd");
    });
  };

  const handleUploadPanorama = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      photoSphereRef.current?.setPanorama(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    photoSphereRef.current?.setPanorama(PANOS[0]);
  };

  return (
    <div className="App">
      <div>
        <h2 className="mb-4">Photo Sphere Viewer</h2>
        <PanoramaForm onChange={handleUploadPanorama} onReset={handleReset} />
      </div>
      <ReactPhotoSphereViewer
        ref={photoSphereRef}
        panorama={PANOS[0]}
        defaultZoomLvl={0}
        // littlePlanet={true}
        // lang={{
        //   littlePlanetButton: "Little Planet",
        // }}
        hideNavbarButton={true}
        height={"calc(100vh - 115px - 8px)"}
        width={"100%"}
        onClick={handleClick}
        onReady={handleReady}
        src={""}
        plugins={plugins}
      />
    </div>
  );
}

export default PanoramaView;
