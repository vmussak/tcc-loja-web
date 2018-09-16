import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UiElement, UiSnackbar, UiToolbarService } from 'ng-smn-ui';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ReconhecimentoService } from '../../reconhecimento/reconhecimento.service';

@Component({
    selector: 'reconhecimento-dados',
    templateUrl: './reconhecimento.dados.component.html',
    styleUrls: ['./reconhecimento.dados.component.scss'],
    providers: [ReconhecimentoService]
})
export class ReconhecimentoDadosComponent implements OnInit, AfterViewInit, OnDestroy {
    info;

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
            this.info = {};
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.toolbarService.set('Reconhecimento');
        this.toolbarService.activateExtendedToolbar(960);

        this.getDadosCliente();

        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }

    getDadosCliente() {
        const id = this.route.snapshot.params['idVisita'];
        this.loading = true;
        this.reconhecimentoService.buscarDadosPorVisita(id).subscribe(data => {
            this.loading = false;
            this.info = data['content'];
        }, e => {
            this.loading = false;
            if(e.error.statusCode == 404){
                UiSnackbar.show({
                    text: 'Dados do cliente não encontrados.'
                });
                this.router.navigate(['/reconhecimento'], {replaceUrl: true});
            } else {
                UiSnackbar.show({
                    text: 'Ocorreu um erro interno, tente novamente mais tarde.'
                });
            }
        });
    }
}
