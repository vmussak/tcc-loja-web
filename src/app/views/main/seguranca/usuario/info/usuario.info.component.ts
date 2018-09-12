import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UiElement, UiSnackbar, UiToolbarService } from 'ng-smn-ui';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
    selector: 'usuario-info',
    templateUrl: './usuario.info.component.html',
    styleUrls: ['./usuario.info.component.scss'],
    providers: [UsuarioService]
})
export class UsuarioInfoComponent implements OnInit, AfterViewInit, OnDestroy {
    info;

    saving: boolean;
    newRegister: boolean;
    loading = true;

    @ViewChild('formUsuario') formUsuario;

    constructor(private toolbarService: UiToolbarService,
        public _location: Location,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private route: ActivatedRoute,
        private element: ElementRef,
        private usuarioService: UsuarioService) {
        this.info = {};
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.toolbarService.set('Usuário');
        this.toolbarService.activateExtendedToolbar(960);

        if (this.route.snapshot.params['id']) {
            setTimeout(() => {
                this.newRegister = false;
            });
            this.getUsuario();
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

            const userRoute = {
                method: this.newRegister ? 'cadastrar' : 'atualizar',
                message: this.newRegister ? 'cadastrado' : 'alterado'
            };

            this.usuarioService[userRoute.method](this.info).subscribe(data => {
                this.saving = false;
                UiSnackbar.show({
                    text: `Usuário ${userRoute.message} com sucesso.`
                });
                this.router.navigate(['/usuario'], {replaceUrl: true});
            }, 
            e => {
                this.saving = false;
                if(e.error.statusCode == 406){
                    form.controls.logon.setErrors({ duplicate: true });
                    this.element.nativeElement.querySelector('#logon').focus();
                } else {
                    UiSnackbar.show({
                        text: 'Ocorreu um erro interno, tente novamente mais tarde.'
                    });
                }
            });
        }
    }

    getUsuario() {
        const id = this.route.snapshot.params['id'];

        this.usuarioService.buscar(id).subscribe(data => {
            this.info = data['content'];
            this.loading = false;
        },
        e => {
            this.loading = false;
            if(e.error.statusCode == 404){
                UiSnackbar.show({
                    text: 'Usuário não encontrado.'
                });
                this.router.navigate(['/usuario'], {replaceUrl: true});
            } else {
                UiSnackbar.show({
                    text: 'Ocorreu um erro interno, tente novamente mais tarde.'
                });
            }
        });
    }

    verificaSenha(form) {
        if (this.info.senha !== this.info.confirmaSenha) {
            form.controls['confirmaSenha'].setErrors({ notMatch: true });
        } else {
            form.controls['confirmaSenha'].setErrors(null);
        }
    }
}
