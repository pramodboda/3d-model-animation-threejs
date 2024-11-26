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
  0.7,
  window.innerWidth / innerHeight,
  0.1,
  1000
);

camera.position.z = 13;

const scene = new THREE.Scene();

let appleWatch;
let mixer;

const gltfLoader = new GLTFLoader();

gltfLoader.load(
  "./assets/3d-models/apple_watch_ultra_-_orange.glb",
  function (gltf) {
    appleWatch = gltf.scene;
    // initial positions
    appleWatch.position.x = 0;
    appleWatch.position.y = -0.02;
    appleWatch.position.z = 0;

    appleWatch.rotation.x = 0;
    appleWatch.rotation.y = 0;
    appleWatch.rotation.z = 0;

    // comment above position code line and use this code for testing your current position
    // appleWatch.position.x = 0;
    // appleWatch.position.y = -0.03;
    // appleWatch.position.z = 5;

    // appleWatch.rotation.x = 0;
    // appleWatch.rotation.y = 4;
    // appleWatch.rotation.z = 0;
    // =======================================

    scene.add(appleWatch);

    mixer = new THREE.AnimationMixer(appleWatch);
    // console.log(mixer);
    mixer.clipAction(gltf.animations[0]).play();

    modelMode();
  },
  function (xhr) {},
  function (error) {}
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

// top light
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500);
scene.add(topLight);

const reRender3D = () => {
  requestAnimationFrame(reRender3D);
  renderer.render(scene, camera);
  // model self animation  speed
  // mixer.update(0.02);
};
reRender3D();

let arrPositionModel = [
  {
    id: "hero",
    position: { x: 0, y: -0.02, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  },
  {
    id: "feature1",
    position: { x: 0, y: -0.02, z: 0 },
    rotation: { x: 0, y: 5.8, z: 0 },
  },
  {
    id: "feature2",
    position: { x: 0.01, y: -0.02, z: 4.5 },
    rotation: { x: 0.5, y: -0.5, z: 0 },
  },
  {
    id: "feature3",
    position: { x: 0.002, y: -0.05, z: 5 },
    rotation: { x: -1.6, y: -0.61, z: -1.6 },
  },

  {
    id: "feature4",
    position: { x: 0.005, y: -0.03, z: 5 },
    rotation: { x: 0, y: 4, z: 0 },
  },

  // {
  //   id: "feature5",
  //   position: { x: 0, y: -0.1, z: 5 },
  //   rotation: { x: 0, y: 0, z: 0 },
  // },
];

const modelMode = () => {
  const sections = document.querySelectorAll(".section");
  let currentSection;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2) {
      currentSection = section.id;
    }
  });
  let position_active = arrPositionModel.findIndex(
    (val) => val.id === currentSection
  );
  if (position_active >= 0) {
    let new_coordinates = arrPositionModel[position_active];

    gsap.to(appleWatch.position, {
      x: new_coordinates.position.x,
      y: new_coordinates.position.y,
      z: new_coordinates.position.z,
      duration: 3,
      ease: "power1.out",
    });
    gsap.to(appleWatch.rotation, {
      x: new_coordinates.rotation.x,
      y: new_coordinates.rotation.y,
      z: new_coordinates.rotation.z,
      duration: 3,
      ease: "power1.out",
    });
  }
  //   console.log(currentSection);
};

// Animate on scroll
window.addEventListener("scroll", () => {
  if (appleWatch) {
    modelMode();
  }
});

// Responsive
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
