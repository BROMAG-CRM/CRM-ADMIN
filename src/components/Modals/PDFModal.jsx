import React from 'react';

const PdfModal = ({ isOpen, onClose, pdfUrl }) => {
  console.log(pdfUrl);

  return (
    <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1, overflowY: 'auto' }}>
      <div style={{ backgroundColor: '#fff', margin: '10% auto', padding: '20px', maxWidth: '600px', borderRadius: '8px', textAlign: 'left', fontSize: '16px', fontWeight: 'normal' }}>
        <button onClick={onClose} style={{ float: 'right', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>Close</button>

        {pdfUrl && Object.keys(pdfUrl).length > 0 ? (
          <div>
            {pdfUrl.location && (
              <div style={{ marginBottom: '15px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Location:</p>
                <p>Latitude: {pdfUrl.location.latitude}</p>
                <p>Longitude: {pdfUrl.location.longitude}</p>
                <p>Location Name: {pdfUrl.location.locationName}</p>
              </div>
            )}

            {pdfUrl.followUpDate && (
              <div style={{ marginBottom: '15px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Follow-up Date:</p>
                <p >{pdfUrl.followUpDate}</p>
              </div>
            )}

            {pdfUrl.description && (
              <div style={{ marginBottom: '15px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Description:</p>
                <p>{pdfUrl.description}</p>
              </div>
            )}
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default PdfModal;
