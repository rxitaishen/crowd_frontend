
import './index.css';
import { useState, useEffect,useRef  } from 'react'
import { Layout, Progress, InputNumber, Modal } from 'antd';
import store from '../../redux/store'
import HeaderMenu from '../../components/header';
import axios from 'axios'
import { Link, withRouter, useLocation } from 'react-router-dom'
const { Header, Content, Footer } = Layout;


function Detail(props) {
  const info = props.location.query.data_ori
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { img, data } = info
  const { name, description, viewNum, suportNum, timeStart, timeEnd, moneyTarget, moneyHave, owner } = data
  // const {data} = location.action.query
  const [leftDays, setLeftDays] = useState('')
  const [suport, setSuport] = useState(suportNum) //支持人数
  const [money, setMoney] = useState(moneyHave)  //已有的钱
  // const [moneyProgress,setMoneyProgress] = useState(parseInt(moneyHave/moneyTarget)*100) //已有钱的进度
  const [moneyProgress,setMoneyProgress] = useState(parseInt((moneyHave/moneyTarget)*100)) 
  const model = useRef()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(model.current.value);
    if (store){
      console.log('支持成功');
      let sNum = parseInt(model.current.value);
      let obj = {name:name,num:sNum}
      axios.post(`/api/projects/suport`,obj).then((res)=>{
        let mHave =res.data
        console.log('返回的参数为',mHave);
        setMoney(mHave)
        console.log('捐款了',parseInt((mHave/moneyTarget)*100))
        setMoneyProgress(parseInt((mHave/moneyTarget)*100)) 
        axios.get(`/api/projects/suport/${name}`).then((res)=>{
          setSuport(res.data)
        })
      })}
      
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSuport = () => {
    if (!store.getState() ) {
      console.log('未登录')
      alert('未登录，请先登录')
      props.history.push('/login')
    }
    else {
      
      showModal()
    }
  }

  function onChange(value) {
    console.log('changed', value);
  }


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
    console.log(info);
    let timeLeft = DateDiff(timeEnd, Thistime())
    timeLeft < 0 ? setLeftDays('已截止') : setLeftDays(timeLeft + ' 天')

  }, [])
  return (
    <Layout className="layout">

      <HeaderMenu />
      <Content >
        <div className='content'>

          <div className='content-up'>
            <div className='content-upleft'>
              <div className='title'>
                <span>{name}</span>
              </div>
              <div className='imgdiv'>
                <img src={img[0]} style={{ width: '100%', height: '290px' }} />
              </div>
            </div>
            <div className='content-upright'>
              <div className='raise-money'>
                <span className='text' id='text'>目前累计资金</span>
                <span className='text' id='money'>{money}</span>
                <span className='text' id='tishi'>此项目须在{timeEnd}前，获得<span id='money-target'>{moneyTarget}</span>的支持才可成功！</span>
              </div>
              <div className='status'>
                <div className='status-txt'>
                <span className='num'>{leftDays}</span>
                <span className='txt'>剩余时间</span>
                <span className='num'>{suport}</span>
                <span className='txt'>支持数</span>
                </div>
                <div className='progress'>
                <Progress type="dashboard" percent={moneyProgress} />
                <span className='txt'>筹资进度</span>
                </div>
              </div>
              <div id='suport-rightnow-div'>
                <a id='suport-rightnow' onClick={handleSuport}>立即支持</a>
                <Modal title="请输入支持金额" width={300} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                  <div className='modalnum'> 
                  支持 <InputNumber ref={model}  onChange={onChange} /> 元
                </div>
                </Modal>
              </div>
              {/* <div className='owner'>
                <div className='owner-pic'>antd头像</div>
                <div className='owner-name'>{owner}</div>
              </div> */}
            </div>
          </div>

          <div className='content-down'>
            <div className='menu'>
              项目详情
            </div>
            <div className='detail'>
              {img
                ? img.map((item) => (
                  <img
                    src={item}
                  ></img>
                ))
                : ''}
            </div>

          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>)

}

export default withRouter(Detail);
