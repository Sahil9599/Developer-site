import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ServiceCategory } from '../types';
import { useAnalytics } from '../context/AnalyticsContext';
import { Eye, Layers, Compass, Sliders, RotateCcw, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface ThreeHeroSceneProps {
  onSelectService?: (service: ServiceCategory) => void;
  selectedService?: ServiceCategory | null;
}

// Scratch math helpers outside the animation loop to ensure Zero GC per frame
const _scratchVec1 = new THREE.Vector3();
const _scratchVec2 = new THREE.Vector3();
const _scratchTargetCamPos = new THREE.Vector3();
const _scratchTargetLookAt = new THREE.Vector3();

export const ThreeHeroScene: React.FC<ThreeHeroSceneProps> = ({
  onSelectService,
  selectedService
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { trackEvent } = useAnalytics();

  // Interactive UI states for the bottom control dock
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [activeFocus, setActiveFocus] = useState<ServiceCategory | 'overview'>('overview');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'sapphire' | 'amber'>('studio');
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [hoveredModuleName, setHoveredModuleName] = useState<string | null>(null);

  // References to keep mutable state accessible in the render loop without tearing down the canvas
  const stateRef = useRef({
    explodedFactor: 0,
    targetExploded: 0,
    activeFocus: 'overview' as ServiceCategory | 'overview',
    autoRotate: true,
    lightingPreset: 'studio' as 'studio' | 'sapphire' | 'amber',
    pointerX: 0,
    pointerY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    rotationY: 0,
    rotationX: 0.25,
    cameraTargetDistance: 9.0,
    currentCamPos: new THREE.Vector3(0, 3.2, 9.0),
    currentLookAt: new THREE.Vector3(0, 0.4, 0)
  });

  // Sync props and external states with stateRef
  useEffect(() => {
    stateRef.current.targetExploded = explodedFactor;
  }, [explodedFactor]);

  useEffect(() => {
    stateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    stateRef.current.lightingPreset = lightingPreset;
  }, [lightingPreset]);

  useEffect(() => {
    if (selectedService) {
      setActiveFocus(selectedService);
      stateRef.current.activeFocus = selectedService;
    }
  }, [selectedService]);

  const handleFocusChange = useCallback((focus: ServiceCategory | 'overview') => {
    setActiveFocus(focus);
    stateRef.current.activeFocus = focus;
    if (focus !== 'overview' && onSelectService) {
      onSelectService(focus);
      trackEvent('scene_interact', focus, `Focused 3D view on ${focus.toUpperCase()} module`);
    } else {
      trackEvent('scene_interact', undefined, 'Reset 3D view to full overview');
    }
  }, [onSelectService, trackEvent]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Renderer setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);
    scene.fog = new THREE.FogExp2(0x070b14, 0.055);

    const isHeadless = typeof navigator !== 'undefined' && (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 3.2, 9.0);

    // 3. Studio PBR Environment setup (RoomEnvironment + PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnvTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = roomEnvTexture;
    pmremGenerator.dispose();

    // 4. Balanced Studio Rig: Key + Fill + Rim Lights
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.2);
    keyLight.position.set(6, 10, 7);
    keyLight.castShadow = !isHeadless;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 25;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.4);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x6366f1, 2.0);
    rimLight.position.set(-8, 5, -8);
    scene.add(rimLight);

    // Procedural Grid Texture for the ground and screen modules
    const createProceduralCircuitTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, 512, 512);

      // Fine grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 512; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }

      // Circuit tracks and accents
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(64, 128);
      ctx.lineTo(192, 128);
      ctx.lineTo(256, 192);
      ctx.lineTo(448, 192);
      ctx.stroke();

      ctx.strokeStyle = '#818cf8';
      ctx.beginPath();
      ctx.moveTo(512 - 64, 384);
      ctx.lineTo(512 - 192, 384);
      ctx.lineTo(512 - 256, 320);
      ctx.lineTo(64, 320);
      ctx.stroke();

      // Nodes
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(192, 128, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(448, 192, 6, 0, Math.PI * 2);
      ctx.fill();

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return texture;
    };

    const circuitTexture = createProceduralCircuitTexture();

    // 5. Build Procedural Composite 3-12 Part Hero Subject (THREE.Group)
    // The subject represents a high-tech "Modular Architectural Core" showcasing:
    // 1) Heavy chamfered obsidian base pedestal
    // 2) Central crystalline core prism (MeshPhysicalMaterial)
    // 3) Four satellite service modules: Web console, Mobile device, Desktop mainframe, and Custom orbital rings
    // 4) Ground contact shadow disc flush with ground
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 0, 0);
    scene.add(heroGroup);

    // Part 1: Heavy Beveled Obsidian Base Pedestal
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0c1322,
      metalness: 0.85,
      roughness: 0.25,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });
    const baseGeom = new THREE.CylinderGeometry(2.8, 3.2, 0.4, 48);
    const baseMesh = new THREE.Mesh(baseGeom, baseMat);
    baseMesh.position.y = 0.2;
    baseMesh.receiveShadow = true;
    heroGroup.add(baseMesh);

    // Pedestal accent ring (Brushed titanium)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35
    });
    const ringGeom = new THREE.TorusGeometry(2.9, 0.04, 16, 64);
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.38;
    heroGroup.add(ringMesh);

    // Part 2: Central Crystal Column (MeshPhysicalMaterial)
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.1,
      roughness: 0.06,
      transmission: 0.85,
      ior: 1.54,
      thickness: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08
    });
    const crystalGeom = new THREE.CylinderGeometry(0.7, 0.9, 2.2, 6);
    const crystalMesh = new THREE.Mesh(crystalGeom, crystalMat);
    crystalMesh.position.y = 1.5;
    crystalMesh.castShadow = true;
    heroGroup.add(crystalMesh);

    // Internal Core Emitter
    const coreEmitterMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      emissive: 0x3b82f6,
      emissiveIntensity: 2.2,
      roughness: 0.2
    });
    const coreEmitterGeom = new THREE.OctahedronGeometry(0.42, 1);
    const coreEmitter = new THREE.Mesh(coreEmitterGeom, coreEmitterMat);
    coreEmitter.position.y = 1.5;
    heroGroup.add(coreEmitter);

    // Module 1: Web Application Console (North, Z: -2.2)
    const webGroup = new THREE.Group();
    webGroup.name = 'web_module';
    webGroup.userData = { category: 'web', label: 'Web Application Engineering' };

    const screenHousingMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2
    });
    const screenHousing = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.9, 0.08),
      screenHousingMat
    );
    screenHousing.castShadow = true;
    webGroup.add(screenHousing);

    const screenDisplayMat = new THREE.MeshStandardMaterial({
      map: circuitTexture,
      roughness: 0.3,
      metalness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6
    });
    const screenDisplay = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 0.8),
      screenDisplayMat
    );
    screenDisplay.position.z = 0.045;
    webGroup.add(screenDisplay);

    webGroup.position.set(0, 2.0, -2.2);
    webGroup.rotation.y = Math.PI;
    heroGroup.add(webGroup);

    // Module 2: Mobile Application Device (East, X: 2.2)
    const mobileGroup = new THREE.Group();
    mobileGroup.name = 'mobile_module';
    mobileGroup.userData = { category: 'mobile', label: 'Mobile Application Development' };

    const mobileBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.95,
      roughness: 0.15
    });
    const mobileBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 1.25, 0.08),
      mobileBodyMat
    );
    mobileBody.castShadow = true;
    mobileGroup.add(mobileBody);

    const mobileScreenMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.8,
      roughness: 0.1
    });
    const mobileScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.58, 1.15),
      mobileScreenMat
    );
    mobileScreen.position.z = 0.042;
    mobileGroup.add(mobileScreen);

    mobileGroup.position.set(2.2, 1.8, 0);
    mobileGroup.rotation.y = -Math.PI / 2;
    heroGroup.add(mobileGroup);

    // Module 3: Desktop Workstation Mainframe (South, Z: 2.2)
    const desktopGroup = new THREE.Group();
    desktopGroup.name = 'desktop_module';
    desktopGroup.userData = { category: 'desktop', label: 'Desktop Application Development' };

    const desktopCaseMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.9,
      roughness: 0.2
    });
    const desktopCase = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 1.3, 0.9),
      desktopCaseMat
    );
    desktopCase.castShadow = true;
    desktopGroup.add(desktopCase);

    // Cooling fin accents (Instanced / stacked)
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.4
    });
    for (let f = -0.4; f <= 0.4; f += 0.2) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.04, 0.92), finMat);
      fin.position.y = f;
      desktopGroup.add(fin);
    }

    desktopGroup.position.set(0, 1.7, 2.2);
    heroGroup.add(desktopGroup);

    // Module 4: Custom Enterprise Orbital Rings (West, X: -2.2)
    const customGroup = new THREE.Group();
    customGroup.name = 'custom_module';
    customGroup.userData = { category: 'custom', label: 'Custom Software Solutions' };

    const customRingMat1 = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0xd97706,
      emissiveIntensity: 0.5
    });
    const gyroRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.7, 0.05, 16, 48),
      customRingMat1
    );
    customGroup.add(gyroRing1);

    const customRingMat2 = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.95,
      roughness: 0.15
    });
    const gyroRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.04, 16, 48),
      customRingMat2
    );
    gyroRing2.rotation.x = Math.PI / 3;
    customGroup.add(gyroRing2);

    const centralNode = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.22, 1),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xf59e0b,
        emissiveIntensity: 1.8,
        roughness: 0.1
      })
    );
    customGroup.add(centralNode);

    customGroup.position.set(-2.2, 1.9, 0);
    heroGroup.add(customGroup);

    // Soft Radial Contact Grounding Shadow Plane
    // Offset by 0.02 on Y to eliminate Z-fighting
    const createContactShadowTexture = () => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d')!;
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      const t = new THREE.CanvasTexture(c);
      return t;
    };

    const contactShadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(7.5, 7.5),
      new THREE.MeshBasicMaterial({
        map: createContactShadowTexture(),
        transparent: true,
        depthWrite: false,
        opacity: 0.55
      })
    );
    contactShadowPlane.rotation.x = -Math.PI / 2;
    contactShadowPlane.position.y = 0.02;
    scene.add(contactShadowPlane);

    // Warm-up shaders
    renderer.compile(scene, camera);

    // Raycasting for interactive modules
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();
    const interactiveModules = [webGroup, mobileGroup, desktopGroup, customGroup];

    const getRaycastHit = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseCoord.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(heroGroup.children, true);
      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && obj !== heroGroup) {
          if (obj.userData?.category) {
            return obj;
          }
          obj = obj.parent;
        }
      }
      return null;
    };

    const onPointerMove = (e: MouseEvent) => {
      if (stateRef.current.isDragging) {
        const deltaX = e.clientX - stateRef.current.dragStartX;
        const deltaY = e.clientY - stateRef.current.dragStartY;
        stateRef.current.rotationY += deltaX * 0.006;
        stateRef.current.rotationX = Math.max(0.05, Math.min(0.85, stateRef.current.rotationX + deltaY * 0.005));
        stateRef.current.dragStartX = e.clientX;
        stateRef.current.dragStartY = e.clientY;
        stateRef.current.autoRotate = false;
        setAutoRotate(false);
      } else {
        const hit = getRaycastHit(e);
        if (hit && hit.userData?.label) {
          setHoveredModuleName(hit.userData.label);
          renderer.domElement.style.cursor = 'pointer';
        } else {
          setHoveredModuleName(null);
          renderer.domElement.style.cursor = 'grab';
        }
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStartX = e.clientX;
      stateRef.current.dragStartY = e.clientY;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const onPointerUp = (e: MouseEvent) => {
      const wasDraggedFar =
        Math.abs(e.clientX - stateRef.current.dragStartX) > 5 ||
        Math.abs(e.clientY - stateRef.current.dragStartY) > 5;
      stateRef.current.isDragging = false;
      renderer.domElement.style.cursor = 'grab';

      if (!wasDraggedFar) {
        const hit = getRaycastHit(e);
        if (hit && hit.userData?.category) {
          handleFocusChange(hit.userData.category);
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stateRef.current.cameraTargetDistance = Math.max(
        5.5,
        Math.min(13.0, stateRef.current.cameraTargetDistance + e.deltaY * 0.005)
      );
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousemove', onPointerMove);
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    domEl.addEventListener('wheel', onWheel, { passive: false });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. Lossless 60fps Loop with Exponential Damping
    let animationFrameId: number;
    let lastTime = performance.now();

    const renderLoop = (time: number) => {
      animationFrameId = requestAnimationFrame(renderLoop);
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const state = stateRef.current;

      // Smoothly interpolate exploded view factor using exponential damping
      const dampK = 5.0;
      state.explodedFactor += (state.targetExploded - state.explodedFactor) * (1 - Math.exp(-dampK * dt));

      // Apply exploded displacements to satellite modules
      const exp = state.explodedFactor;
      webGroup.position.set(0, 2.0 + exp * 0.8, -2.2 - exp * 1.4);
      mobileGroup.position.set(2.2 + exp * 1.4, 1.8 + exp * 0.4, 0);
      desktopGroup.position.set(0, 1.7 - exp * 0.2, 2.2 + exp * 1.4);
      customGroup.position.set(-2.2 - exp * 1.4, 1.9 + exp * 0.6, 0);

      // Procedural rotation for dynamic elements
      coreEmitter.rotation.y += 0.015;
      coreEmitter.rotation.x += 0.008;
      gyroRing1.rotation.y += 0.02;
      gyroRing1.rotation.z += 0.015;
      gyroRing2.rotation.x -= 0.018;

      // Auto-rotation when not user-dragged
      if (state.autoRotate && state.activeFocus === 'overview') {
        state.rotationY += 0.004;
      }

      // Camera positioning based on active focus mode
      let targetDist = state.cameraTargetDistance;
      let targetAngleY = state.rotationY;
      let targetAngleX = state.rotationX;
      let targetCenterY = 1.3;

      if (state.activeFocus === 'web') {
        targetAngleY = 0; // Look towards north
        targetAngleX = 0.2;
        targetDist = 6.2;
        targetCenterY = 2.0;
      } else if (state.activeFocus === 'mobile') {
        targetAngleY = Math.PI / 2; // Look towards east
        targetAngleX = 0.2;
        targetDist = 6.0;
        targetCenterY = 1.8;
      } else if (state.activeFocus === 'desktop') {
        targetAngleY = Math.PI; // Look towards south
        targetAngleX = 0.25;
        targetDist = 6.2;
        targetCenterY = 1.7;
      } else if (state.activeFocus === 'custom') {
        targetAngleY = -Math.PI / 2; // Look towards west
        targetAngleX = 0.2;
        targetDist = 6.0;
        targetCenterY = 1.9;
      }

      // Spherical coordinates calculation
      const cx = targetDist * Math.sin(targetAngleY) * Math.cos(targetAngleX);
      const cy = targetDist * Math.sin(targetAngleX) + targetCenterY;
      const cz = targetDist * Math.cos(targetAngleY) * Math.cos(targetAngleX);
      _scratchTargetCamPos.set(cx, cy, cz);
      _scratchTargetLookAt.set(0, targetCenterY, 0);

      // Smooth camera interpolation
      state.currentCamPos.lerp(_scratchTargetCamPos, 1 - Math.exp(-4.5 * dt));
      state.currentLookAt.lerp(_scratchTargetLookAt, 1 - Math.exp(-5.0 * dt));

      camera.position.copy(state.currentCamPos);
      camera.lookAt(state.currentLookAt);

      // Lighting preset dynamic tone adjustments
      if (state.lightingPreset === 'sapphire') {
        keyLight.color.setHex(0x38bdf8);
        keyLight.intensity = 3.6;
        rimLight.color.setHex(0x818cf8);
      } else if (state.lightingPreset === 'amber') {
        keyLight.color.setHex(0xf59e0b);
        keyLight.intensity = 3.4;
        rimLight.color.setHex(0xf97316);
      } else {
        keyLight.color.setHex(0xfff5ea);
        keyLight.intensity = 3.2;
        rimLight.color.setHex(0x6366f1);
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousemove', onPointerMove);
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      domEl.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);

      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
      renderer.dispose();
      circuitTexture.dispose();
    };
  }, [handleFocusChange]);

  return (
    <div className="relative w-full h-[620px] lg:h-[720px] overflow-hidden bg-[#070b14] select-none">
      {/* 3D WebGL Canvas mount container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Spec Badge & Instruction (Anti-slop clean typography) */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">System Architecture Matrix</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Procedural 3D Workstation Core</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="font-mono text-cyan-400">60 FPS PBR</span>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Drag to orbit scene · Click satellite modules to inspect service architecture
        </p>
      </div>

      {/* Hovered Module Indicator */}
      {hoveredModuleName && (
        <div className="absolute top-6 right-6 z-10 pointer-events-none bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-md text-xs text-cyan-300 font-medium shadow-md">
          Inspect: {hoveredModuleName}
        </div>
      )}

      {/* Unified Ergonomic Bottom Control Dock pinned at bottom center */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[860px] transition-all duration-300 ease-out ${
          isDockCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
        }`}
      >
        {/* Cinema / Zen Mode Collapse Bar */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-300 bg-slate-900/95 border border-slate-700/90 rounded-t-lg hover:text-white transition-colors cursor-pointer shadow-lg"
            title="Toggle compact 3D viewport mode"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Show 3D Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                <span>Collapse HUD</span>
              </>
            )}
          </button>
        </div>

        {/* Solid / RGBA Dock Container (Strictly avoiding backdrop-filter over WebGL) */}
        <div className="bg-[#0b1120]/95 border border-slate-700/80 rounded-xl p-3 md:p-4 shadow-2xl text-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center">
            {/* Zone 1: Service Focus Selector (Interactive segmented control) */}
            <div className="md:col-span-6 flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Service Perspective
              </span>
              <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
                <button
                  onClick={() => handleFocusChange('overview')}
                  className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap truncate ${
                    activeFocus === 'overview'
                      ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => handleFocusChange('web')}
                  className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap truncate ${
                    activeFocus === 'web'
                      ? 'bg-cyan-950 text-cyan-200 shadow-sm border border-cyan-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Web
                </button>
                <button
                  onClick={() => handleFocusChange('mobile')}
                  className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap truncate ${
                    activeFocus === 'mobile'
                      ? 'bg-blue-950 text-blue-200 shadow-sm border border-blue-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Mobile
                </button>
                <button
                  onClick={() => handleFocusChange('desktop')}
                  className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap truncate ${
                    activeFocus === 'desktop'
                      ? 'bg-indigo-950 text-indigo-200 shadow-sm border border-indigo-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => handleFocusChange('custom')}
                  className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap truncate ${
                    activeFocus === 'custom'
                      ? 'bg-amber-950 text-amber-200 shadow-sm border border-amber-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Custom
                </button>
              </div>
            </div>

            {/* Zone 2: Exploded Architecture Slider */}
            <div className="md:col-span-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span className="uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3 text-cyan-400" />
                  Exploded Core
                </span>
                <span className="font-mono text-cyan-300">{Math.round(explodedFactor * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={explodedFactor}
                onChange={e => {
                  const val = parseFloat(e.target.value);
                  setExplodedFactor(val);
                  trackEvent('scene_interact', undefined, `Adjusted exploded view to ${Math.round(val * 100)}%`);
                }}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Zone 3: Toggles & Lighting Preset */}
            <div className="md:col-span-3 flex items-center justify-end gap-2">
              {/* Auto rotate toggle */}
              <button
                onClick={() => {
                  setAutoRotate(!autoRotate);
                  trackEvent('scene_interact', undefined, `Toggled auto-rotation to ${!autoRotate}`);
                }}
                className={`p-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  autoRotate
                    ? 'bg-slate-800 text-cyan-300 border-cyan-800'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
                title="Toggle Auto Rotation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Lighting Preset */}
              <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
                <button
                  onClick={() => setLightingPreset('studio')}
                  className={`w-5 h-5 rounded-md border text-[10px] font-bold flex items-center justify-center transition-colors cursor-pointer ${
                    lightingPreset === 'studio'
                      ? 'bg-slate-200 text-slate-900 border-white'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                  title="Studio Cool Neutral"
                >
                  S
                </button>
                <button
                  onClick={() => setLightingPreset('sapphire')}
                  className={`w-5 h-5 rounded-md border text-[10px] font-bold flex items-center justify-center transition-colors cursor-pointer ${
                    lightingPreset === 'sapphire'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-300'
                      : 'bg-cyan-950 text-cyan-400 border-cyan-900'
                  }`}
                  title="Electric Sapphire"
                >
                  B
                </button>
                <button
                  onClick={() => setLightingPreset('amber')}
                  className={`w-5 h-5 rounded-md border text-[10px] font-bold flex items-center justify-center transition-colors cursor-pointer ${
                    lightingPreset === 'amber'
                      ? 'bg-amber-500 text-slate-950 border-amber-300'
                      : 'bg-amber-950 text-amber-400 border-amber-900'
                  }`}
                  title="Warm Amber"
                >
                  A
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
