import { CanDeactivateFn } from '@angular/router';
import Swal from 'sweetalert2';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (component.canDeactivate()) return true;

  return Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to leave this page?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, leave',
    cancelButtonText: 'Stay',
  }).then((res) => res.isConfirmed);
};
