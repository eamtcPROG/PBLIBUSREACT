import { Card, Descriptions, Row, Col } from 'antd';
import React from 'react';
const MyProfile = () => (
    <div className="site-card-border-less-wrapper">
        <Card
            title="Profile Info"
            bordered={false}
            style={{
                width: 600,
            }}
        >

            
                <Row>
                    <Col>
                        Nume
                    </Col>
                </Row>
                <Row>
                    <Col>
                       prenume
                    </Col>
                </Row>

                <Row>
                    <Col>
                        email
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Age
                    </Col>
                </Row>



          


        </Card>
    </div>
);
export default MyProfile;