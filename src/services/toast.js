import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const toastPromise = (
  promise,
  loadingMessage,
  successMessage,
  errorMessage
) => {
  toast.configure();
  toast.dismiss();

  toast.promise(
    promise,
    {
      pending: loadingMessage,
      success: successMessage,
      error: errorMessage,
    },
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    }
  );
};

export default toastPromise;
