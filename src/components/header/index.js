import './index.css';
import { Link ,useHistory} from 'react-router-dom'
import { Statistic, Card, Row, Col, Avatar, Layout, Menu, Breadcrumb, Button, Dropdown, Image } from 'antd';
import store from '../../redux/store'
import { login, logout } from '../../redux/login_action'
import RaiseCrowd from '../../pages/raisecrowd';
import SortPage from '../../pages/sortpage';
const { Header, Content, Footer } = Layout;


function HeaderMenu() {
  const history = useHistory()

  const userLogout = () => {
    console.log('登出');
    store.dispatch(logout())
  }
  const sortPage = () =>{
    console.log('点击了分类的项目');
    history.push("/sortpage")
  }
  const completePage = () =>{
    console.log('点击了完成的项目');
    history.push("/completePage")
  }
  //设置头像下拉菜单
  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          个人信息
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a onClick={() => { history.push("/mycrowd") }}>
          我的众筹
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" >
        <a onClick={() => { userLogout() }}>
          退出
        </a>
      </Menu.Item>
    </Menu>
  );

  //头像条件渲染
  const cheackLogin = () => {
    let loginStatus = store.getState()
    if (loginStatus == 1) {
      return (
        <div className='loginOrRegister'>
          <Dropdown overlay={userMenu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
            </a>
          </Dropdown>
        </div>
      )
    } else {
      return (
        <div className='loginOrRegister'>
          <div className='login' ><Link to="/login" >登录</Link></div> \
          <div className='register'><Link to="/register" >注册</Link></div>
        </div>
      )
    }
  }

  //跳转链接
  const indexPage =()=>{
    history.push('/')
  }

  const historyProjects = () =>{
    history.push('/historyProject')
  }

  const raiseCrowd = () =>{
    history.push('/raiseCrowd')
  }

  return (
      <div>
      <div className='topText'>

        <div className='topText-child'>联系我们</div>
        <div className='topText-child'>关于我们</div>
        <div className='topText-child'>客服热线</div>
      </div>
      <Header>
        <div className='header'>
          <div className="logo" ><img src='众筹.png' style={{ height: '83px' }} alt="es-lint want to get" /></div>
          <Menu mode="horizontal" >

            {/* {new Array(5).fill(null).map((_, index) => {
          const key = index + 1;
          return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>
        })} */}
            <Menu.Item key={0} onClick={indexPage}>首页</Menu.Item>
            <Menu.Item key={1} onclick={sortPage}>产品众筹</Menu.Item> {/*正在众筹的项目*/}
            <Menu.Item key={2} onclick={completePage}>历史项目</Menu.Item>{/*已经结束的项目*/}
            <Menu.Item key={3}  onClick={raiseCrowd}>发起众筹</Menu.Item>

          </Menu>
          {cheackLogin()}
          {/* <div className='loginOrRegister'>
            <div className='login' ><Link to="/login" >登录</Link></div> \
            <div className='register'><Link to="/register" >注册</Link></div>
          </div> */}
        </div>
      </Header>
      </div>
   )

}

export default HeaderMenu;
