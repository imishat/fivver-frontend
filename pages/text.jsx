import EmojiPicker from 'emoji-picker-react';
import { useState } from "react";


const HomePage = () => {
  const [text, setText] = useState("");
  const handleEmojiSelect = (event, emojiObject) => {
    console.log(event?.emoji)
    const { emoji } = emojiObject;
    setText(emoji);
  };
  function handleOnEnter(text) {
    console.log("enter", text);
  }
  return (
    <div>
      <h1>Emoji Picker for Next.js</h1>
      <textarea onChange={e=>setText(e.target.value)} value={text}></textarea>
      <EmojiPicker onEmojiClick={handleEmojiSelect} />
      { <p>You selected: {text}</p>}
    </div>
  );
};

export default HomePage;
