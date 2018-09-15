import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {UiToolbarService, UiColor} from 'ng-smn-ui';
import {UserService} from '../../core/utils/user/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
    title: String;
    menuOpen: boolean;
    user: any;

    constructor(private titleService: Title,
                private toolbarService: UiToolbarService,
                private location: Location,
                private router: Router) {
        toolbarService.change.subscribe(title => {
            this.title = title;
        });

        this.user = UserService.getUser();
    }

    ngOnInit() {
        this.titleService.setTitle('Loja');
        this.toolbarService.registerMainToolbar(document.getElementById('app-header'));

        this.toolbarService.set('');
        this.menuOpen = false;
    }

    ngAfterViewInit() {

    }

    isBright(color) {
        return UiColor.isBright(color);
    }

    logoff() {
        UserService.remove();
        this.router.navigate(['/login']);
    }
}
