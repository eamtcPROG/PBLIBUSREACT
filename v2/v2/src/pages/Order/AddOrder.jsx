import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import '../../MyStyle/AddOrder.css';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload,
    Row,
    Col,
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const AddOrder = () => {



    return (
        <>
            <div  class="AddOrder">
                <Form 
                    // style={{marginTop:"15%", marginLeft:"25%"  }}
                    className='form-add-order'
                    
                    labelCol={{ span: 15 }}
                    wrapperCol={{ span: 25 }}
                    layout="horizontal"

                    

                >
                    { <Row>
                        <Col span={8}>
                            <Form.Item style={{marginRight:"60%"}} label="From">
                            <Input className='sizes' />
                         </Form.Item>  
                         </Col>
                        <Col span={8} offset={8}>
                        <Form.Item style={{marginRight:"20%"}} label="To">
                            <Input  className='sizes'/>
                         </Form.Item>  
                        </Col>
                         </Row>
                    }   
                    
                    { <Row>
                        <Col span={8}>
                            <Form.Item  label="Nr of passangers">
                            <InputNumber />
                         </Form.Item>  
                         </Col>
                        <Col span={8} offset={8}>
                        <Form.Item label="DatePicker">
                         <DatePicker />
                         </Form.Item> 
                        </Col>
                         </Row>
                    }  
      
                    <Form.Item style={{width:"400px"}} label="More details">
                        <TextArea rows={5} />
                    </Form.Item>
  
                    { <Row>
                        <Col span={8}>
                            <Form.Item>
                        <Button >Cancel</Button>
                         </Form.Item>  
                         </Col>
                        <Col span={8} offset={8}>
                            <Form.Item>
                        <Button >Cancel</Button>
                         </Form.Item> 
                        </Col>
                         </Row>
                    }
                  
                </Form>
            </div>
        </>
    );
};

export default () => <AddOrder />; 