import CategoryTable from '@/components/modules/categories/categoryTable';
import { categoriesServices } from '@/services/categoriesServices';

const AllCategroies =async () => {
    const {data} =await categoriesServices.getAllCategory()
    return (
        <div>
            <CategoryTable categories={data}></CategoryTable>
        </div>
    );
};

export default AllCategroies;