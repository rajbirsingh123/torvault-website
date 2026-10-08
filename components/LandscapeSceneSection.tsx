"use client";

import { LandscapeScene } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export default function LandscapeSceneSection() {
  return (
    <div className="shader-frame">
      <LandscapeScene variant="night" />
    </div>
  );
}
