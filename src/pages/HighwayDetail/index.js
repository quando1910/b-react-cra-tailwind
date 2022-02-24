import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getHighwayDetail } from "stores/api/shared/actions";
import { ReactComponent as HeartIcon } from "assets/icons/heart.svg";
import { ReactComponent as HeartFillIcon } from "assets/icons/heart-fill.svg";
import { addFavoriteHighway, addInfoForFavorite, removeFavoriteHighway } from "stores/common/actions";
import { toast } from 'react-toastify';

const HighwayDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [roadworks, setRoadworks] = useState();
  const [comment, setComment] = useState('');
  const [color, setColor] = useState('');
  const favorite = useSelector(state => state.commonReducer?.favoriteController?.favorites) || [];
  const currentFavorite = favorite.find(x => x.id === id);
  const notifyAdd = () => toast.success('Added highway into your favorite!');
  const notify = () => toast.success('Updated information for your favorite highway!');
  
  useEffect(() => {
    dispatch(getHighwayDetail({ id }, (res) => {
      setRoadworks(res.roadworks)
    }));
  }, []);

  useEffect(() => {
    if (currentFavorite) {
      setComment(currentFavorite.comment);
      setColor(currentFavorite.color);
    }
  }, [currentFavorite]);

  const toggleFavorite = () => {
    if (!currentFavorite) {
      dispatch(addFavoriteHighway({ id }));
      notifyAdd();
    } else {
      dispatch(removeFavoriteHighway({ id }));
    }
  }

  const addInfoFavorite = () => {
    dispatch(addInfoForFavorite({
      id,
      comment,
      color
    }));
    notify();
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Highway detail</h2>
      <table className="my-8">
        <tbody>
          <tr>
            <td className="w-[250px] py-2">
              Highway name
            </td>
            <td className="w-[250px] flex gap-5 items-center py-2">
              <p>{id}</p> 
              <button
                type="button"
                onClick={toggleFavorite}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {!currentFavorite ? <HeartIcon /> : <HeartFillIcon />}
              </button>
            </td>
          </tr>
          {!!currentFavorite && (
            <>
              <tr>
                <td className="w-[250px] py-2">
                  Add your comment
                </td>
                <td className="w-[500px] py-2">
                  <div className="mt-1">
                    <textarea
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      rows={4}
                      name="comment"
                      id="comment"
                      className="shadow-md py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-primary rounded-md"
                      defaultValue={''}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-[250px] py-2">
                  Color
                </td>
                <td className="w-[500px] py-2">
                  <div className="mt-1">
                    <input
                      type="text"
                      value={color}
                      onChange={e => setColor(e.target.value)}
                      name="text"
                      id="color"
                      className="shadow-md py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-primary rounded-md"
                      placeholder="Fill color"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-[250px] py-2">
                </td>
                <td className="w-[500px] py-2">
                  <button
                    type="button"
                    onClick={addInfoFavorite}
                    disabled={!comment || !color}
                    className="inline-flex disabled:opacity-50 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 w-1/4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subtitle
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Coordinates
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-900 font-medium">
                  {roadworks?.map((roadwork, index) => (
                    <tr key={index}>
                      <td className="px-6 w-1/4 py-4 whitespace-prewrap">{roadwork.title}</td>
                      <td className="px-6 py-4 whitespace-prewrap">
                        {roadwork.subtitle}
                      </td>
                      <td className="px-6 py-4 whitespace-prewrap">
                        <ul>
                          {roadwork.description.map((desc, ind) => (
                            !!desc && <li key={`p-${ind}`}>- {desc}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {roadwork.coordinate.lat} - {roadwork.coordinate.long}
                      </td>
                    </tr>
                  ))}
                  {roadworks?.length === 0 && (
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
    </div>
  );
};

export default HighwayDetail;
