import * as THREE from "three";

// 引入轨道控制器扩展库OrbitControls.js（必须）
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const sizes = {
  width: 800,
  height: 600,
};

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

// 创建场景
const scene = new THREE.Scene();

// 创建轨道控制器
// 2个参数：要控制的摄像机，用于事件侦听器的 HTML 元素
const controls = new OrbitControls(camera, renderer.domElement);

// 添加阻尼
controls.enableDamping = true;
controls.dampingFactor = 0.01;

// 自动旋转
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

scene.add(controls);

// 创建立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 创建网格
const gridHelper = new THREE.GridHelper(10, 10, 0x00ff00, "red");
scene.add(gridHelper);

// 监听相机变化
controls.addEventListener("change", () => {
  renderer.render(scene, camera);
});

// 动画
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  controls.update(); // 更新轨道控制器

  renderer.render(scene, camera);
}

animate();
