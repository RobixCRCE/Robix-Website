import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let isHero3DInitialized = false;

export function initHero3D() {
  if (isHero3DInitialized) {
    return;
  }

  const desktop3D = window.matchMedia("(min-width: 769px)");
  if (!desktop3D.matches) {
    return;
  }

  const container = document.querySelector("#hero-3d-core");
  const canvas = document.querySelector("#hero-3d-canvas");

  if (!container || !canvas) {
    return;
  }

  isHero3DInitialized = true;

  // 1. Scene Setup
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  // Distance 4.8 gives a generous margin around the 3.4-unit logo
  camera.position.set(0, 0, 4.8);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  // 2. Sci-Fi Robotics Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambientLight);

  // Main white key light
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
  keyLight.position.set(4, 5, 4);
  scene.add(keyLight);

  // ROBIX Crimson Red Rim Light (reflects off beveled chamfers)
  const redRim = new THREE.DirectionalLight(0xff2222, 3.2);
  redRim.position.set(-4, 3, -3);
  scene.add(redRim);

  // Cyber Cyan Accent Light
  const cyanRim = new THREE.DirectionalLight(0x00e5ff, 2.0);
  cyanRim.position.set(4, -3, -2);
  scene.add(cyanRim);

  // Soft Front Fill
  const fillLight = new THREE.DirectionalLight(0xf0f4ff, 1.2);
  fillLight.position.set(0, 0, 5);
  scene.add(fillLight);

  // 3. Load GLB Model
  let model = null;
  const loader = new GLTFLoader();
  loader.load(
    "/models/robix-logo.glb",
    (gltf) => {
      model = gltf.scene;

      // Ensure model is centered and directly facing the user straight-on
      model.rotation.set(0, 0, 0);
      model.position.set(0, 0, 0);

      scene.add(model);
      
      // Render immediately once loaded
      renderer.render(scene, camera);
    },
    undefined,
    (err) => {
      console.error("Failed to load ROBIX 3D Model:", err);
    }
  );

  // 4. Mouse / Touch Interactive Parallax & Drag
  let mouseX = 0;
  let mouseY = 0;
  let isDragging = false;
  let prevPointerX = 0;
  let prevPointerY = 0;
  let dragVelocityX = 0;
  let dragVelocityY = 0;

  // Manual rotation offset from user drag (smoothly returns to 0 when idle)
  let userRotX = 0;
  let userRotY = 0;

  const heroSection = document.querySelector("#hero") || container;

  window.addEventListener("mousemove", (e) => {
    if (isDragging) return;
    const rect = heroSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = normX;
      mouseY = normY;
    }
  });

  // Pointer drag events on the canvas
  canvas.addEventListener("pointerdown", (e) => {
    isDragging = true;
    prevPointerX = e.clientX;
    prevPointerY = e.clientY;
    dragVelocityX = 0;
    dragVelocityY = 0;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = "grabbing";
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!isDragging || !model) return;
    const dx = e.clientX - prevPointerX;
    const dy = e.clientY - prevPointerY;
    prevPointerX = e.clientX;
    prevPointerY = e.clientY;

    dragVelocityX = dx * 0.008;
    dragVelocityY = dy * 0.008;

    userRotY += dragVelocityX;
    userRotX += dragVelocityY;
  });

  const stopDrag = () => {
    if (isDragging) {
      isDragging = false;
      canvas.style.cursor = "grab";
    }
  };
  canvas.addEventListener("pointerup", stopDrag);
  canvas.addEventListener("pointercancel", stopDrag);

  // 5. Responsive Resize
  const updateSize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width > 0 && height > 0) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }
  };

  const resizeObserver = new ResizeObserver(updateSize);
  resizeObserver.observe(container);
  window.addEventListener("resize", updateSize);
  // Initial size
  updateSize();

  // 6. Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    if (model) {
      if (isDragging) {
        model.rotation.y = userRotY;
        model.rotation.x = userRotX;
      } else {
        // Inertia damping after drag, then smoothly glide back toward center
        if (Math.abs(dragVelocityX) > 0.0001 || Math.abs(dragVelocityY) > 0.0001) {
          userRotY += dragVelocityX;
          userRotX += dragVelocityY;
          dragVelocityX *= 0.92;
          dragVelocityY *= 0.92;
          model.rotation.y = userRotY;
          model.rotation.x = userRotX;
        } else {
          // Slowly decay user drag back to 0 so the logo always returns to facing the user
          userRotY *= 0.97;
          userRotX *= 0.97;

          // Gentle ambient breathing sway (NEVER spins away, always faces front)
          const ambientYaw = Math.sin(time * 0.8) * 0.06;
          const ambientPitch = Math.cos(time * 0.6) * 0.03;

          // Subtle mouse gyro parallax (tilts towards cursor by ±10 degrees max)
          const parallaxYaw = mouseX * 0.22;
          const parallaxPitch = -mouseY * 0.15;

          const targetY = userRotY + ambientYaw + parallaxYaw;
          const targetX = userRotX + ambientPitch + parallaxPitch;

          model.rotation.y += (targetY - model.rotation.y) * 0.08;
          model.rotation.x += (targetX - model.rotation.x) * 0.08;

          // Gentle vertical floating breath
          model.position.y = Math.sin(time * 1.4) * 0.04;
        }
      }
    }

    renderer.render(scene, camera);
  }

  animate();
}
