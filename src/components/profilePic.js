import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ImgUpload =({onChange, src}) => {
  return(
    <div className='avatar'>
      <label>
        <div>
          <Avatar
            size={80}
            icon={<UserOutlined />}
            src={src}
            style={{ backgroundColor: '#FF385C'}}
          />
        </div>
        <input
          id="photo-upload"
          type="file"
          name="myImage"
          accept="image/png, image/gif, image/jpeg"
          onChange={onChange}
        />
        <label>Upload Photo</label>
      </label>
    </div>
  );
};

export class CardProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
    };
  }
  photoUpload (e) {
    e.preventDefault();
    const file = e.target.files[0];
    this.setState({
      file: URL.createObjectURL(file),
    });
  }

  render() {
    this.props.uploadFile(this.state.file);
    return (
      <div>
        {
          <ImgUpload onChange={(e)=>this.photoUpload(e)} src={this.state.file}/>
        }
      </div>
    );
  }
}
