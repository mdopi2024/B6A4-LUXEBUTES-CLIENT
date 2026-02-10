import UserTableCard from "@/components/modules/userRoutes/userTableCard";
import { userServices } from "@/services/userServices";

export interface UserData {
        id:string;
        name:string;
        email:string;
        emailVerified:boolean;
        image?:string;
        createdAt:string;
        updatedAt:string;
        role:string;
        status:string

    }

const ManageUser =async () => {
    const data=await userServices.getAllUser()

    return (
        <div>
            <UserTableCard data={data.data}></UserTableCard>
        </div>
    );
};

export default ManageUser;