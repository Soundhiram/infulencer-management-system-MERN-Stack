import { Row } from 'antd';
import DashInfluencer from './dash-influencer';

export const Dashboard = () => {
  return (
    <>
      <Row>Welcome to Influencer Management</Row>
      <div>
        <DashInfluencer />
      </div>
    </>
  );
};
