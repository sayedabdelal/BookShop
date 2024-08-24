import { createPortal } from 'react-dom';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <dialog open className="modal" onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </dialog>
    </>,
    document.getElementById('modal')
  );
}
