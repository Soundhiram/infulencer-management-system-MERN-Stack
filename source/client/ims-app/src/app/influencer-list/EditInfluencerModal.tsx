import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
  initialValues: any;
}

const EditInfluencerModal: React.FC<Props> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleBeforeUpload = (file: any) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title="Edit Influencer Details"
      visible={visible}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          onOk(values);
          form.resetFields();
          setFileList([]);
        });
      }}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="socialMediaHandles" label="Social Media Handles">
          <Input />
        </Form.Item>
        <Form.Item name="followers" label="Followers">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="engagementRate" label="Engagement Rate">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Input />
        </Form.Item>
        <Form.Item name="contactInformation" label="Contact Information">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="profileImageUrl" label="Profile Image URL">
          <Upload
            beforeUpload={handleBeforeUpload}
            onChange={handleFileChange}
            fileList={fileList}
            maxCount={1}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditInfluencerModal;
