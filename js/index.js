function debounce(callback, delay){
    let timer

    return function(){
        let args = arguments, context = this

        clearTimeout(timer)

        timer = setTimeout(function () {
            callback.apply(context, args)
        }, delay)
    }
}

document.getElementsByTagName("video")[0].playbackRate = 0.75
        
let code = ""
const code_end = debounce(() => {
    switch (code.toLocaleLowerCase()) {
        case "arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightbaenter":
            location.href = "https://fr.wikipedia.org/wiki/Pastafarisme"
            break
        case "oeuf":
            location.href = "https://maio-egg.tk/html/image.html"
            break
        case "sarkozy":
            location.href = "https://www.audible.fr/pd/Le-Temps-des-Tempetes-Livre-Audio/B096W2DDK6"
            break
    }

    code = ""
}, 1500)

window.addEventListener("keyup", e => {
    code += e.key
    code_end()
})

const canvas = document.getElementsByTagName("canvas")[0]
const renderer = new THREE.WebGLRenderer({ canvas })
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 1, 500);

renderer.setSize(canvas.clientWidth, canvas.clientHeight)
camera.position.set(0, 0, 100)
scene.add(camera)


const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(- 10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);
scene.add(line);
renderer.render(scene, camera);