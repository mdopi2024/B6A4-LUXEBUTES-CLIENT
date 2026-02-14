import ProfileCard from '@/components/shared/ProfileCard';
import { userServices } from '@/services/userServices';


const AdminDashboard = async() => {

    const {user} = await userServices.getSession()

    return (
        <div className='border border-blue-700 '>
          <ProfileCard user={user} ></ProfileCard> 
        </div>
    );
};

export default AdminDashboard;