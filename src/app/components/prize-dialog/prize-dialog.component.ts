import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import Speech from 'speak-tts'

@Component({
    selector: 'prize',
    templateUrl: 'prize-dialog.component.html',
    styleUrls: ['prize-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class PrizeDialog implements AfterViewInit {

    confettiDefaults = {
        zIndex: 9999,
        origin: { y: 0.5 }
    }

    speech = new Speech()

    constructor(
        public dialogRef: MatDialogRef<PrizeDialog>,
        @Inject(MAT_DIALOG_DATA) public data) {
        dialogRef.disableClose = true;
        if (this.speech.hasBrowserSupport()) {
            this.speech.init()
        }
    }

    ngAfterViewInit() {
        this.shoot()
        let a = []
        let speechText = "You've won, " + this.data.patterns.map(p => p.friendlyName()).join(', ')
        console.log(speechText)
        this.speech.speak({ text: speechText })
    }

    onCloseClick() {
        this.dialogRef.close()
    }

    shoot() {
        this.fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        this.fire(0.2, {
            spread: 60,
        });
        this.fire(0.35, {
            spread: 100,
            decay: 0.91,
        });
        this.fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
        });
        this.fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }

    fire(particleRatio, opts) {
        this.confetti(Object.assign({}, this.confettiDefaults, opts, {
            particleCount: Math.floor(200 * particleRatio)
        }));
    }

    random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    confetti(args: any) {
        return window['confetti'].apply(this, arguments);
    }

}