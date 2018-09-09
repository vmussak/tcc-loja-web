import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Component, AfterViewInit, ElementRef, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Location} from '@angular/common';
import {Subject} from 'rxjs';
import {UiToolbarService, UiElement, UiColor, UiSnackbar} from 'ng-smn-ui';

@Component({
    selector: 'usuario-lista',
    templateUrl: './usuario.lista.component.html',
    styleUrls: ['./usuario.lista.component.scss'],
    providers: [UiColor]
})

export class UsuarioListaComponent implements OnInit, AfterViewInit, OnDestroy {
    usuarios;
    usuarioParaDeletar;

    searchOpen: boolean;
    searching: boolean;
    searchText: string;

    totalLinhas: number;
    pagina: number;
    loading: boolean;
    isBright = UiColor.isBright;

    private searchTerms = new Subject<string>();

    constructor(private toolbarService: UiToolbarService,
                private element: ElementRef,
                private changeDetectorRef: ChangeDetectorRef,
                public _location: Location) {
        this.pagina = 1;
    }

    ngOnInit() {
        this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged())
            .subscribe(() => {
                if (!this.searchText || this.searchText.length <= 200) {
                    this.searching = true;
                    this.getUsuarios();
                }
            });
    }

    ngAfterViewInit() {
        this.toolbarService.set('Usuário');
        this.toolbarService.activateExtendedToolbar(960);

        this.getUsuarios();
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }

    search(term: string) {
        this.searchTerms.next(term);
    }

    toggleSearch() {
        const inputSearch = this.element.nativeElement.querySelector('input[name="searchText"]');

        if (this.searchOpen) {
            this.searchOpen = false;
            UiElement.closest(inputSearch, 'form').style.right = '';
            this.searchText = '';
            this.getUsuarios();
        } else {
            this.searchOpen = true;
            UiElement.closest(inputSearch, 'form').style.right = UiElement.closest(inputSearch, '.align-right').clientWidth + 'px';

            setTimeout(() => {
                inputSearch.focus();
            }, 280);
        }
    }

    getUsuarios() {
        this.loading = true;
        setTimeout(() => {
            this.usuarios = [
                {
                    id: 1,
                    nome: 'Vinicius Mussak',
                    login: 'mussak',
                    email: 'viniciusmussak@gmail.com',
                    cor: '#1E88E5'
                },
                {
                    id: 2,
                    nome: 'Ronaldinho Gaucho',
                    login: 'gaucho',
                    email: 'ronaldinhogaucho@gmail.com',
                    cor: '#E91E63'
                }
            ];
            this.totalLinhas = 2;

            this.loading = false;
        }, 300);
    }

    deleteUsuario(usuario) {
        this.loading = true;

        setTimeout(() => {
            this.usuarios.splice(this.usuarios.indexOf(usuario), 1);
            this.loading = false;
        }, 300);
    }

    prepareToDelete(usuario) {
        this.usuarioParaDeletar = usuario;
    }
}
