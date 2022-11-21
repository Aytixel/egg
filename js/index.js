import {
  AmbientLight,
  DirectionalLight,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OBJLoader } from "https://unpkg.com/three@0.146.0/examples/jsm/loaders/OBJLoader.js";

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

//

const offer = document.getElementById("offer");
const offer_text = offer.children[0];
const offer_list = [
  "Suivit de projet",
  "Active directory",
  "Partage de ressource",
  "Tchat / Messagerie électronique",
  "Solution d'aide à distance",
  "Visioconférence",
  "Planning",
  "Congés",
  "Fiches de paies",
  "Finances / Trésorerie",
  "Gestion produits",
  "Compte client",
  "Organigramme",
  "Sondage",
  "Check list",
  "App mobile/desktop",
  "Support multilangue",
  "Herbergement de donnée / Cloud",
  "Site web",
  "Url personnalisée",
  "Et bien plus encore si vous le désirez",
];

offer_text.addEventListener("animationend", (e) => {
  if (e.animationName == "offer-disappear") {
    offer_list.push(offer_text.textContent = offer_list.shift());
    offer_text.style.animation = "";
  }
});

const switch_offer = () => {
  offer_text.style.animation = "offer-disappear 0.8s ease-in-out";
};

offer.addEventListener("click", switch_offer);

setInterval(switch_offer, 5000);
