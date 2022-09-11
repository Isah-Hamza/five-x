const Modal = ({ children }) => {
  return (
    <div
      className="row d-flex justify-content-center align-items-center fixed-top left-0 right-0 position-fixed vw-100 vh-100 overflow-auto"
      style={{
        background: "rgba(0,0,0,.5)",
        right: "12px",
        left: "unset",
        overflowY: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default Modal;
