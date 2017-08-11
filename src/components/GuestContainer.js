import React, {Component} from 'react';
import SlideShowInterface from './SlideShowInterface';
import DiscoverInterface from './DiscoverInterface';

class GuestContainer extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return(
      <div>
      <SlideShowInterface/>
      <DiscoverInterface/>
    </div>
    )
  }
}

export default GuestContainer;
