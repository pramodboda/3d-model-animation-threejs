import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/*
    PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
    fov — Camera frustum vertical field of view.
    aspect — Camera frustum aspect ratio.
    near — Camera frustum near plane.
    far — Camera frustum far plane.
*/

const camera = new THREE.PerspectiveCamera(
  1,
  window.innerWidth / innerHeight,
  0.1,
  1000
);

camera.position.z = 13;

const scene = new THREE.Scene();

let appleWatch;

const gltfLoader = new GLTFLoader();

gltfLoader.load(
  "./assets/3d-models/apple_watch_ultra_-_orange.glb",
  function (gltf) {
    appleWatch = gltf.scene;
    scene.add(appleWatch);
  },
  function (xhr) {},
  function (error) {}
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);
const reRender3D = () => {
  requestAnimationFrame(reRender3D);
  renderer.render(scene, camera);
};
reRender3D();
