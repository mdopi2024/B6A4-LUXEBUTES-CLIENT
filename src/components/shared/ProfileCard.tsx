interface UserType {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: string;
    updatedAt: string;
    role: "ADMIN" | "PROVIDER" | "CUSTOMER";
    status: "ACTIVE" | "SUSPENDED";
}

const ProfileCard = ({ user }: { user: UserType }) => {
    const {id,name,email,role,emailVerified,createdAt,updatedAt,status} = user
    return (
        <div className="border border-green-800 mx-[200px] "> 
          <div className="border border-blue-800 lg:w-2/3 mx-auto">
              hello
          </div>
        </div>
    );
};

export default ProfileCard;
