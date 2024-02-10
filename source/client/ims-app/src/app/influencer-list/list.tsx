import React, { useState, useEffect } from 'react';
import { Button, Table, Space, message, Input } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import './style.less';
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
    setVisible(true); // Open the edit modal
  };

  const handleEditModalCancel = () => {
    setEditingInfluencer(null);
    setVisible(false); // Close the edit modal
  };

  const handleEditModalOk = async (values: any) => {
    try {
      // Send a request to update influencer details
      await axios.put(`http://localhost:3333/api/influencers/${editingInfluencer?._id}`, values);
      // Update influencers state or refetch all influencers
      message.success('Influencer details updated successfully');
      setEditingInfluencer(null);
      setVisible(false); // Close the edit modal
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

      <EditInfluencerModal
        visible={visible}
        onCancel={closeModal}
        onOk={handleEditModalOk}
        initialValues={editingInfluencer}
      />
    </div>
  );
};

export default InfluencerList;
