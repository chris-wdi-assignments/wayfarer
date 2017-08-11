import React, {Component} from 'react';
import {React_Bootstrap_Carousel} from 'react-bootstrap-carousel';

class SlideShowInterface extends Component {
  render() {
    return(
    <div className = 'SlideShow'>
      <div style={{height:300,margin:20}}>
        <React_Bootstrap_Carousel
          animation={true}
          onSelect={this.onSelect}
          className="carousel-fade"
        >
          <div style={{height:300,width:"100%"}}>
            <div>
              <img src="/images/SeattleNeedle.jpg" alt="SeattleNeedle" width="100%"/>
            </div>
          </div>
          <div style={{height:300,width:"100%"}}>
            <div>
              <img src="/images/SFSunrise.jpg" alt="SFSunrise" width="100%"/>
            </div>
          </div>
          <div style={{height:300,width:"100%"}}>
            <div>
              <img src="/images/sydney_opera_house_australia_2-wallpaper-1920x1080.jpg" alt="SydneyNight" width="100%"/>
            </div>
          </div>
          <div style={{height:300,width:"100%"}}>
            <div>
              <img src="/images/LondonDay.jpg" alt="LondonDay" width="100%"/>
            </div>
          </div>
        </React_Bootstrap_Carousel>
      </div>
    </div>
    )
  }
};

export default SlideShowInterface;
