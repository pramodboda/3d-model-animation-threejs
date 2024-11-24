import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import { gsap } from "gsap";

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
    // appleWatch.position.x = 0;
    // appleWatch.position.y = 0.01;
    // appleWatch.position.z = 0;

    // appleWatch.rotation.x = 0.3;
    // appleWatch.rotation.y = -0.05;

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
  //   mixer.update(0.02);
};
reRender3D();

let arrPositionModel = [
  {
    id: "hero",
    position: { x: 0, y: 0.01, z: 0 },
    rotation: { x: 0, y: -0.15, z: 0 },
  },
  {
    id: "feature1",
    position: { x: 0, y: 0.01, z: 0 },
    rotation: { x: 1, y: 6.3, z: 0 },
  },
  {
    id: "feature2",
    position: { x: 1, y: 0.01, z: -0.05 },
    rotation: { x: 0, y: 0, z: 0 },
  },
  {
    id: "feature3",
    position: { x: 0, y: 0, z: 0.5 },
    rotation: { x: 0, y: 0.5, z: 0 },
  },
  {
    id: "feature4",
    position: { x: 1, y: -1, z: 0 },
    rotation: { x: 0.3, y: -0.5, z: 0 },
  },
];

const modelMode = () => {
  const sections = document.querySelectorAll(".section");
  let currentSection;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 3) {
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
      x: new_coordinates.position.z,
      duration: 3,
      ease: "power1.out",
    });
    gsap.to(appleWatch.rotation, {
      x: new_coordinates.rotation.x,
      y: new_coordinates.rotation.y,
      x: new_coordinates.rotation.z,
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
