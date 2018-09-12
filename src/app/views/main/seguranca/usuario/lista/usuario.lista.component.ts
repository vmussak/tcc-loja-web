import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Component, AfterViewInit, ElementRef, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Location} from '@angular/common';
import {Subject} from 'rxjs';
import {UiToolbarService, UiElement, UiColor, UiSnackbar} from 'ng-smn-ui';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
    selector: 'usuario-lista',
    templateUrl: './usuario.lista.component.html',
    styleUrls: ['./usuario.lista.component.scss'],
    providers: [UiColor, UsuarioService]
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
                public _location: Location,
                private usuarioService: UsuarioService ) {

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
        this.usuarioService.selecionar(this.searchText).subscribe(data => {
            this.usuarios = data['content'];
            this.totalLinhas = data['content'].length;
            this.loading = false;
        },
        e => {
            UiSnackbar.show({
                text: 'Ocorreu um erro interno, tente novamente mais tarde.'
            });
            this.loading = false;
        });
    }

    deleteUsuario(usuario) {
        this.loading = true;

        this.usuarioService.excluir(usuario.id).subscribe(() => {
            this.loading = false;
            UiSnackbar.show({
                text: 'Usuário excluído com sucesso.'
            });
            this.getUsuarios();
        },
        e => {
            UiSnackbar.show({
                text: 'Ocorreu um erro interno, tente novamente mais tarde.'
            });
            this.loading = false;
        });
    }

    prepareToDelete(usuario) {
        this.usuarioParaDeletar = usuario;
    }
}
