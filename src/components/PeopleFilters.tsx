import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  sex: string;
  query: string;
  centuries: string[];
  allCenturies: number[];
  handleGenderChang: (gen: string) => void;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCenturyChange: (number: number) => void;
  clearCenturies: () => void;
};

export const PeopleFilters: React.FC<Props> = ({
  sex,
  query,
  centuries,
  allCenturies,
  handleGenderChang,
  handleQueryChange,
  handleCenturyChange,
  clearCenturies,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames(sex === '' ? 'is-active' : '')}
          to="#"
          onClick={e => {
            e.preventDefault();
            handleGenderChang('');
          }}
        >
          All
        </Link>
        <Link
          className={classNames(sex === 'm' ? 'is-active' : '')}
          to="#"
          onClick={e => {
            e.preventDefault();
            handleGenderChang('m');
          }}
        >
          Male
        </Link>
        <Link
          className={classNames(sex === 'f' ? 'is-active' : '')}
          to="#"
          onClick={e => {
            e.preventDefault();
            handleGenderChang('f');
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={e => {
              handleQueryChange(e);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {allCenturies.map(cen => {
              return (
                <button
                  key={cen}
                  data-cy="century"
                  className={classNames(
                    centuries.includes(cen.toString())
                      ? 'button mr-1 is-info'
                      : 'button mr-1',
                  )}
                  onClick={() => {
                    handleCenturyChange(cen);
                  }}
                >
                  {cen}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              onClick={e => {
                e.preventDefault();
                clearCenturies();
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={e => {
            e.preventDefault();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
