
import React from 'react';
import bannerImage from '../../images/banner.svg';
import './BannerComponent.css';

const BannerComponent = () => {
  return (
    <div className="banner-container">
      <img src={bannerImage} alt="Banner Publicitario" style={{ width: '100%' }} />
    </div>
  );
}

export default BannerComponent;
