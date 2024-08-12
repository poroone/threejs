import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import * as three from "three";
const x = document.querySelector(".xadd");
const y = document.querySelector(".yadd");
const z = document.querySelector(".zadd");
const c = document.querySelector(".cadd");

const xs = document.querySelector(".xsub");
const ys = document.querySelector(".ysub");
const zs = document.querySelector(".zsub");
const cs = document.querySelector(".csub");

let xx = 0;
let yy = 0;
let zz = 0;
function animatexyz(direction, rot, mod, cameras) {
  console.log(direction, rot, mod);

  scene.traverse((child) => {
    if (child.isMesh) {
      console.log(child);
      if (cameras && mod) {
        camera.position[direction] -= 0.01;
        return;
      }
      if (cameras) {
        camera.position[direction] += 0.01;
        return;
      }

      if (mod) {
        console.log("----");
        child.rotation[direction] -= 0.04;
        return;
      }
      console.log("++++");
      child.rotation[direction] += 0.04;
    }
  });
}

// 场景
const scene = new three.Scene();
// 素材
const load = new OBJLoader();

load.load("./countach.obj", (object) => {
  scene.add(object); //加载成功添加到场景
  console.log(object);
});

// 灯光
// 合适的光源强度及位置，可以让三维模型材质正确显示
const light = new three.AmbientLight(0xffffff, 0.3);
scene.add(light);

const dirLight1 = new three.DirectionalLight('rgb(253,253,253)', 5);
scene.add(dirLight1);

// 相机
const width=800
const height=500
const camera = new three.PerspectiveCamera(
  75,
  width / height,
  0.1,
  1000
);
camera.position.z = 20;

// 渲染
const renderer = new three.WebGLRenderer();
const doms = renderer.domElement;
doms.width="800px"
console.log(doms)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

document.body.appendChild(doms);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
console.log(x);

mouseDownAndMove(doms, (res) => {
  if (res.x != xx && res.x > xx) {
    xx = res.x;
    animatexyz("y", res.x / 4);
  }
  if (res.y != yy && res.y > yy) {
    yy = res.y;
    animatexyz("x", res.x / 4);
  }
  if (res.z != zz && res.z > zz) {
    zz = res.z;
    animatexyz("z'", res.x / 4);
  }

  if (res.x != xx && res.x < xx) {
    xx = res.x;
    animatexyz("y", res.x / 4, "--");
  }
  if (res.y != yy && res.y < yy) {
    yy = res.y;
    animatexyz("x", res.x / 4, "--");
  }
  if (res.z != zz && res.z < zz) {
    zz = res.z;
    animatexyz("z'", res.x / 4, "--");
  }
  console.log("x", res.x / 4);
  console.log("y", res.y / 4);
});


function mouseDownAndMove(dom, callback) {
  let flag = false;
  let fn = function (e) {
    if (flag) callback(e);
  };
  // 添加鼠标按下监听
  dom.addEventListener("mousedown", function (even) {
    // 当鼠标按下时, 添加鼠标移动监听
    flag = true;
    dom.addEventListener("mousemove", fn);
  });

  // 添加鼠标弹起监听 , 即鼠标不在按下
  dom.addEventListener("mouseup", function () {
    // 此时移除 鼠标移动监听,移除指定 事件函数
    flag = false;
    dom.removeEventListener("mousemove", fn);
  });
  // 当鼠标在其他元素中弹起时的操作, 规避鼠标弹起后 dom 无法捕获的异常
  document.addEventListener("mouseup", function () {
    // 此时移除 鼠标移动监听,移除指定 事件函数
    flag = false;
    dom.removeEventListener("mousemove", fn);
  });
}

x.addEventListener("click", () => animatexyz("x"));
y.addEventListener("click", () => animatexyz("y"));
z.addEventListener("click", () => animatexyz("z"));
c.addEventListener("click", () => animatexyz("z", "", "", "123"));

xs.addEventListener("click", () => animatexyz("x", "","-"));
ys.addEventListener("click", () => animatexyz("y", "","-"));
zs.addEventListener("click", () => animatexyz("z", "","-"));
cs.addEventListener("click", () => animatexyz("z", "", "--", "123"));


addEventListener("wheel", (event) => {
  console.log(event)
  event.deltaY > 0 ? animatexyz("z", "", "", "123") : animatexyz("z", "", "--", "123");
});