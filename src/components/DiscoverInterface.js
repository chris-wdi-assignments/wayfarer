import React, {Component} from 'react';
import {React_Bootstrap_Carousel} from 'react-bootstrap-carousel';


class DiscoverInterface extends Component {
  render () {
    return (
        <div className="Discover">
          <div className="col-md-4">
            <React_Bootstrap_Carousel
              animation={true}
              onSelect={this.onSelect}
              className="carousel-fade"
            >
              <div style={{height:200,width:"100%"}}>
                <div>
                  <img src="/images/SydneyNight.jpg" alt="SydneyNight" width="100%"/>
                </div>
              </div>
              <div style={{height:200,width:"100%"}}>
                <div>
                  <img src="/images/SFNight.jpg" alt="SFNight" width="100%"/>
                </div>
              </div>
              <div style={{height:200,width:"100%"}}>
                <div>
                  <img src="/images/SeattleNight.jpg" alt="SeattleNight" width="100%"/>
                </div>
              </div>
              <div style={{height:200,width:"100%"}}>
                <div>
                  <img src="/images/LondonDay.jpg" alt="LondonDay" width="100%"/>
                </div>
              </div>
            </React_Bootstrap_Carousel>
        </div>
        <div className="col-md-4">
          <React_Bootstrap_Carousel
            animation={true}
            onSelect={this.onSelect}
            className="carousel-fade"
          >
            <div style={{height:200,width:"100%"}}>
              <div>
                <img src="/images/SeattleSunset.jpg" alt="SeattleNeedle" width="100%"/>
              </div>
            </div>
            <div style={{height:200,width:"100%"}}>
              <div>
                <img src="/images/sydney_opera_house_australia_2-wallpaper-1920x1080.jpg" alt="SydneyNight" width="100%"/>
              </div>
            </div>
            <div style={{height:200,width:"100%"}}>
              <div>
                <img src="/images/LondonDay.jpg" alt="LondonDay" width="100%"/>
              </div>
            </div>
            <div style={{height:200,width:"100%"}}>
              <div>
                <img src="/images/SFSunrise.jpg" alt="SFSunrise" width="100%"/>
              </div>
            </div>

          </React_Bootstrap_Carousel>
      </div>
      <div className="col-md-4">
        <React_Bootstrap_Carousel
          animation={true}
          onSelect={this.onSelect}
          className="carousel-fade"
        >
          <div style={{height:200,width:"100%"}}>
            <div>
              <img src="/images/LondonDay.jpg" alt="LondonDay" width="100%"/>
            </div>
          </div>
          <div style={{height:200,width:"100%"}}>
            <div>
              <img src="/images/SFGGB.jpg" alt="SFGGB" width="100%"/>
            </div>
          </div>
          <div style={{height:200,width:"100%"}}>
            <div>
              <img src="/images/LondonNight.jpg" alt="LondonNight" width="100%"/>
            </div>
          </div>
          <div style={{height:200,width:"100%"}}>
            <div>
              <img src="/images/SFSunrise.jpg" alt="SFSunrise" width="100%"/>
            </div>
          </div>
        </React_Bootstrap_Carousel>
    </div>

      </div>
    )
  }
}

export default DiscoverInterface;
