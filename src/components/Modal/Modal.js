import React, { useEffect } from "react";
import s from "./Modal.module.css";
import PropTypes from "prop-types";

export default function Modal({ tags, modalImg, handleTogleModal }) {
  useEffect(() => {
    window.addEventListener("keydown", onCloseModalByEsc);

    return () => {
      window.removeEventListener("keydown", onCloseModalByEsc);
    };
  });
  const onCloseModalByEsc = (e) => {
    if (e.keyCode === 27) {
      handleTogleModal();
    }
  };
  return (
    <div
      className={s.Overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleTogleModal();
        }
      }}
    >
      <div className={s.Modal}>
        <img src={modalImg} alt={tags} width="900" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  handleTogleModal: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

// class OldModal extends Component {
//   onCloseModalByEsc = (e) => {
//     if (e.keyCode === 27) {
//       this.props.handleTogleModal();
//     }
//   };

//   componentDidMount() {
//     window.addEventListener("keydown", this.onCloseModalByEsc);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.onCloseModalByEsc);
//   }

//   render() {
//     const { modalImg, handleTogleModal, tag } = this.props;
//     console.log(modalImg);
//     return (
//       <div
//         className={s.Overlay}
//         onClick={(e) => {
//           if (e.target === e.currentTarget) {
//             handleTogleModal();
//           }
//         }}
//       >
//         <div className={s.Modal}>
//           <img src={modalImg} alt={tag} />
//         </div>
//       </div>
//     );
//   }
// }
