import Searchbar from "./components/Searchbar/Searchbar";
import Button from "./components/Button/Button";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import { useState, useEffect } from "react";
import { Hearts } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchImage from "./services/fetchImages";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [modalAlt, setModalAlt] = useState("");
  const [modalImg, setModalImg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState({ isModalOpen: false });
  const [images, setImages] = useState([]);

  const handleSetQuery = (e) => {
    setQuery(e.currentTarget.value);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    if (isPending) {
      fetchImage(query, page)
        .then((img) => {
          console.log(img);
          if (img.length === 0) {
            toast(`нет картинок с запросом "${query}`, {
              position: "top-center",
              hideProgressBar: true,
            });
            setImages([]);
            setIsPending(false);

            return;
          }
          setImages((prev) => [...prev, ...img]);
          setIsPending(false);
        })
        .catch((error) => {
          console.log(error.massage);
        });
    }
  }, [isPending, page, query]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      return toast("Введите запрос!", {
        position: "top-center",
        hideProgressBar: true,
      });
    }
    setImages((prev) => prev);
    setPage(1);
    setIsPending(true);
  };
  const handleTogleModal = (image, alt) => {
    setIsModalOpen((prev) => ({
      isModalOpen: !prev.isModalOpen,

      modalImg: image,
      modalAlt: alt,
    }));
    setModalAlt(alt);
    setModalImg(image);
    setPage((prevPage) => prevPage + 1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setIsPending(true);
  };

  return (
    <>
      <Searchbar
        query={query}
        handleSetQuery={handleSetQuery}
        handleSubmitForm={handleSubmitForm}
      />
      {images.length >= 1 && (
        <ImageGallery handleTogleModal={handleTogleModal} images={images} />
      )}
      {isPending && (
        <Hearts ariaLabel="loading" color="red" height={150} width={150} />
      )}
      {images.length >= 12 && <Button handleLoadMore={handleLoadMore} />}
      {isModalOpen.isModalOpen && (
        <Modal
          modalImg={modalImg}
          handleTogleModal={handleTogleModal}
          tags={modalAlt}
        />
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}
// export class App extends Component {
//   state = {
//     query: "",
//     page: 1,
//     images: [],
//     isPending: false,
//     isModalOpen: false,
//     modalImg: "",
//     modalAlt: "",
//   };

//   handleSetQuery = ({ target: { name, value } }) => {
//     this.setState({ [name]: value.toLowerCase() });
//   };

//   handleSubmitForm = (e) => {
//     e.preventDefault();
//     if (this.state.query.trim() === "") {
//       return toast("Введите запрос!", {
//         position: "top-center",
//         hideProgressBar: true,
//       });
//     }
//     this.setState({ page: 1, isPending: true });
//   };

//   handleTogleModal = (image, alt) => {
//     this.setState((prev) => ({
//       isModalOpen: !prev.isModalOpen,
//       modalImg: image,
//       modalAlt: alt,
//     }));
//   };

//   handleLoadMore = () => {
//     this.setState((prev) => ({ page: prev.page + 1, isPending: true }));
//   };

//   componentDidUpdate() {
//     const { query, page, isPending } = this.state;
//     if (isPending) {
//       fetchImage(query, page)
//         .then((img) => {
//           if (img.length === 0) {
//             return (
//               this.setState({ isPending: false }),
//               toast(`нет картинок с запросом "${query}`, {
//                 position: "top-center",
//                 hideProgressBar: true,
//               })
//             );
//           }
//           this.setState((prev) => ({
//             images: page > 1 ? [...prev.images, ...img] : img,
//             isPending: false,
//           }));
//         })
//         .catch((error) => {
//           console.log(error.massage);
//         });
//     }
//   }

//   render() {
//     const { query, images, isPending, isModalOpen, modalImg, modalAlt } =
//       this.state;
//     const {
//       handleSetQuery,
//       handleSubmitForm,
//       handleTogleModal,
//       handleLoadMore,
//     } = this;

//     return (
//       <>
//         <Searchbar
//           query={query}
//           handleSetQuery={handleSetQuery}
//           handleSubmitForm={handleSubmitForm}
//         />
//         {images.length >= 1 && (
//           <ImageGallery handleTogleModal={handleTogleModal} images={images} />
//         )}
//         {isPending && (
//           <Hearts ariaLabel="loading" color="red" height={150} width={150} />
//         )}
//         {images.length >= 12 && <Button handleLoadMore={handleLoadMore} />}
//         {isModalOpen && (
//           <Modal
//             modalImg={modalImg}
//             handleTogleModal={handleTogleModal}
//             tag={modalAlt}
//           />
//         )}
//         <ToastContainer autoClose={3000} />
//       </>
//     );
//   }
// }
// export default App;
