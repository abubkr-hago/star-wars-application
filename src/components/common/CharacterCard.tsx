import { Property } from 'csstype';

export const CharacterCard = ({
  name,
  imageSrc,
  backgroundColor,
  onClick,
}: {
  name: string;
  imageSrc: string;
  backgroundColor?: Property.BackgroundColor;
  onClick?: () => unknown;
}) => (
  <div
    className='character-card'
    onClick={onClick}
    style={{ borderColor: 'var(--border-color, #646cff)', backgroundColor }}
  >
    <img src={imageSrc} alt='Character Image' className='character-image' />
    <div className='character-details'>
      <h2 className='character-name'>{name}</h2>
    </div>
  </div>
);
