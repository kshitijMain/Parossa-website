import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { isGlbAvailable } from "@/lib/checkStaticAsset";

const DISH_MODEL_URL = "/models/dish-placeholder.glb";

/** Warm gold key + cool indigo rim — brand tokens as light colours. */
const GOLD = "#F5A623";
const INDIGO = "#1B2A6B";

function TableSurface() {
  const geometry = useMemo(
    () => new THREE.CylinderGeometry(2.4, 2.4, 0.08, 64),
    [],
  );
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F3E6D4",
        roughness: 0.55,
        metalness: 0.05,
      }),
    [],
  );

  return (
    <mesh
      geometry={geometry}
      material={material}
      position={[0, -0.55, 0]}
      receiveShadow
    />
  );
}

/** Simple premium dish stack when the GLB is missing. */
function DishPrimitiveFallback() {
  const plateGeo = useMemo(
    () => new THREE.CylinderGeometry(0.55, 0.5, 0.06, 48),
    [],
  );
  const bowlGeo = useMemo(
    () =>
      new THREE.SphereGeometry(0.38, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55),
    [],
  );
  const moundGeo = useMemo(() => new THREE.SphereGeometry(0.28, 24, 16), []);

  const plateMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FBF7F1",
        roughness: 0.35,
        metalness: 0.1,
      }),
    [],
  );
  const bowlMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GOLD,
        roughness: 0.4,
        metalness: 0.35,
      }),
    [],
  );
  const foodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#E8821E",
        roughness: 0.65,
        metalness: 0.05,
      }),
    [],
  );

  return (
    <group position={[0, -0.12, 0]}>
      <mesh geometry={plateGeo} material={plateMat} castShadow receiveShadow />
      <mesh
        geometry={bowlGeo}
        material={bowlMat}
        position={[0, 0.12, 0]}
        castShadow
      />
      <mesh
        geometry={moundGeo}
        material={foodMat}
        position={[0, 0.22, 0]}
        scale={[1, 0.55, 1]}
        castShadow
      />
    </group>
  );
}

function DishFromGltf() {
  const { scene } = useGLTF(DISH_MODEL_URL);
  const cloned = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return root;
  }, [scene]);

  return <primitive object={cloned} scale={1.1} position={[0, -0.15, 0]} />;
}

/**
 * Loads /models/dish-placeholder.glb when present.
 * TODO: Add a Draco-compressed dish GLB (<100k tris). Falls back to primitives.
 */
function DishModel() {
  const [modelState, setModelState] = useState<"checking" | "ready" | "missing">(
    "checking",
  );

  useEffect(() => {
    let cancelled = false;

    isGlbAvailable(DISH_MODEL_URL)
      .then((available) => {
        if (cancelled) return;
        setModelState(available ? "ready" : "missing");
      })
      .catch(() => {
        if (!cancelled) setModelState("missing");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (modelState === "missing" || modelState === "checking") {
    return <DishPrimitiveFallback />;
  }

  return (
    <Suspense fallback={<DishPrimitiveFallback />}>
      <DishFromGltf />
    </Suspense>
  );
}

/** Slim phone / digital-ticket card beside the dish. */
function TicketElement() {
  const bodyGeo = useMemo(() => new THREE.BoxGeometry(0.42, 0.78, 0.04), []);
  const screenGeo = useMemo(() => new THREE.PlaneGeometry(0.34, 0.58), []);
  const ticketGeo = useMemo(() => new THREE.BoxGeometry(0.36, 0.2, 0.02), []);

  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: INDIGO,
        roughness: 0.35,
        metalness: 0.4,
      }),
    [],
  );
  const screenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FBF7F1",
        roughness: 0.25,
        metalness: 0.1,
        emissive: GOLD,
        emissiveIntensity: 0.12,
      }),
    [],
  );
  const ticketMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GOLD,
        roughness: 0.4,
        metalness: 0.45,
      }),
    [],
  );

  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.position.y = 0.15 + Math.sin(state.clock.elapsedTime * 0.7 + 1.2) * 0.03;
  });

  return (
    <group
      ref={group}
      position={[1.05, 0.1, 0.35]}
      rotation={[0.15, -0.45, 0.08]}
    >
      <mesh geometry={bodyGeo} material={bodyMat} castShadow />
      <mesh
        geometry={screenGeo}
        material={screenMat}
        position={[0, 0.02, 0.025]}
      />
      <mesh
        geometry={ticketGeo}
        material={ticketMat}
        position={[-0.55, 0.15, 0.1]}
        rotation={[0.2, 0.4, -0.3]}
        castShadow
      />
    </group>
  );
}

function FloatingDish() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    // Gentle float + very slow auto-rotate (refs only — no setState)
    g.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 0.85) * 0.045;
    g.rotation.y += 0.0018;
  });

  return (
    <group ref={group}>
      <DishModel />
    </group>
  );
}

function ScrollDollyCamera() {
  const { camera } = useThree();
  const base = useMemo(
    () => ({
      x: 0.35,
      y: 1.15,
      z: 4.2,
    }),
    [],
  );

  useFrame(() => {
    const maxScroll = Math.max(1, window.innerHeight);
    const t = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    camera.position.x = base.x;
    camera.position.y = base.y + t * 0.25;
    camera.position.z = base.z - t * 0.85;
    camera.lookAt(0, 0.1, 0);
  });

  return null;
}

export default function HeroScene() {
  return (
    <>
      <color attach="background" args={["#FBF7F1"]} />
      <fog attach="fog" args={["#FBF7F1", 8, 16]} />

      <ambientLight intensity={0.35} color="#FBF7F1" />
      {/* Warm gold key light */}
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.35}
        color={GOLD}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      {/* Cool indigo rim */}
      <directionalLight position={[-4, 2, -3]} intensity={0.75} color={INDIGO} />
      <spotLight
        position={[0, 5, 2]}
        intensity={0.35}
        angle={0.5}
        penumbra={0.8}
        color={GOLD}
      />

      <Environment preset="city" />

      <ScrollDollyCamera />

      <TableSurface />
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.45}
        scale={8}
        blur={2.5}
        far={4}
        color={INDIGO}
      />

      <FloatingDish />
      <TicketElement />

      <Preload all />
    </>
  );
}
