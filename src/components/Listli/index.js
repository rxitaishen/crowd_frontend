import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {useEffect,useState} from 'react';
import { Statistic, Card, Row, Col, Avatar, Divider } from 'antd';
import { FieldTimeOutlined, MoneyCollectOutlined,LikeOutlined ,EyeOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Link ,useHistory,withRouter } from 'react-router-dom'
import './index.css'
const { Meta } = Card;
const Listli = (props) => {
    // const productImg_children = props.proImg_father;
    // const proName_children = props.proName_father;
    // const proDescription_children = props.proDescription_father;
    // const proViewNum_children = props.proViewNum_father;
    // const proSuportNum_children = props.proSuportNum_father;
    // const proTimeStart_children = props.proTimeStart_father;
    // const proTimeEnd_children = props.proTimeEnd_father;
    // const proMoneyTarget_children = props.proMoneyTarget_father;
    // const proMoneyHave_children = props.proMoneyHave_father;
    const {name,description,viewNum,suportNum,timeStart,timeEnd,moneyTarget,moneyHave} = props
    const [firstImg,setFirstImg] = useState('') 
    const [leftDays, setLeftDays] = useState('')
    const [view, setView] = useState(viewNum)
    // document.getElementsByClassName('preview-div')[0].addEventListener("click", handleClick);
    // const history = useHistory()

    
  function Thistime() {//当前日期
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var time = year + "-" + month + "-" + day;
    return time;
  }
  function DateDiff(sDate1, sDate2) {  //sDate1和sDate2是yyyy-MM-dd格式
    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  //转换为yyyy-MM-dd格式
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
    return iDays;  //返回相差天数
  }


  useEffect(() => {
    let timeLeft = DateDiff(timeEnd, Thistime())
    timeLeft < 0 ? setLeftDays('已截止') : setLeftDays(timeLeft + ' 天')

  }, [])

    useEffect(()=>{
        axios.get(`/api/projects/firstimgurl/${props.name}`).then((res)=>{
            setFirstImg(res.data)
        })
    },[])

    const handleClick = () =>{
        console.log('点击了项目卡片');
        axios.get(`/api/projects/view/${props.name}`).then((res)=>{
            axios.get(`/api/projects/detail/${props.name}`).then((res)=>{
                props.history.push({pathname:'/detail', query:{data_ori:res.data}})
            })
        })
        

    }

   

    return (
        <a onClick = {handleClick}>
        <div className='preview-div'>
            <div className='preview-img'>
                <img alt="未找到项目封面" src={firstImg} />
            </div>
            <div className='preview-content'>
                <div className='content-title'>
                    <h1>{name}</h1>
                </div>
                <div className='content-describe' title='喵喵喵'>
                    {description}
                </div>
                <div className='content-status'>
                <div className='support-num'> <LikeOutlined />支持人数:{suportNum}</div>
                <div className='view-num'><EyeOutlined />浏览:{viewNum}</div>
                <div className='last-time'><FieldTimeOutlined />{timeStart} 至 {timeEnd}</div>
                </div>
                <Divider />
                <div className='target-num'>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card hoverable>
                                <Statistic
                                    style={{}}
                                    title="目标金额"
                                    value={moneyTarget}
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
                                    value={moneyHave}
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
                                    value={leftDays}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' ,fontSize:'14px'}}
                                    prefix={<FieldTimeOutlined />}

                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div></a>
    )
}
export default withRouter( Listli)