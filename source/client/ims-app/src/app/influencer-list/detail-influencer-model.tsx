import React from 'react';
import { Modal, Typography, Divider, Avatar } from 'antd';
import { Influencer } from '../../assets/influencers';

const { Paragraph, Text, Title } = Typography;

interface DetailModalProps {
  visible: boolean;
  closeModal: () => void;
  selectedInfluencer?: Influencer;
}

const DetailModal: React.FC<DetailModalProps> = ({ visible, closeModal, selectedInfluencer }) => {
  return (
    <Modal
      title={<Title level={3}>Influencer Details</Title>}
      visible={visible}
      onCancel={closeModal}
      footer={null}
      destroyOnClose={true} 
    >
      {selectedInfluencer && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            {selectedInfluencer.profileImageUrl && (
              <Avatar src={selectedInfluencer.profileImageUrl.uid} size={64} />
            )}
            <div style={{ marginLeft: 16 }}>
              <Title level={4}>{selectedInfluencer.name}</Title>
              <Text type="secondary">{selectedInfluencer.category}</Text>
            </div>
          </div>
          <Divider />
          <Paragraph>
            <strong>Followers:</strong> {selectedInfluencer.followers}
          </Paragraph>
          <Paragraph>
            <strong>Engagement Rate:</strong> {selectedInfluencer.engagementRate}
          </Paragraph>
          <Paragraph>
            <strong>Contact Information:</strong> {selectedInfluencer.contactInformation}
          </Paragraph>
          <Paragraph>
            <strong>Notes:</strong> {selectedInfluencer.notes || 'N/A'}
          </Paragraph>
          <Paragraph>
            <strong>Social Media Handles:</strong> {selectedInfluencer.socialMediaHandles.join(', ')}
          </Paragraph>
        </div>
      )}
    </Modal>
  );
};

export default DetailModal;
