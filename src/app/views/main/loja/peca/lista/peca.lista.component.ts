import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Component, AfterViewInit, ElementRef, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Location} from '@angular/common';
import {Subject} from 'rxjs';
import {UiToolbarService, UiElement, UiColor, UiSnackbar} from 'ng-smn-ui';
import { PecaService } from '../../peca/peca.service';

@Component({
    selector: 'peca-lista',
    templateUrl: './peca.lista.component.html',
    styleUrls: ['./peca.lista.component.scss'],
    providers: [UiColor, PecaService]
})

export class PecaListaComponent implements OnInit, AfterViewInit, OnDestroy {
    pecas;
    pecaParaDeletar;

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
                private pecaService: PecaService ) {

        this.pagina = 1;
    }

    ngOnInit() {
        this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged())
            .subscribe(() => {
                if (!this.searchText || this.searchText.length <= 200) {
                    this.searching = true;
                    this.getPecas();
                }
            });
    }

    ngAfterViewInit() {
        this.toolbarService.set('Peça');
        this.toolbarService.activateExtendedToolbar(960);

        this.getPecas();
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
            this.getPecas();
        } else {
            this.searchOpen = true;
            UiElement.closest(inputSearch, 'form').style.right = UiElement.closest(inputSearch, '.align-right').clientWidth + 'px';

            setTimeout(() => {
                inputSearch.focus();
            }, 280);
        }
    }

    getPecas() {
        this.loading = true;
        this.pecaService.selecionar(this.searchText).subscribe(data => {
            this.pecas = data['content'];
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

    deletePeca(peca) {
        this.loading = true;

        this.pecaService.excluir(peca.id).subscribe(() => {
            this.loading = false;
            UiSnackbar.show({
                text: 'Peça excluída com sucesso.'
            });
            this.getPecas();
        },
        e => {
            UiSnackbar.show({
                text: 'Ocorreu um erro interno, tente novamente mais tarde.'
            });
            this.loading = false;
        });
    }

    prepareToDelete(peca) {
        this.pecaParaDeletar = peca;
    }
}
