import MainHeader from '../components/MainHeader/MainHeader';
import SubHeader from '../components/SubHeader/SubHeader';
import { Outlet } from 'react-router-dom';
import MainFooter from '../components/MainFooter/MainFooter';

const UserLayout = () => {
  return (
    <div >
        <MainHeader />
        <SubHeader />
        <main style={{backgroundColor: 'rgb(178 178 178 / 19%)', paddingBottom: '40px'}}>
            <Outlet />
        </main>
        <MainFooter />
    </div>
  )
}

export default UserLayout