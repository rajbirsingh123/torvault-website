import * as THREE from "three";

/**
 * Draws a stylized (not a literal reproduction of any real note) bill face
 * onto a canvas at runtime — ink-green ground, deckled border, a generic
 * portrait silhouette, and corner numerals — then hands it back as a
 * texture. Keeps the "no external assets" rule: nothing is loaded, it's
 * all drawn in-browser.
 */
function createDollarTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 256;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = "#7fb378";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "#2f5c33";
  ctx.lineWidth = 6;
  ctx.strokeRect(10, 10, w - 20, h - 20);

  ctx.fillStyle = "#2f5c33";
  for (let x = 26; x < w - 26; x += 16) {
    ctx.fillRect(x, 16, 5, 5);
    ctx.fillRect(x, h - 21, 5, 5);
  }
  for (let y = 26; y < h - 26; y += 16) {
    ctx.fillRect(16, y, 5, 5);
    ctx.fillRect(w - 21, y, 5, 5);
  }

  // generic portrait silhouette — head + shoulders, no real person
  ctx.fillStyle = "rgba(25, 46, 28, 0.55)";
  ctx.beginPath();
  ctx.ellipse(w * 0.36, h * 0.58, w * 0.1, h * 0.26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w * 0.36, h * 0.4, w * 0.052, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#2f5c33";
  ctx.lineWidth = 3;
  ctx.strokeRect(w * 0.22, h * 0.18, w * 0.28, h * 0.64);

  ctx.fillStyle = "#1f3b22";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `bold ${h * 0.4}px Georgia, serif`;
  ctx.fillText("$", w * 0.74, h * 0.54);

  ctx.font = `bold ${h * 0.13}px Georgia, serif`;
  ctx.fillText("100", w * 0.14, h * 0.17);
  ctx.save();
  ctx.translate(w * 0.86, h * 0.83);
  ctx.rotate(Math.PI);
  ctx.fillText("100", 0, 0);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

/**
 * A tileable brushed-steel bump map — fine randomized vertical streaks —
 * so the body and door panels catch light like machined metal instead of
 * reading as flat, solid-color CG boxes.
 */
function createBrushedMetalTexture(): THREE.CanvasTexture {
  const w = 256;
  const h = 256;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 1600; i++) {
    const x = Math.random() * w;
    const y0 = Math.random() * h;
    const len = 18 + Math.random() * 70;
    const shade = Math.round(105 + Math.random() * 95);
    ctx.strokeStyle = `rgba(${shade},${shade},${shade},0.3)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y0);
    ctx.lineTo(x + (Math.random() - 0.5) * 3, Math.min(h, y0 + len));
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

/**
 * Draws a brushed-metal nameplate with the Torvault wordmark, for the small
 * badge mounted above the handle. Same runtime-canvas approach as the bill
 * texture — no font/asset loading, just 2D drawing. The real bull mark
 * (the site's own existing icon-white.png) is layered in once it loads.
 */
function createLogoTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 128;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = "#0b1d3a";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for (let y = 4; y < h; y += 3) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // left margin reserved for the bull mark, loaded and drawn in separately
  // once it arrives
  const iconReserve = 108;
  const word = "TORVAULT";
  ctx.fillStyle = "#eaf2ff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 46px Arial, sans-serif";
  const spacing = 13;
  const charWidths = word.split("").map((ch) => ctx.measureText(ch).width);
  const totalWidth = charWidths.reduce((a, b) => a + b, 0) + spacing * (word.length - 1);
  const textCenter = iconReserve + (w - iconReserve) / 2;
  let x = textCenter - totalWidth / 2;
  for (let i = 0; i < word.length; i++) {
    ctx.fillText(word[i], x + charWidths[i] / 2, h * 0.42);
    x += charWidths[i] + spacing;
  }

  ctx.strokeStyle = "#4f97ee";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(textCenter - totalWidth * 0.42, h * 0.72);
  ctx.lineTo(textCenter + totalWidth * 0.42, h * 0.72);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

export type Bolt = { mesh: THREE.Mesh; from: THREE.Vector3; to: THREE.Vector3 };

export type SafeRig = {
  rig: THREE.Group;
  doorPivot: THREE.Group;
  door: THREE.Mesh;
  wheel: THREE.Group;
  dial: THREE.Group;
  dialKnobPivot: THREE.Group;
  keypad: THREE.Mesh;
  logoPlaque: THREE.Mesh;
  hardplate: THREE.Mesh;
  bolts: Bolt[];
  interiorLight: THREE.PointLight;
  bodyMat: THREE.MeshPhysicalMaterial;
  doorMat: THREE.MeshPhysicalMaterial;
  seamMat: THREE.MeshBasicMaterial;
  hardplateMat: THREE.MeshStandardMaterial;
  bodyW: number;
  bodyH: number;
  bodyD: number;
  doorW: number;
  doorH: number;
  doorT: number;
  /** Removes the rig and its light from the scene and frees all GPU resources. */
  dispose: () => void;
};

/**
 * Builds the one procedural Torvault safe model — body, door, handle wheel,
 * combination dial, nameplate, keypad, boltwork, and an interior shelf of
 * cash stacks plus a long-gun rack — and adds it to the given scene. No
 * external 3D assets; every texture is drawn at runtime onto a canvas.
 *
 * Shared by BuildStory (manufacturing/assembly/opening narrative) and
 * AboutStory (brand-story camera tour), so the one model stays consistent
 * instead of drifting across two hand-maintained copies. Callers drive their
 * own camera path and decide how much of the door-opening / assembly state
 * to animate — the rig starts in its "mid-assembly" pose (wheel/keypad
 * scaled to ~0, bolts retracted, door closed) since that's what BuildStory
 * needs; callers that want a already-finished safe (e.g. AboutStory) should
 * set wheel/keypad scale to 1 and move bolts to their `to` position right
 * after building.
 */
export function buildSafeRig(scene: THREE.Scene): SafeRig {
  const interiorLight = new THREE.PointLight(0xffe2b0, 0, 5, 1.6);
  interiorLight.position.set(-0.1, 0.7, 0.1);
  scene.add(interiorLight);

  // ---- materials
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x16233f,
    emissive: 0xbfe0ff,
    emissiveIntensity: 0,
    metalness: 0.85,
    roughness: 0.32,
    clearcoat: 0.55,
    clearcoatRoughness: 0.28,
  });
  const doorMat = new THREE.MeshPhysicalMaterial({
    color: 0x0f1d38,
    emissive: 0xbfe0ff,
    emissiveIntensity: 0,
    metalness: 0.86,
    roughness: 0.26,
    clearcoat: 0.6,
    clearcoatRoughness: 0.22,
  });
  const brushedTexture = createBrushedMetalTexture();
  bodyMat.bumpMap = brushedTexture;
  bodyMat.bumpScale = 0.0025;
  doorMat.bumpMap = brushedTexture;
  doorMat.bumpScale = 0.003;
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x1b2a4a,
    metalness: 0.3,
    roughness: 0.7,
  });
  const steelBolt = new THREE.MeshStandardMaterial({
    color: 0x2c3c5c,
    metalness: 0.82,
    roughness: 0.38,
  });
  const accentMetal = new THREE.MeshStandardMaterial({
    color: 0x2f7fe0,
    metalness: 0.9,
    roughness: 0.24,
  });
  // the handle: bright polished chrome/stainless — distinct from the
  // brand-blue accent trim used elsewhere. Without an environment map, a
  // fully mirror-smooth metal reads as near-black except for pinpoint
  // highlights, so roughness is kept high enough to spread the scene's
  // lights across the curved arms instead of crushing them to black
  const handleMat = new THREE.MeshPhysicalMaterial({
    color: 0xe7ecf2,
    metalness: 0.75,
    roughness: 0.2,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15,
  });
  const keypadMat = new THREE.MeshStandardMaterial({
    color: 0x090e18,
    metalness: 0.2,
    roughness: 0.5,
    emissive: 0x4f97ee,
    emissiveIntensity: 0,
  });
  const cashMatA = new THREE.MeshStandardMaterial({ color: 0x3f8f63, metalness: 0.05, roughness: 0.75 });
  const cashMatB = new THREE.MeshStandardMaterial({ color: 0x5aad7f, metalness: 0.05, roughness: 0.75 });
  const cashBandMat = new THREE.MeshStandardMaterial({ color: 0xd9a53e, metalness: 0.15, roughness: 0.5 });
  const dollarTexture = createDollarTexture();
  const cashFaceMat = new THREE.MeshStandardMaterial({ map: dollarTexture, metalness: 0.02, roughness: 0.85 });
  const logoTexture = createLogoTexture();
  const logoMat = new THREE.MeshStandardMaterial({ map: logoTexture, metalness: 0.35, roughness: 0.5 });
  const gunBarrelMat = new THREE.MeshStandardMaterial({ color: 0x3a4357, metalness: 0.75, roughness: 0.32 });
  const gunStockMat = new THREE.MeshStandardMaterial({ color: 0x241c15, metalness: 0.1, roughness: 0.75 });
  const seamMat = new THREE.MeshBasicMaterial({ color: 0xbfe0ff, transparent: true, opacity: 0 });

  // ---- the safe
  const bodyW = 2.0;
  const bodyH = 2.5;
  const bodyD = 1.6;
  const wallT = 0.15;

  const rig = new THREE.Group();
  scene.add(rig);

  const slab = (w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    rig.add(m);
    return m;
  };
  // back, top, bottom, left, right — an open-fronted box, so the interior
  // is naturally revealed once the door swings away (no boolean ops needed)
  slab(bodyW, bodyH, wallT, 0, 0, -bodyD / 2 + wallT / 2, bodyMat);
  slab(bodyW, wallT, bodyD, 0, bodyH / 2 - wallT / 2, 0, bodyMat);
  slab(bodyW, wallT, bodyD, 0, -bodyH / 2 + wallT / 2, 0, bodyMat);
  slab(wallT, bodyH, bodyD, -bodyW / 2 + wallT / 2, 0, 0, bodyMat);
  slab(wallT, bodyH, bodyD, bodyW / 2 - wallT / 2, 0, 0, bodyMat);

  // a plinth the body sits on, a raised bezel framing the opening, and
  // trim bars along the front edges — so it reads as a crafted vault, not
  // a plain welded box, from any angle
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(bodyW + 0.3, 0.12, bodyD + 0.22), steelBolt);
  plinth.position.set(0, -bodyH / 2 - 0.07, 0.03);
  rig.add(plinth);
  const plinthCap = new THREE.Mesh(new THREE.BoxGeometry(bodyW + 0.32, 0.02, bodyD + 0.24), accentMetal);
  plinthCap.position.set(0, -bodyH / 2 - 0.01, 0.03);
  rig.add(plinthCap);

  const bezelZ = bodyD / 2 + 0.006;
  const bezelT = 0.045;
  const bezel = (w: number, h: number, x: number, y: number) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.016), accentMetal);
    m.position.set(x, y, bezelZ);
    rig.add(m);
  };
  bezel(bodyW - 2 * wallT + bezelT * 2, bezelT, 0, bodyH / 2 - wallT - bezelT / 2);
  bezel(bodyW - 2 * wallT + bezelT * 2, bezelT, 0, -(bodyH / 2 - wallT - bezelT / 2));
  bezel(bezelT, bodyH - 2 * wallT - bezelT * 2, -(bodyW / 2 - wallT - bezelT / 2), 0);
  bezel(bezelT, bodyH - 2 * wallT - bezelT * 2, bodyW / 2 - wallT - bezelT / 2, 0);

  // sit proud of the body's front face (like the bezel above) instead of
  // flush with it — flush coplanar faces z-fight and shimmer as the
  // camera moves
  const cornerGeo = new THREE.BoxGeometry(0.032, bodyH - 0.04, 0.032);
  [-bodyW / 2 + 0.016, bodyW / 2 - 0.016].forEach((cx) => {
    const corner = new THREE.Mesh(cornerGeo, accentMetal);
    corner.position.set(cx, 0, bezelZ);
    rig.add(corner);
  });
  const topTrim = new THREE.Mesh(new THREE.BoxGeometry(bodyW - 0.02, 0.016, 0.032), accentMetal);
  topTrim.position.set(0, bodyH / 2 - 0.016, bezelZ);
  rig.add(topTrim);

  // interior shelf (left two-thirds) carrying banded cash stacks, plus an
  // open-floor gun rack on the right — what these safes are actually
  // bought to hold, not abstract placeholder blocks
  const shelfY = -0.25;
  const shelfW = 1.16;
  const shelf = new THREE.Mesh(new THREE.BoxGeometry(shelfW, 0.035, bodyD - 2 * wallT - 0.1), interiorMat);
  shelf.position.set(-bodyW / 2 + wallT + shelfW / 2, shelfY, 0);
  rig.add(shelf);

  function buildCashStack(x: number, z: number, layers: number, w: number, d: number) {
    const layerH = 0.0065;
    let y = shelfY + 0.0175;
    for (let i = 0; i < layers; i++) {
      const bill = new THREE.Mesh(new THREE.BoxGeometry(w, layerH, d), i % 2 === 0 ? cashMatA : cashMatB);
      bill.position.set(x, y + layerH / 2, z);
      rig.add(bill);
      y += layerH;
    }
    const band = new THREE.Mesh(new THREE.BoxGeometry(w + 0.006, layers * layerH * 0.34, d + 0.006), cashBandMat);
    band.position.set(x, shelfY + 0.0175 + (layers * layerH) / 2, z);
    rig.add(band);
    // face-up bill on top, printed via a runtime canvas texture (still no
    // external asset files) so the stack actually reads as cash up close
    const face = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.94, d * 0.94), cashFaceMat);
    face.rotation.x = -Math.PI / 2;
    face.position.set(x, y + 0.0005, z);
    rig.add(face);
  }
  buildCashStack(-0.42, 0.04, 16, 0.3, 0.2);
  buildCashStack(-0.2, -0.02, 11, 0.26, 0.17);
  buildCashStack(-0.3, 0.09, 7, 0.22, 0.15);

  // a pair of long guns racked upright on the open floor, back-right —
  // barrel, receiver, angled buttstock/grip/magazine and a trigger-guard
  // ring, rather than a plain barrel-and-block silhouette
  function buildRifle(x: number, z: number, lean: number) {
    const gun = new THREE.Group();
    gun.position.set(x, -1.1, z);
    gun.rotation.z = lean;
    rig.add(gun);

    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.78, 10), gunBarrelMat);
    barrel.position.y = 1.0;
    gun.add(barrel);

    const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.34, 0.045), gunBarrelMat);
    receiver.position.y = 0.52;
    gun.add(receiver);

    const stock = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.34, 0.05), gunStockMat);
    stock.position.set(0, 0.17, -0.02);
    stock.rotation.x = 0.12;
    gun.add(stock);

    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.14, 0.035), gunStockMat);
    grip.position.set(0, 0.32, 0.03);
    grip.rotation.x = -0.45;
    gun.add(grip);

    const mag = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.16, 0.05), gunStockMat);
    mag.position.set(0, 0.26, 0.055);
    mag.rotation.x = -0.28;
    gun.add(mag);

    const guard = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.006, 6, 12, Math.PI * 1.3), gunBarrelMat);
    guard.rotation.y = Math.PI / 2;
    guard.position.set(0, 0.34, 0.025);
    gun.add(guard);
  }
  const rackBar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 0.03), steelBolt);
  rackBar.position.set(0.62, -0.58, -0.58);
  rig.add(rackBar);
  buildRifle(0.5, -0.58, 0.07);
  buildRifle(0.66, -0.58, -0.05);

  // the glowing weld seam — a thin strip up the left-front edge
  const seam = new THREE.Mesh(new THREE.BoxGeometry(0.03, bodyH * 0.92, 0.03), seamMat);
  seam.position.set(-bodyW / 2 + wallT / 2, 0, bodyD / 2 - wallT / 2);
  rig.add(seam);

  // ---- the door, hinged on the left-front vertical edge
  const hingeX = -bodyW / 2;
  const doorPivot = new THREE.Group();
  doorPivot.position.set(hingeX, 0, bodyD / 2);
  rig.add(doorPivot);

  const doorW = bodyW * 0.94;
  const doorH = bodyH * 0.94;
  const doorT = 0.2;
  const door = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorH, doorT), doorMat);
  door.position.set(doorW / 2 + 0.02, 0, doorT / 2);
  doorPivot.add(door);

  const trim = new THREE.Mesh(new THREE.BoxGeometry(doorW - 0.1, doorH - 0.1, 0.02), accentMetal);
  trim.position.set(doorW / 2 + 0.02, 0, doorT + 0.01);
  doorPivot.add(trim);

  // the handle: a tri-spoke "spider" grip (central hub boss + three bent,
  // rounded-tip arms at 120°) — the handle style used on real high-security
  // vault doors, rather than a generic six-spoke wheel. Assembles into
  // place (scales up) during BuildStory's stage 1→2 — callers that want it
  // already mounted should set scale to 1
  const wheel = new THREE.Group();
  wheel.position.set(doorW * 0.62, 0.05, doorT + 0.08);
  wheel.scale.setScalar(0.001);
  doorPivot.add(wheel);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.078, 0.082, 0.09, 24), handleMat);
  hub.rotation.x = Math.PI / 2;
  wheel.add(hub);
  const hubCap = new THREE.Mesh(new THREE.SphereGeometry(0.078, 20, 20), handleMat);
  hubCap.position.z = 0.045;
  wheel.add(hubCap);
  // each arm bows forward off the door face before tapering back in,
  // ending in a rounded cap — built once as a curve and reused for all
  // three arms, just rotated 120° apart
  const armCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.065, 0, 0.015),
    new THREE.Vector3(0.18, 0, 0.1),
    new THREE.Vector3(0.33, 0, 0.045),
  ]);
  const armGeo = new THREE.TubeGeometry(armCurve, 16, 0.025, 10, false);
  const armTip = armCurve.getPoint(1);
  for (let i = 0; i < 3; i++) {
    const holder = new THREE.Group();
    holder.rotation.z = (i / 3) * Math.PI * 2;
    wheel.add(holder);
    const arm = new THREE.Mesh(armGeo, handleMat);
    holder.add(arm);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.027, 14, 14), handleMat);
    tip.position.copy(armTip);
    holder.add(tip);
  }

  // the combination dial — cast into the door, always visible; only its
  // knob turns during BuildStory's "fitted and function-tested" beat
  const dial = new THREE.Group();
  dial.position.set(doorW * 0.62 - 0.52, 0.05, doorT + 0.06);
  doorPivot.add(dial);
  const dialBezel = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.018, 32), accentMetal);
  dialBezel.rotation.x = Math.PI / 2;
  dial.add(dialBezel);
  const dialFace = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.006, 32), keypadMat);
  dialFace.rotation.x = Math.PI / 2;
  dialFace.position.z = 0.012;
  dial.add(dialFace);
  const tickGeo = new THREE.BoxGeometry(0.005, 0.016, 0.004);
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const tick = new THREE.Mesh(tickGeo, accentMetal);
    tick.position.set(Math.sin(angle) * 0.088, Math.cos(angle) * 0.088, 0.016);
    tick.rotation.z = -angle;
    dial.add(tick);
  }
  const dialKnobPivot = new THREE.Group();
  dialKnobPivot.position.z = 0.015;
  dial.add(dialKnobPivot);
  const dialKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.028, 24), steelBolt);
  dialKnob.rotation.x = Math.PI / 2;
  dialKnobPivot.add(dialKnob);
  const dialPointer = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.03, 0.006), accentMetal);
  dialPointer.position.set(0, 0.034, 0.016);
  dialKnobPivot.add(dialPointer);

  // the manufacturer nameplate, mounted above the handle — cast into the
  // door, always visible
  const logoPlaque = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.105, 0.012), logoMat);
  logoPlaque.position.set(doorW * 0.62, 0.47, doorT + 0.016);
  doorPivot.add(logoPlaque);

  // the keypad: a small flat plate above the nameplate — assembles during
  // BuildStory's stage 2; callers that want it already mounted should set
  // scale to 1
  const keypad = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.3, 0.02), keypadMat);
  keypad.position.set(doorW * 0.62, 0.78, doorT + 0.015);
  keypad.scale.setScalar(0.001);
  doorPivot.add(keypad);

  // the button grid cast into the keypad face — three columns of raised
  // keys (1–9, then */0/enter on the bottom row), the layout real
  // electronic-lock keypads use. Children of the keypad mesh so they
  // assemble and scale in together with it.
  const keyMat = new THREE.MeshPhysicalMaterial({
    color: 0xd7dde6,
    metalness: 0.85,
    roughness: 0.22,
    clearcoat: 0.6,
    clearcoatRoughness: 0.18,
  });
  const keyEnterMat = new THREE.MeshPhysicalMaterial({
    color: 0x7fe6a8,
    emissive: 0x2fe07a,
    emissiveIntensity: 0.55,
    metalness: 0.6,
    roughness: 0.2,
    clearcoat: 0.6,
    clearcoatRoughness: 0.18,
  });
  const keyGeo = new THREE.CylinderGeometry(0.021, 0.021, 0.014, 20);
  const keyColX = [-0.055, 0, 0.055];
  const keyRowY = [0.105, 0.035, -0.035, -0.105];
  keyRowY.forEach((y, row) => {
    keyColX.forEach((x, col) => {
      const isEnter = row === 3 && col === 2;
      const key = new THREE.Mesh(keyGeo, isEnter ? keyEnterMat : keyMat);
      key.rotation.x = Math.PI / 2;
      key.position.set(x, y, 0.017);
      keypad.add(key);
    });
  });

  // composite hardplate, bonded over the lock and boltwork before the wheel,
  // keypad, and bolts are fitted — invisible (scale 0, opacity 0) until a
  // caller drives it in; only ManufacturingStory does today
  const hardplateMat = new THREE.MeshStandardMaterial({
    color: 0x8d9099,
    metalness: 0.35,
    roughness: 0.6,
    transparent: true,
    opacity: 0,
  });
  const hardplate = new THREE.Mesh(new THREE.BoxGeometry(0.86, 1.05, 0.03), hardplateMat);
  hardplate.position.set(doorW * 0.62 - 0.26, 0.42, doorT * 0.5 + 0.02);
  hardplate.scale.setScalar(0.001);
  doorPivot.add(hardplate);

  // boltwork along the door's non-hinge edges — assembles by sliding in
  // from `from` to `to`; callers that want it already extended should move
  // each mesh to `to` right after building
  const bolts: Bolt[] = [];
  const boltGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.08, 10);
  const addBolt = (x: number, y: number, normal: THREE.Vector3) => {
    const mesh = new THREE.Mesh(boltGeo, steelBolt);
    mesh.rotation.x = Math.PI / 2;
    const to = new THREE.Vector3(x, y, doorT + 0.03);
    const from = to.clone().addScaledVector(normal, 0.5);
    mesh.position.copy(from);
    doorPivot.add(mesh);
    bolts.push({ mesh, from, to });
  };
  for (let i = 0; i < 4; i++) {
    const x = doorW * (0.2 + i * 0.22);
    addBolt(x, doorH / 2 - 0.08, new THREE.Vector3(0, 1, 0));
    addBolt(x, -doorH / 2 + 0.08, new THREE.Vector3(0, -1, 0));
  }

  // the real bull mark (the site's own existing icon-white.png, already
  // used as the favicon) is layered onto the nameplate once it loads
  let logoDisposed = false;
  const bullImg = new Image();
  bullImg.onload = () => {
    if (logoDisposed) return;
    const canvas = logoTexture.image as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = canvas.height * 0.64;
    ctx.drawImage(bullImg, canvas.height * 0.16, canvas.height * 0.18, size, size);
    logoTexture.needsUpdate = true;
  };
  bullImg.src = "/icon-white.png";

  function dispose() {
    logoDisposed = true;
    scene.remove(rig);
    scene.remove(interiorLight);
    rig.traverse((obj) => {
      if (obj instanceof THREE.Mesh) obj.geometry.dispose();
    });
    [
      bodyMat,
      doorMat,
      interiorMat,
      steelBolt,
      accentMetal,
      handleMat,
      keypadMat,
      keyMat,
      keyEnterMat,
      cashMatA,
      cashMatB,
      cashBandMat,
      cashFaceMat,
      logoMat,
      gunBarrelMat,
      gunStockMat,
      seamMat,
      hardplateMat,
    ].forEach((m) => m.dispose());
    dollarTexture.dispose();
    logoTexture.dispose();
    brushedTexture.dispose();
  }

  return {
    rig,
    doorPivot,
    door,
    wheel,
    dial,
    dialKnobPivot,
    keypad,
    logoPlaque,
    hardplate,
    bolts,
    interiorLight,
    bodyMat,
    doorMat,
    seamMat,
    hardplateMat,
    bodyW,
    bodyH,
    bodyD,
    doorW,
    doorH,
    doorT,
    dispose,
  };
}
