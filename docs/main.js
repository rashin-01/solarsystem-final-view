/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
//23FI107　増渕雄飛

class ThreeJSContainer {
    scene;
    light;
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x000000));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 10, 0));
        this.createScene();
        let elapsedTime = 0;
        const render = (time) => {
            elapsedTime += 0.01;
            const loopDuration = 600;
            const angle = (elapsedTime % loopDuration) / loopDuration * Math.PI * 2;
            const baseRadius = 80;
            const zoomAmplitude = 20;
            const radius = baseRadius + Math.sin(elapsedTime * 0.5) * zoomAmplitude;
            const tiltX = Math.sin(elapsedTime * 0.3) * 0.3;
            const tiltZ = Math.cos(elapsedTime * 0.4) * 0.3;
            const x = radius * Math.cos(angle) * Math.cos(tiltX);
            const y = 10 + Math.sin(elapsedTime * 0.2) * 25 + Math.sin(angle) * 5;
            const z = radius * Math.sin(angle) * Math.cos(tiltZ);
            camera.position.set(x, y, z);
            camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 10, 0));
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        // 太陽の球体を作成
        const sunGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(3, 32, 32);
        const sunMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0xffa500 });
        const sunMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sunGeometry, sunMaterial);
        sunMesh.position.set(0, 10, 0);
        this.scene.add(sunMesh);
        // 太陽の周りに追加
        const particleGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 3 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            positions.set([x, y, z], i * 3);
        }
        particleGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(positions, 3));
        const particleMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.PointsMaterial({
            color: 0xffa500,
            size: 0.2,
            transparent: true,
            opacity: 0.5,
            blending: three__WEBPACK_IMPORTED_MODULE_0__.AdditiveBlending,
        });
        const sunParticles = new three__WEBPACK_IMPORTED_MODULE_0__.Points(particleGeometry, particleMaterial);
        sunParticles.position.copy(sunMesh.position);
        this.scene.add(sunParticles);
        //太陽の光
        const sunLight = new three__WEBPACK_IMPORTED_MODULE_0__.PointLight(0xffffff, 2, 0);
        sunLight.position.set(0, 10, 0);
        this.scene.add(sunLight);
        //地球を作成
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader();
        const earthTexture = textureLoader.load("8k_earth_daymap.jpg");
        // 地球の軌道用のピボット
        const earthPivot = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D();
        earthPivot.position.set(0, 10, 0);
        this.scene.add(earthPivot);
        // 地球本体
        const earthGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(1, 64, 64);
        const earthMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({ map: earthTexture, });
        const earthMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(earthGeometry, earthMaterial);
        earthMesh.position.set(15, 0, 0);
        earthMesh.rotation.z = three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.degToRad(23.4);
        earthPivot.add(earthMesh);
        // 軌道リング
        const orbitRadius = 15;
        const orbitSegments = 100;
        const orbitGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const orbitPositions = [];
        for (let i = 0; i <= orbitSegments; i++) {
            const angle = (i / orbitSegments) * Math.PI * 2;
            const x = orbitRadius * Math.cos(angle);
            const z = orbitRadius * Math.sin(angle);
            orbitPositions.push(x, 10, z);
        }
        orbitGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(orbitPositions, 3));
        const orbitMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const orbitLine = new three__WEBPACK_IMPORTED_MODULE_0__.LineLoop(orbitGeometry, orbitMaterial);
        this.scene.add(orbitLine);
        // 月のピボット
        const moonPivot = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D();
        moonPivot.position.set(0, 0, 0);
        earthMesh.add(moonPivot);
        // 月本体
        const moonGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(0.15, 32, 32);
        const moonMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({ color: 0xaaaaaa });
        const moonMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(moonGeometry, moonMaterial);
        moonMesh.position.set(1.25, 0, 0);
        moonPivot.add(moonMesh);
        // 月の軌道
        const moonOrbitGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const moonOrbitPositions = [];
        const moonRadius = 1.25;
        for (let i = 0; i <= orbitSegments; i++) {
            const angle = (i / orbitSegments) * Math.PI * 2;
            const x = moonRadius * Math.cos(angle);
            const z = moonRadius * Math.sin(angle);
            moonOrbitPositions.push(x, 0, z);
        }
        moonOrbitGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(moonOrbitPositions, 3));
        const moonOrbitLine = new three__WEBPACK_IMPORTED_MODULE_0__.LineLoop(moonOrbitGeometry, orbitMaterial.clone());
        moonPivot.add(moonOrbitLine);
        // 水星のピボット
        const mercuryPivot = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D();
        mercuryPivot.position.set(0, 10, 0);
        this.scene.add(mercuryPivot);
        // 水星本体
        const mercuryGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(0.9, 32, 32);
        const mercuryMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.6, roughness: 0.4, });
        const mercuryMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(mercuryGeometry, mercuryMaterial);
        mercuryMesh.position.set(5.8, 0, 0);
        mercuryMesh.rotation.z = three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.degToRad(0.034);
        mercuryPivot.add(mercuryMesh);
        // 水星の軌道線
        const mercuryOrbitRadius = 5.8;
        const mercuryOrbitSegments = 100;
        const mercuryOrbitGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const mercuryOrbitVertices = [];
        for (let i = 0; i <= mercuryOrbitSegments; i++) {
            const angle = (i / mercuryOrbitSegments) * Math.PI * 2;
            const x = mercuryOrbitRadius * Math.cos(angle);
            const z = mercuryOrbitRadius * Math.sin(angle);
            mercuryOrbitVertices.push(x, 10, z);
        }
        mercuryOrbitGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(mercuryOrbitVertices, 3));
        const mercuryOrbitMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const mercuryOrbitLine = new three__WEBPACK_IMPORTED_MODULE_0__.LineLoop(mercuryOrbitGeometry, mercuryOrbitMaterial);
        this.scene.add(mercuryOrbitLine);
        // 金星の軌道ピボット
        const venusPivot = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D();
        venusPivot.position.set(0, 10, 0);
        this.scene.add(venusPivot);
        // 金星の本体
        const venusGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(0.9, 32, 32);
        const venusMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({ color: 0xdaa520 });
        const venusMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(venusGeometry, venusMaterial);
        venusMesh.position.set(9, 0, 0);
        venusMesh.rotation.z = three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.degToRad(177.4);
        venusPivot.add(venusMesh);
        //金星の軌道線
        const venusOrbitRadius = 9;
        const venusOrbitSegments = 100;
        const venusOrbitGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const venusOrbitVertices = [];
        for (let i = 0; i <= venusOrbitSegments; i++) {
            const angle = (i / venusOrbitSegments) * Math.PI * 2;
            const x = venusOrbitRadius * Math.cos(angle);
            const z = venusOrbitRadius * Math.sin(angle);
            venusOrbitVertices.push(x, 10, z);
        }
        venusOrbitGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(venusOrbitVertices, 3));
        const venusOrbitMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const venusOrbitLine = new three__WEBPACK_IMPORTED_MODULE_0__.LineLoop(venusOrbitGeometry, venusOrbitMaterial);
        this.scene.add(venusOrbitLine);
        // 火星のピボット
        const marsPivot = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D();
        marsPivot.position.set(0, 10, 0);
        this.scene.add(marsPivot);
        // 火星の本体
        const marsGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(0.4, 32, 32);
        const marsMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({ color: 0xb22222 });
        const marsMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(marsGeometry, marsMaterial);
        marsMesh.position.set(18, 0, 0);
        marsMesh.rotation.z = three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.degToRad(25.2);
        marsPivot.add(marsMesh);
        //火星の軌道線
        const marsOrbitRadius = 18;
        const marsOrbitSegments = 100;
        const marsOrbitGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const marsOrbitVertices = [];
        for (let i = 0; i <= marsOrbitSegments; i++) {
            const angle = (i / marsOrbitSegments) * Math.PI * 2;
            const x = marsOrbitRadius * Math.cos(angle);
            const z = marsOrbitRadius * Math.sin(angle);
            marsOrbitVertices.push(x, 10, z); // 高さ10で一定
        }
        marsOrbitGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(marsOrbitVertices, 3));
        const marsOrbitMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const marsOrbitLine = new three__WEBPACK_IMPORTED_MODULE_0__.LineLoop(marsOrbitGeometry, marsOrbitMaterial);
        this.scene.add(marsOrbitLine);
        // 木星のピボット
        const jupiterPivot = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D();
        jupiterPivot.position.set(0, 10, 0);
        this.scene.add(jupiterPivot);
        // 木星のパーティクルを生成
        const jupiterParticleCount = 3500;
        const jupiterRadius = 1.2;
        const jupiterGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const jupiterPositions = new Float32Array(jupiterParticleCount * 3);
        for (let i = 0; i < jupiterParticleCount; i++) {
            const r = jupiterRadius * Math.cbrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            jupiterPositions.set([x, y, z], i * 3);
        }
        jupiterGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(jupiterPositions, 3));
        const jupiterMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.PointsMaterial({ color: 0xffcc88, size: 0.05, transparent: true, opacity: 0.8, blending: three__WEBPACK_IMPORTED_MODULE_0__.AdditiveBlending });
        const jupiterParticles = new three__WEBPACK_IMPORTED_MODULE_0__.Points(jupiterGeometry, jupiterMaterial);
        jupiterParticles.position.set(25, 0, 0);
        jupiterParticles.rotation.z = three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.degToRad(3.1);
        jupiterPivot.add(jupiterParticles);
        //木星の軌道線
        const jupiterOrbitRadius = 25;
        const jupiterOrbitSegments = 100;
        const jupiterOrbitGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const jupiterOrbitVertices = [];
        for (let i = 0; i <= jupiterOrbitSegments; i++) {
            const angle = (i / jupiterOrbitSegments) * Math.PI * 2;
            const x = jupiterOrbitRadius * Math.cos(angle);
            const z = jupiterOrbitRadius * Math.sin(angle);
            jupiterOrbitVertices.push(x, 10, z);
        }
        jupiterOrbitGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(jupiterOrbitVertices, 3));
        const jupiterOrbitMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const jupiterOrbitLine = new three__WEBPACK_IMPORTED_MODULE_0__.LineLoop(jupiterOrbitGeometry, jupiterOrbitMaterial);
        this.scene.add(jupiterOrbitLine);
        // 土星の軌道用ピボット
        const saturnPivot = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D();
        saturnPivot.position.set(0, 10, 0);
        this.scene.add(saturnPivot);
        // 土星の本体
        const saturnGroup = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
        const saturnGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(0.9, 32, 32);
        const saturnMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({ color: 0xd2b48c });
        const saturnMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(saturnGeometry, saturnMaterial);
        saturnGroup.add(saturnMesh);
        // 土星の輪
        const ringGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.RingGeometry(1.2, 2.2, 64);
        const ringMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({ color: 0xd2b48c, side: three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide, transparent: true, opacity: 0.5 });
        const ringMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(ringGeometry, ringMaterial);
        ringMesh.rotation.x = three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.degToRad(90);
        ringMesh.position.copy(saturnMesh.position);
        saturnGroup.add(ringMesh);
        saturnGroup.rotation.z = three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.degToRad(26.7);
        saturnGroup.position.set(32, 0, 0);
        saturnPivot.add(saturnGroup);
        //土星の軌道線
        const saturnOrbitRadius = 32;
        const saturnOrbitSegments = 100;
        const saturnOrbitGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const saturnOrbitVertices = [];
        for (let i = 0; i <= saturnOrbitSegments; i++) {
            const angle = (i / saturnOrbitSegments) * Math.PI * 2;
            const x = saturnOrbitRadius * Math.cos(angle);
            const z = saturnOrbitRadius * Math.sin(angle);
            saturnOrbitVertices.push(x, 10, z);
        }
        saturnOrbitGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(saturnOrbitVertices, 3));
        const saturnOrbitMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const saturnOrbitLine = new three__WEBPACK_IMPORTED_MODULE_0__.LineLoop(saturnOrbitGeometry, saturnOrbitMaterial);
        this.scene.add(saturnOrbitLine);
        // 天王星のピボット
        const uranusPivot = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D();
        uranusPivot.position.set(0, 10, 0);
        this.scene.add(uranusPivot);
        // 天王星の本体
        const uranusGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(0.7, 32, 32);
        const uranusMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({ color: 0x66ccff });
        const uranusMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(uranusGeometry, uranusMaterial);
        uranusMesh.rotation.z = three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.degToRad(97.8);
        uranusMesh.position.set(40, 0, 0);
        uranusPivot.add(uranusMesh);
        //天王星の軌道線
        const uranusOrbitRadius = 40;
        const uranusOrbitSegments = 100;
        const uranusOrbitGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const uranusOrbitVertices = [];
        for (let i = 0; i <= uranusOrbitSegments; i++) {
            const angle = (i / uranusOrbitSegments) * Math.PI * 2;
            const x = uranusOrbitRadius * Math.cos(angle);
            const z = uranusOrbitRadius * Math.sin(angle);
            uranusOrbitVertices.push(x, 10, z);
        }
        uranusOrbitGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(uranusOrbitVertices, 3));
        const uranusOrbitMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const uranusOrbitLine = new three__WEBPACK_IMPORTED_MODULE_0__.LineLoop(uranusOrbitGeometry, uranusOrbitMaterial);
        this.scene.add(uranusOrbitLine);
        // 海王星のピボット
        const neptunePivot = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D();
        neptunePivot.position.set(0, 10, 0);
        this.scene.add(neptunePivot);
        // 海王星の本体
        const neptuneGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(0.8, 32, 32);
        const neptuneMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({ color: 0x3333ff });
        const neptuneMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(neptuneGeometry, neptuneMaterial);
        neptuneMesh.position.set(60, 0, 0);
        neptuneMesh.rotation.z = three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.degToRad(28.3);
        neptunePivot.add(neptuneMesh);
        //海王星の軌道線
        const neptuneOrbitRadius = 60;
        const neptuneOrbitSegments = 100;
        const neptuneOrbitGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const neptuneOrbitVertices = [];
        for (let i = 0; i <= neptuneOrbitSegments; i++) {
            const angle = (i / neptuneOrbitSegments) * Math.PI * 2;
            const x = neptuneOrbitRadius * Math.cos(angle);
            const z = neptuneOrbitRadius * Math.sin(angle);
            neptuneOrbitVertices.push(x, 10, z);
        }
        neptuneOrbitGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(neptuneOrbitVertices, 3));
        const neptuneOrbitMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const neptuneOrbitLine = new three__WEBPACK_IMPORTED_MODULE_0__.LineLoop(neptuneOrbitGeometry, neptuneOrbitMaterial);
        this.scene.add(neptuneOrbitLine);
        // 背景の星空テクスチャを球で包む
        const loader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader();
        const starTexture = loader.load("8k_stars_milky_way.jpg");
        const skyGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(500, 64, 64);
        const skyMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ map: starTexture, side: three__WEBPACK_IMPORTED_MODULE_0__.BackSide });
        const sky = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(skyGeometry, skyMaterial);
        sky.rotation.y = Math.PI;
        this.scene.add(sky);
        let update = (time) => {
            // 太陽の自転を加える　
            sunMesh.rotation.y += 0.001;
            sunParticles.rotation.y += 0.001;
            // 地球の公転と自転
            earthPivot.rotation.y += 0.01;
            earthMesh.rotation.y += 0.02;
            //月の公転と自転
            moonPivot.rotation.y += 0.04;
            moonMesh.rotation.y += 0.004;
            //水星の公転と自転
            mercuryPivot.rotation.y += 0.025;
            mercuryMesh.rotation.y += 0.0015;
            //金星の公転と自転
            venusPivot.rotation.y += 0.013;
            venusMesh.rotation.y += 0.001;
            //火星の公転と自転
            marsPivot.rotation.y += 0.006;
            marsMesh.rotation.y += 0.015;
            //木星の公転と自転
            jupiterPivot.rotation.y += 0.002;
            jupiterParticles.rotation.y += 0.03;
            //土星の公転と自転
            saturnPivot.rotation.y += 0.004;
            saturnMesh.rotation.y += 0.025;
            //天王星の公転と自転
            uranusPivot.rotation.y += 0.002;
            uranusMesh.rotation.y += 0.02;
            //海王星の公転と自転
            neptunePivot.rotation.y += 0.0015;
            neptuneMesh.rotation.y += 0.018;
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(70, 70, 70));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxjQUFjO0FBQ2lCO0FBSS9CLE1BQU0sZ0JBQWdCO0lBQ1YsS0FBSyxDQUFjO0lBQ25CLEtBQUssQ0FBYztJQUUzQjtJQUVBLENBQUM7SUFFRCxxQkFBcUI7SUFDZCxpQkFBaUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBd0IsRUFBRSxFQUFFO1FBQ25GLE1BQU0sUUFBUSxHQUFHLElBQUksZ0RBQW1CLEVBQUUsQ0FBQztRQUMzQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksd0NBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2xELFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZTtRQUVqRCxRQUFRO1FBQ1IsTUFBTSxNQUFNLEdBQUcsSUFBSSxvREFBdUIsQ0FBQyxFQUFFLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLDBDQUFhLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFFcEIsTUFBTSxNQUFNLEdBQXlCLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDMUMsV0FBVyxJQUFJLElBQUksQ0FBQztZQUVwQixNQUFNLFlBQVksR0FBRyxHQUFHLENBQUM7WUFDekIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRXhFLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUN0QixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDekIsTUFBTSxNQUFNLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQztZQUV4RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDaEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRWhELE1BQU0sQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0RSxNQUFNLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXJELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLDBDQUFhLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUM7UUFF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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8yM0ZJMTA344CA5aKX5riV6ZuE6aObXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcblxuXG5jbGFzcyBUaHJlZUpTQ29udGFpbmVyIHtcbiAgICBwcml2YXRlIHNjZW5lOiBUSFJFRS5TY2VuZTtcbiAgICBwcml2YXRlIGxpZ2h0OiBUSFJFRS5MaWdodDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgLy8g55S76Z2i6YOo5YiG44Gu5L2c5oiQKOihqOekuuOBmeOCi+aeoOOBlOOBqOOBqykqXG4gICAgcHVibGljIGNyZWF0ZVJlbmRlcmVyRE9NID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpO1xuICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKG5ldyBUSFJFRS5Db2xvcigweDAwMDAwMCkpO1xuICAgICAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7Ly/jgrfjg6Pjg4njgqbjg57jg4Pjg5fjgpLmnInlirnjgavjgZnjgotcblxuICAgICAgICAvL+OCq+ODoeODqeOBruioreWumlxuICAgICAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEwLCAwKSk7IFxuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcblxuICAgICAgICBsZXQgZWxhcHNlZFRpbWUgPSAwO1xuXG4gICAgICAgIGNvbnN0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgZWxhcHNlZFRpbWUgKz0gMC4wMTtcblxuICAgICAgICAgICAgY29uc3QgbG9vcER1cmF0aW9uID0gNjAwO1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSAoZWxhcHNlZFRpbWUgJSBsb29wRHVyYXRpb24pIC8gbG9vcER1cmF0aW9uICogTWF0aC5QSSAqIDI7XG5cbiAgICAgICAgICAgIGNvbnN0IGJhc2VSYWRpdXMgPSA4MDtcbiAgICAgICAgICAgIGNvbnN0IHpvb21BbXBsaXR1ZGUgPSAyMDtcbiAgICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IGJhc2VSYWRpdXMgKyBNYXRoLnNpbihlbGFwc2VkVGltZSAqIDAuNSkgKiB6b29tQW1wbGl0dWRlO1xuXG4gICAgICAgICAgICBjb25zdCB0aWx0WCA9IE1hdGguc2luKGVsYXBzZWRUaW1lICogMC4zKSAqIDAuMzsgXG4gICAgICAgICAgICBjb25zdCB0aWx0WiA9IE1hdGguY29zKGVsYXBzZWRUaW1lICogMC40KSAqIDAuMzsgXG5cbiAgICAgICAgICAgIGNvbnN0IHggPSByYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSkgKiBNYXRoLmNvcyh0aWx0WCk7XG4gICAgICAgICAgICBjb25zdCB5ID0gMTAgKyBNYXRoLnNpbihlbGFwc2VkVGltZSAqIDAuMikgKiAyNSArIE1hdGguc2luKGFuZ2xlKSAqIDU7XG4gICAgICAgICAgICBjb25zdCB6ID0gcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpICogTWF0aC5jb3ModGlsdFopO1xuXG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24uc2V0KHgsIHksIHopO1xuICAgICAgICAgICAgY2FtZXJhLmxvb2tBdChuZXcgVEhSRUUuVmVjdG9yMygwLCAxMCwgMCkpOyBcblxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIGNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIH1cblxuXG4gICAgLy8g44K344O844Oz44Gu5L2c5oiQKOWFqOS9k+OBpzHlm54pXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG5cbiAgICAgICAgLy/jg6njgqTjg4jjga7oqK3lrppcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmKTtcbiAgICAgICAgY29uc3QgbHZlYyA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpLm5vcm1hbGl6ZSgpO1xuICAgICAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldChsdmVjLngsIGx2ZWMueSwgbHZlYy56KTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5saWdodCk7XG5cbiAgICAgICAgLy8g5aSq6Zm944Gu55CD5L2T44KS5L2c5oiQXG4gICAgICAgIGNvbnN0IHN1bkdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDMsIDMyLCAzMik7XG4gICAgICAgIGNvbnN0IHN1bk1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZhNTAwIH0pO1xuICAgICAgICBjb25zdCBzdW5NZXNoID0gbmV3IFRIUkVFLk1lc2goc3VuR2VvbWV0cnksIHN1bk1hdGVyaWFsKTtcbiAgICAgICAgc3VuTWVzaC5wb3NpdGlvbi5zZXQoMCwgMTAsIDApO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChzdW5NZXNoKTtcblxuICAgICAgICAvLyDlpKrpmb3jga7lkajjgorjgavov73liqBcbiAgICAgICAgY29uc3QgcGFydGljbGVHZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCBwYXJ0aWNsZUNvdW50ID0gMTAwMDtcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwYXJ0aWNsZUNvdW50ICogMyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSAzICsgTWF0aC5yYW5kb20oKSAqIDI7XG4gICAgICAgICAgICBjb25zdCB0aGV0YSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIGNvbnN0IHBoaSA9IE1hdGguYWNvcygyICogTWF0aC5yYW5kb20oKSAtIDEpO1xuICAgICAgICAgICAgY29uc3QgeCA9IHIgKiBNYXRoLnNpbihwaGkpICogTWF0aC5jb3ModGhldGEpO1xuICAgICAgICAgICAgY29uc3QgeSA9IHIgKiBNYXRoLnNpbihwaGkpICogTWF0aC5zaW4odGhldGEpO1xuICAgICAgICAgICAgY29uc3QgeiA9IHIgKiBNYXRoLmNvcyhwaGkpO1xuICAgICAgICAgICAgcG9zaXRpb25zLnNldChbeCwgeSwgel0sIGkgKiAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnRpY2xlR2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XG5cbiAgICAgICAgY29uc3QgcGFydGljbGVNYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgICAgICBjb2xvcjogMHhmZmE1MDAsXG4gICAgICAgICAgICBzaXplOiAwLjIsXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNSxcbiAgICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdW5QYXJ0aWNsZXMgPSBuZXcgVEhSRUUuUG9pbnRzKHBhcnRpY2xlR2VvbWV0cnksIHBhcnRpY2xlTWF0ZXJpYWwpO1xuICAgICAgICBzdW5QYXJ0aWNsZXMucG9zaXRpb24uY29weShzdW5NZXNoLnBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoc3VuUGFydGljbGVzKTtcblxuICAgICAgICAvL+WkqumZveOBruWFiVxuICAgICAgICBjb25zdCBzdW5MaWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZmZmZmZmLCAyLCAwKTtcbiAgICAgICAgc3VuTGlnaHQucG9zaXRpb24uc2V0KDAsIDEwLCAwKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoc3VuTGlnaHQpO1xuXG5cbiAgICAgICAgLy/lnLDnkIPjgpLkvZzmiJBcbiAgICAgICAgY29uc3QgdGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCk7XG4gICAgICAgIGNvbnN0IGVhcnRoVGV4dHVyZSA9IHRleHR1cmVMb2FkZXIubG9hZChcIjhrX2VhcnRoX2RheW1hcC5qcGdcIik7XG5cbiAgICAgICAgLy8g5Zyw55CD44Gu6LuM6YGT55So44Gu44OU44Oc44OD44OIXG4gICAgICAgIGNvbnN0IGVhcnRoUGl2b3QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgICAgICAgZWFydGhQaXZvdC5wb3NpdGlvbi5zZXQoMCwgMTAsIDApO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChlYXJ0aFBpdm90KTtcblxuICAgICAgICAvLyDlnLDnkIPmnKzkvZNcbiAgICAgICAgY29uc3QgZWFydGhHZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgxLCA2NCwgNjQpO1xuICAgICAgICBjb25zdCBlYXJ0aE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBtYXA6IGVhcnRoVGV4dHVyZSwgfSk7XG4gICAgICAgIGNvbnN0IGVhcnRoTWVzaCA9IG5ldyBUSFJFRS5NZXNoKGVhcnRoR2VvbWV0cnksIGVhcnRoTWF0ZXJpYWwpO1xuICAgICAgICBlYXJ0aE1lc2gucG9zaXRpb24uc2V0KDE1LCAwLCAwKTtcbiAgICAgICAgZWFydGhNZXNoLnJvdGF0aW9uLnogPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoMjMuNCk7XG4gICAgICAgIGVhcnRoUGl2b3QuYWRkKGVhcnRoTWVzaCk7XG5cbiAgICAgICAgLy8g6LuM6YGT44Oq44Oz44KwXG4gICAgICAgIGNvbnN0IG9yYml0UmFkaXVzID0gMTU7XG4gICAgICAgIGNvbnN0IG9yYml0U2VnbWVudHMgPSAxMDA7XG4gICAgICAgIGNvbnN0IG9yYml0R2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgY29uc3Qgb3JiaXRQb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBvcmJpdFNlZ21lbnRzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gKGkgLyBvcmJpdFNlZ21lbnRzKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgY29uc3QgeCA9IG9yYml0UmFkaXVzICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgY29uc3QgeiA9IG9yYml0UmFkaXVzICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICAgICAgb3JiaXRQb3NpdGlvbnMucHVzaCh4LCAxMCwgeik7XG4gICAgICAgIH1cblxuICAgICAgICBvcmJpdEdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShvcmJpdFBvc2l0aW9ucywgMykpO1xuICAgICAgICBjb25zdCBvcmJpdE1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmLCBvcGFjaXR5OiAwLjMsIHRyYW5zcGFyZW50OiB0cnVlIH0pO1xuICAgICAgICBjb25zdCBvcmJpdExpbmUgPSBuZXcgVEhSRUUuTGluZUxvb3Aob3JiaXRHZW9tZXRyeSwgb3JiaXRNYXRlcmlhbCk7XG5cbiAgICAgICAgdGhpcy5zY2VuZS5hZGQob3JiaXRMaW5lKTtcblxuXG5cbiAgICAgICAgLy8g5pyI44Gu44OU44Oc44OD44OIXG4gICAgICAgIGNvbnN0IG1vb25QaXZvdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICAgICAgICBtb29uUGl2b3QucG9zaXRpb24uc2V0KDAsIDAsIDApO1xuICAgICAgICBlYXJ0aE1lc2guYWRkKG1vb25QaXZvdCk7XG5cbiAgICAgICAgLy8g5pyI5pys5L2TXG4gICAgICAgIGNvbnN0IG1vb25HZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjE1LCAzMiwgMzIpO1xuICAgICAgICBjb25zdCBtb29uTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGFhYWFhYSB9KTtcbiAgICAgICAgY29uc3QgbW9vbk1lc2ggPSBuZXcgVEhSRUUuTWVzaChtb29uR2VvbWV0cnksIG1vb25NYXRlcmlhbCk7XG4gICAgICAgIG1vb25NZXNoLnBvc2l0aW9uLnNldCgxLjI1LCAwLCAwKTtcbiAgICAgICAgbW9vblBpdm90LmFkZChtb29uTWVzaCk7XG5cbiAgICAgICAgLy8g5pyI44Gu6LuM6YGTXG4gICAgICAgIGNvbnN0IG1vb25PcmJpdEdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIGNvbnN0IG1vb25PcmJpdFBvc2l0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBtb29uUmFkaXVzID0gMS4yNTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBvcmJpdFNlZ21lbnRzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gKGkgLyBvcmJpdFNlZ21lbnRzKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgY29uc3QgeCA9IG1vb25SYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICBjb25zdCB6ID0gbW9vblJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgICAgIG1vb25PcmJpdFBvc2l0aW9ucy5wdXNoKHgsIDAsIHopO1xuICAgICAgICB9XG4gICAgICAgIG1vb25PcmJpdEdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShtb29uT3JiaXRQb3NpdGlvbnMsIDMpKTtcbiAgICAgICAgY29uc3QgbW9vbk9yYml0TGluZSA9IG5ldyBUSFJFRS5MaW5lTG9vcChtb29uT3JiaXRHZW9tZXRyeSwgb3JiaXRNYXRlcmlhbC5jbG9uZSgpKTtcbiAgICAgICAgbW9vblBpdm90LmFkZChtb29uT3JiaXRMaW5lKTtcblxuXG4gICAgICAgIC8vIOawtOaYn+OBruODlOODnOODg+ODiFxuICAgICAgICBjb25zdCBtZXJjdXJ5UGl2b3QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgICAgICAgbWVyY3VyeVBpdm90LnBvc2l0aW9uLnNldCgwLCAxMCwgMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKG1lcmN1cnlQaXZvdCk7XG5cbiAgICAgICAgLy8g5rC05pif5pys5L2TXG4gICAgICAgIGNvbnN0IG1lcmN1cnlHZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjksIDMyLCAzMik7XG4gICAgICAgIGNvbnN0IG1lcmN1cnlNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweGFhYWFhYSwgbWV0YWxuZXNzOiAwLjYsIHJvdWdobmVzczogMC40LCB9KTtcbiAgICAgICAgY29uc3QgbWVyY3VyeU1lc2ggPSBuZXcgVEhSRUUuTWVzaChtZXJjdXJ5R2VvbWV0cnksIG1lcmN1cnlNYXRlcmlhbCk7XG4gICAgICAgIG1lcmN1cnlNZXNoLnBvc2l0aW9uLnNldCg1LjgsIDAsIDApO1xuICAgICAgICBtZXJjdXJ5TWVzaC5yb3RhdGlvbi56ID0gVEhSRUUuTWF0aFV0aWxzLmRlZ1RvUmFkKDAuMDM0KTtcbiAgICAgICAgbWVyY3VyeVBpdm90LmFkZChtZXJjdXJ5TWVzaCk7XG5cbiAgICAgICAgLy8g5rC05pif44Gu6LuM6YGT57eaXG4gICAgICAgIGNvbnN0IG1lcmN1cnlPcmJpdFJhZGl1cyA9IDUuODtcbiAgICAgICAgY29uc3QgbWVyY3VyeU9yYml0U2VnbWVudHMgPSAxMDA7XG4gICAgICAgIGNvbnN0IG1lcmN1cnlPcmJpdEdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIGNvbnN0IG1lcmN1cnlPcmJpdFZlcnRpY2VzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbWVyY3VyeU9yYml0U2VnbWVudHM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSAoaSAvIG1lcmN1cnlPcmJpdFNlZ21lbnRzKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgY29uc3QgeCA9IG1lcmN1cnlPcmJpdFJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIGNvbnN0IHogPSBtZXJjdXJ5T3JiaXRSYWRpdXMgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgICAgICBtZXJjdXJ5T3JiaXRWZXJ0aWNlcy5wdXNoKHgsIDEwLCB6KTtcbiAgICAgICAgfVxuICAgICAgICBtZXJjdXJ5T3JiaXRHZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUobWVyY3VyeU9yYml0VmVydGljZXMsIDMpKTtcbiAgICAgICAgY29uc3QgbWVyY3VyeU9yYml0TWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYsIG9wYWNpdHk6IDAuMywgdHJhbnNwYXJlbnQ6IHRydWUgfSk7XG4gICAgICAgIGNvbnN0IG1lcmN1cnlPcmJpdExpbmUgPSBuZXcgVEhSRUUuTGluZUxvb3AobWVyY3VyeU9yYml0R2VvbWV0cnksIG1lcmN1cnlPcmJpdE1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQobWVyY3VyeU9yYml0TGluZSk7XG5cblxuICAgICAgICAvLyDph5HmmJ/jga7ou4zpgZPjg5Tjg5zjg4Pjg4hcbiAgICAgICAgY29uc3QgdmVudXNQaXZvdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICAgICAgICB2ZW51c1Bpdm90LnBvc2l0aW9uLnNldCgwLCAxMCwgMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHZlbnVzUGl2b3QpO1xuXG4gICAgICAgIC8vIOmHkeaYn+OBruacrOS9k1xuICAgICAgICBjb25zdCB2ZW51c0dlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuOSwgMzIsIDMyKTtcbiAgICAgICAgY29uc3QgdmVudXNNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZGFhNTIwIH0pO1xuICAgICAgICBjb25zdCB2ZW51c01lc2ggPSBuZXcgVEhSRUUuTWVzaCh2ZW51c0dlb21ldHJ5LCB2ZW51c01hdGVyaWFsKTtcbiAgICAgICAgdmVudXNNZXNoLnBvc2l0aW9uLnNldCg5LCAwLCAwKTtcbiAgICAgICAgdmVudXNNZXNoLnJvdGF0aW9uLnogPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoMTc3LjQpO1xuICAgICAgICB2ZW51c1Bpdm90LmFkZCh2ZW51c01lc2gpO1xuXG4gICAgICAgIC8v6YeR5pif44Gu6LuM6YGT57eaXG4gICAgICAgIGNvbnN0IHZlbnVzT3JiaXRSYWRpdXMgPSA5O1xuICAgICAgICBjb25zdCB2ZW51c09yYml0U2VnbWVudHMgPSAxMDA7XG4gICAgICAgIGNvbnN0IHZlbnVzT3JiaXRHZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCB2ZW51c09yYml0VmVydGljZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB2ZW51c09yYml0U2VnbWVudHM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSAoaSAvIHZlbnVzT3JiaXRTZWdtZW50cykgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIGNvbnN0IHggPSB2ZW51c09yYml0UmFkaXVzICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgY29uc3QgeiA9IHZlbnVzT3JiaXRSYWRpdXMgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgICAgICB2ZW51c09yYml0VmVydGljZXMucHVzaCh4LCAxMCwgeik7XG4gICAgICAgIH1cblxuICAgICAgICB2ZW51c09yYml0R2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKHZlbnVzT3JiaXRWZXJ0aWNlcywgMykpO1xuICAgICAgICBjb25zdCB2ZW51c09yYml0TWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYsIG9wYWNpdHk6IDAuMywgdHJhbnNwYXJlbnQ6IHRydWUgfSlcbiAgICAgICAgY29uc3QgdmVudXNPcmJpdExpbmUgPSBuZXcgVEhSRUUuTGluZUxvb3AodmVudXNPcmJpdEdlb21ldHJ5LCB2ZW51c09yYml0TWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh2ZW51c09yYml0TGluZSk7XG5cblxuICAgICAgICAvLyDngavmmJ/jga7jg5Tjg5zjg4Pjg4hcbiAgICAgICAgY29uc3QgbWFyc1Bpdm90ID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gICAgICAgIG1hcnNQaXZvdC5wb3NpdGlvbi5zZXQoMCwgMTAsIDApO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChtYXJzUGl2b3QpO1xuXG4gICAgICAgIC8vIOeBq+aYn+OBruacrOS9k1xuICAgICAgICBjb25zdCBtYXJzR2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC40LCAzMiwgMzIpO1xuICAgICAgICBjb25zdCBtYXJzTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGIyMjIyMiB9KTsgXG4gICAgICAgIGNvbnN0IG1hcnNNZXNoID0gbmV3IFRIUkVFLk1lc2gobWFyc0dlb21ldHJ5LCBtYXJzTWF0ZXJpYWwpO1xuICAgICAgICBtYXJzTWVzaC5wb3NpdGlvbi5zZXQoMTgsIDAsIDApO1xuICAgICAgICBtYXJzTWVzaC5yb3RhdGlvbi56ID0gVEhSRUUuTWF0aFV0aWxzLmRlZ1RvUmFkKDI1LjIpO1xuICAgICAgICBtYXJzUGl2b3QuYWRkKG1hcnNNZXNoKTtcblxuICAgICAgICAvL+eBq+aYn+OBrui7jOmBk+e3mlxuICAgICAgICBjb25zdCBtYXJzT3JiaXRSYWRpdXMgPSAxODtcbiAgICAgICAgY29uc3QgbWFyc09yYml0U2VnbWVudHMgPSAxMDA7XG4gICAgICAgIGNvbnN0IG1hcnNPcmJpdEdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIGNvbnN0IG1hcnNPcmJpdFZlcnRpY2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG1hcnNPcmJpdFNlZ21lbnRzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gKGkgLyBtYXJzT3JiaXRTZWdtZW50cykgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIGNvbnN0IHggPSBtYXJzT3JiaXRSYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICBjb25zdCB6ID0gbWFyc09yYml0UmFkaXVzICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICAgICAgbWFyc09yYml0VmVydGljZXMucHVzaCh4LCAxMCwgeik7IC8vIOmrmOOBlTEw44Gn5LiA5a6aXG4gICAgICAgIH1cbiAgICAgICAgbWFyc09yYml0R2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKG1hcnNPcmJpdFZlcnRpY2VzLCAzKSk7XG4gICAgICAgIGNvbnN0IG1hcnNPcmJpdE1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmLCBvcGFjaXR5OiAwLjMsIHRyYW5zcGFyZW50OiB0cnVlIH0pO1xuICAgICAgICBjb25zdCBtYXJzT3JiaXRMaW5lID0gbmV3IFRIUkVFLkxpbmVMb29wKG1hcnNPcmJpdEdlb21ldHJ5LCBtYXJzT3JiaXRNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKG1hcnNPcmJpdExpbmUpO1xuXG5cbiAgICAgICAgLy8g5pyo5pif44Gu44OU44Oc44OD44OIXG4gICAgICAgIGNvbnN0IGp1cGl0ZXJQaXZvdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICAgICAgICBqdXBpdGVyUGl2b3QucG9zaXRpb24uc2V0KDAsIDEwLCAwKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoanVwaXRlclBpdm90KTtcblxuICAgICAgICAvLyDmnKjmmJ/jga7jg5Hjg7zjg4bjgqPjgq/jg6vjgpLnlJ/miJBcbiAgICAgICAgY29uc3QganVwaXRlclBhcnRpY2xlQ291bnQgPSAzNTAwO1xuICAgICAgICBjb25zdCBqdXBpdGVyUmFkaXVzID0gMS4yO1xuICAgICAgICBjb25zdCBqdXBpdGVyR2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgY29uc3QganVwaXRlclBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkoanVwaXRlclBhcnRpY2xlQ291bnQgKiAzKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGp1cGl0ZXJQYXJ0aWNsZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBqdXBpdGVyUmFkaXVzICogTWF0aC5jYnJ0KE1hdGgucmFuZG9tKCkpO1xuICAgICAgICAgICAgY29uc3QgdGhldGEgPSBNYXRoLnJhbmRvbSgpICogMiAqIE1hdGguUEk7XG4gICAgICAgICAgICBjb25zdCBwaGkgPSBNYXRoLmFjb3MoMiAqIE1hdGgucmFuZG9tKCkgLSAxKTtcbiAgICAgICAgICAgIGNvbnN0IHggPSByICogTWF0aC5zaW4ocGhpKSAqIE1hdGguY29zKHRoZXRhKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSByICogTWF0aC5zaW4ocGhpKSAqIE1hdGguc2luKHRoZXRhKTtcbiAgICAgICAgICAgIGNvbnN0IHogPSByICogTWF0aC5jb3MocGhpKTtcbiAgICAgICAgICAgIGp1cGl0ZXJQb3NpdGlvbnMuc2V0KFt4LCB5LCB6XSwgaSAqIDMpO1xuICAgICAgICB9XG4gICAgICAgIGp1cGl0ZXJHZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShqdXBpdGVyUG9zaXRpb25zLCAzKSk7XG4gICAgICAgIGNvbnN0IGp1cGl0ZXJNYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7IGNvbG9yOiAweGZmY2M4OCwgc2l6ZTogMC4wNSwgdHJhbnNwYXJlbnQ6IHRydWUsIG9wYWNpdHk6IDAuOCwgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcgfSk7XG4gICAgICAgIGNvbnN0IGp1cGl0ZXJQYXJ0aWNsZXMgPSBuZXcgVEhSRUUuUG9pbnRzKGp1cGl0ZXJHZW9tZXRyeSwganVwaXRlck1hdGVyaWFsKTtcbiAgICAgICAganVwaXRlclBhcnRpY2xlcy5wb3NpdGlvbi5zZXQoMjUsIDAsIDApO1xuICAgICAgICBqdXBpdGVyUGFydGljbGVzLnJvdGF0aW9uLnogPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoMy4xKTtcbiAgICAgICAganVwaXRlclBpdm90LmFkZChqdXBpdGVyUGFydGljbGVzKTtcblxuICAgICAgICAvL+acqOaYn+OBrui7jOmBk+e3mlxuICAgICAgICBjb25zdCBqdXBpdGVyT3JiaXRSYWRpdXMgPSAyNTtcbiAgICAgICAgY29uc3QganVwaXRlck9yYml0U2VnbWVudHMgPSAxMDA7XG4gICAgICAgIGNvbnN0IGp1cGl0ZXJPcmJpdEdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIGNvbnN0IGp1cGl0ZXJPcmJpdFZlcnRpY2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGp1cGl0ZXJPcmJpdFNlZ21lbnRzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gKGkgLyBqdXBpdGVyT3JiaXRTZWdtZW50cykgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIGNvbnN0IHggPSBqdXBpdGVyT3JiaXRSYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICBjb25zdCB6ID0ganVwaXRlck9yYml0UmFkaXVzICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICAgICAganVwaXRlck9yYml0VmVydGljZXMucHVzaCh4LCAxMCwgeik7XG4gICAgICAgIH1cbiAgICAgICAganVwaXRlck9yYml0R2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKGp1cGl0ZXJPcmJpdFZlcnRpY2VzLCAzKSk7XG4gICAgICAgIGNvbnN0IGp1cGl0ZXJPcmJpdE1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmLCBvcGFjaXR5OiAwLjMsIHRyYW5zcGFyZW50OiB0cnVlIH0pO1xuICAgICAgICBjb25zdCBqdXBpdGVyT3JiaXRMaW5lID0gbmV3IFRIUkVFLkxpbmVMb29wKGp1cGl0ZXJPcmJpdEdlb21ldHJ5LCBqdXBpdGVyT3JiaXRNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGp1cGl0ZXJPcmJpdExpbmUpO1xuXG5cbiAgICAgICAgLy8g5Zyf5pif44Gu6LuM6YGT55So44OU44Oc44OD44OIXG4gICAgICAgIGNvbnN0IHNhdHVyblBpdm90ID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gICAgICAgIHNhdHVyblBpdm90LnBvc2l0aW9uLnNldCgwLCAxMCwgMCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHNhdHVyblBpdm90KTtcblxuICAgICAgICAvLyDlnJ/mmJ/jga7mnKzkvZNcbiAgICAgICAgY29uc3Qgc2F0dXJuR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgY29uc3Qgc2F0dXJuR2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC45LCAzMiwgMzIpO1xuICAgICAgICBjb25zdCBzYXR1cm5NYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZDJiNDhjIH0pO1xuICAgICAgICBjb25zdCBzYXR1cm5NZXNoID0gbmV3IFRIUkVFLk1lc2goc2F0dXJuR2VvbWV0cnksIHNhdHVybk1hdGVyaWFsKTtcbiAgICAgICAgc2F0dXJuR3JvdXAuYWRkKHNhdHVybk1lc2gpO1xuXG4gICAgICAgIC8vIOWcn+aYn+OBrui8qlxuICAgICAgICBjb25zdCByaW5nR2VvbWV0cnkgPSBuZXcgVEhSRUUuUmluZ0dlb21ldHJ5KDEuMiwgMi4yLCA2NCk7XG4gICAgICAgIGNvbnN0IHJpbmdNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZDJiNDhjLCBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLCB0cmFuc3BhcmVudDogdHJ1ZSwgb3BhY2l0eTogMC41IH0pO1xuICAgICAgICBjb25zdCByaW5nTWVzaCA9IG5ldyBUSFJFRS5NZXNoKHJpbmdHZW9tZXRyeSwgcmluZ01hdGVyaWFsKTtcbiAgICAgICAgcmluZ01lc2gucm90YXRpb24ueCA9IFRIUkVFLk1hdGhVdGlscy5kZWdUb1JhZCg5MCk7XG4gICAgICAgIHJpbmdNZXNoLnBvc2l0aW9uLmNvcHkoc2F0dXJuTWVzaC5wb3NpdGlvbik7XG4gICAgICAgIHNhdHVybkdyb3VwLmFkZChyaW5nTWVzaCk7XG5cbiAgICAgICAgc2F0dXJuR3JvdXAucm90YXRpb24ueiA9IFRIUkVFLk1hdGhVdGlscy5kZWdUb1JhZCgyNi43KTtcbiAgICAgICAgc2F0dXJuR3JvdXAucG9zaXRpb24uc2V0KDMyLCAwLCAwKTtcbiAgICAgICAgc2F0dXJuUGl2b3QuYWRkKHNhdHVybkdyb3VwKTtcblxuICAgICAgICAvL+Wcn+aYn+OBrui7jOmBk+e3mlxuICAgICAgICBjb25zdCBzYXR1cm5PcmJpdFJhZGl1cyA9IDMyO1xuICAgICAgICBjb25zdCBzYXR1cm5PcmJpdFNlZ21lbnRzID0gMTAwO1xuICAgICAgICBjb25zdCBzYXR1cm5PcmJpdEdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIGNvbnN0IHNhdHVybk9yYml0VmVydGljZXM6IG51bWJlcltdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2F0dXJuT3JiaXRTZWdtZW50czsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IChpIC8gc2F0dXJuT3JiaXRTZWdtZW50cykgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIGNvbnN0IHggPSBzYXR1cm5PcmJpdFJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIGNvbnN0IHogPSBzYXR1cm5PcmJpdFJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgICAgIHNhdHVybk9yYml0VmVydGljZXMucHVzaCh4LCAxMCwgeik7XG4gICAgICAgIH1cblxuICAgICAgICBzYXR1cm5PcmJpdEdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShzYXR1cm5PcmJpdFZlcnRpY2VzLCAzKSk7XG4gICAgICAgIGNvbnN0IHNhdHVybk9yYml0TWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYsIG9wYWNpdHk6IDAuMywgdHJhbnNwYXJlbnQ6IHRydWUgfSk7XG4gICAgICAgIGNvbnN0IHNhdHVybk9yYml0TGluZSA9IG5ldyBUSFJFRS5MaW5lTG9vcChzYXR1cm5PcmJpdEdlb21ldHJ5LCBzYXR1cm5PcmJpdE1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoc2F0dXJuT3JiaXRMaW5lKTtcblxuXG4gICAgICAgIC8vIOWkqeeOi+aYn+OBruODlOODnOODg+ODiFxuICAgICAgICBjb25zdCB1cmFudXNQaXZvdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICAgICAgICB1cmFudXNQaXZvdC5wb3NpdGlvbi5zZXQoMCwgMTAsIDApO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh1cmFudXNQaXZvdCk7XG5cbiAgICAgICAgLy8g5aSp546L5pif44Gu5pys5L2TXG4gICAgICAgIGNvbnN0IHVyYW51c0dlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuNywgMzIsIDMyKTtcbiAgICAgICAgY29uc3QgdXJhbnVzTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDY2Y2NmZiB9KTtcbiAgICAgICAgY29uc3QgdXJhbnVzTWVzaCA9IG5ldyBUSFJFRS5NZXNoKHVyYW51c0dlb21ldHJ5LCB1cmFudXNNYXRlcmlhbCk7XG4gICAgICAgIHVyYW51c01lc2gucm90YXRpb24ueiA9IFRIUkVFLk1hdGhVdGlscy5kZWdUb1JhZCg5Ny44KTtcbiAgICAgICAgdXJhbnVzTWVzaC5wb3NpdGlvbi5zZXQoNDAsIDAsIDApO1xuICAgICAgICB1cmFudXNQaXZvdC5hZGQodXJhbnVzTWVzaCk7XG5cbiAgICAgICAgLy/lpKnnjovmmJ/jga7ou4zpgZPnt5pcbiAgICAgICAgY29uc3QgdXJhbnVzT3JiaXRSYWRpdXMgPSA0MDtcbiAgICAgICAgY29uc3QgdXJhbnVzT3JiaXRTZWdtZW50cyA9IDEwMDtcbiAgICAgICAgY29uc3QgdXJhbnVzT3JiaXRHZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCB1cmFudXNPcmJpdFZlcnRpY2VzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdXJhbnVzT3JiaXRTZWdtZW50czsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IChpIC8gdXJhbnVzT3JiaXRTZWdtZW50cykgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIGNvbnN0IHggPSB1cmFudXNPcmJpdFJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIGNvbnN0IHogPSB1cmFudXNPcmJpdFJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgICAgIHVyYW51c09yYml0VmVydGljZXMucHVzaCh4LCAxMCwgeik7XG4gICAgICAgIH1cbiAgICAgICAgdXJhbnVzT3JiaXRHZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUodXJhbnVzT3JiaXRWZXJ0aWNlcywgMykpO1xuICAgICAgICBjb25zdCB1cmFudXNPcmJpdE1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmLCBvcGFjaXR5OiAwLjMsIHRyYW5zcGFyZW50OiB0cnVlIH0pO1xuICAgICAgICBjb25zdCB1cmFudXNPcmJpdExpbmUgPSBuZXcgVEhSRUUuTGluZUxvb3AodXJhbnVzT3JiaXRHZW9tZXRyeSwgdXJhbnVzT3JiaXRNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHVyYW51c09yYml0TGluZSk7XG5cblxuICAgICAgICAvLyDmtbfnjovmmJ/jga7jg5Tjg5zjg4Pjg4hcbiAgICAgICAgY29uc3QgbmVwdHVuZVBpdm90ID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gICAgICAgIG5lcHR1bmVQaXZvdC5wb3NpdGlvbi5zZXQoMCwgMTAsIDApO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChuZXB0dW5lUGl2b3QpO1xuXG4gICAgICAgIC8vIOa1t+eOi+aYn+OBruacrOS9k1xuICAgICAgICBjb25zdCBuZXB0dW5lR2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC44LCAzMiwgMzIpO1xuICAgICAgICBjb25zdCBuZXB0dW5lTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDMzMzNmZiB9KTtcbiAgICAgICAgY29uc3QgbmVwdHVuZU1lc2ggPSBuZXcgVEhSRUUuTWVzaChuZXB0dW5lR2VvbWV0cnksIG5lcHR1bmVNYXRlcmlhbCk7XG4gICAgICAgIG5lcHR1bmVNZXNoLnBvc2l0aW9uLnNldCg2MCwgMCwgMCk7XG4gICAgICAgIG5lcHR1bmVNZXNoLnJvdGF0aW9uLnogPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoMjguMyk7XG4gICAgICAgIG5lcHR1bmVQaXZvdC5hZGQobmVwdHVuZU1lc2gpO1xuXG4gICAgICAgIC8v5rW3546L5pif44Gu6LuM6YGT57eaXG4gICAgICAgIGNvbnN0IG5lcHR1bmVPcmJpdFJhZGl1cyA9IDYwO1xuICAgICAgICBjb25zdCBuZXB0dW5lT3JiaXRTZWdtZW50cyA9IDEwMDtcbiAgICAgICAgY29uc3QgbmVwdHVuZU9yYml0R2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgY29uc3QgbmVwdHVuZU9yYml0VmVydGljZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBuZXB0dW5lT3JiaXRTZWdtZW50czsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IChpIC8gbmVwdHVuZU9yYml0U2VnbWVudHMpICogTWF0aC5QSSAqIDI7XG4gICAgICAgICAgICBjb25zdCB4ID0gbmVwdHVuZU9yYml0UmFkaXVzICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgY29uc3QgeiA9IG5lcHR1bmVPcmJpdFJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgICAgIG5lcHR1bmVPcmJpdFZlcnRpY2VzLnB1c2goeCwgMTAsIHopO1xuICAgICAgICB9XG4gICAgICAgIG5lcHR1bmVPcmJpdEdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShuZXB0dW5lT3JiaXRWZXJ0aWNlcywgMykpO1xuICAgICAgICBjb25zdCBuZXB0dW5lT3JiaXRNYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiwgb3BhY2l0eTogMC4zLCB0cmFuc3BhcmVudDogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgbmVwdHVuZU9yYml0TGluZSA9IG5ldyBUSFJFRS5MaW5lTG9vcChuZXB0dW5lT3JiaXRHZW9tZXRyeSwgbmVwdHVuZU9yYml0TWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChuZXB0dW5lT3JiaXRMaW5lKTtcblxuICAgICAgICAvLyDog4zmma/jga7mmJ/nqbrjg4bjgq/jgrnjg4Hjg6PjgpLnkIPjgafljIXjgoBcbiAgICAgICAgY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcbiAgICAgICAgY29uc3Qgc3RhclRleHR1cmUgPSBsb2FkZXIubG9hZChcIjhrX3N0YXJzX21pbGt5X3dheS5qcGdcIik7XG5cbiAgICAgICAgY29uc3Qgc2t5R2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoNTAwLCA2NCwgNjQpO1xuICAgICAgICBjb25zdCBza3lNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IG1hcDogc3RhclRleHR1cmUsIHNpZGU6IFRIUkVFLkJhY2tTaWRlIH0pO1xuICAgICAgICBjb25zdCBza3kgPSBuZXcgVEhSRUUuTWVzaChza3lHZW9tZXRyeSwgc2t5TWF0ZXJpYWwpO1xuICAgICAgICBza3kucm90YXRpb24ueT1NYXRoLlBJO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChza3kpO1xuXG5cblxuICAgICAgICBsZXQgdXBkYXRlOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICAvLyDlpKrpmb3jga7oh6rou6LjgpLliqDjgYjjgovjgIBcbiAgICAgICAgICAgIHN1bk1lc2gucm90YXRpb24ueSArPSAwLjAwMTtcbiAgICAgICAgICAgIHN1blBhcnRpY2xlcy5yb3RhdGlvbi55ICs9IDAuMDAxO1xuXG4gICAgICAgICAgICAvLyDlnLDnkIPjga7lhazou6Ljgajoh6rou6JcbiAgICAgICAgICAgIGVhcnRoUGl2b3Qucm90YXRpb24ueSArPSAwLjAxO1xuICAgICAgICAgICAgZWFydGhNZXNoLnJvdGF0aW9uLnkgKz0gMC4wMjtcblxuICAgICAgICAgICAgLy/mnIjjga7lhazou6Ljgajoh6rou6JcbiAgICAgICAgICAgIG1vb25QaXZvdC5yb3RhdGlvbi55ICs9IDAuMDQ7XG4gICAgICAgICAgICBtb29uTWVzaC5yb3RhdGlvbi55ICs9IDAuMDA0O1xuXG4gICAgICAgICAgICAvL+awtOaYn+OBruWFrOi7ouOBqOiHqui7olxuICAgICAgICAgICAgbWVyY3VyeVBpdm90LnJvdGF0aW9uLnkgKz0gMC4wMjU7XG4gICAgICAgICAgICBtZXJjdXJ5TWVzaC5yb3RhdGlvbi55ICs9IDAuMDAxNTtcblxuICAgICAgICAgICAgLy/ph5HmmJ/jga7lhazou6Ljgajoh6rou6JcbiAgICAgICAgICAgIHZlbnVzUGl2b3Qucm90YXRpb24ueSArPSAwLjAxMztcbiAgICAgICAgICAgIHZlbnVzTWVzaC5yb3RhdGlvbi55ICs9IDAuMDAxO1xuXG4gICAgICAgICAgICAvL+eBq+aYn+OBruWFrOi7ouOBqOiHqui7olxuICAgICAgICAgICAgbWFyc1Bpdm90LnJvdGF0aW9uLnkgKz0gMC4wMDY7XG4gICAgICAgICAgICBtYXJzTWVzaC5yb3RhdGlvbi55ICs9IDAuMDE1O1xuXG4gICAgICAgICAgICAvL+acqOaYn+OBruWFrOi7ouOBqOiHqui7olxuICAgICAgICAgICAganVwaXRlclBpdm90LnJvdGF0aW9uLnkgKz0gMC4wMDI7XG4gICAgICAgICAgICBqdXBpdGVyUGFydGljbGVzLnJvdGF0aW9uLnkgKz0gMC4wMztcblxuICAgICAgICAgICAgLy/lnJ/mmJ/jga7lhazou6Ljgajoh6rou6JcbiAgICAgICAgICAgIHNhdHVyblBpdm90LnJvdGF0aW9uLnkgKz0gMC4wMDQ7XG4gICAgICAgICAgICBzYXR1cm5NZXNoLnJvdGF0aW9uLnkgKz0gMC4wMjU7XG5cbiAgICAgICAgICAgIC8v5aSp546L5pif44Gu5YWs6Lui44Go6Ieq6LuiXG4gICAgICAgICAgICB1cmFudXNQaXZvdC5yb3RhdGlvbi55ICs9IDAuMDAyO1xuICAgICAgICAgICAgdXJhbnVzTWVzaC5yb3RhdGlvbi55ICs9IDAuMDI7XG5cbiAgICAgICAgICAgIC8v5rW3546L5pif44Gu5YWs6Lui44Go6Ieq6LuiXG4gICAgICAgICAgICBuZXB0dW5lUGl2b3Qucm90YXRpb24ueSArPSAwLjAwMTU7XG4gICAgICAgICAgICBuZXB0dW5lTWVzaC5yb3RhdGlvbi55ICs9IDAuMDE4O1xuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICB9XG5cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuXG4gICAgbGV0IHZpZXdwb3J0ID0gY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKDY0MCwgNDgwLCBuZXcgVEhSRUUuVmVjdG9yMyg3MCwgNzAsIDcwKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==