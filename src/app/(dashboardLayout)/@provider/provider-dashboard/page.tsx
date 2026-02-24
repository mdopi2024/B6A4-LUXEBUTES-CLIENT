import ProfileCard from '@/components/shared/ProfileCard';
import { userServices } from '@/services/userServices';


const ProviderProfile = async() => {
    const {user} = await userServices.getSession()
    return (
        <div className='flex justify-center items-center'>
            <ProfileCard user={user}></ProfileCard>
        </div>
    );
};

export default ProviderProfile;