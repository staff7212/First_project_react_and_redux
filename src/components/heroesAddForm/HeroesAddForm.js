import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { useHttp } from '../../hooks/http.hook';
import { heroCreated } from '../../actions';


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

  const [heroName, setHeroName] = useState('');
  const [heroDesc, setHeroDesc] = useState('');
  const [heroElement, setHeroElement] = useState('');
  const {filters, filtersLoadingStatus} = useSelector(state => state.filters);

  const {request} = useHttp();
  const dispatch = useDispatch();

  const onSubmitForm = (e) => {
    e.preventDefault();

    const newHero = {
      id: uuidv4(),
      name: heroName,
      description: heroDesc,
      element: heroElement,
    };

    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
      .then(dispatch(heroCreated(newHero)))
      .catch(e => console.log(e));

    setHeroName('');
    setHeroDesc('');
    setHeroElement('');
  };

  const renderSelector = (arr, status) => {
    if (status === 'loading') {
      return <option>Загрузка элементов...</option>
    } else if (status === 'error') {
      return <option>Ошибка загрузки</option>
    }

    return arr.map(({name, label}) => {
      // eslint-disable-next-line
      if (name === 'all') return;
      
      return <option key={name} value={name}>{label}</option>
    })
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitForm}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
        <input 
          required
          type="text" 
          name="name" 
          className="form-control" 
          id="name"
          value={heroName}
          onChange={e => setHeroName(e.target.value)}
          placeholder="Как меня зовут?"/>
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">Описание</label>
        <textarea
          required
          name="text" 
          className="form-control" 
          id="text" 
          placeholder="Что я умею?"
          value={heroDesc}
          onChange={e => setHeroDesc(e.target.value)}
          style={{"height": '130px'}}/>
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
        <select 
          required
          className="form-select" 
          id="element" 
          name="element"
          value={heroElement}
          onChange={e => setHeroElement(e.target.value)}>
          <option >Я владею элементом...</option>
          {renderSelector(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">Создать</button>
    </form>
  )
}

export default HeroesAddForm;