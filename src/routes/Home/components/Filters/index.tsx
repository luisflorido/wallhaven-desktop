import Input from '@/components/atoms/Input';
import Select, { SelectOption } from '@/components/atoms/Select';
import { useAppDispatch, useAppSelector, useDebounce } from '@/hooks';
import { getSearch } from '@/store/ducks/wallpaper';
import { ImagePurity, ISearchAPIParams } from '@/types';
import React, { useEffect, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { BsFillBookmarkFill, BsFillGearFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import {
  BottomContainer,
  Container,
  FilterContainer,
  FilterName,
  FilterTitle,
  ScreenName,
  Separator,
  Title,
  TopContainer,
} from './styles';

export interface IFilterName {
  isActive?: boolean;
  purity?: ImagePurity;
}

const sortOptions: SelectOption[] = [
  { label: 'Date Added', value: 'date_added' },
  { label: 'Relevance', value: 'relevance' },
  { label: 'Random', value: 'random' },
  { label: 'Views', value: 'views' },
  { label: 'Favorites', value: 'favorites' },
  { label: 'Toplist', value: 'toplist' },
  { label: 'Hot', value: 'hot' },
];

interface Props {
  scrollToTop: () => void;
}

const Filters: React.FC<Props> = ({ scrollToTop }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSelector(state => state.wallpaper);
  const [params, setParams] = useState(searchParams?.params || {});
  const searchParamsDebounce = useDebounce(params);

  useEffect(() => {
    dispatch(
      getSearch({
        options: { resetPage: true },
        params: searchParamsDebounce,
      }),
    );
    scrollToTop();
  }, [searchParamsDebounce]);

  const toggleFilter = ({
    filterType,
    type,
    isMultiple = false,
  }: {
    filterType: keyof ISearchAPIParams;
    type: string | number;
    isMultiple?: boolean;
  }) => {
    const newParams: ISearchAPIParams = params
      ? JSON.parse(JSON.stringify(params))
      : {};
    if (typeof type === 'number') {
      const typeIndex = Number(type) - 1;
      const filters = newParams?.[filterType]?.toString() || '000';
      const filter = filters[typeIndex];
      const filterBoolean = filter === '1';
      const newUpdatedFilter =
        filters.substring(0, typeIndex) +
        Number(!filterBoolean) +
        filters.substring(typeIndex + 1);
      (newParams as any)[filterType] = newUpdatedFilter;
    } else if (typeof type === 'string') {
      if (isMultiple) {
        const filtersSelected = (newParams as any)?.[filterType] || [];
        if (filtersSelected.includes(type)) {
          filtersSelected.splice(filtersSelected.indexOf(type), 1);
        } else {
          filtersSelected.push(type);
        }
        (newParams as any)[filterType] = filtersSelected;
      } else {
        (newParams as any)[filterType] = type;
      }
    }
    setParams(newParams);
  };

  const checkFilterIndexIsActive = (
    objectName: keyof ISearchAPIParams,
    filterIndex: number | string,
  ) => {
    if (typeof filterIndex === 'number') {
      const actualFilter = params?.[objectName]?.toString() || '000';
      const filter = actualFilter[filterIndex - 1];
      return filter === '1';
    }
    return params?.[objectName]?.toString()?.includes(filterIndex);
  };

  const handleNavigateBookmarks = () => {
    history.push('/bookmarks');
  };
  const handleNavigateSettings = () => {
    history.push('/settings');
  };

  const renderOrderButton = () => {
    const props: Partial<IconBaseProps> = {
      className: 'icon-button',
      color: 'var(--text)',
      size: 25,
    };
    if (params.order === 'desc') {
      return (
        <AiOutlineArrowDown
          onClick={() => toggleFilter({ filterType: 'order', type: 'asc' })}
          {...props}
        />
      );
    }
    return (
      <AiOutlineArrowUp
        onClick={() => toggleFilter({ filterType: 'order', type: 'desc' })}
        {...props}
      />
    );
  };

  return (
    <Container>
      <TopContainer>
        <Title>Filters</Title>
        <Separator />
        <FilterContainer>
          <FilterTitle>Image types</FilterTitle>
          <FilterName
            active={checkFilterIndexIsActive('categories', 1)}
            onClick={() => toggleFilter({ filterType: 'categories', type: 1 })}>
            General
          </FilterName>
          <FilterName
            active={checkFilterIndexIsActive('categories', 2)}
            onClick={() => toggleFilter({ filterType: 'categories', type: 2 })}>
            Anime
          </FilterName>
          <FilterName
            active={checkFilterIndexIsActive('categories', 3)}
            onClick={() => toggleFilter({ filterType: 'categories', type: 3 })}>
            People
          </FilterName>
        </FilterContainer>
        <FilterContainer>
          <FilterTitle>Purity</FilterTitle>
          <FilterName
            active={checkFilterIndexIsActive('purity', 1)}
            onClick={() => toggleFilter({ filterType: 'purity', type: 1 })}
            purity="sfw">
            SFW
          </FilterName>
          <FilterName
            active={checkFilterIndexIsActive('purity', 2)}
            onClick={() => toggleFilter({ filterType: 'purity', type: 2 })}
            purity="sketchy">
            Sketchy
          </FilterName>
          <FilterName
            active={checkFilterIndexIsActive('purity', 3)}
            onClick={() => toggleFilter({ filterType: 'purity', type: 3 })}
            purity="nsfw">
            NSFW
          </FilterName>
        </FilterContainer>
        <FilterContainer>
          <FilterTitle>Ratio</FilterTitle>
          <FilterName
            active={checkFilterIndexIsActive('ratios', 'landscape')}
            onClick={() =>
              toggleFilter({
                filterType: 'ratios',
                type: 'landscape',
                isMultiple: true,
              })
            }>
            Landscape
          </FilterName>
          <FilterName
            active={checkFilterIndexIsActive('ratios', 'portrait')}
            onClick={() =>
              toggleFilter({
                filterType: 'ratios',
                type: 'portrait',
                isMultiple: true,
              })
            }>
            Portrait
          </FilterName>
        </FilterContainer>
        <FilterContainer>
          <FilterTitle>Sort by</FilterTitle>
          <div className="flex row align-center">
            <Select
              className="flex flex-1"
              options={sortOptions}
              defaultValue={
                sortOptions.find(option => option.value === params?.sorting)
                  ?.value || sortOptions[0].value
              }
              onChange={value =>
                toggleFilter({ filterType: 'sorting', type: String(value) })
              }
            />
            {renderOrderButton()}
          </div>
        </FilterContainer>
        <FilterContainer>
          <FilterTitle>Search</FilterTitle>
          <Input
            name="search"
            onChange={value =>
              toggleFilter({ filterType: 'q', type: value.target.value })
            }
            placeholder="Search by @username, tags, id, type or like"
            defaultValue={params?.q || ''}
          />
        </FilterContainer>
      </TopContainer>
      <BottomContainer>
        <ScreenName onClick={() => handleNavigateBookmarks()}>
          <BsFillBookmarkFill color="orange" size={20} />
          Bookmarks
        </ScreenName>
        <ScreenName onClick={() => handleNavigateSettings()}>
          <BsFillGearFill color="white" size={20} />
          Settings
        </ScreenName>
      </BottomContainer>
    </Container>
  );
};

export default Filters;
