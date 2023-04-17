import * as THREE from "../../../../js/Threejs/build/three.module.js";
import { STLLoader } from "../../../../js/Threejs/examples/jsm/loaders/STLLoader.js";
export class lcvModel extends THREE.Object3D{
    name = 'MODEL'
    constructor(data,callback) {
        super();
        const loader = new STLLoader();
        loader.setCrossOrigin('');//跨域问题
        loader.load(data,
            (stl)=>{
                var material = new THREE.MeshLambertMaterial({side: THREE.DoubleSide});
                var mesh = new THREE.Mesh(stl,material);
                this.add(mesh)
                callback(this);
            });
    }
}