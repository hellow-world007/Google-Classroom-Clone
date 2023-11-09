import React from 'react'
import { Link,
    Switch,
    Route,
    useParams,
    useRouteMatch, 
    NavLink} from 'react-router-dom'
import Topic from './Topic';
import Stream from './Stream';
import Classwork from './Classwork';
import Marks from './Marks';
import People from './People';

const Topics = ({detailData}) => {

  let { path, url } = useRouteMatch();
  return (
    <div className='Topics'>
        <div className='links-in-details'>
            <ul>
                <li>
                  <NavLink 
                    to={`${url}`}
                    className={({isActive}) => isActive ? "active-link" : null}
                  >
                    Stream
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to={`${url}/classwork`}
                    className={({isActive}) => isActive ? "active-link" : null}
                  >
                    Classwork
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to={`${url}/people`}
                    className={({isActive}) => isActive ? "active-link" : null}
                  >
                    People
                  </NavLink>
                </li>
                
                <li>
                  <NavLink 
                    to={`${url}/marks`}
                    className={({isActive}) => isActive ? "active-link" : null}
                  >
                    Marks
                  </NavLink>
                </li>
            </ul>
        </div>

        <Switch>
            {/* <Route exact path={path}>
               <h3>Please select a topic.</h3>
            </Route> */}
            <Route path={`${path}`}>
               {/* <Topic /> */}
               {/* <Route path={`${path}`}>
                   <Stream />
               </Route> */}
               <Route path={`${path}/classwork`}>
                   <Classwork detailData={detailData} />
               </Route>
               <Route path={`${path}/people`}>
                   <People />
               </Route>
               <Route path={`${path}/marks`}>
                   <Marks />
               </Route>
            </Route>
        </Switch>
    </div>
  )
}

export default Topics