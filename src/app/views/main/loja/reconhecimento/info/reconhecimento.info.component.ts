import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UiElement, UiSnackbar, UiToolbarService } from 'ng-smn-ui';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ReconhecimentoService } from '../../reconhecimento/reconhecimento.service';

@Component({
    selector: 'reconhecimento-info',
    templateUrl: './reconhecimento.info.component.html',
    styleUrls: ['./reconhecimento.info.component.scss'],
    providers: [ReconhecimentoService]
})
export class ReconhecimentoInfoComponent implements OnInit, AfterViewInit, OnDestroy {
    videoSrc;
    imagem;
    videoWidth;
    videoHeight;

    saving: boolean;
    newRegister: boolean;
    loading = false;

    @ViewChild('formReconhecimento') formReconhecimento;

    constructor(private toolbarService: UiToolbarService,
        public _location: Location,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private route: ActivatedRoute,
        private element: ElementRef,
        private sanitizer: DomSanitizer,
        private reconhecimentoService: ReconhecimentoService) {
    }

    ngOnInit() {
        this.iniciarCamera();
    }

    ngAfterViewInit() {
        this.toolbarService.set('Reconhecimento');
        this.toolbarService.activateExtendedToolbar(960);
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }

    iniciarCamera() {
        let nav = <any>navigator;

        nav.getUserMedia = nav.getUserMedia || nav.mozGetUserMedia || nav.webkitGetUserMedia;

        if (!nav.getUserMedia) {
            UiSnackbar.show({
                text: 'Seu navegador não tem suporte para Webcam'
            });
            return;
        }

        let options = {
            video: true,
            audio: false
        };

        nav.getUserMedia(options, (stream) => {
            let webcamUrl = URL.createObjectURL(stream);
            this.videoSrc = this.sanitizer.bypassSecurityTrustUrl(webcamUrl);
            let video = this.element.nativeElement.querySelector('#video-user');
            video.autoplay = true;

            let reconhecimento = this;

            let getVideoSize = function() {
                reconhecimento.videoWidth = video.videoWidth;
                reconhecimento.videoHeight = video.videoHeight;
                video.removeEventListener('playing', getVideoSize, false);
            };

            video.addEventListener('playing', getVideoSize, false);

        }, (err) => {
            UiSnackbar.show({
                text: 'Ocorreu um erro ao iniciar a Webcam'
            });
        });
    }

    onSubmit(form) {
        if (!this.saving) {
            this.saving = true;

            let video = this.element.nativeElement.querySelector('#video-user');
            let canvas = this.element.nativeElement.querySelector('#canvas');
            var ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0);

            this.imagem = canvas.toDataURL("image/jpeg");

            this.reconhecimentoService.reconhecer(this.imagem).subscribe(data => {
                this.saving = false;
                this.router.navigate(['/reconhecimento', data['content'].idVisita], { replaceUrl: true });
            }, e => {
                this.saving = false;
                UiSnackbar.show({
                    text: 'Ocorreu um erro interno, tente novamente mais tarde.'
                });
            });
        }
    }
}
