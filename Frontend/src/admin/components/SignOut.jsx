import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be signed out of your account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');

        Swal.fire('Signed Out!', 'You have been signed out.', 'success').then(() => {
          navigate('/login');
        });
      }
    });
  };

  return (
    <button onClick={handleSignOut} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
      Sign Out
    </button>
  );
};

export default SignOut;
