import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UiElement, UiSnackbar, UiToolbarService } from 'ng-smn-ui';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../cliente/cliente.service';

@Component({
    selector: 'cliente-info',
    templateUrl: './cliente.info.component.html',
    styleUrls: ['./cliente.info.component.scss'],
    providers: [ClienteService]
})
export class ClienteInfoComponent implements OnInit, AfterViewInit, OnDestroy {
    info;

    saving: boolean;
    newRegister: boolean;
    loading = true;

    @ViewChild('formCliente') formCliente;
    @ViewChild('inputNovaImagem') inputNovaImagem;

    constructor(private toolbarService: UiToolbarService,
        public _location: Location,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private route: ActivatedRoute,
        private element: ElementRef,
        private clienteService: ClienteService) {
        this.info = {};
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.toolbarService.set('Cliente');
        this.toolbarService.activateExtendedToolbar(960);

        if (this.route.snapshot.params['id']) {
            setTimeout(() => {
                this.newRegister = false;
            });
            this.getCliente();
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

            const clienteRoute = {
                method: this.newRegister ? 'cadastrar' : 'atualizar',
                message: this.newRegister ? 'cadastrado' : 'alterado'
            };

            this.clienteService[clienteRoute.method](this.info).subscribe(data => {
                this.saving = false;
                UiSnackbar.show({
                    text: `Cliente ${clienteRoute.message} com sucesso.`
                });
                this.router.navigate(['/cliente'], { replaceUrl: true });
            }, e => {
                this.saving = false;
                if(e.error.statusCode == 406){
                    form.controls.cpf.setErrors({ duplicate: true });
                    this.element.nativeElement.querySelector('#cpf').focus();
                } else {
                    UiSnackbar.show({
                        text: 'Ocorreu um erro interno, tente novamente mais tarde.'
                    });
                }
            });
        }
    }

    getCliente() {
        const id = this.route.snapshot.params['id'];

        this.clienteService.buscar(id).subscribe(data => {
            this.info = data['content'];
            this.loading = false;
        },
            e => {
                this.loading = false;
                if (e.error.statusCode == 404) {
                    UiSnackbar.show({
                        text: 'Cliente não encontrado.'
                    });
                    this.router.navigate(['/cliente'], { replaceUrl: true });
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
