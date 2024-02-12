import { Row } from 'antd';
import DashInfluencer from './dash-influencer';

export const Dashboard = () => {
  return (
    <div>
      <p style={{marginBottom:'100px'}}>Welcome to Influencer Management</p>
      <div>
        <DashInfluencer />
      </div>
    </div>
  );
};
