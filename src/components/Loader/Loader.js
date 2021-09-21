import './loader.css';

export default function Loader() {

    return (
        // Credit: https://dribbble.com/shots/5092176-Newton-Loader

        <div className="gooey">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
    )
}