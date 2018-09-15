import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UiElement, UiSnackbar, UiToolbarService } from 'ng-smn-ui';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PecaService } from '../../peca/peca.service';

@Component({
    selector: 'peca-info',
    templateUrl: './peca.info.component.html',
    styleUrls: ['./peca.info.component.scss'],
    providers: [PecaService]
})
export class PecaInfoComponent implements OnInit, AfterViewInit, OnDestroy {
    info;
    tiposPeca;

    saving: boolean;
    newRegister: boolean;
    tipoPecaLoading = true;
    loading = true;

    @ViewChild('formPeca') formPeca;
    @ViewChild('inputNovaImagem') inputNovaImagem;

    constructor(private toolbarService: UiToolbarService,
        public _location: Location,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private route: ActivatedRoute,
        private element: ElementRef,
        private pecaService: PecaService) {
        this.info = {};
        this.tiposPeca = [];
    }

    ngOnInit() {
        this.getTiposPeca();
    }

    ngAfterViewInit() {
        this.toolbarService.set('Peça');
        this.toolbarService.activateExtendedToolbar(960);

        if (this.route.snapshot.params['id']) {
            setTimeout(() => {
                this.newRegister = false;
            });
            this.getPeca();
        } else {
            setTimeout(() => {
                this.newRegister = true;
                this.loading = false;
            });
        }
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }

    getTiposPeca() {
        this.tipoPecaLoading = true;
        this.pecaService.buscarTiposPeca().subscribe(data => {
            this.tiposPeca = data['content'];
            this.tipoPecaLoading = false;
        }, e => {
            this.tipoPecaLoading = false;
            UiSnackbar.show({
                text: 'Ocorreu um erro interno, tente novamente mais tarde.'
            });
        });
    }

    onSubmit(form) {
        if (!this.saving) {
            for (const control in form.controls) {
                if (form.controls.hasOwnProperty(control)) {
                    form.controls[control].markAsTouched();
                    form.controls[control].markAsDirty();
                }
            }

            if (!form.valid) {
                this.element.nativeElement.querySelectorAll('form .ng-invalid')[0].focus();
                return false;
            }

            this.saving = true;
            const id = this.route.snapshot.params['id'];

            const pecaRoute = {
                method: this.newRegister ? 'cadastrar' : 'atualizar',
                message: this.newRegister ? 'cadastrada' : 'alterada'
            };

            this.pecaService[pecaRoute.method](this.info).subscribe(data => {
                this.saving = false;
                UiSnackbar.show({
                    text: `Peça ${pecaRoute.message} com sucesso.`
                });
                this.router.navigate(['/peca'], { replaceUrl: true });
            },
                e => {
                    this.saving = false;
                    UiSnackbar.show({
                        text: 'Ocorreu um erro interno, tente novamente mais tarde.'
                    });
                });
        }
    }

    getPeca() {
        const id = this.route.snapshot.params['id'];

        this.pecaService.buscar(id).subscribe(data => {
            this.info = data['content'];
            this.loading = false;
        },
            e => {
                this.loading = false;
                if (e.error.statusCode == 404) {
                    UiSnackbar.show({
                        text: 'Peça não encontrada.'
                    });
                    this.router.navigate(['/peca'], { replaceUrl: true });
                } else {
                    UiSnackbar.show({
                        text: 'Ocorreu um erro interno, tente novamente mais tarde.'
                    });
                }
            });
    }

    changeImagem(file, base64) {
        this.info.nomeNovaImagem = file.name;
        this.info.novaImagem = base64;
    }

    changeImagemError(file, customError) {
        if (customError.type) {
            UiSnackbar.show({
                text: 'Escolha um arquivo JPG, JPEG ou PNG',
                actionText: 'OK',
                action: close => close()
            });
        } else if (customError.maxFileSize) {
            UiSnackbar.show({
                text: 'Escolha um arquivo menor que 15MB',
                actionText: 'OK',
                action: close => close()
            });
        } else {
            UiSnackbar.show({
                text: 'Não foi possível trocar a imagem',
                actionText: 'OK',
                action: close => close(),
                duration: Infinity
            });
        }

        this.info.novaImagem = null;
        this.info.imagem = null;
        this.inputNovaImagem.value = '';
    }
}
