import React, {Component} from 'react';



class AddPostModal extends Component{
  constructor(props){
    super(props);
    this.state = {title: '', text:''};
  }

  handleTitleChange(e){
    this.setState({title: e.target.value});
  }

  handleTextChange(e){
    this.setState({text: e.target.value});
  }


  render(){
    return(
    <div className="modal fade" tabIndex="-1" role="dialog" id="add-post">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Write a post for {this.props.city?this.props.city.city:""}</h4>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label for="recipient-name" className="control-label">Title</label>
                <input type="text"
                className="form-control"
                id="recipient-name"
                onChange={this.handleTitleChange.bind(this)}/>
              </div>
              <div className="form-group">
                <textarea className="form-control"
                id="message-text"
                onChange={this.handleTextChange.bind(this)}>
                </textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default AddPostModal;
