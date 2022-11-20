import {
  AmbientLight,
  Color,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
import { OBJLoader } from "https://unpkg.com/three@0.146.0/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://unpkg.com/three@0.146.0/examples/jsm/loaders/MTLLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.146.0/examples/jsm/controls/OrbitControls.js";

function debounce(callback, delay) {
  let timer;

  return function () {
    let args = arguments, context = this;

    clearTimeout(timer);

    timer = setTimeout(function () {
      callback.apply(context, args);
    }, delay);
  };
}

document.getElementsByTagName("video")[0].playbackRate = 0.75;

let code = "";
const code_end = debounce(() => {
  switch (code.toLocaleLowerCase()) {
    case "arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightbaenter":
      location.href = "https://fr.wikipedia.org/wiki/Pastafarisme";
      break;
    case "oeuf":
      location.href = "https://maio-egg.tk/html/image.html";
      break;
    case "sarkozy":
      location.href =
        "https://www.audible.fr/pd/Le-Temps-des-Tempetes-Livre-Audio/B096W2DDK6";
      break;
  }

  code = "";
}, 1500);

window.addEventListener("keyup", (e) => {
  code += e.key;
  code_end();
});

// canvas 3d egg

const canvas = document.getElementsByTagName("canvas")[0];
const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.shadowMap.enabled = true;

const scene = new Scene();
const camera = new PerspectiveCamera(
  40,
  canvas.clientWidth / canvas.clientHeight,
  1,
  5000,
);

camera.position.z = 10;

// lighting

scene.add(new AmbientLight(0xf7ade4, 1));

const directional = new DirectionalLight(0xf7ade4, 0.65);

directional.position.set(-1, 1.5, 2);
directional.castShadow = true;

scene.add(directional);

// model

let object;

{
  const material = new MeshStandardMaterial({ color: 0xffffff });
  const obj_loader = new OBJLoader();

  obj_loader.load("model/egg.obj", function (object_) {
    object = object_;
    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.material = material;
      }
    });
    object.rotation.z += 0.35;

    scene.add(object);
  });
}

// render loop

function render() {
  renderer.render(scene, camera);

  if (object) {
    object.rotation.y += 0.0025;
  }

  requestAnimationFrame(render);
}

render();
