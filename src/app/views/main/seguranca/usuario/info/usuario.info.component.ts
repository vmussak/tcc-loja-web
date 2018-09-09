import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UiElement, UiSnackbar, UiToolbarService} from 'ng-smn-ui';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'usuario-info',
    templateUrl: './usuario.info.component.html',
    styleUrls: ['./usuario.info.component.scss']
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
                private element: ElementRef) {
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

            if (this.newRegister) {
                // Aqui adicionamos chamada de api para salvar um novo usuario
            } else {
                // Aqui alteramos um usuario ja existente
            }
        }
    }

    getUsuario() {
        const id = this.route.snapshot.params['id'];

        setTimeout(() => {
            switch (id) {
                case '1':
                    this.info = {
                        id: 1,
                        nome: 'Vinicius Mussak',
                        login: 'mussak',
                        email: 'viniciusmussak@gmail.com'
                    };
                    break;
                case '2':
                    this.info = {
                        id: 2,
                        nome: 'Ronaldinho Gaucho',
                        login: 'bruxo',
                        email: 'ronaldinhogaucho@gmail.com'
                    };
                    break;
            }
            this.loading = false;
        }, 300);

    }

    verificaSenha(form) {
        if (this.info.senha !== this.info.confirmaSenha) {
            form.controls['confirmaSenha'].setErrors({notMatch: true});
        } else {
            form.controls['confirmaSenha'].setErrors(null);
        }
    }
}
