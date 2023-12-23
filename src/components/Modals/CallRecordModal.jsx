// CallRecordModal.jsx


const CallRecordModal = ({ isOpen, onClose, callRecords }) => {
  const mimeTypes = {
    mp3: 'audio/mp3',
    ogg: 'audio/ogg',
    wav: 'audio/wav',
    // Add more supported audio formats as needed
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
        {callRecords && callRecords.length > 0 ? (
          callRecords.map((audioUrl, index) => {
            if (!audioUrl) {
              console.error('Invalid audio URL at index', index);
              return null;
            }

            const fileExtension = getFileExtension(audioUrl);
            const fileType = mimeTypes[fileExtension] || 'audio/*';

            // Generate a unique key based on the audio URL
            const key = `audioKey_${index}`;

            console.log('Audio URL:', audioUrl);

            return (
              <div key={key}>
                <audio controls>
                  <source src={audioUrl} type={fileType} />
                  Your browser does not support the audio tag.
                </audio>
              </div>
            );
          })
        ) : (
          <p>No call records available.</p>
        )}
      </div>
    </div>
  );
};

export default CallRecordModal;
