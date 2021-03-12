import { AfterViewInit, Component, ViewChild } from "@angular/core";
import * as THREE from "three";
import MainActionMap from "./game/input/action-maps/main";
import KeyboardMouse from "./game/kbm";

@Component({
    selector: "app-three-js",
    templateUrl: "./three-js.component.html",
    styleUrls: ["./three-js.component.scss"],
})
export class ThreeJsComponent implements AfterViewInit {
    @ViewChild("scene") canvas: { nativeElement: HTMLCanvasElement };

    constructor() {}

    ngAfterViewInit(): void {
        const scene = new THREE.Scene();
        const aspect_ratio =
            this.canvas.nativeElement.width / this.canvas.nativeElement.height;
        const camera = new THREE.PerspectiveCamera(75, aspect_ratio, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({
            canvas: this.canvas.nativeElement,
        });
        renderer.setSize(
            this.canvas.nativeElement.parentElement.clientWidth,
            this.canvas.nativeElement.parentElement.clientWidth / aspect_ratio
        );

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        let _direction: THREE.Vector2 = new THREE.Vector2();
        let action_map: MainActionMap = new KeyboardMouse();
        action_map.move.subscribe((direction) => {
            _direction = direction;
        });

        function animate() {
            requestAnimationFrame(animate);

            cube.position.x += _direction.x;
            cube.position.y += _direction.y;

            renderer.render(scene, camera);
        }

        animate();
    }
}
