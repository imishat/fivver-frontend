// components/EmojiPicker.js
import Picker from 'emoji-picker-react';

const EmojiPicker = ({ onSelect }) => {
  return <Picker onSelect={onSelect} onEmojiClick={onSelect} />;
};

export default EmojiPicker;
