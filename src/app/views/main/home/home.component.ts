import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UiToolbarService} from 'ng-smn-ui';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

    constructor(private titleService: Title,
                private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Início');
        this.toolbarService.set('Início');
    }

    ngAfterViewInit() {

    }

}
