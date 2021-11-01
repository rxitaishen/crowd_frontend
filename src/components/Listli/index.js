import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { Statistic, Card, Row, Col, Avatar, Divider } from 'antd';
import { FieldTimeOutlined, MoneyCollectOutlined,LikeOutlined ,EyeOutlined } from '@ant-design/icons';
import axios from 'axios'
import './index.css'
const { Meta } = Card;
const listli = (props) => {
    const productImg_children = props.productImg_father;
    const productName_children = props.productName_father;
    const productDescription_children = props.productDescription_father;
    return (
        // <Card
        //     hoverable
        //     style={{ width: 240 }}
        //     cover={<img alt="product" src={productImg_children} />}
        // >
        //     <Meta title={productName_children} description={productDescription_children} />
        // </Card>
        // <Card
        //     hoverable
        //     style={{ width: 300 }}
        //     cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        // >
        //     <Meta title="Europe Street beat" description="www.instagram.com" />
        //     <Meta
        //         avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        //         title="Card title"
        //         description="This is the description"
        //     />
        // </Card>,
        <div className='preview-div'>
            <div className='preview-img'>
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <div className='preview-content'>
                <div className='content-title'>
                    <h1>标题标题标题</h1>
                </div>
                <div className='content-describe' title='喵喵喵'>
                    描述描述描述描述述描述描述描述描述描述描述描描述描述描述描述描述
                    描述描述描述描述述描述描述描述描述描述描述描描述描述描述描述描述
                    描述描述描述描述述描述描述描述描述描述描述描描述描述描述描述描述
                    描述描述描述描述述描述描述描述描述描述描述描描述描述描述描述描述
                </div>
                <div className='content-status'>
                <div className='support-num'> <LikeOutlined />支持人数:18</div>
                <div className='view-num'><EyeOutlined />浏览:137</div>
                <div className='last-time'><FieldTimeOutlined />2020-06-17 至 2021-01-31</div>
                </div>
                <Divider />
                <div className='target-num'>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card hoverable>
                                <Statistic
                                    style={{}}
                                    title="目标金额"
                                    value={489}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' ,fontSize:'14px'}}
                                    prefix={<MoneyCollectOutlined />}

                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card hoverable>
                                <Statistic
                                    style={{}}
                                    title="已支持金额"
                                    value={489}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' ,fontSize:'14px'}}
                                    prefix={<MoneyCollectOutlined />}

                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card hoverable>
                                <Statistic
                                    style={{}}
                                    title="剩余时间"
                                    value={489}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' ,fontSize:'14px'}}
                                    prefix={<FieldTimeOutlined />}

                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
export default listli