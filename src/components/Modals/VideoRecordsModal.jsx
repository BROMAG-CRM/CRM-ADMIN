// VideoRecordsModal.jsx

import React from 'react';

const VideoRecordsModal = ({ isOpen, onClose, videoUrls }) => {
  const mimeTypes = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    // Add more supported video formats as needed
  };

  const getFileExtension = (filename) => {
    if (filename) {
      return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
    }
    return '';
  };

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
        {videoUrls && videoUrls.length > 0 ? (
          videoUrls.map((videoUrl, index) => {
            if (!videoUrl) {
              console.error('Invalid video URL at index', index);
              return null;
            }

            const fileExtension = getFileExtension(videoUrl);
            const fileType = mimeTypes[fileExtension] || 'video/*';

            // Generate a unique key based on the video URL
            const key = `videoKey_${index}`;

            console.log('Video URL:', videoUrl);

            return (
              <div key={key}>
                <video controls width="100%" style={{ marginBottom: '25px' }}>
                  <source src={videoUrl} type={fileType} />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          })
        ) : (
          <p>No videos available.</p>
        )}
      </div>
    </div>
  );
};

export default VideoRecordsModal;
