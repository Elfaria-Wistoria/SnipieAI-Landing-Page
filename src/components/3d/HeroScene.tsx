"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera, Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { random } from "maath";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function NeuralParticles({ color }: { color: string }) {
    const ref = useRef<THREE.Points>(null);

    // Generate 5001 random points inside a sphere (divisible by 3)
    const sphere = useMemo(() => random.inSphere(new Float32Array(5001), { radius: 1.5 }), []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere as any} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={color}
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function DataRing({ radius = 2, speed = 1, rotation = [0, 0, 0], color }: { radius?: number, speed?: number, rotation?: [number, number, number], color: string }) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.z += delta * speed * 0.2;
        }
    });

    return (
        <group rotation={new THREE.Euler(...rotation)}>
            <mesh ref={ref}>
                <torusGeometry args={[radius, 0.02, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={0.4} />
            </mesh>
        </group>
    )
}

export default function HeroScene() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const color = mounted && resolvedTheme === "dark" ? "#ffffff" : "#adf91d";

    return (
        <div className="w-full h-full">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
                <Environment preset="city" />

                <ambientLight intensity={0.5} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <NeuralParticles color={color} />
                    <DataRing radius={2} speed={1} rotation={[Math.PI / 3, 0, 0]} color={color} />
                    <DataRing radius={2.2} speed={-0.8} rotation={[-Math.PI / 3, 0, 0]} color={color} />
                    <DataRing radius={1.8} speed={0.5} rotation={[0, Math.PI / 2, 0]} color={color} />
                </Float>
            </Canvas>
        </div>
    );
}
