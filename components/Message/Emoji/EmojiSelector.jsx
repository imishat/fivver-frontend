import { Picker } from 'emoji-mart';
// import 'emoji-mart/css/emoji-mart.css';

const EmojiSelector = ({ onSelect }) => {
  return (
    <Picker
      set="emojione"
      title="Pick your emoji"
      onSelect={emoji => {
        onSelect(emoji.native)
        console.log(emoji)
    }}
    />
  );
};

export default EmojiSelector;
