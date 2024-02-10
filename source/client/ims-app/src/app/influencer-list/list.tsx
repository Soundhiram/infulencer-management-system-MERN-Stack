import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Modal, message, Input, Form } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import './style.less';
import { useNavigate } from 'react-router-dom';
import EditInfluencerModal from './EditInfluencerModal';

interface Influencer {
  _id: string;
  name: string;
  socialMediaHandles: string[];
  followers: number;
  engagementRate: number;
  category: string;
  contactInformation: string;
}

const InfluencerList: React.FC = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [editingInfluencer, setEditingInfluencer] = useState<Influencer | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await axios.get<Influencer[]>('http://localhost:3333/api/influencers/');
        setInfluencers(response.data);
      } catch (error) {
        console.error('Error fetching influencers:', error);
      }
    };

    fetchInfluencers();
  }, []);

  const handleEdit = (influencer: Influencer) => {
    setEditingInfluencer(influencer);
    form.setFieldsValue(influencer);
  };

  const handleEditModalCancel = () => {
    setEditingInfluencer(null);
    form.resetFields();
  };

  const handleEditModalOk = async () => {
    try {
      const values = await form.validateFields();
      // Send a request to update influencer details
      await axios.put(`http://localhost:3333/api/influencers/${editingInfluencer?._id}`, values);
      // Update influencers state or refetch all influencers
      message.success('Influencer details updated successfully');
      setEditingInfluencer(null);
      form.resetFields();
    } catch (error) {
      console.error('Error updating influencer details:', error);
      message.error('Failed to update influencer details');
    }
  };

  const handleDelete = async (influencer: Influencer) => {
    try {
      await axios.delete(`http://localhost:3333/api/influencers/${influencer._id}`);
      setInfluencers(prevInfluencers => prevInfluencers.filter(item => item._id !== influencer._id));
      message.success('Influencer deleted successfully');
    } catch (error) {
      console.error('Error deleting influencer:', error);
      message.error('Failed to delete influencer');
    }
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedInfluencer(null);
  };

  const handleView = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
    setVisible(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const filteredInfluencers = influencers.filter(influencer =>
    influencer.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Followers',
      dataIndex: 'followers',
      key: 'followers',
    },
    {
      title: 'Engagement Rate',
      dataIndex: 'engagementRate',
      key: 'engagementRate',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Influencer) => (
        <Space size="middle">
          <Button onClick={() => handleView(record)} icon={<EyeOutlined />} />
          <Button onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          <Button onClick={() => handleDelete(record)} danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Input.Search
        placeholder="Search influencers"
        onChange={handleSearch}
        style={{ width: 500, margin: 16 }}
      />
      <Table columns={columns} dataSource={filteredInfluencers} rowKey="_id" />

      <Modal
        title="Influencer Details"
        visible={visible}
        onCancel={closeModal}
        footer={null}
      >
        {selectedInfluencer && (
          <div>
            <p><strong>Name:</strong> {selectedInfluencer.name}</p>
            <p><strong>Followers:</strong> {selectedInfluencer.followers}</p>
            <p><strong>Engagement Rate:</strong> {selectedInfluencer.engagementRate}</p>
            <p><strong>Category:</strong> {selectedInfluencer.category}</p>
            <p><strong>Contact Information:</strong> {selectedInfluencer.contactInformation}</p>
          </div>
        )}
      </Modal>

      <EditInfluencerModal
        visible={!!editingInfluencer}
        onCancel={handleEditModalCancel}
        onOk={handleEditModalOk}
        initialValues={editingInfluencer || undefined}
      />
    </div>
  );
};

export default InfluencerList;
