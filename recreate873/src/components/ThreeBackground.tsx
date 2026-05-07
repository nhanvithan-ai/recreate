import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf5c518, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 1. Golden Pearls
    const pearlCount = 20;
    const pearls: THREE.Mesh[] = [];
    const pearlMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5c518,
      metalness: 0.9,
      roughness: 0.1,
    });

    for (let i = 0; i < pearlCount; i++) {
      const radius = Math.random() * 0.15 + 0.05;
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const pearl = new THREE.Mesh(geometry, pearlMaterial);
      
      pearl.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      
      pearl.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        originalPos: pearl.position.clone()
      };

      scene.add(pearl);
      pearls.push(pearl);
    }

    // 2. Silk Ribbons
    const ribbonCount = 4;
    const ribbons: THREE.Mesh[] = [];
    const ribbonColors = [0x8b0000, 0x00008b, 0x013220, 0xdaa520];

    for (let i = 0; i < ribbonCount; i++) {
      const geometry = new THREE.PlaneGeometry(10, 0.2, 100, 1);
      const material = new THREE.MeshPhongMaterial({
        color: ribbonColors[i],
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const ribbon = new THREE.Mesh(geometry, material);
      
      ribbon.position.y = (Math.random() - 0.5) * 4;
      ribbon.position.z = -2;
      ribbon.rotation.x = Math.PI / 2;
      
      scene.add(ribbon);
      ribbons.push(ribbon);
    }

    // 3. Rotating Mandala texture (Atmospheric)
    // For simplicity, we create a disk with mandala texture
    const mandalaBgLoader = new THREE.TextureLoader();
    const mandalaTexture = mandalaBgLoader.load("https://www.transparenttextures.com/patterns/mandala.png"); // placeholder pattern
    const mandalaGeo = new THREE.CircleGeometry(4, 64);
    const mandalaMat = new THREE.MeshBasicMaterial({
      color: 0xf5c518,
      transparent: true,
      opacity: 0.07,
      map: mandalaTexture,
    });
    const mandala = new THREE.Mesh(mandalaGeo, mandalaMat);
    mandala.position.z = -3;
    scene.add(mandala);

    // Mouse movement response (Parallax)
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Pearl movement
      pearls.forEach(pearl => {
        pearl.position.add(pearl.userData.velocity);
        
        // Boundaries
        if (Math.abs(pearl.position.x) > 6) pearl.userData.velocity.x *= -1;
        if (Math.abs(pearl.position.y) > 6) pearl.userData.velocity.y *= -1;

        // Parallax
        pearl.position.x += (mouseX * 0.05 - (pearl.position.x - pearl.userData.originalPos.x)) * 0.02;
        pearl.position.y += (mouseY * 0.05 - (pearl.position.y - pearl.userData.originalPos.y)) * 0.02;

        pearl.rotation.x += 0.01;
        pearl.rotation.y += 0.01;
      });

      // Ribbon waving
      const time = Date.now() * 0.001;
      ribbons.forEach((ribbon, idx) => {
        const positions = (ribbon.geometry.attributes.position as THREE.BufferAttribute).array;
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          positions[i + 2] = Math.sin(x * 0.5 + time + idx) * 0.3;
        }
        ribbon.geometry.attributes.position.needsUpdate = true;
        ribbon.rotation.z += 0.001 * (idx + 1);
      });

      // Mandala rotation
      mandala.rotation.z += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-20 pointer-events-none" />;
}
