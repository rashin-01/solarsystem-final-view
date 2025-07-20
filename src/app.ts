//23FI107　増渕雄飛
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


class ThreeJSContainer {
    private scene: THREE.Scene;
    private light: THREE.Light;

    constructor() {

    }

    // 画面部分の作成(表示する枠ごとに)*
    public createRendererDOM = (width: number, height: number, cameraPos: THREE.Vector3) => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.shadowMap.enabled = true;//シャドウマップを有効にする

        //カメラの設定
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new THREE.Vector3(0, 10, 0)); 

        this.createScene();

        let elapsedTime = 0;

        const render: FrameRequestCallback = (time) => {
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
            camera.lookAt(new THREE.Vector3(0, 10, 0)); 

            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);

        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    }


    // シーンの作成(全体で1回)
    private createScene = () => {
        this.scene = new THREE.Scene();


        //ライトの設定
        this.light = new THREE.DirectionalLight(0xffffff);
        const lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);

        // 太陽の球体を作成
        const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
        const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
        sunMesh.position.set(0, 10, 0);
        this.scene.add(sunMesh);

        // 太陽の周りに追加
        const particleGeometry = new THREE.BufferGeometry();
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

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0xffa500,
            size: 0.2,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
        });

        const sunParticles = new THREE.Points(particleGeometry, particleMaterial);
        sunParticles.position.copy(sunMesh.position);
        this.scene.add(sunParticles);

        //太陽の光
        const sunLight = new THREE.PointLight(0xffffff, 2, 0);
        sunLight.position.set(0, 10, 0);
        this.scene.add(sunLight);


        //地球を作成
        const textureLoader = new THREE.TextureLoader();
        const earthTexture = textureLoader.load("8k_earth_daymap.jpg");

        // 地球の軌道用のピボット
        const earthPivot = new THREE.Object3D();
        earthPivot.position.set(0, 10, 0);
        this.scene.add(earthPivot);

        // 地球本体
        const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
        const earthMaterial = new THREE.MeshLambertMaterial({ map: earthTexture, });
        const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        earthMesh.position.set(15, 0, 0);
        earthMesh.rotation.z = THREE.MathUtils.degToRad(23.4);
        earthPivot.add(earthMesh);

        // 軌道リング
        const orbitRadius = 15;
        const orbitSegments = 100;
        const orbitGeometry = new THREE.BufferGeometry();
        const orbitPositions = [];

        for (let i = 0; i <= orbitSegments; i++) {
            const angle = (i / orbitSegments) * Math.PI * 2;
            const x = orbitRadius * Math.cos(angle);
            const z = orbitRadius * Math.sin(angle);
            orbitPositions.push(x, 10, z);
        }

        orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPositions, 3));
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);

        this.scene.add(orbitLine);



        // 月のピボット
        const moonPivot = new THREE.Object3D();
        moonPivot.position.set(0, 0, 0);
        earthMesh.add(moonPivot);

        // 月本体
        const moonGeometry = new THREE.SphereGeometry(0.15, 32, 32);
        const moonMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
        const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        moonMesh.position.set(1.25, 0, 0);
        moonPivot.add(moonMesh);

        // 月の軌道
        const moonOrbitGeometry = new THREE.BufferGeometry();
        const moonOrbitPositions = [];
        const moonRadius = 1.25;

        for (let i = 0; i <= orbitSegments; i++) {
            const angle = (i / orbitSegments) * Math.PI * 2;
            const x = moonRadius * Math.cos(angle);
            const z = moonRadius * Math.sin(angle);
            moonOrbitPositions.push(x, 0, z);
        }
        moonOrbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(moonOrbitPositions, 3));
        const moonOrbitLine = new THREE.LineLoop(moonOrbitGeometry, orbitMaterial.clone());
        moonPivot.add(moonOrbitLine);


        // 水星のピボット
        const mercuryPivot = new THREE.Object3D();
        mercuryPivot.position.set(0, 10, 0);
        this.scene.add(mercuryPivot);

        // 水星本体
        const mercuryGeometry = new THREE.SphereGeometry(0.9, 32, 32);
        const mercuryMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.6, roughness: 0.4, });
        const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
        mercuryMesh.position.set(5.8, 0, 0);
        mercuryMesh.rotation.z = THREE.MathUtils.degToRad(0.034);
        mercuryPivot.add(mercuryMesh);

        // 水星の軌道線
        const mercuryOrbitRadius = 5.8;
        const mercuryOrbitSegments = 100;
        const mercuryOrbitGeometry = new THREE.BufferGeometry();
        const mercuryOrbitVertices = [];

        for (let i = 0; i <= mercuryOrbitSegments; i++) {
            const angle = (i / mercuryOrbitSegments) * Math.PI * 2;
            const x = mercuryOrbitRadius * Math.cos(angle);
            const z = mercuryOrbitRadius * Math.sin(angle);
            mercuryOrbitVertices.push(x, 10, z);
        }
        mercuryOrbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(mercuryOrbitVertices, 3));
        const mercuryOrbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const mercuryOrbitLine = new THREE.LineLoop(mercuryOrbitGeometry, mercuryOrbitMaterial);
        this.scene.add(mercuryOrbitLine);


        // 金星の軌道ピボット
        const venusPivot = new THREE.Object3D();
        venusPivot.position.set(0, 10, 0);
        this.scene.add(venusPivot);

        // 金星の本体
        const venusGeometry = new THREE.SphereGeometry(0.9, 32, 32);
        const venusMaterial = new THREE.MeshLambertMaterial({ color: 0xdaa520 });
        const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
        venusMesh.position.set(9, 0, 0);
        venusMesh.rotation.z = THREE.MathUtils.degToRad(177.4);
        venusPivot.add(venusMesh);

        //金星の軌道線
        const venusOrbitRadius = 9;
        const venusOrbitSegments = 100;
        const venusOrbitGeometry = new THREE.BufferGeometry();
        const venusOrbitVertices = [];

        for (let i = 0; i <= venusOrbitSegments; i++) {
            const angle = (i / venusOrbitSegments) * Math.PI * 2;
            const x = venusOrbitRadius * Math.cos(angle);
            const z = venusOrbitRadius * Math.sin(angle);
            venusOrbitVertices.push(x, 10, z);
        }

        venusOrbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(venusOrbitVertices, 3));
        const venusOrbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true })
        const venusOrbitLine = new THREE.LineLoop(venusOrbitGeometry, venusOrbitMaterial);
        this.scene.add(venusOrbitLine);


        // 火星のピボット
        const marsPivot = new THREE.Object3D();
        marsPivot.position.set(0, 10, 0);
        this.scene.add(marsPivot);

        // 火星の本体
        const marsGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const marsMaterial = new THREE.MeshLambertMaterial({ color: 0xb22222 }); 
        const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
        marsMesh.position.set(18, 0, 0);
        marsMesh.rotation.z = THREE.MathUtils.degToRad(25.2);
        marsPivot.add(marsMesh);

        //火星の軌道線
        const marsOrbitRadius = 18;
        const marsOrbitSegments = 100;
        const marsOrbitGeometry = new THREE.BufferGeometry();
        const marsOrbitVertices: number[] = [];

        for (let i = 0; i <= marsOrbitSegments; i++) {
            const angle = (i / marsOrbitSegments) * Math.PI * 2;
            const x = marsOrbitRadius * Math.cos(angle);
            const z = marsOrbitRadius * Math.sin(angle);
            marsOrbitVertices.push(x, 10, z); // 高さ10で一定
        }
        marsOrbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(marsOrbitVertices, 3));
        const marsOrbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const marsOrbitLine = new THREE.LineLoop(marsOrbitGeometry, marsOrbitMaterial);
        this.scene.add(marsOrbitLine);


        // 木星のピボット
        const jupiterPivot = new THREE.Object3D();
        jupiterPivot.position.set(0, 10, 0);
        this.scene.add(jupiterPivot);

        // 木星のパーティクルを生成
        const jupiterParticleCount = 3500;
        const jupiterRadius = 1.2;
        const jupiterGeometry = new THREE.BufferGeometry();
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
        jupiterGeometry.setAttribute('position', new THREE.BufferAttribute(jupiterPositions, 3));
        const jupiterMaterial = new THREE.PointsMaterial({ color: 0xffcc88, size: 0.05, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        const jupiterParticles = new THREE.Points(jupiterGeometry, jupiterMaterial);
        jupiterParticles.position.set(25, 0, 0);
        jupiterParticles.rotation.z = THREE.MathUtils.degToRad(3.1);
        jupiterPivot.add(jupiterParticles);

        //木星の軌道線
        const jupiterOrbitRadius = 25;
        const jupiterOrbitSegments = 100;
        const jupiterOrbitGeometry = new THREE.BufferGeometry();
        const jupiterOrbitVertices: number[] = [];

        for (let i = 0; i <= jupiterOrbitSegments; i++) {
            const angle = (i / jupiterOrbitSegments) * Math.PI * 2;
            const x = jupiterOrbitRadius * Math.cos(angle);
            const z = jupiterOrbitRadius * Math.sin(angle);
            jupiterOrbitVertices.push(x, 10, z);
        }
        jupiterOrbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(jupiterOrbitVertices, 3));
        const jupiterOrbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const jupiterOrbitLine = new THREE.LineLoop(jupiterOrbitGeometry, jupiterOrbitMaterial);
        this.scene.add(jupiterOrbitLine);


        // 土星の軌道用ピボット
        const saturnPivot = new THREE.Object3D();
        saturnPivot.position.set(0, 10, 0);
        this.scene.add(saturnPivot);

        // 土星の本体
        const saturnGroup = new THREE.Group();
        const saturnGeometry = new THREE.SphereGeometry(0.9, 32, 32);
        const saturnMaterial = new THREE.MeshLambertMaterial({ color: 0xd2b48c });
        const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
        saturnGroup.add(saturnMesh);

        // 土星の輪
        const ringGeometry = new THREE.RingGeometry(1.2, 2.2, 64);
        const ringMaterial = new THREE.MeshLambertMaterial({ color: 0xd2b48c, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.rotation.x = THREE.MathUtils.degToRad(90);
        ringMesh.position.copy(saturnMesh.position);
        saturnGroup.add(ringMesh);

        saturnGroup.rotation.z = THREE.MathUtils.degToRad(26.7);
        saturnGroup.position.set(32, 0, 0);
        saturnPivot.add(saturnGroup);

        //土星の軌道線
        const saturnOrbitRadius = 32;
        const saturnOrbitSegments = 100;
        const saturnOrbitGeometry = new THREE.BufferGeometry();
        const saturnOrbitVertices: number[] = [];

        for (let i = 0; i <= saturnOrbitSegments; i++) {
            const angle = (i / saturnOrbitSegments) * Math.PI * 2;
            const x = saturnOrbitRadius * Math.cos(angle);
            const z = saturnOrbitRadius * Math.sin(angle);
            saturnOrbitVertices.push(x, 10, z);
        }

        saturnOrbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(saturnOrbitVertices, 3));
        const saturnOrbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const saturnOrbitLine = new THREE.LineLoop(saturnOrbitGeometry, saturnOrbitMaterial);
        this.scene.add(saturnOrbitLine);


        // 天王星のピボット
        const uranusPivot = new THREE.Object3D();
        uranusPivot.position.set(0, 10, 0);
        this.scene.add(uranusPivot);

        // 天王星の本体
        const uranusGeometry = new THREE.SphereGeometry(0.7, 32, 32);
        const uranusMaterial = new THREE.MeshLambertMaterial({ color: 0x66ccff });
        const uranusMesh = new THREE.Mesh(uranusGeometry, uranusMaterial);
        uranusMesh.rotation.z = THREE.MathUtils.degToRad(97.8);
        uranusMesh.position.set(40, 0, 0);
        uranusPivot.add(uranusMesh);

        //天王星の軌道線
        const uranusOrbitRadius = 40;
        const uranusOrbitSegments = 100;
        const uranusOrbitGeometry = new THREE.BufferGeometry();
        const uranusOrbitVertices = [];

        for (let i = 0; i <= uranusOrbitSegments; i++) {
            const angle = (i / uranusOrbitSegments) * Math.PI * 2;
            const x = uranusOrbitRadius * Math.cos(angle);
            const z = uranusOrbitRadius * Math.sin(angle);
            uranusOrbitVertices.push(x, 10, z);
        }
        uranusOrbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(uranusOrbitVertices, 3));
        const uranusOrbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const uranusOrbitLine = new THREE.LineLoop(uranusOrbitGeometry, uranusOrbitMaterial);
        this.scene.add(uranusOrbitLine);


        // 海王星のピボット
        const neptunePivot = new THREE.Object3D();
        neptunePivot.position.set(0, 10, 0);
        this.scene.add(neptunePivot);

        // 海王星の本体
        const neptuneGeometry = new THREE.SphereGeometry(0.8, 32, 32);
        const neptuneMaterial = new THREE.MeshLambertMaterial({ color: 0x3333ff });
        const neptuneMesh = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
        neptuneMesh.position.set(60, 0, 0);
        neptuneMesh.rotation.z = THREE.MathUtils.degToRad(28.3);
        neptunePivot.add(neptuneMesh);

        //海王星の軌道線
        const neptuneOrbitRadius = 60;
        const neptuneOrbitSegments = 100;
        const neptuneOrbitGeometry = new THREE.BufferGeometry();
        const neptuneOrbitVertices = [];

        for (let i = 0; i <= neptuneOrbitSegments; i++) {
            const angle = (i / neptuneOrbitSegments) * Math.PI * 2;
            const x = neptuneOrbitRadius * Math.cos(angle);
            const z = neptuneOrbitRadius * Math.sin(angle);
            neptuneOrbitVertices.push(x, 10, z);
        }
        neptuneOrbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(neptuneOrbitVertices, 3));
        const neptuneOrbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const neptuneOrbitLine = new THREE.LineLoop(neptuneOrbitGeometry, neptuneOrbitMaterial);
        this.scene.add(neptuneOrbitLine);

        // 背景の星空テクスチャを球で包む
        const loader = new THREE.TextureLoader();
        const starTexture = loader.load("8k_stars_milky_way.jpg");

        const skyGeometry = new THREE.SphereGeometry(500, 64, 64);
        const skyMaterial = new THREE.MeshBasicMaterial({ map: starTexture, side: THREE.BackSide });
        const sky = new THREE.Mesh(skyGeometry, skyMaterial);
        sky.rotation.y=Math.PI;
        this.scene.add(sky);



        let update: FrameRequestCallback = (time) => {
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
        }
        requestAnimationFrame(update);
    }

}

window.addEventListener("DOMContentLoaded", init);

function init() {
    let container = new ThreeJSContainer();

    let viewport = container.createRendererDOM(640, 480, new THREE.Vector3(70, 70, 70));
    document.body.appendChild(viewport);
}
