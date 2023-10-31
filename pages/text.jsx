import { BiLogoFacebook, BiLogoLinkedin, BiLogoPinterestAlt, BiLogoTwitter } from 'react-icons/bi';
import '../public/textstyle.module.css';
function text() {
  return (
    <div className="flex items-center justify-center">
      {/* design */}
      <div>
        {/* Logo */}
        <div>
          <img src="" alt="" />
          <h2>Mahfujurrahman535</h2>
          <p>Graphic designer</p>
        </div>
        <div>
          <h3>You've receive message from Client12</h3>
        </div>
        <hr />
        <div>
          <p>Hello world</p>
        </div>
        <div>
          <button>
          <BiLogoFacebook />
          <BiLogoTwitter />
          <BiLogoPinterestAlt />
          <BiLogoLinkedin />
          <BiLogoLinkedin />
          </button>
        </div>
      </div>
    </div>
  );
}

export default text;