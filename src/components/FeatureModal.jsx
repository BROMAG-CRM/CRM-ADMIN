

const FeatureModal = ({ isOpen, onClose, features }) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1, overflowY: 'auto' }}>
      <div style={{ backgroundColor: '#fff', margin: '10% auto', padding: '20px', maxWidth: '600px', borderRadius: '8px' }}>
        <button onClick={onClose} style={{ float: 'right', cursor: 'pointer' }}>Close</button>
        {features.map((feature, index) => (
          <div key={`modal_feature_${index}`} style={{ marginBottom: '20px' }}>
            <h3 className='font-semibold'>{index + 1}. {feature.featureName}</h3>
            <p>{feature.featureDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureModal;

