import * as THREE from "../../../../js/Threejs/build/three.module.js";
import { GLTFLoader } from "../../../../js/Threejs/examples/jsm/loaders/GLTFLoader.js";
export class lcvRobot extends THREE.Object3D{
    name = 'ROBOT'
    constructor(data,callback) {
        super();
        const loader = new GLTFLoader();
        loader.setCrossOrigin('');//跨域问题
        loader.load(data,
            (gltf)=>{
                gltf.scene.position.set(0, 0, 0);
                this.add(gltf.scene)
                callback(this);
            });
    }
}