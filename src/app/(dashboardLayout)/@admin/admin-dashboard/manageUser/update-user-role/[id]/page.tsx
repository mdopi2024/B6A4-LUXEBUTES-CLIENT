

const UpdateUserRole =async ({params}:{params:Promise<{id:string}>}) => {
         const {id} = await params
    return (
        <div>
           update user role {id}
        </div>
    );
};

export default UpdateUserRole;
