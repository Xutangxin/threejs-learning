// 创建一个几何体需要6个步骤：

// 初始设置
// 创建场景
// 创建相机
// 创建立方体及外观
// 创建渲染器
// 渲染场景

import * as THREE from "three";

const scene = new THREE.Scene();

// 创建场景后，载入内容：
// 相机：Camera
// 物体形状：几何体Geometry
// 物体外观：材质Material
// 物体：网格模型Mesh
// 模型位置.position

// 相机
const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  3000
);
camera.position.z = 5;

scene.add(camera);

// 几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 材质
const material = new THREE.MeshBasicMaterial({
  color: "red",
});

// 物体
const mesh = new THREE.Mesh(geometry, material);

// 位置
mesh.position.set(1, 1, 1);

scene.add(mesh);

// 创建渲染器
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// 动画
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
