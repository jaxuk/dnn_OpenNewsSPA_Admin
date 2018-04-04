import { Component, OnInit } from '@angular/core';
import { HelperService } from '../shared/index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent implements OnInit {
  public naModules: any[] = [];
  public isSubmitting: boolean = false;
  constructor(
    private helperService: HelperService,
    private toastr: ToastrService,
  ) {



  }

  ngOnInit() {
    this.helperService.getNaModules().subscribe(data => {
      console.log('getNaModules');
      console.log(data);
      this.naModules = data;
      //this.toastr.info('Imported');
    },
      err => {
        this.toastr.error('Error getting Na Modules from server');
      });
  }

  public importModule() {
    console.log('importModule');
    if (confirm("Are you sure you want to delete all module content and import?")) {
      this.isSubmitting = true;
      var naModuleId = (<HTMLSelectElement>document.querySelector('#ddNaModule')).value;
      this.helperService.importModule(naModuleId).subscribe(data => {
        console.log(data);
        this.naModules = data;
        this.toastr.info('Imported!');
        this.isSubmitting = false;
      },
        err => {
          this.toastr.error('Error importing naModule');
          this.isSubmitting = false;
        });
    };
   }
  

}
