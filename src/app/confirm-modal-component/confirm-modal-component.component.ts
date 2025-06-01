import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal-component',
  standalone: true,
    template: `
    <div class="modal-header"><h4 class="modal-title">Confirm Navigation</h4></div>
    <div class="modal-body">Are you sure you want to leave this page?</div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="stay()">Stay</button>
      <button type="button" class="btn btn-danger" (click)="leave()">Leave</button>
    </div>
  `,
})
export class ConfirmModalComponentComponent {
  constructor(public activeModal: NgbActiveModal) {}

  stay() {
    this.activeModal.dismiss();
  }

  leave() {
    this.activeModal.close(true);
  }
}
