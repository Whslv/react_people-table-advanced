import React from 'react';
import { PersonLink } from '../components/PersonLink';
import classNames from 'classnames';
import { Person } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  people: Person[];
  slug: { slug: string | undefined };
  handleSort: (field: string) => void;
}

export const PeopleTable: React.FC<Props> = ({ people, slug, handleSort }) => {
  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <Link
                  to="#"
                  onClick={e => {
                    e.preventDefault();
                    handleSort('name');
                  }}
                >
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </Link>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <Link
                  to="#"
                  onClick={e => {
                    e.preventDefault();
                    handleSort('sex');
                  }}
                >
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </Link>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <Link
                  to="#"
                  onClick={e => {
                    e.preventDefault();
                    handleSort('born');
                  }}
                >
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </Link>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <Link
                  to="#"
                  onClick={e => {
                    e.preventDefault();
                    handleSort('died');
                  }}
                >
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </Link>
              </span>
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people?.map(person => {
            const motherExist = people.find(
              pers => pers.name === person.motherName,
            );
            const fatherExist = people.find(
              pers => pers.name === person.fatherName,
            );

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': person.slug === slug.slug,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>
                  <a href="">{person.sex}</a>
                </td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    motherExist ? (
                      <PersonLink person={motherExist} />
                    ) : (
                      person.motherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    fatherExist ? (
                      <PersonLink person={fatherExist} />
                    ) : (
                      person.fatherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default PeopleTable;
