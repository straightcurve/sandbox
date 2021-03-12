import { Observable } from "rxjs";
import * as THREE from "three";

export default interface MainActionMap {
    move: Observable<THREE.Vector2>;
}
