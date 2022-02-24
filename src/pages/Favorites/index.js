import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { removeFavoriteHighway } from "stores/common/actions";

const Favorite = () => {
  const dispatch = useDispatch();
  const favorite = useSelector(state => state.commonReducer?.favoriteController?.favorites) || [];

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Highway Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Comment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Color
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {favorite?.map((highway) => (
                  <tr key={highway}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{highway.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{highway.comment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{highway.color}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-4 items-center justify-end">
                        <Link to={`/highways/${highway.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Detail
                        </Link>
                        <button
                          type="button"
                          onClick={() => dispatch(removeFavoriteHighway({ id : highway.id }))}
                          className="inline-flex disabled:opacity-50 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Unfavorite
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!favorite.length && (
                  <tr className="text-center">
                    <td className="text-gray-500 text-sm py-6" colSpan={4}>Item Not Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
