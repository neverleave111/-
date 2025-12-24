import React, { useRef, useEffect } from "react";
import * as THREE from "three";
// 扩展库引入——旧版本，比如122, 新版本路径examples/jsm替换了examples/jsm
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { SSAARenderPass } from "three/examples/jsm/postprocessing/SSAARenderPass.js";
import TWEEN from "@tweenjs/tween.js";

export const ThreeModel = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    iniThree();
  }, []);
  const iniThree = () => {
    let camera, scene, renderer, composer;
    // const container = document.getElementById( 'container' );
    let container = document.getElementById("threeContainer");
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current?.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(30, width / height, 200, 4000);
    camera.position.set(1526, 663, -1026);

    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xffb4c1d5);
    scene.background = new THREE.CubeTextureLoader().load([
      "./bg.jpg",
      "./bg.jpg",
      "./bg.jpg",
      "./bg.jpg",
      "./bg.jpg",
      "./bg.jpg",
    ]);
    // 平面
    const plane1 = new THREE.PlaneGeometry(1000, 800);
    plane1.rotateY(Math.PI / 2);
    plane1.rotateZ(Math.PI / 2);
    const material1 = new THREE.MeshBasicMaterial({
      color: 0xd0daec,
    });
    const groud1 = new THREE.Mesh(plane1, material1);
    scene.add(groud1);
    const plane2 = new THREE.PlaneGeometry(400, 36);
    plane2.rotateY(Math.PI / 2);
    plane2.rotateZ(Math.PI / 2);
    const material16 = material1.clone();
    material16.color = new THREE.Color(0xbdbdbd);
    const groud2 = new THREE.Mesh(plane2, material16);
    groud2.position.set(9, 0.5, 0);
    scene.add(groud2);
    const plane5 = new THREE.PlaneGeometry(800, 20);
    plane5.rotateY(Math.PI / 2);
    plane5.rotateZ(Math.PI / 2);
    const material19 = material1.clone();
    material19.color = new THREE.Color(0xead071);
    const groud3 = new THREE.Mesh(plane5, material19);
    groud3.position.set(130, 0.5, 0);
    scene.add(groud3);

    // 门框
    const box1 = new THREE.BoxGeometry(14, 60, 200);
    const textureCube1 = new THREE.CubeTextureLoader().load([
      "./pic/metal2.jpg",
      "./pic/metal2.jpg",
      "./pic/metal2.jpg",
      "./pic/metal2.jpg",
      "./pic/metal2.jpg",
      "./pic/metal2.jpg",
    ]);
    const material2 = new THREE.MeshPhysicalMaterial({
      color: 0xf2f2f2,
      metalness: 1.0,
      roughness: 0.15,
      envMap: textureCube1,
      envMapIntensity: 1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.5,
    });
    const door1 = new THREE.Mesh(box1, material2);
    door1.position.set(0, 30, 0);
    const box2 = new THREE.BoxGeometry(14, 400, 10);
    const door2 = new THREE.Mesh(box2, material2);
    door2.position.set(0, 200, 95);
    const box19 = new THREE.BoxGeometry(14, 10, 200);
    const door3 = new THREE.Mesh(box19, material2);
    door3.position.set(0, 395, 0);
    const door4 = door2.clone();
    door4.position.set(0, 200, -95);
    const box6 = new THREE.BoxGeometry(2, 12, 150);
    const material5 = material2.clone();
    material5.color = new THREE.Color(0xededed);
    material5.envMapIntensity = 0.8;
    material5.clearcoatRoughness = 1;
    const door5 = new THREE.Mesh(box6, material5);
    door5.position.set(-3, 405, 0); //
    const box7 = new THREE.BoxGeometry(2, 11, 20);
    const door6 = new THREE.Mesh(box7, material2);
    door6.position.set(-1, 411.5, 59); //
    const door7 = door6.clone();
    door7.position.set(-1, 411.5, -59); //
    const box8 = new THREE.BoxGeometry(10, 7, 30);
    const door8 = new THREE.Mesh(box8, material2);
    door8.position.set(-5, 418.5, 59); //
    const door9 = door8.clone();
    door9.position.set(-5, 418.5, -59); //
    // 玻璃
    const box3 = new THREE.BoxGeometry(14.5, 390, 190);
    const material3 = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 1.0,
      ior: 1.5,
      metalness: 0.0,
      roughness: 0.0,
      envMap: scene.background,
      envMapIntensity: 1.0,
    });
    const glass = new THREE.Mesh(box3, material3);
    glass.position.set(1, 200, 0);
    const box18 = new THREE.BoxGeometry(2, 3, 30);
    const door10 = new THREE.Mesh(box18, material2);
    door10.position.set(-1, 407.5, -75); //
    const door11 = new THREE.Mesh(box18, material2);
    door11.position.set(-1, 407.5, 75); //

    const box24 = new THREE.BoxGeometry(1, 12, 8);
    const door14 = new THREE.Mesh(box24, material2);
    door14.position.set(-3, 427, -48); //
    const box25 = new THREE.BoxGeometry(1, 9, 12);
    const door15 = new THREE.Mesh(box25, material2);
    door15.rotateZ(Math.PI / 3);
    door15.position.set(-6.6, 435, -48); //
    const box26 = new THREE.BoxGeometry(1, 5, 12);
    const door16 = new THREE.Mesh(box26, material2);
    door16.position.set(-10.5, 439.5, -48); //
    const box27 = new THREE.BoxGeometry(3, 7, 12);
    const door17 = new THREE.Mesh(box27, material2);
    door17.rotateZ(Math.PI / 2);
    door17.position.set(-7.5, 441, -48); //
    const box28 = new THREE.BoxGeometry(1, 5, 10);
    const door18 = new THREE.Mesh(box28, material2);
    door18.rotateY(Math.PI / 4);
    door18.position.set(-4, 419.5, 41); //
    const box29 = new THREE.BoxGeometry(1, 15, 10);
    const door19 = new THREE.Mesh(box29, material2);
    door19.position.set(-7.7, 424.5, 33); //
    const box30 = new THREE.BoxGeometry(4, 3, 10);
    const door20 = new THREE.Mesh(box30, material2);
    door20.position.set(-6, 431, 33); //

    const box32 = new THREE.BoxGeometry(2, 60, 194);
    const material15 = new THREE.MeshPhysicalMaterial({
      color: 0x2b2b2b,
      metalness: 1.0,
      roughness: 0,
      envMap: textureCube1,
      envMapIntensity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0,
    });
    const door21 = new THREE.Mesh(box32, material15);
    door21.position.set(7.5, 30, 0);
    const box33 = new THREE.BoxGeometry(2, 400, 9);
    const door22 = new THREE.Mesh(box33, material15);
    door22.position.set(7.5, 200, 92.5);
    const box34 = new THREE.BoxGeometry(2, 10, 194);
    const door23 = new THREE.Mesh(box34, material15);
    door23.position.set(7.5, 395, 0);
    const door24 = door22.clone();
    door24.position.set(7.5, 200, -92.5);

    const plane3 = new THREE.PlaneGeometry(30, 45); //默认在XOY平面上
    const textureLoader = new THREE.TextureLoader();
    const material17 = new THREE.MeshBasicMaterial({
      map: textureLoader.load("./pic/1.png"),
      transparent: true, //使用背景透明的png贴图，注意开启透明计算
      side: THREE.DoubleSide,
    });
    const door13 = new THREE.Mesh(plane3, material17);
    door13.rotateY(-Math.PI / 2);
    door13.position.set(8.4, 310, -30);
    const plane4 = new THREE.PlaneGeometry(57, 30); //默认在XOY平面上
    // const textureLoader = new THREE.TextureLoader();
    const material18 = new THREE.MeshBasicMaterial({
      map: textureLoader.load("./pic/2.png"),
      transparent: true, //使用背景透明的png贴图，注意开启透明计算
      side: THREE.DoubleSide,
    });
    const door25 = new THREE.Mesh(plane4, material18);
    door25.rotateY(-Math.PI / 2);
    door25.position.set(8.4, 310, 20);

    // 开关门1
    const groupdoor1 = new THREE.Group();
    groupdoor1.name = "开关门1";
    groupdoor1.add(
      door1,
      door2,
      door3,
      door4,
      door5,
      door6,
      door7,
      door8,
      door9,
      door10,
      door14,
      door15,
      door16,
      door17,
      door21,
      door22,
      door23,
      door24,
      door13,
      glass
    );
    groupdoor1.position.z = 100.2;
    scene.add(groupdoor1);
    // 开关门2
    const groupdoor2 = new THREE.Group();
    groupdoor2.name = "开关门2";
    groupdoor2.add(
      door1.clone(),
      door2.clone(),
      door3.clone(),
      door4.clone(),
      door5.clone(),
      door6.clone(),
      door7.clone(),
      door8.clone(),
      door9.clone(),
      door11,
      door18,
      door19,
      door20,
      door21.clone(),
      door22.clone(),
      door23.clone(),
      door24.clone(),
      door25,
      glass.clone()
    );
    groupdoor2.position.z = -100.2;
    scene.add(groupdoor2);
    // 固定门1
    const groupdoor3 = new THREE.Group();
    groupdoor3.name = "固定门1";
    groupdoor3.add(
      door1.clone(),
      door2.clone(),
      door3.clone(),
      door4.clone(),
      door21.clone(),
      door22.clone(),
      door23.clone(),
      door24.clone(),
      glass.clone()
    );
    groupdoor3.position.x = 17;
    groupdoor3.position.z = 300.2;
    scene.add(groupdoor3);
    // 固定门2
    const groupdoor4 = groupdoor3.clone();
    groupdoor4.name = "固定门2";
    groupdoor4.position.x = 17;
    groupdoor4.position.z = -300.2;
    scene.add(groupdoor4);

    const vertices1 = new Float32Array([
      0, 0, 0, 0, 16, -6, 0, 16, 0, 0, 0, 0, 0, 16, 0, 0, 0, 6,
    ]);
    const material11 = new THREE.MeshBasicMaterial({
      color: 0xf5cd3d,
      side: THREE.DoubleSide,
    });
    const triangle1 = new THREE.BufferGeometry();
    triangle1.attributes.position = new THREE.BufferAttribute(vertices1, 3);
    for (let i = 0; i < 16; i++) {
      const door12 = new THREE.Mesh(triangle1, material11);
      door12.position.set(8.4, 180, i * 12 - 90);
      groupdoor1.add(door12);
      groupdoor2.add(door12.clone());
      groupdoor3.add(door12.clone());
      groupdoor4.add(door12.clone());
    }

    // 顶框
    const box4 = new THREE.BoxGeometry(12, 50, 800);
    const frame1 = new THREE.Mesh(box4, material5);
    frame1.position.set(-24, 435.5, 0); //
    const box5 = new THREE.BoxGeometry(16, 4, 720);
    const material4 = material2.clone();
    material4.color = new THREE.Color(0xd0d8d1);
    // 0xa6f2a9  d6dcd7  dee3df
    material4.envMapIntensity = 0.8;
    const frame2 = new THREE.Mesh(box5, material4);
    frame2.position.set(-10.5, 412.8, 0); //
    const box20 = new THREE.BoxGeometry(12, 4, 720);
    const frame3 = new THREE.Mesh(box20, material4);
    frame3.rotateZ(Math.PI / 2);
    frame3.position.set(-12, 418, 0); //
    const box9 = new THREE.BoxGeometry(40, 4, 800);
    const frame4 = new THREE.Mesh(box9, material5);
    frame4.position.set(-10, 462.5, 0); //
    const box10 = new THREE.BoxGeometry(16, 4, 800);
    const frame5 = new THREE.Mesh(box10, material5);
    frame5.position.set(-12.7, 412.5, 0); //
    const box22 = new THREE.BoxGeometry(18, 2, 800);
    const frame6 = new THREE.Mesh(box22, material5);
    frame6.position.set(-12, 455, 0); //
    frame6.rotateZ(Math.PI / 4);
    const box21 = new THREE.BoxGeometry(10, 4, 800);
    const frame7 = new THREE.Mesh(box21, material5);
    frame7.rotateZ(Math.PI / 2);
    frame7.position.set(-12.5, 416, 0); //
    const frame8 = frame7.clone();
    frame8.rotateZ(Math.PI / 2);
    frame8.position.set(-20, 426.5, 0); //
    const frame9 = frame8.clone();
    frame9.position.set(-20, 446.5, 0); //
    const cylinder3 = new THREE.CylinderGeometry(6, 6, 24, 6, 1);
    const material14 = material4.clone();
    material14.color = new THREE.Color(0xcdcfd6);
    //  cbcfd8  c0c7d3
    const frame10 = new THREE.Mesh(cylinder3, material14);
    frame10.rotateX(Math.PI / 2);
    frame10.position.set(-17, 438, -61); //

    const groupframe = new THREE.Group();
    groupframe.name = "顶框";
    groupframe.add(
      frame1,
      frame2,
      frame3,
      frame4,
      frame5,
      frame6,
      frame7,
      frame8,
      frame9,
      frame10
    );
    scene.add(groupframe);

    // 轴皮带
    const box11 = new THREE.BoxGeometry(3, 19, 38);
    const material12 = material5.clone();
    material12.color = new THREE.Color(0xb5b5b5);
    const axle1 = new THREE.Mesh(box11, material12);
    axle1.position.set(-14, 436.5, 244); //
    const cylinder1 = new THREE.CylinderGeometry(6, 6, 12, 16, 1);
    const textureCube2 = new THREE.CubeTextureLoader().load([
      "./pic/metal1.jpg",
      "./pic/metal1.jpg",
      "./pic/metal1.jpg",
      "./pic/metal1.jpg",
      "./pic/metal1.jpg",
      "./pic/metal1.jpg",
    ]);
    const material6 = new THREE.MeshPhysicalMaterial({
      color: 0x7a7a7a,
      metalness: 1.0,
      roughness: 0.85,
      envMap: textureCube2,
      envMapIntensity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.8,
    });
    const axle2 = new THREE.Mesh(cylinder1, material6);
    axle2.rotateZ(Math.PI / 2);
    axle2.position.set(-8.5, 436, 244); //
    const box12 = new THREE.BoxGeometry(3, 19, 55);
    const axle3 = new THREE.Mesh(box12, material12);
    axle3.position.set(-14, 436.5, -283); //
    const axle4 = axle2.clone();
    axle4.position.set(-8.5, 436, -265); //
    const box13 = new THREE.BoxGeometry(10, 16, 36);
    const material7 = material6.clone();
    material7.color = new THREE.Color(0xcac4bf);
    material7.roughness = 0.5;
    material7.clearcoatRoughness = 1;
    const axle5 = new THREE.Mesh(box13, material7);
    axle5.position.set(-7.5, 440, -289); //
    const box14 = new THREE.BoxGeometry(2, 1, 509);
    const axle6 = new THREE.Mesh(box14, material6);
    axle6.position.set(-7, 431, -9); //
    const axle7 = axle6.clone();
    axle7.position.set(-7, 441, -9); //
    const box31 = new THREE.BoxGeometry(3, 16.5, 12);
    const axle8 = new THREE.Mesh(box31, material12);
    axle8.position.set(-14, 434.5, 28); //
    const cylinder2 = new THREE.CylinderGeometry(3, 3, 8, 16, 1);
    const axle9 = new THREE.Mesh(cylinder2, material6);
    axle9.rotateZ(Math.PI / 2);
    axle9.position.set(-9, 428.7, 28); //

    const groupaxle = new THREE.Group();
    groupaxle.name = "轴";
    groupaxle.add(
      axle1,
      axle2,
      axle3,
      axle4,
      axle5,
      axle6,
      axle7,
      axle8,
      axle9
    );
    scene.add(groupaxle);

    const box15 = new THREE.BoxGeometry(7, 19, 60);
    const material8 = material7.clone();
    material8.color = new THREE.Color(0xb8b2b2);
    const DCU2 = new THREE.Mesh(box15, material8);
    DCU2.position.set(-11.5, 436.5, -120); //
    const groupDCU2 = new THREE.Group();
    groupDCU2.name = "DCU2";
    groupDCU2.add(DCU2);
    scene.add(groupDCU2);

    const material9 = material7.clone();
    material9.color = new THREE.Color(0xc0c7d3);
    const DCU1 = new THREE.Mesh(box15, material9);
    DCU1.position.set(-11.5, 436.5, -210); //
    const groupDCU = new THREE.Group();
    groupDCU.name = "DCU";
    groupDCU.add(DCU1);
    scene.add(groupDCU);

    const box16 = new THREE.BoxGeometry(16, 22, 22);
    const material10 = material7.clone();
    material10.color = new THREE.Color(0x5e5e5e);
    material10.roughness = 0.4;
    const material13 = material12.clone();
    material13.color = new THREE.Color(0xa3a3a3);
    const lock1 = new THREE.Mesh(box16, material13);
    lock1.position.set(-1.6, 417, 0); //
    const box17 = new THREE.BoxGeometry(6, 34, 22);
    const lock2 = new THREE.Mesh(box17, material4);
    lock2.position.set(-12.5, 430, 0); //
    const box23 = new THREE.BoxGeometry(6, 21, 36);
    const lock3 = new THREE.Mesh(box23, material4);
    lock3.position.set(-12.5, 436.5, 0); //

    const grouplock = new THREE.Group();
    grouplock.name = "lock";
    grouplock.add(lock1, lock2, lock3);
    scene.add(grouplock);

    // 环境光
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1000, 400, -300);
    scene.add(directionalLight);

    const pixelRatio = renderer.getPixelRatio();
    composer = new EffectComposer(renderer);
    composer.setPixelRatio(1);
    composer.addPass(new RenderPass(scene, camera));

    let ssaaRenderPassP = new SSAARenderPass(scene, camera);
    ssaaRenderPassP.sampleLevel = 4;
    composer.addPass(ssaaRenderPassP);

    const outputPass = new ShaderPass(GammaCorrectionShader);
    composer.addPass(outputPass);
    const v2 = new THREE.Vector2(width * pixelRatio, height * pixelRatio);
    const outlinePass = new OutlinePass(v2, scene, camera);
    composer.addPass(outlinePass);

    window.addEventListener("resize", onWindowResize);
    function onWindowResize() {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    }

    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", function () {
      // console.log('camera.position',camera.position);
      composer.render();
    });
    controls.minDistance = 400;
    controls.maxDistance = 2200;
    // camera.lookAt(190, 180, -110);

    function render() {
      TWEEN.update();
      composer.render();
      requestAnimationFrame(render);
    }
    render();
    

    renderer.domElement.addEventListener("click", function (event) {
      const px = event.offsetX;
      const py = event.offsetY;
      const x = (px / width) * 2 - 1;
      const y = -(py / height) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = raycaster.intersectObjects([
        groupdoor1,
        groupdoor2,
        groupdoor3,
        groupdoor4,
        groupframe,
        groupaxle,
        groupDCU,
        groupDCU2,
        grouplock,
      ]);
      if (intersects.length > 0) {
        const A = intersects[0].object;
        outlinePass.selectedObjects = [scene.getObjectByName(A.parent.name)];
      }
    });

    renderer.domElement.addEventListener("dblclick", function (event) {
      const px = event.offsetX;
      const py = event.offsetY;
      const x = (px / width) * 2 - 1;
      const y = -(py / height) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = raycaster.intersectObjects([groupdoor1, groupdoor2]);
      if (intersects.length > 0) {
        if (groupdoor1.position.z != 265) {
          const tween1 = new TWEEN.Tween(groupdoor1.position)
            .to({ x: 0, y: 0, z: 265 }, 2000)
            .start();
          const tween2 = new TWEEN.Tween(groupdoor2.position)
            .to({ x: 0, y: 0, z: -265 }, 2000)
            .start();
        } else {
          const tween1 = new TWEEN.Tween(groupdoor1.position)
            .to({ x: 0, y: 0, z: 100 }, 2000)
            .start();
          const tween2 = new TWEEN.Tween(groupdoor2.position)
            .to({ x: 0, y: 0, z: -100 }, 2000)
            .start();
        }
      }
    });

    return () => {
      renderer.dispose();
      scene.dispose();
    };
  };

  return (
    <div
      id="threeContainer"
      ref={containerRef}
      style={{ height: 600, width: 600 }}
    ></div>
  );
};
