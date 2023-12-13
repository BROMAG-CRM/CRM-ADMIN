
import { Modal, DatePicker, TimePicker } from "antd";

const FollowUpModal = ({ visible, onClose, onDateChange, onTimeChange }) => {
  const customOkButtonStyles = {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
  };

  const customTimePickerStyles = {
    "& .ant-picker-footer": {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px",
      borderTop: "1px solid #f0f0f0",
    },
    "& .ant-picker-ok": {
      ...customOkButtonStyles,
    },
  };

  return (
    <Modal
      title="Follow-up Details"
      visible={visible}
      onCancel={onClose}
      onOk={onClose}
      okButtonProps={{ style: customOkButtonStyles }}
    >
      <div>
        <p>Date:</p>
        <DatePicker onChange={onDateChange} />
      </div>
      <div>
        <p>Time:</p>
        <TimePicker
          onChange={onTimeChange}
          format="HH:mm"
          dropdownClassName={customTimePickerStyles}
        />
      </div>
    </Modal>
  );
};

export default FollowUpModal;

