import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {
    public select$: Subject<void> = new Subject();
    
  constructor() { }
}
