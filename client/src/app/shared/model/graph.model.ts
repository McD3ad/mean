import { OnInit, OnDestroy, Directive } from '@angular/core'

@Directive()
export class GraphDirective implements OnInit, OnDestroy {

    constructor() {}

    public ngOnInit() {
        console.log('init')
    }

    public ngOnDestroy() {
        console.log('destroy')
    }

}  