import CategoryTable from '@/components/modules/categories/categoryTable';
import { categoriesServices } from '@/services/categoriesServices';

// Prevents Next.js from statically prerendering this page at build time.
// This page depends on live/dynamic data, so it must be rendered per-request.
export const dynamic = 'force-dynamic';

const AllCategories = async () => {
  const res = await categoriesServices.getAllCategory();
  const categories = res?.data ?? [];

  return (
    <div>
      <CategoryTable categories={categories} />
    </div>
  );
};

export default AllCategories;