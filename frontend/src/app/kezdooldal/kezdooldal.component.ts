import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-kezdooldal',
  templateUrl: './kezdooldal.component.html',
  styleUrls: ['./kezdooldal.component.css']
})
export class KezdooldalComponent {

  customBreakpoints = {
    xs: '(min-width: 0px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)'
  };

    public colspan = 6
    public rowspan = 3;

    constructor(private breakpointObserver: BreakpointObserver,) {
      this.breakpointObserver.observe([
        this.customBreakpoints.xs,
        this.customBreakpoints.sm,
        this.customBreakpoints.md,
        this.customBreakpoints.lg,
        this.customBreakpoints.xl,
      ]).subscribe(result => {
        if (result.breakpoints[this.customBreakpoints.xl]) {
          this.colspan = 6;
          this.rowspan = 3;
        } else if (result.breakpoints[this.customBreakpoints.lg]) {
          this.colspan = 20;
          this.rowspan = 5;
        } else if (result.breakpoints[this.customBreakpoints.md]) {
          this.colspan = 20;
          this.rowspan = 5;
        } else if (result.breakpoints[this.customBreakpoints.sm]) {
          this.colspan = 20;
          this.rowspan = 5;
        } else if (result.breakpoints[this.customBreakpoints.xs]) {
          this.colspan = 20;
          this.rowspan = 5;
        }
      });
    }

}
