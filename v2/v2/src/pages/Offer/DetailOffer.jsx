import { Space, Table, Tag, Layout } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';


const { Header, Content, Footer } = Layout;
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
<Header>
    <h1>lol</h1>
</Header>
const columns: ColumnsType<DataType> = [
    
 
    {
    title: 'Start/Finish',
    dataIndex: 'name',
    key: 'name',
    
  },
  {
    title: 'Number of people',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Contractor',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Price',
    key: 'tags',
    dataIndex: 'tags',
    
          
        },
      
    
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit </a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Molovata-Chisinau',
    age: 10,
    address: 'Transport.md',
    tags: ['500 lei'],
  },
  {
    key: '2',
    name: 'Chisinau-Iasi',
    age: 42,
    address: 'Transportica',
    tags: ['1000 lei'],
  },
  {
    key: '3',
    name: 'Chisinau-Bucuresti',
    age: 2,
    address: 'Complexica Transporter',
    tags: ['1500 lei'],
  },
];

const OfferDetails: React.FC = () => <Table columns={columns} dataSource={data} />;

export default OfferDetails;