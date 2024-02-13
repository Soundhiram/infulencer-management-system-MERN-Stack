import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Input, Form, message, Modal, Spin } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import './style.less';
import { useNavigate } from 'react-router-dom';
import EditInfluencerModal from './EditInfluencerModal';
import { Influencer } from '../../assets/influencers';
import DetailModal from './detail-influencer-model';

const { confirm } = Modal;

const InfluencerList: React.FC = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [editingInfluencer, setEditingInfluencer] = useState<Influencer | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await axios.get<Influencer[]>('http://localhost:3333/api/influencers/');
        setInfluencers(response.data);
        setLoading(false); 
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
      await axios.put(
        `http://localhost:3333/api/influencers/${editingInfluencer?._id}`,
        values
      );
      message.success('Influencer details updated successfully');
      setEditingInfluencer(null);
      form.resetFields();
    } catch (error) {
      console.error('Error updating influencer details:', error);
      message.error('Failed to update influencer details');
    }
  };

  const showDeleteConfirm = (influencer: Influencer) => {
    confirm({
      title: `Are you sure you want to delete ${influencer.name}?`,
      icon: <DeleteOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(influencer);
      },
      onCancel() {''},
    });
  };

  const handleDelete = async (influencer: Influencer) => {
    try {
      await axios.delete(
        `http://localhost:3333/api/influencers/${influencer._id}`
      );
      setInfluencers((prevInfluencers) =>
        prevInfluencers.filter((item) => item._id !== influencer._id)
      );
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

  const filteredInfluencers = influencers.filter((influencer) =>
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
          <Button
            onClick={() => showDeleteConfirm(record)}
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="search-box">
        <Input.Search
          placeholder="Search influencers"
          onChange={handleSearch}
          style={{ width: 500, margin: 16 }}
        />
      </div>
      {loading ? ( 
        <div style={{ textAlign: 'center', margin: '50px 0' }}>
          <Spin />
        </div>
      ) : (
        <Table columns={columns} dataSource={filteredInfluencers} rowKey="_id" />
      )}

      <DetailModal
        visible={visible}
        closeModal={closeModal}
        selectedInfluencer={selectedInfluencer || undefined}
      />
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