import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#5c92ff");

const camera = new THREE.PerspectiveCamera();
camera.position.y = 3;
camera.position.z = 10;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({
  color: 0x0099ff,
  shininess: 150,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0.5, 0);

// 光源
cube.receiveShadow = true;
cube.castShadow = true;
scene.add(cube);

// 灯光效果
const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(3, 3, 5);
light.castShadow = true;
scene.add(light);

// 创建地面
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshPhongMaterial({
    color: 0x1b5e20,
  })
);
floor.rotation.x -= Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// 坐标辅助线
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 渲染器，动画
const renderer = new THREE.WebGLRenderer();
const scale = 0.9;
renderer.setSize(window.innerWidth * scale, window.innerHeight * scale);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();
