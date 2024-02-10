import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Modal, message, Input } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import axios from 'axios';
import './style.less';
import { useNavigate } from 'react-router-dom';

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
  const [,setFilteredInfluencers]= useState<Influencer[]>([]);
  const navigate=useNavigate();

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
    // navigate('/influencerlist')
    console.log('Edit influencer:', influencer);
    // You can open a modal with a form to edit influencer details
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

  const handleView = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedInfluencer(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    const lowerCaseValue = value.toLowerCase();
    const filtered = influencers.filter(influencer =>
      influencer.name.toLowerCase().includes(lowerCaseValue) ||
      influencer.socialMediaHandles.some(handle => handle.toLowerCase().includes(lowerCaseValue)) ||
      influencer.category.toLowerCase().includes(lowerCaseValue) ||
      influencer.contactInformation.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredInfluencers(filtered);
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
    // {
    //   title: 'Social Media Handles',
    //   dataIndex: 'socialMediaHandles',
    //   key: 'socialMediaHandles',
    //   render: (handles: string[]) => handles.join(', '),
    // },
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
    // {
    //   title: 'Contact Information',
    //   dataIndex: 'contactInformation',
    //   key: 'contactInformation',
    // },
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
      <div className='serach-box'>

      <Input.Search
        placeholder="Search influencers"
        className='serach-input'
        onChange={handleSearch}
        style={{ width: 500, margin: 16, height:35 }}
      />
      </div>
      <Table style={{margin:10}} columns={columns} dataSource={influencers} rowKey="_id" />

      <Modal
        title="Influencer Details"
        visible={visible}
        onCancel={closeModal}
        footer={null}
      >
        {/* Render influencer details in the modal */}
        {selectedInfluencer && (
          <div>
            <p><strong>Name:</strong> {selectedInfluencer.name}</p>
            <p><strong>Social Media Handles:</strong> {selectedInfluencer.socialMediaHandles.join(', ')}</p>
            <p><strong>Followers:</strong> {selectedInfluencer.followers}</p>
            <p><strong>Engagement Rate:</strong> {selectedInfluencer.engagementRate}</p>
            <p><strong>Category:</strong> {selectedInfluencer.category}</p>
            <p><strong>Contact Information:</strong> {selectedInfluencer.contactInformation}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InfluencerList;
