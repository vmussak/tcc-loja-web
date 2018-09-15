import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Component, AfterViewInit, ElementRef, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { UiToolbarService, UiElement, UiColor, UiSnackbar } from 'ng-smn-ui';
import { ClienteService } from '../../cliente/cliente.service';

@Component({
    selector: 'cliente-lista',
    templateUrl: './cliente.lista.component.html',
    styleUrls: ['./cliente.lista.component.scss'],
    providers: [UiColor, ClienteService]
})

export class ClienteListaComponent implements OnInit, AfterViewInit, OnDestroy {
    clientes;
    clienteParaDeletar;

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
        private clienteService: ClienteService) {

        this.pagina = 1;
    }

    ngOnInit() {
        this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged())
            .subscribe(() => {
                if (!this.searchText || this.searchText.length <= 200) {
                    this.searching = true;
                    this.getClientes();
                }
            });
    }

    ngAfterViewInit() {
        this.toolbarService.set('Cliente');
        this.toolbarService.activateExtendedToolbar(960);

        this.getClientes();
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
            this.getClientes();
        } else {
            this.searchOpen = true;
            UiElement.closest(inputSearch, 'form').style.right = UiElement.closest(inputSearch, '.align-right').clientWidth + 'px';

            setTimeout(() => {
                inputSearch.focus();
            }, 280);
        }
    }

    getClientes() {
        this.loading = true;
        this.clienteService.selecionar(this.searchText).subscribe(data => {
            this.clientes = data['content'];
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

    deleteCliente(cliente) {
        this.loading = true;

        this.clienteService.excluir(cliente.id).subscribe(() => {
            this.loading = false;
            UiSnackbar.show({
                text: 'Cliente excluído com sucesso.'
            });
            this.getClientes();
        },
            e => {
                UiSnackbar.show({
                    text: 'Ocorreu um erro interno, tente novamente mais tarde.'
                });
                this.loading = false;
            });
    }

    prepareToDelete(cliente) {
        this.clienteParaDeletar = cliente;
    }
}
