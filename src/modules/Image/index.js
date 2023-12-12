import flag from '../../img/flag.jpg';
import logo from '../../img/logo.jpg';
import './Image.css';

const Image = () => {
    return (
        <div>
            <div className="block">
                <div className='title'>Лікарні Львівської області</div>
                <div className='image-block'>
                    <img src={logo} className="logo" alt=""></img>
                    <img src={flag} className="flag" alt=""></img>
                </div>
            </div>
        </div>
    );
}

export default Image;