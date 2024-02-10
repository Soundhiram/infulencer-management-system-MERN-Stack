import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Upload, message, Card, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import './style.css'

const { Option } = Select;

const InfluencerForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log('Received values:', values);
    try {
      // Send a POST request to the backend API
      const response = await axios.post('http://localhost:3333/api/influencers/create', values);
      console.log('Response:', response.data);
      form.resetFields();

      message.success('Influencer created successfully');

    } catch (error) {
      console.error('Error creating influencer:', error);
      message.error('Failed to create influencer');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleUpload = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
   < Card className='form-card' title="New Influencer" bordered={false}>
    
      <Form
      form={form}
      name="influencer_form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      className='form-layout'
    >
      <Row>
        <Col span={12}>
        <Form.Item
        label="Name"
        name="name"
        className='input-box-size'
        rules={[{ required: true, message: 'Please input the influencers name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Social Media Handles"
        name="socialMediaHandles"
        className='input-box-size'

        rules={[{ required: true, message: 'Please input the influencers social media handles!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Followers"
        name="followers"
        className='input-box-size'

        rules={[{ type: 'number', required: true, message: 'Please input the number of followers!' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Engagement Rate"
        name="engagementRate"
        className='input-box-size'

        rules={[{ type: 'number', required: true, message: 'Please input the engagement rate!' }]}
        >
        <InputNumber suffix="%" />
      </Form.Item>

      <Form.Item
        label="Category/Industry"
        name="category"
        rules={[{ required: true, message: 'Please select the influencers category/industry!' }]}
      >
        <Select placeholder="Select category">
          <Option value="Fashion">Fashion</Option>
          <Option value="Food">Food</Option>
          <Option value="Travel">Travel</Option>
          {/* Add more options as needed */}
        </Select>
      </Form.Item>

      <Form.Item
        label="Contact Information"
        name="contactInformation"
        className='input-box-size'

        rules={[{ required: true, message: 'Please input the influencer\'s contact information!' }]}
        >
        <Input />
      </Form.Item>

      <Form.Item label="Notes/Comments" name="notes">
        <Input.TextArea />
      </Form.Item>


        </Col>
        <Col span={12}>
          
     <Card className='upload-card'>
     <Form.Item className='uplode-photo-profile' label="Profile Image URL" name="profileImageUrl">
        <Upload onChange={handleUpload} showUploadList={false} beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
     </Card>

        </Col>
      </Row>
    

      <Form.Item >
        <div className='button-align-div'>

        <Button className='button-align' type="primary" htmlType="submit">
          Submit
        </Button>
        </div>
      </Form.Item>
    </Form>
   </Card>
  );
};

export default InfluencerForm;
