import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [loader, setLoader] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const allCenturies = [16, 17, 18, 19, 20];

  function handleGenderChang(gen: string) {
    const params = new URLSearchParams(searchParams);

    params.set('sex', gen);
    setSearchParams(params);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function handleCenturyChange(number: number) {
    const century = number.toString();
    const params = new URLSearchParams(searchParams);

    const newCentury = centuries.includes(century)
      ? centuries.filter(cen => cen !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCentury.forEach(cen => params.append('centuries', cen));
    setSearchParams(params);
  }

  function handleSort(field: string) {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    const params = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!currentOrder) {
      params.set('order', 'desc');
    } else if (currentOrder === 'desc') {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  function clearCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  const filteredPeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (query && !person.name.toLowerCase().includes(query)) {
      return false;
    }

    if (centuries && centuries.length > 0) {
      const c = Math.floor(person.born / 100);

      if (!centuries.includes(`${c}`)) {
        return false;
      }
    }

    return true;
  });

  const peopleExist =
    filteredPeople !== undefined && filteredPeople.length !== 0;

  const sortedPeople = [...filteredPeople].sort((person1, person2) => {
    switch (sort) {
      case 'name':
        return order === 'desc'
          ? person2.name.localeCompare(person1.name)
          : person1.name.localeCompare(person2.name);

      case 'sex':
        return order === 'desc'
          ? person2.sex.localeCompare(person1.sex)
          : person1.sex.localeCompare(person2.sex);

      case 'born':
        return order === 'desc'
          ? person1.born - person2.born
          : person2.born - person1.born;

      case 'died':
        return order === 'desc'
          ? person1.born - person2.born
          : person2.born - person1.born;

      default:
        return 0;
    }
  });

  useEffect(() => {
    setLoader(true);
    setErrorMessage('');
    getPeople()
      .then((res: Person[]) => {
        setPeople(res);
        setLoader(false);
        if (res.length === 0) {
          setErrorMessage('There are no people on the server');
        }
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loader && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                sex={sex}
                query={query}
                centuries={centuries}
                allCenturies={allCenturies}
                handleGenderChang={handleGenderChang}
                handleQueryChange={handleQueryChange}
                handleCenturyChange={handleCenturyChange}
                clearCenturies={clearCenturies}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
              {!loader && errorMessage && !peopleExist && (
                <p data-cy="noPeopleMessage">{errorMessage}</p>
              )}
              {filteredPeople?.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {peopleExist && (
                <PeopleTable
                  people={sortedPeople}
                  slug={{ slug }}
                  handleSort={handleSort}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
