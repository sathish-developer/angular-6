import { LocalStorageService } from '../../../commonservices/common.storage.service';
import { CommonService } from '../../../commonservices/common.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  colXs = window.matchMedia('(max-width: 575.98px');
  colSm = window.matchMedia('(min-width: 576px) and (max-width: 767.98px)');
  colMd = window.matchMedia('(min-width: 768px) and (max-width: 991.98px)');
  colLg = window.matchMedia('(min-width: 992px) and (max-width: 1199.98px)');

  constructor(private router: Router,
    private commonService: CommonService,
    public storage: LocalStorageService
  ) {
    console.log("landing page loaded");

    this.storage.removeOneFromItem("allSubModel");

  }

  ngOnInit() {
    this.strengthOfGo();
  }

  getproduct(event) {
    this.router.navigateByUrl('/' + event);
  }

  @HostListener('window:scroll', ['$event'])
  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("goTop").style.display = "block";
      document.getElementById("sticky-top").classList.add("sticky");
    } else {
      document.getElementById("goTop").style.display = "none";
      document.getElementById("sticky-top").classList.remove("sticky");
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  strengthOfGo() {
    if(this.colMd.matches || this.colSm.matches || this.colXs.matches) {
      document.getElementById("collapseOne").classList.remove("show");
      document.getElementById("collapseOne").setAttribute('data-parent', "#strenth_go1");
      document.getElementById("collapseTwo").classList.remove("show");
      document.getElementById("collapseTwo").setAttribute('data-parent', "#strenth_go1");
      document.getElementById("collapseThree").classList.remove("show");
      document.getElementById("collapseThree").setAttribute('data-parent', "#strenth_go1");
      document.getElementById("collapseFour").classList.remove("show");
      document.getElementById("collapseFour").setAttribute('data-parent', "#strenth_go1");
      document.getElementById("collapseFive").classList.remove("show");
      document.getElementById("collapseFive").setAttribute('data-parent', "#strenth_go1");
      document.getElementById("collapseSix").classList.remove("show");
      document.getElementById("collapseSix").setAttribute('data-parent', "#strenth_go1");
    }
  }
}
