import * as THREE from "three";

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建地球几何体，材质
const earthGeometry = new THREE.SphereGeometry(8, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("./assets/earth.jpg"),
});
// 创建地球
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// 创建月球几何体，材质
const moonGeometry = new THREE.SphereGeometry(1, 16, 16);
const moonMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("./assets/moon.jpg"),
});

// 创建月球
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(15, 0, 0);
scene.add(moon);

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 添加点光源
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

function animate() {
  requestAnimationFrame(animate);
  // 地球自转
  earth.rotation.y += 0.01;

  moon.position.x = Math.cos((2 * Date.now()) / 1000) * 15;
  moon.position.z = Math.sin((2 * Date.now()) / 1000) * 15;

  moon.rotation.y += 0.02;

  renderer.render(scene, camera);
}

animate();
