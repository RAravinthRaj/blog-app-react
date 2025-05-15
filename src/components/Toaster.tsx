import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

export interface IToaster {}

export const Toaster = ({}: IToaster) => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  );
};
