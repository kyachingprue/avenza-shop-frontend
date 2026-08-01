
const CategoryCard = ({ category }) => {
  console.log(category);
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-bold">Category Card</h3>
      <p className="text-md text-black py-4">{category}</p>
    </div>
  );
};

export default CategoryCard;
