import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Empty, Typography, Divider, Avatar } from 'antd';
import { Influencer } from '../../assets/influencers';

const { Title, Text, Paragraph } = Typography;

const DashInfluencer: React.FC = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);

  useEffect(() => {
    axios
      .get<Influencer[]>('http://localhost:3333/api/influencers/')
      .then((response) => {
        setInfluencers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching influencers:', error);
      });
  }, []);

  return (
    <div className="card cursor-none">
      {influencers.length > 0 ? (
        <Row gutter={[16, 16]} justify="start"> 
          {influencers.slice(0, 4).map((influencer) => (
            <Col span={6} key={influencer._id}> 
              <Card className="influencer-card" hoverable>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <Avatar
                    src={influencer.profileImageUrl?.uid || ''}
                    size={64}
                  />
                  <div style={{ marginLeft: 16 }}>
                    <Title level={4}>{influencer.name}</Title>
                    <Text type="secondary">{influencer.category}</Text>
                  </div>
                </div>
                <Divider />
                <div className="data-para">
                  <Paragraph  className='para'>
                    <strong>Followers:</strong> {influencer.followers}
                  </Paragraph>
                  <Paragraph>
                    <strong>Engagement Rate:</strong>{' '}
                    {influencer.engagementRate}
                  </Paragraph>
                  <Paragraph>
                    <strong>Social Media Handles:</strong>{' '}
                    {influencer.socialMediaHandles.join(', ')}
                  </Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          className="no-data-content"
          description="No influencers available"
        />
      )}
    </div>
  );
};

export default DashInfluencer;
