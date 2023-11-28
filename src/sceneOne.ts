import "./style.css";
import * as THREE from "three";
// global imports
import { createCamera } from "./_globals/camera";
import { createRenderer } from "./_globals/renderer";
// component imports
import { createBox } from "./_meshes/box";
import { createSpotlight } from "./_lights/spotlight";

// properties globals
const renderer: THREE.WebGLRenderer = createRenderer();
const camera: THREE.PerspectiveCamera = createCamera();

// scene locals
const scene: THREE.Scene = new THREE.Scene();
const meshGroup: THREE.Group = new THREE.Group();
const lightGroup: THREE.Group = new THREE.Group();

(function init(): void {
  camera.position.set(200, 100, 100);
  camera.lookAt(0, 0, 0);

  //creating box
  createBox("box1", meshGroup);
  meshGroup.getObjectByName("box1")!.scale.set(40, 40, 40);

  // creating lights
  createSpotlight("l1", 0xffffff, 10, lightGroup);
  lightGroup.getObjectByName("l1")!.position.set(0, 100, 100);
  createSpotlight("l2", 0xffffff, 10, lightGroup);
  lightGroup.getObjectByName("l2")!.position.set(0, 100, -100);

  scene.add(meshGroup);
  scene.add(lightGroup);
})();

(function update(time) {
  // why is this erroring lmao
  requestAnimationFrame(update);

  meshGroup.getObjectByName("box1")!.rotation.y = Math.sin(time! / 1000);
  meshGroup.getObjectByName("box1")!.rotation.z = -Math.sin(time! / 1000);

  renderer.render(scene, camera);
})();
