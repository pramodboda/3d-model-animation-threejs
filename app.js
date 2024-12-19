// import * as THREE from "three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// /*
//     PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
//     fov — Camera frustum vertical field of view.
//     aspect — Camera frustum aspect ratio.
//     near — Camera frustum near plane.
//     far — Camera frustum far plane.
// */

// const camera = new THREE.PerspectiveCamera(
//   0.7,
//   window.innerWidth / innerHeight,
//   0.1,
//   1000
// );

// camera.position.z = 13;

// const scene = new THREE.Scene();

// let appleWatch;
// let mixer;

// const gltfLoader = new GLTFLoader();

// gltfLoader.load(
//   "./assets/3d-models/apple_watch_ultra_-_orange.glb",
//   function (gltf) {
//     appleWatch = gltf.scene;
//     // initial positions
//     appleWatch.position.x = 0;
//     appleWatch.position.y = -0.02;
//     appleWatch.position.z = 0;

//     appleWatch.rotation.x = 0;
//     appleWatch.rotation.y = 0;
//     appleWatch.rotation.z = 0;

//     // comment above position code line and use this code for testing your current position
//     // appleWatch.position.x = 0;
//     // appleWatch.position.y = -0.03;
//     // appleWatch.position.z = 5;

//     // appleWatch.rotation.x = 0;
//     // appleWatch.rotation.y = 4;
//     // appleWatch.rotation.z = 0;
//     // =======================================

//     scene.add(appleWatch);

//     mixer = new THREE.AnimationMixer(appleWatch);
//     // console.log(mixer);
//     mixer.clipAction(gltf.animations[0]).play();

//     modelMode();
//   },
//   function (xhr) {},
//   function (error) {}
// );

// const renderer = new THREE.WebGLRenderer({ alpha: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById("container3D").appendChild(renderer.domElement);

// // light
// const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
// scene.add(ambientLight);

// // top light
// const topLight = new THREE.DirectionalLight(0xffffff, 1);
// topLight.position.set(500, 500);
// scene.add(topLight);

// const reRender3D = () => {
//   requestAnimationFrame(reRender3D);
//   renderer.render(scene, camera);
//   // model self animation  speed
//   // mixer.update(0.02);
// };
// reRender3D();

// let arrPositionModel = [
//   {
//     id: "hero",
//     position: { x: 0, y: -0.02, z: 0 },
//     rotation: { x: 0, y: 0, z: 0 },
//   },
//   {
//     id: "feature1",
//     position: { x: 0, y: -0.02, z: 0 },
//     rotation: { x: 0, y: 5.8, z: 0 },
//   },
//   {
//     id: "feature2",
//     position: { x: 0.01, y: -0.02, z: 4.5 },
//     rotation: { x: 0.5, y: -0.5, z: 0 },
//   },
//   {
//     id: "feature3",
//     position: { x: 0.002, y: -0.05, z: 5 },
//     rotation: { x: -1.6, y: -0.61, z: -1.6 },
//   },

//   {
//     id: "feature4",
//     position: { x: 0.005, y: -0.03, z: 5 },
//     rotation: { x: 0, y: 4, z: 0 },
//   },

//   // {
//   //   id: "feature5",
//   //   position: { x: 0, y: -0.1, z: 5 },
//   //   rotation: { x: 0, y: 0, z: 0 },
//   // },
// ];

// const modelMode = () => {
//   const sections = document.querySelectorAll(".section");
//   let currentSectionName;

//   sections.forEach((section) => {
//     const rect = section.getBoundingClientRect();
//     if (rect.top <= window.innerHeight / 2) {
//       currentSectionName = section.id;
//     }
//   });
//   let position_active = arrPositionModel.findIndex(
//     (val) => val.id === currentSectionName
//   );
//   if (position_active >= 0) {
//     let new_coordinates = arrPositionModel[position_active];

//     gsap.to(appleWatch.position, {
//       x: new_coordinates.position.x,
//       y: new_coordinates.position.y,
//       z: new_coordinates.position.z,
//       duration: 3,
//       ease: "power1.out",
//     });
//     gsap.to(appleWatch.rotation, {
//       x: new_coordinates.rotation.x,
//       y: new_coordinates.rotation.y,
//       z: new_coordinates.rotation.z,
//       duration: 3,
//       ease: "power1.out",
//     });
//   }
//   console.log(currentSectionName);
// };

// // Animate on scroll
// window.addEventListener("scroll", () => {
//   if (appleWatch) {
//     modelMode();
//   }
// });

// // Responsive
// window.addEventListener("resize", () => {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// });

// document.addEventListener("DOMContentLoaded", function () {
//   let currentSection = 1;
//   let totalSections = [...document.querySelectorAll(".section")];
//   function scrollToSection(section) {
//     currentSection = section;
//     document.querySelectorAll(".section").forEach((sec, index) => {
//       sec.style.transform = `translateY(-${(section - 1) * 100}vh)`;
//     });
//   }

//   function scrollUp() {
//     if (currentSection > 1) {
//       scrollToSection(currentSection - 1);
//     }
//   }

//   function scrollDown() {
//     if (currentSection < totalSections.length) {
//       scrollToSection(currentSection + 1);
//     }
//   }

//   // On Scroll based nav controls
//   document.addEventListener("wheel", (event) => {
//     if (event.deltaY > 0) {
//       scrollDown();
//     } else {
//       scrollUp();
//     }
//   });
// });

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Create a camera and scene
const camera = new THREE.PerspectiveCamera(
  0.7,
  window.innerWidth / window.innerHeight,
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
    appleWatch.position.set(0, -0.02, 0);
    appleWatch.rotation.set(0, 0, 0);

    scene.add(appleWatch);

    mixer = new THREE.AnimationMixer(appleWatch);
    mixer.clipAction(gltf.animations[0]).play();
    modelMode();
  },
  function (xhr) {},
  function (error) {}
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Light setup
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500);
scene.add(topLight);

const reRender3D = () => {
  requestAnimationFrame(reRender3D);
  renderer.render(scene, camera);
};
reRender3D();

// Define model position array
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
];

// Use IntersectionObserver to update model position
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5, // 50% of the section must be visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const section = entry.target;
    const sectionId = section.id;

    if (entry.isIntersecting) {
      updateModelPosition(sectionId);
    }
  });
}, observerOptions);

const sections = document.querySelectorAll(".section");
sections.forEach((section) => {
  observer.observe(section);
});

// Update model position based on section
const updateModelPosition = (sectionId) => {
  let position_active = arrPositionModel.findIndex(
    (val) => val.id === sectionId
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

  console.log(`Current Section: ${sectionId}`);
};

// Responsive
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Scroll navigation
document.addEventListener("DOMContentLoaded", function () {
  let currentSection = 1;
  let totalSections = [...document.querySelectorAll(".section")];

  function scrollToSection(section) {
    currentSection = section;
    document.querySelectorAll(".section").forEach((sec, index) => {
      sec.style.transform = `translateY(-${(section - 1) * 100}vh)`;
    });
  }

  function scrollUp() {
    if (currentSection > 1) {
      scrollToSection(currentSection - 1);
    }
  }

  function scrollDown() {
    if (currentSection < totalSections.length) {
      scrollToSection(currentSection + 1);
    }
  }

  // Scroll-based navigation controls
  document.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
      scrollDown();
    } else {
      scrollUp();
    }
  });
});
