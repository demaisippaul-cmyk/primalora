import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// Procedural jewelry still life: three interlocking rings on a fine chain, turning slowly, with a faint mirrored reflection.
export function startJewelryScene(canvas: HTMLCanvasElement): () => void {
  if (!canvas.getContext("webgl2")) return () => {};
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.2, 9);

  const key = new THREE.DirectionalLight(0xffd59a, 3);
  key.position.set(-4, 5, 3);
  scene.add(key);
  const rim = new THREE.PointLight(0xffb060, 30, 20);
  rim.position.set(3, 1, 2);
  scene.add(rim);

  const gold = new THREE.MeshPhysicalMaterial({ color: 0xe0a84e, metalness: 1, roughness: 0.18, clearcoat: 0.6 });
  const rose = new THREE.MeshPhysicalMaterial({ color: 0xc98a5a, metalness: 1, roughness: 0.24 });
  const bronze = new THREE.MeshPhysicalMaterial({ color: 0xa8743c, metalness: 1, roughness: 0.3 });
  const stone = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0, transmission: 0.9, ior: 2.4, thickness: 0.2 });
  const disposables: { dispose(): void }[] = [gold, rose, bronze, stone, envTex, pmrem];

  const piece = new THREE.Group();
  const geo = (g: THREE.BufferGeometry) => (disposables.push(g), g);

  const ringA = new THREE.Mesh(geo(new THREE.TorusGeometry(1.15, 0.16, 48, 160)), gold);
  ringA.name = "ring-gold";
  ringA.rotation.set(0.3, 0.6, 0.2);
  const ringB = new THREE.Mesh(geo(new THREE.TorusGeometry(1.0, 0.09, 40, 160)), rose);
  ringB.name = "ring-rose";
  ringB.rotation.set(1.2, -0.4, 0.5);
  ringB.position.set(-0.25, -0.15, 0);
  const ringC = new THREE.Mesh(geo(new THREE.TorusGeometry(0.9, 0.11, 40, 160)), bronze);
  ringC.name = "ring-bronze";
  ringC.rotation.set(-0.5, 1.3, -0.3);
  ringC.position.set(0.25, -0.3, 0.1);
  piece.add(ringA, ringB, ringC);

  // pavé stones around the rose ring
  const gem = geo(new THREE.OctahedronGeometry(0.055));
  const pave = new THREE.InstancedMesh(gem, stone, 48);
  const m = new THREE.Matrix4();
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    m.makeTranslation(Math.cos(a) * 1.0, Math.sin(a) * 1.0, 0.09);
    pave.setMatrixAt(i, m);
  }
  ringB.add(pave);

  // fine chain of small links rising from the top
  const link = geo(new THREE.TorusGeometry(0.06, 0.016, 8, 20));
  const chain = new THREE.Group();
  for (const side of [-1, 1]) {
    for (let i = 0; i < 26; i++) {
      const l = new THREE.Mesh(link, gold);
      l.position.set(side * (0.12 + i * 0.03), 1.2 + i * 0.13, 0);
      l.rotation.set(0, i % 2 ? Math.PI / 2 : 0, side * 0.2);
      chain.add(l);
    }
  }
  piece.add(chain);
  piece.position.y = 0.6;
  scene.add(piece);

  // reflection pooled below, as on an obsidian surface
  const mirror = piece.clone();
  mirror.scale.y = -1;
  mirror.position.y = -2.9;
  mirror.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.material = (o.material as THREE.Material).clone();
      (o.material as THREE.Material).transparent = true;
      (o.material as THREE.Material).opacity = 0.22;
      disposables.push(o.material as THREE.Material);
    }
  });
  scene.add(mirror);

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < 640 ? 56 : 34;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(canvas);

  let frame = 0;
  const clock = new THREE.Clock();
  const draw = () => {
    const t = reduce ? 1.4 : clock.getElapsedTime();
    piece.rotation.y = t * 0.25;
    piece.rotation.z = Math.sin(t * 0.4) * 0.06;
    ringB.rotation.x = 1.2 + Math.sin(t * 0.5) * 0.1;
    mirror.rotation.copy(piece.rotation);
    mirror.rotation.z *= -1;
    key.position.x = Math.sin(t * 0.3) * 5;
    renderer.render(scene, camera);
  };
  const loop = () => {
    frame = requestAnimationFrame(loop);
    if (visible) draw();
  };
  if (reduce) draw();
  else loop();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
    io.disconnect();
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };
}
