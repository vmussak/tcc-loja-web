import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UiColor, UiSnackbar } from 'ng-smn-ui';
import { Router } from '@angular/router';
import { UserService } from '../../../core/utils/user/user.service';
import { LoginService } from '../login/login.service';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [ LoginService ]
})

export class LoginComponent implements OnInit, AfterViewInit {
    preLogin: any;
    info: any;
    typeText: string;
    loading: boolean;

    @ViewChild('tabsPages') tabsPages;
    @ViewChild('loginForm') loginForm;

    constructor(private titleService: Title,
        private router: Router,
        private element: ElementRef,
        private loginService: LoginService) {
        this.preLogin = {};
        this.info = {};
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.titleService.setTitle('Loja');
    }

    isBright(color: string) {
        return UiColor.isBright(color);
    }

    getInfo(form, info) {
        if (form.invalid || this.loading) {
            form.controls.usuario.markAsTouched();
            form.controls.usuario.markAsDirty();
            this.focusElement('#pre-login-usuario');
            return;
        }

        this.loading = true;

        this.loginService.getUserByLogin(this.preLogin.usuario).subscribe(data => {
            this.info = data['content'];
            this.tabsPages.pagesGoToPage(2);
            this.focusElement('#login-senha', true);
            this.loading = false;
        }, e => {
            if(e.error.statusCode == 404)
                form.controls.usuario.setErrors({ notFound: true });
            else
                UiSnackbar.show({
                    text: 'Ocorreu um erro interno, tente novamente mais tarde.'
                });
                this.loading = false;
        });
        
    }

    login(form, info) {
        const elementPassword = this.element.nativeElement.querySelector('#login-senha');

        if (form.invalid || this.loading) {
            form.controls.senha.markAsTouched();
            form.controls.senha.markAsDirty();
            elementPassword.focus();
            return;
        }

        this.loading = true;

        this.loginService.getLogin(info).subscribe(data => {
            sessionStorage.setItem('loginProjeto', 'true');
            UserService.setUser(this.info);
            this.router.navigate(['/']);
            this.loading = false;
        }, e => {
            if(e.error.statusCode == 404)
                form.controls.senha.setErrors({ wrongPassword: true });
            else
                UiSnackbar.show({
                    text: 'Ocorreu um erro interno, tente novamente mais tarde.'
                });
            this.loading = false;
        });
    }

    focusElement(selector, withDelay?) {
        setTimeout(() => {
            this.element.nativeElement.querySelector(selector).focus();
        }, withDelay ? 280 : 0);
    }

    backToLogin() {
        this.tabsPages.pagesGoToPage(1);
        this.focusElement('#pre-login-usuario');
    }
}
