import Swal from 'sweetalert2/dist/sweetalert2.js';

// tslint:disable-next-line:class-name
export class SweetAlert{

    public static opensweetalertdng(){
      Swal.fire('Oops...', '+ message ! +', 'error');
    }

    public static opensweetalertcst(message){
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this imaginary file!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
              console.log(message);
              Swal.fire(
                'Deleted!',
                message,
                'success'
              );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
          }
        });
    }

    public static opensweetalert(message, url){
        console.log(message);
        Swal.fire({
          text: message,
          icon: 'success'
        });
    }
}
