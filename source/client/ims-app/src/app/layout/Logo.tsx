import { Link } from 'react-router-dom';

interface LogoInterface {
  isMobile: boolean;
  navCollapsed: boolean;
  navType: string;
}

export const Logo: React.FC<LogoInterface> = ({ isMobile,navCollapsed,navType }) => {

  const getLogoWidthGutter = (isMobile:boolean) => {
    const isNavTop = navType === "TOP" ? true : false
    if(isMobile) {
      return 0
    }
    if(isNavTop) {
      return 'auto'
    }
    if(navCollapsed) {
      return `80px`
    } else {
      return `250px`
    }
  }

  const getLogoDisplay = (isMobile:boolean) => {
    if(isMobile) {
      return 'd-none'
    } else {
      return 'logo'
    }
  }

  return (
    <div className={getLogoDisplay(isMobile)} style={{width: `${getLogoWidthGutter(isMobile)}`}}>
      <Link to={'/home'}></Link>
    </div>
  );
};
