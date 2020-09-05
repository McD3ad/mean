import {
    trigger,
    group,
    query,
    style,
    animate,
    transition,
    animateChild
} from '@angular/animations';

export const fade = trigger('fade', [
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ], { optional: true }),
        query(':enter', [
            style({ left: '-100%' })
        ], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
            query(':leave', [
                animate('1s ease-out', style({ left: '100%' }))
            ], { optional: true }),
            query(':enter', [
                animate('1s ease-out', style({ left: '0%' }))
            ], { optional: true })
        ]),
        query(':enter', animateChild(), { optional: true }),
    ]),
    // transition(':leave', [
    //     style({ opacity: 1 }),
    //     animate('2s ease-out',
    //         style({ opacity: 0 })
    //     )
    // ])
]);