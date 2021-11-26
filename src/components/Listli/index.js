import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { Statistic, Card, Row, Col, Avatar, Divider } from 'antd';
import { FieldTimeOutlined, MoneyCollectOutlined,LikeOutlined ,EyeOutlined } from '@ant-design/icons';
import axios from 'axios'
import './index.css'
const { Meta } = Card;
const listli = (props) => {
    // const productImg_children = props.proImg_father;
    const proName_children = props.proName_father;
    const proDescription_children = props.proDescription_father;
    const proViewNum_children = props.proViewNum_father;
    const proSuportNum_children = props.proSuportNum_father;
    const proTimeStart_children = props.proTimeStart_father;
    const proTimeEnd_children = props.proTimeEnd_father;
    const proMoneyTarget_children = props.proMoneyTarget_father;
    const proMoneyHave_children = props.proMoneyHave_father;

    
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
                    <h1>{proName_children}</h1>
                </div>
                <div className='content-describe' title='喵喵喵'>
                    {proDescription_children}
                </div>
                <div className='content-status'>
                <div className='support-num'> <LikeOutlined />支持人数:{proSuportNum_children}</div>
                <div className='view-num'><EyeOutlined />浏览:{proViewNum_children}</div>
                <div className='last-time'><FieldTimeOutlined />{proTimeStart_children} 至 {proTimeEnd_children}</div>
                </div>
                <Divider />
                <div className='target-num'>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card hoverable>
                                <Statistic
                                    style={{}}
                                    title="目标金额"
                                    value={proMoneyTarget_children}
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
                                    value={proMoneyHave_children}
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
                                    value={213}
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