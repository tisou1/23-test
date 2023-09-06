import { useState } from 'react'
import { Upload, message } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  console.log(img)
  const reader = new FileReader();
  // 在读取完成时,执行
  reader.addEventListener('load', () => callback(reader.result as string));
  // 读取文件
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
export default function App() {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    console.log(info.file)
    if (info.file.status === 'error') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  

  const inputChange = (e) => {
    console.log(e.target.files)
    // 通过files来读取上传的文件内容
    const fileList =  e.target.files
    // getBase64通过File对象的readAsDataURL方法来获取base64编码
    getBase64(fileList[0], (url) => {
      setImageUrl(url);
    })
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  
  return (
   <div>
     <input
    type="file"
    accept="image/*"
    onChange={inputChange}
    className="upload_input"
  />
   <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
   </div>
  )
}
