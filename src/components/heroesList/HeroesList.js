import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import {useHttp} from '../../hooks/http.hook';
import { heroDeleted, fetchHeroes } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {filteredHeroesSelector} from './heroesSlice'

import './heroesList.scss'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const filteredHeroes = useSelector(filteredHeroesSelector)

  const {heroesLoadingStatus} = useSelector(state => state.heroes);
  const dispatch = useDispatch();
  const {request} = useHttp();
  
  useEffect(() => {
    dispatch(fetchHeroes());
    // eslint-disable-next-line
  }, []);
  
  const deleteHeroes = useCallback((id) => {
    request(`http://localhost:3001/heroes/${id}`, 'DELETE')
      .then(dispatch(heroDeleted(id)))
      .catch(e => console.log(e));
    // eslint-disable-next-line
  }, [request]);

  if (heroesLoadingStatus === "loading") {
    return <Spinner/>;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition
          timeout={0}
          classNames="hero">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      );
    }

    return arr.map(({id, ...props}) => {
      return (
        <CSSTransition
          key={id}
          timeout={500}
          classNames="hero">

          <HeroesListItem deleteHeroes={() => deleteHeroes(id)} {...props}/>
        </CSSTransition>
      );
    })
  }

  const elements = renderHeroesList(filteredHeroes);
  return (
    <TransitionGroup component={'ul'}>
      {elements}
    </TransitionGroup>
  )
}

export default HeroesList;