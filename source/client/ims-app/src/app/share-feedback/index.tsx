import './style.less';

import { Button, Col, Form, Input, message, Radio, Row } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Feedback } from '../../assets/influencers';
import axios from 'axios';

const rules: { [key: string]: Rule[] } = {
  name: [
    {
      required: true,
      message: 'Enter Name',
    },
  ],
  email: [
    {
      required: true,
      message: 'Enter Email',
    },
  ],
  description: [
    {
      required: true,
      message: 'Enter description',
    },
  ],
};

const ShareFeedback: React.FC = () => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [buttonSelect, setButtonSelect] = useState<number>(0);

  const handleSubmit = async (values: Feedback) => {
    values.rating = buttonSelect;

    try {
      await axios.post('http://localhost:3333/api/feedback/create', values);
      form.resetFields();
      setButtonSelect(0);
      navigate('/');
      message.success('Feedback Submitted Successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error message or show error to user
    }
  };

  return (
    <Row>
      <Col className="share-feedback-content w-100 pb-5">
        <h2 className="content-title-text margin-align font-size-xxl mt-5 pt-5 mt-md-0">
          Your Feedback
        </h2>
        <p className="s-feedback-paragraph message-name-text text-gray-color poppins-font ">
          Please take a moment to share your thoughts on your experience with
          us. Your input will not only help us to continue delivering the
          highest standards of customer service but also enable us to enhance
          and innovate our platform. Thank you for your continued support and
          loyalty
        </p>
        <div className="feedback-input-content d-flex justify-content-center rounded mt-4">
          <Form
            form={form}
            onFinish={handleSubmit}
            name="feedback-form"
            style={{ width: '100%' }}
            layout="vertical"
            className="feedback-form-content"
          >
            <Form.Item rules={rules?.name} name={'fullName'}>
              <Input placeholder="Enter Full Name" />
            </Form.Item>
            <Form.Item rules={rules?.email} name={'email'}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item rules={rules?.description} name="feedback">
              <Input.TextArea rows={6} maxLength={250} placeholder="Type message here" />
            </Form.Item>
            <Form.Item
              name="recommended"
              className="recomment-select"
              label="Would you recommend us to others?"
            >
              <Radio.Group className="d-flex flex-column gap-10 pl-4 radio-button">
                <Radio className="select-text" value={true}>
                  Yes
                </Radio>
                <Radio className="select-text" value={false}>
                  No
                </Radio>
              </Radio.Group>
            </Form.Item>
            <h3 className="content-title-text text-white-color mt-0">
              Your overall satisfaction
            </h3>
            <div className="d-flex justify-content-start gap-10 pl-4 ">
              {a?.map((data, index) => (
                <p
                  key={index}
                  className={`content-title-text circle-box cursor-pointer m-0 ${
                    buttonSelect === data
                      ? 'text-white-color text-sec-color'
                      : 'text-orange-color white-bg'
                  }`}
                  onClick={() => setButtonSelect(data)}
                >
                  {data}
                </p>
              ))}
            </div>
            <div
              className="d-flex"
              style={{
                margin: 'auto',
                justifyContent: 'space-between',
              }}
            >
              <h5 className="paragraph-status-text text-white-color text-left mt-2 ml-4">
                Not Satisfied
              </h5>
              <h5 className="paragraph-status-text text-white-color text-right mt-2 mr-5 pr-5">
                Very Satisfied
              </h5>
            </div>

            <Form.Item className="d-flex justify-content-center mt-4 mb-0">
              <Button
                type="primary"
                htmlType="submit"
                className="feedback-submit-btn btn-text btn-bg-color btn-bg-hover-color rounded-sm"
              >
                Submit Feedback
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ShareFeedback;
