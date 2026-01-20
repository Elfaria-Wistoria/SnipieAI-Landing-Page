"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera, Icosahedron, Torus, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function GeometricComposition({ color }: { color: string }) {
    return (
        <group>
            {/* Central Liquid Core */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Icosahedron args={[1.5, 0]}>
                    <MeshDistortMaterial
                        color={color}
                        envMapIntensity={0.4}
                        clearcoat={1}
                        clearcoatRoughness={0}
                        metalness={0.1}
                        distort={0.4}
                        speed={2}
                    />
                </Icosahedron>
            </Float>

            {/* Orbiting Rings */}
            <Float speed={4} rotationIntensity={1} floatIntensity={1}>
                {/* Outer Ring */}
                <group rotation={[Math.PI / 3, 0, 0]}>
                    <Torus args={[2.8, 0.05, 16, 100]}>
                        <meshStandardMaterial color={color} transparent opacity={0.3} metalness={1} roughness={0} />
                    </Torus>
                </group>

                {/* Inner Ring */}
                <group rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
                    <Torus args={[2.2, 0.05, 16, 100]}>
                        <meshStandardMaterial color={color} transparent opacity={0.5} metalness={1} roughness={0} />
                    </Torus>
                </group>
            </Float>
        </group>
    );
}

export default function HeroScene() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Theme-aware colors
    const color = mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000";

    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={50} />
                <Environment preset="city" />

                {/* Lighting Setup */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <spotLight position={[-10, -10, -5]} intensity={1} />

                {/* Scene Content */}
                <GeometricComposition color={color} />
            </Canvas>
        </div>
    );
}
