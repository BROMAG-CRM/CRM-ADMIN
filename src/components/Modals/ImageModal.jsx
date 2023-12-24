import { Image } from "antd";

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  const isSingleImage = typeof imageUrl === "string";
  const images = isSingleImage ? [imageUrl] : imageUrl;

  return (
    <div
      style={{
        display: isOpen ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
        overflowY: 'auto',
      }}
    >
      <div style={{ backgroundColor: '#fff', margin: '10% auto', padding: '20px', maxWidth: '600px', borderRadius: '8px' }}>
        <button onClick={onClose} style={{ float: 'right', cursor: 'pointer' }}>
          Close
        </button>
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} style={{ marginBottom: '25px' }}>
              <Image src={image} alt={`Image ${index + 1}`} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
            </div>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
