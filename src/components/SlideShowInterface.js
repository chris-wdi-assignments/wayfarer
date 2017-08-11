import React, {Component} from 'react';
import {React_Bootstrap_Carousel} from 'react-bootstrap-carousel';


class SlideShowInterface extends Component {
  render() {
    return(
      <div style={{height:300,margin:20}}>
        <React_Bootstrap_Carousel
          animation={true}
          onSelect={this.onSelect}
          className="carousel-fade"
        >
          <div style={{height:300,width:"100%",backgroundColor:"skyblue"}}>
            123
          </div>
          <div style={{height:300,width:"100%",backgroundColor:"aqua"}}>
            456
          </div>
          <div style={{height:300,width:"100%",backgroundColor:"lightpink"}}>
            789
          </div>
        </React_Bootstrap_Carousel>
      </div>
    )
  }
};

export default SlideShowInterface;
