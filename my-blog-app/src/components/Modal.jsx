import classes from "./Modal.module.css";

function Modal({ children, onClose }) {
  return (
    <>
      <div className={classes.backdrop} onClick={onClose}></div>
      <dialog className={classes.modal} open>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
