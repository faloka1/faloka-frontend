import {React, useState} from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import Placeholder from './Placeholder/Placeholder';
import MaleManequin from '../../assets/images/male.png';
import FemaleManequin from '../../assets/images/female.png';
import './MixAndMatchCanvas.scss';
import { ReactComponent as TopOutfitIcon } from '../SVG/top-outfit.svg';
import { ReactComponent as BottomOutfitIcon } from '../SVG/bottom-outfit.svg';
import { ReactComponent as MinusIcon } from '../SVG/minus.svg';

const MixAndMatchCanvas = ({ className, top, bottom, setTop, setBottom, ...props }) => {
  let classes = 'mix-and-match-canvas';

  if (className) {
    classes += ' ' + className;
  }
  
  const [gender, setGender] = useState('male');
  const topContent = top && <img className={`top-${gender}`} src={top.mix_and_match} alt="mix_and_match_outfit" />
  const bottomContent = bottom && <img className={`bottom-${gender}`} src={bottom.mix_and_match} alt="mix_and_match_outfit" />

  return (
    <div className="mix-and-match border">
      <div className="tool-items">
        <div className="gender-picker">
          <Button className={`gender-button ${gender == 'male' ? 'selected' : ''}`} onClick={()=> setGender('male')} variant="outline-dark" size="sm">
            Male
          </Button>
          <Button className={`gender-button ${gender == 'female' ? 'selected' : ''}`} onClick={()=> setGender('female')} variant="outline-dark" size="sm">
            Female
          </Button>
        </div>
        <div className="outfit-remover">
          <Button className={`outfit-button`} onClick={()=> setTop(null)} variant="outline-dark" size="sm" disabled={!top}>
            <TopOutfitIcon className="icon"/>
            <MinusIcon className="icon icon-tooltip"/>
          </Button>
          <Button className={`outfit-button`} onClick={()=> setBottom(null)} variant="outline-dark" size="sm" disabled={!bottom}>
            <BottomOutfitIcon className="icon"/>
            <MinusIcon className="icon icon-tooltip"/>
          </Button>
          <Button className={`clear-button`} onClick={()=> {setTop(null); setBottom(null)}} variant="outline-dark" size="sm" disabled={!top && !bottom}>
            Clear
          </Button>
        </div>
      </div>
      <div className={`${classes}`}>
        <div className="canvas">
          <img className="manequin" src={gender == "male" ? MaleManequin : FemaleManequin}/>
          {topContent}
          {bottomContent}
        </div>
      </div>
    </div>
    
  );
};

export default MixAndMatchCanvas;