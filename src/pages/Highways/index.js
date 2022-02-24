import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListHighway } from "stores/api/shared/actions";
import { Link } from 'react-router-dom';
import { Highway } from "shared/models/Highway";
import { ReactComponent as HeartIcon } from "assets/icons/heart.svg";
import { ReactComponent as HeartFillIcon } from "assets/icons/heart-fill.svg";
const Highways = () => {
  const dispatch = useDispatch();
  const [highways, setHighways] = useState([]);
  const favorite = useSelector(state => state.commonReducer?.favoriteController?.favorites) || [];

  useEffect(() => {
    dispatch(getListHighway(null, (res) => {
      const roads = res.roads;
      const temp = roads.map(x => {
        const road = new Highway({ id: x });
        const item = favorite.find(y => y.id === road.id);
        road.addInfo(item?.comment, item?.color);
        return road;
      });
      setHighways(temp);
    }));
  }, []);

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
                    Favorite?
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
                {highways?.map((highway) => (
                  <tr key={highway.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{highway.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{highway.isFavorite? <HeartFillIcon /> : <HeartIcon />}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{highway.comment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{highway.color}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/highways/${highway.id}`} className="text-indigo-600 hover:text-indigo-900">
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highways;
